import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { jwtDecode } from "jwt-decode";
export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Exclusive",
            credentials: {
                email: { label: "User Email", placeholder: "example@domain.com", type: "email" },
                password: { label: "User Password", placeholder: "******", type: "password" },
            },
            async authorize(credentials, req) {
                //   sucess =>return user data
                // faild=>return null or false
                // call api
                try {
                    const res = await fetch("https://ecommerce.routemisr.com/api/v1/auth/signin",
                        {
                            method: "POST",
                            body: JSON.stringify({ email: credentials?.email, password: credentials?.password }),
                            headers: {
                                "Content-Type": "application/json"
                            }
                        }
                    )
                    const data = await res.json();

                    if (!res.ok) {
                        throw new Error(data.message || "Invaldatin message , somthing went error");
                    }
                    type MyToken = {
                        id: string;
                    }
                    const decode = jwtDecode<MyToken>(data.token)
                    // بنلاجع obj لل user بسبب انى محتاج شكل الداتا كده بعد كده
                    return {
                        id: decode.id,
                        email: data.user.email,
                        name: data.user.name,
                        accessToken: data.token
                    }
                } catch (error) {
                    console.log(error)
                    throw new Error((error as Error).message)
                }
            }
        })
    ],
    // session
    // callback
    callbacks: {
        jwt({ token, user }) {
            console.log("jwt===", "user is", user, "token iss", token);

            if (user) {
                token.accessToken = user.accessToken
                token.user = {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                }
            }
            return token
        },
        session({ session, token }) {

            if (token) {
                session.user = token.user;
            }
            return session;
        }
    },
    pages: { signIn: "/Login" }
}