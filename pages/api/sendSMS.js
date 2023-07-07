import AfricasTalking from "africastalking";
import pool from "@/db"

const africastalking = AfricasTalking({
  apiKey: "10e1d690d86f82ff6c347b4d867f62d1540809a1da9dfcf51acf37a4decaffe0",
  username: "sandbox",
});

export const sendSms = async (recipient, message) => {
  try {
    const result = await africastalking.SMS.send({
      to: recipient,
      message: message,
    });
    console.log(result);
    return result;
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
};

export default async function handler(req, res) {

  try {
    const {recipient, message} = req.body;
    const result = await sendSms(recipient, message);


    const poolOne = await pool.connect();
    const query = 'INSERT INTO messages (recipient, message) VALUES ($1, $2) RETURNING *'
    const values = [recipient, message];
    const response = await poolOne.query(query, values);
    const latestMsg = response.rows[0];
    console.log(latestMsg);
    poolOne.release()
    
   
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error})
  }

  
}

/**
 

  - front
    - User enters number and message 
    - clicks send button
      - Calls a backend endpoint

    Back
      - You receive the number and the message
      - Send the SMS 
        If the SMS is successful
          - Sve to DB

 */