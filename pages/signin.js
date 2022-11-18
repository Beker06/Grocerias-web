import React, { useState } from "react";
import {
  getCsrfToken,
  getProviders,
  signIn,
  getSession,
} from "next-auth/react";


export default function SignIn({ csrfToken, providers }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const signinUser = (e) => {
    console.log(email, password)
  }
  return (
    <>
      <form method="post" action="/api/auth/signin/email">
        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
        <label>
          Email Address
          <input type="email" id="email" name="email" />
        </label>
        <button type="submit">Sign in with Email</button>
      </form>
      <form action="">
      <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
        <label>
          Email Address
          <input type="email" id="email" name="email" value={email} onChange={e=>setEmail(e.target.value)} />
        </label>
        <label>
          Password
          <input type="password" id="password" name="password" value={password} onChange={e=>setPassword(e.target.value)}/>
        </label>
        <button onClick={(e) => signinUser(e)}>Sign in with credentials</button>
      </form>
    </>
  );
}

export async function getServerSideProps(context) {
  const { req } = context;
  const session = await getSession({req})
  if(session){
    return{
      redirect: {destination: "/"}
    }
  }
  const csrfToken = await getCsrfToken(context)
  const providers = await getProviders()

  return{
    props: { csrfToken, providers },

  }
}
