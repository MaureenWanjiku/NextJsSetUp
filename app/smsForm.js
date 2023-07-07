"use client";
import { useState } from "react";
import styles from "./page.module.css";

export default function Home() {
  const [recipient, setRecipient] = useState("");
  const [message, setMessage] = useState("");

  console.log(recipient, message);


  const sendMessage = (e) => {
    e.preventDefault()
    fetch("/api/sendSMS", {
      method:"POST",
      headers: {
        "Content-Type": "application/json",
      },
      body:JSON.stringify({recipient, message })
    })
      .then((res) => {
        if (res.ok) {
          return res;
        }
        throw new Error("response was not okay");
      })
      .then((res) => {
        console.log("Message was sent successfully");
      })
      //.catch((error) => console.log(error));
  };

  return (
    <main className={styles.main}>
        <form onSubmit={sendMessage}>
            <label>Recipient</label>
            <input type="text"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}>
            </input> <br/>
            <label>Message</label>
            <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}>

            </input>
             
            <button type="submit">Send SMS </button>
        </form>
      
    </main>
  );
}