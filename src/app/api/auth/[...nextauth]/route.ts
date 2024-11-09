import NextAuth from 'next-auth';
import KeycloakProvider from 'next-auth/providers/keycloak';
import { env } from 'process';

const clientId = env.KEYCLOAK_CLIENT_ID || '';
const clientSecret = env.KEYCLOAK_CLIENT_SECRET || '';
const issuer = env.KEYCLOAK_ISSUER || '';

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
