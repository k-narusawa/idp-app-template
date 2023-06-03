import NextAuth from "next-auth";

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
        token.access_token = account.access_token
      }
      return token
    },

    async session({ session, token }) {
      session.user.accessToken = token.access_token
      return session;
    },

    async redirect({ url, baseUrl }) {
      return baseUrl
    },
  },
})