"use client";
import { useSession, signIn, signOut } from "next-auth/react";
//import Home from "./smsForm"
import Home from "./form"
import "./globals.css"
import B2cPayment from "./b2cForm";
import C2BPayment from "./c2bForm";

export default function Component() {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        <div>
          <h1>Welcome, {session.user.name}</h1>
         
          <Home />
          <C2BPayment />
          <B2cPayment />
          <button onClick={() => signOut()}>Sign out</button>
        </div>

      </>
    );
  }
  return (
    <>
      <div>
        Not signed in <br />
        <button onClick={() => signIn()}>Sign in</button>
      </div>
    </>
  );
}
