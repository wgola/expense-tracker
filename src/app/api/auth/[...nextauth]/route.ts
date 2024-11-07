import NextAuth from 'next-auth';
import KeycloakProvider from 'next-auth/providers/keycloak';

const clientId = process.env.KEYCLOAK_CLIENT_ID || '';
const clientSecret = process.env.KEYCLOAK_CLIENT_SECRET || '';
const issuer = process.env.KEYCLOAK_ISSUER || '';

export const authOptions = {
  providers: [
    KeycloakProvider({
      clientId,
      clientSecret,
      issuer
    })
  ]
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
