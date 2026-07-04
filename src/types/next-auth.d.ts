import NextAuth from "next-auth"
import { JWT } from "next-auth/jwt"
// interface for callbacks
declare module "next-auth" {
  interface User{
        id: string;
      email: string;
      name: string;
      accessToken: string
    }
    interface Session {
        user: {
            id: string,
            email: string,
            name: string,
        }
    }
}


declare module "next-auth/jwt" {
    /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
    interface JWT {
        accessToken : string;
    user :{
        id: string;
        email:string;
        name: string
    }
}
}