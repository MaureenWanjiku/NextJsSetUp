import { useState } from "react";
import styles from "./page.module.css";
import Papa from "papaparse";

export default function Home() {
  const [message, setMessage] = useState('');
  const [CsvFile, setCsvFile] = useState([]);

  const sendMessage = (e) => {
    e.preventDefault()
    //const CsvFile = e.target.files[0]
    console.log(CsvFile);
    Papa.parse(CsvFile, {
        header: true,
        skipEmptyLines: true,
        complete: results => {
            const csv = results.data;
            console.log(csv);
            csv.forEach(async(line) => {
                const recipient = line.recipient;
                //const message = line.message;

               await fetch("/api/sendSMS", {
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
                })
            }
        })
     setMessage('');
     setCsvFile([]);
  };

  return (
    <main className={styles.main}>
       <form onSubmit={sendMessage}>
        <div className="form">
        <label>Message</label>
            <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}>
            </input>  
          </div>
            <br />
        <div className="form">
        <label>Recipient</label> 
         <input
         type="file"
         accept=".csv"
         onChange={(e) =>setCsvFile(e.target.files[0]) }>
         </input>
        </div>
         <button type="submit">Send SMS </button>
       </form>
      
    </main>
  );
}