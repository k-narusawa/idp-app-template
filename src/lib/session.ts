import nextSession from "next-session";

const options = {
  name: "session",
  secret: "my-secret",
  cookie: {
    maxAge: 24 * 60 * 60 * 1000,
  },
};
export const getSession = nextSession(options);