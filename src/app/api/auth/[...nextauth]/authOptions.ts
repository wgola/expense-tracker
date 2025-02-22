import { AuthOptions, TokenSet } from 'next-auth';
import KeycloakProvider from 'next-auth/providers/keycloak';
import { JWT } from 'next-auth/jwt';

const clientId = process.env.KEYCLOAK_CLIENT_ID ?? '';
const jwksEndpoint = process.env.KEYCLOAK_JWKS_ENDPOINT ?? '';
const authorizationUrl = process.env.KEYCLOAK_AUTHORIZATION_URL ?? '';
const clientSecret = process.env.KEYCLOAK_CLIENT_SECRET ?? '';
const issuer = process.env.KEYCLOAK_ISSUER ?? '';
const tokenUrl = process.env.KEYCLOAK_TOKEN_URL ?? '';
const userinfoUrl = process.env.KEYCLOAK_USERINFO_URL ?? '';

function requestRefreshOfAccessToken(token: JWT) {
  return fetch(`${issuer}/protocol/openid-connect/token`, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: 'refresh_token',
      refresh_token: token.refreshToken as string
    }),
    method: 'POST',
    cache: 'no-store'
  });
}

export const authOptions: AuthOptions = {
  providers: [
    KeycloakProvider({
      jwks_endpoint: jwksEndpoint,
      wellKnown: undefined,
      clientId,
      clientSecret,
      issuer,
      authorization: {
        params: {
          scope: 'openid email profile'
        },
        url: authorizationUrl
      },
      token: tokenUrl,
      userinfo: userinfoUrl
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    maxAge: 60 * 30, // 30 minutes
    strategy: 'jwt'
  },
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.idToken = account.id_token;
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.expiresAt = account.expires_at;

        return token;
      }

      if (Date.now() < ((token.expiresAt as number) ?? 0) * 1000 - 60 * 1000) {
        return token;
      } else {
        try {
          const response = await requestRefreshOfAccessToken(token);

          const tokens: TokenSet = await response.json();

          if (!response.ok) throw tokens;

          const updatedToken: JWT = {
            ...token,
            idToken: tokens.id_token,
            accessToken: tokens.access_token,
            expiresAt: Math.floor(Date.now() / 1000 + (tokens.expires_in as number)),
            refreshToken: tokens.refresh_token ?? token.refreshToken
          };
          return updatedToken;
        } catch (error) {
          console.error('Error refreshing access token', error);
          return { ...token, error: 'RefreshAccessTokenError' };
        }
      }
    },
    session({ session, token }) {
      return { ...session, accessToken: token.accessToken, error: token.error };
    }
  }
};
