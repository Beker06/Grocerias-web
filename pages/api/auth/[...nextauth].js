import React from "react";
import db from "../../../Utils/db";
import CredentialsProvider from "next-auth/providers/credentials";
import Users from '../../../models/usuarioModel';
import bcrypt from "bcrypt";

db();

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const email = credentials.email;
        const password = credentials.password;
        const user = await Users.findOne({ email });
        if (!user) {
          throw new Error("No estas registrado aun");
        }
        if (user) {
          return signInUser({ password, user });
        }
      },
    }),
  ],
  pages: {
    signIn: "/signin",
  },
  secret: "secret",
});

const signInUser = async({password, user})=>{
    if(!user.password) {
        throw new Error("Please enter password")
    }
    const isMatch = await bcrypt.compare(password, user);
    if (!isMatch){
        throw new Error("password not correct")
    }
    return user;
}