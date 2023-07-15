import * as IronSession from "iron-session";

declare module "iron-session" {
  interface IronSessionData {
    token?: {
      access_token: number;
      id_token: boolean;
    };
  }
}
