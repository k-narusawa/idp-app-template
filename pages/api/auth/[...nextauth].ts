import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";

export default NextAuth({
  providers: [
    {
      id: "keycloak",
      name: "KeyCloak",
      type: "oauth",
      wellKnown: process.env.KEY_CLOAK_BASE_URL + "/auth/realms/sample/.well-known/openid-configuration",
      clientId: process.env.KEY_CLOAK_CLIENT_ID,
      clientSecret: process.env.KEY_CLOAK_CLIENT_SECRET,
      authorization: {
        params: {
          scope: "openid" 
        }
      },
      idToken: true,
      checks: [
        "pkce", 
        "state"
      ],
      profile(profile) {
        return {
          id: profile.sub,
        }
      },
    },
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token
        token.refreshToken = account.refresh_token
        token.idToken = account.id_token
      }
      return token
    },

    async session({ session, token }) {
      session.user.accessToken = token.accessToken
      session.user.refreshToken = token.refreshToken
      session.user.idToken = token.idToken
      return session;
    },

    async redirect({ url, baseUrl }) {
      return baseUrl
    },
  },

  events: {
    async signOut({ token }: { token: JWT }) {
      const logOutUrl = new URL(`${process.env.KEY_CLOAK_BASE_URL}/auth/realms/sample/protocol/openid-connect/logout`)
      logOutUrl.searchParams.set("id_token_hint", token.idToken!)
      await fetch(logOutUrl);
    },
  }
})