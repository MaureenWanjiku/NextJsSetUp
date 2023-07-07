//import { headers } from "@/next.config";
import axios from "axios";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { phoneNumber, amount, accountReference, transactionDescription } = req.body;
      const consumerKey = process.env.consumerKey;
      const consumerSecret = process.env.consumerSecret;
      const shortcode = process.env.shortcode;
      const initiatorName = process.env.initiatorName;
      const securityCredential = process.env.securityCredential;
      const queueTimeOutURL = process.env.queueTimeOutURL;
      const resultURL = process.env.resultURL;
      console.log(`Basic ${Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64')}`)
      // const headers = {
      //    headers: {
      //     Authorization: `Basic ${Buffer.from(`${consumerKey}: ${consumerSecret}`).toString('base64')}`
      //   }
      //}

      const { data: { access_token } } = await axios.get('https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials', {
        headers: {
          Authorization: `Basic ${Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64')}`
        }
      }
      )
      console.log("access_token", access_token)

      const payload = {
        InitiatorName: initiatorName,
        SecurityCredential: securityCredential,
        CommandID: 'BusinessPayment',
        Amount: amount,
        PartyA: shortcode,
        PartyB: phoneNumber,
        Remarks: transactionDescription,
        QueueTimeOutURL: queueTimeOutURL,
        ResultURL: resultURL,
        Occasion: ""
      };

      const response = await axios.post("https://sandbox.safaricom.co.ke/mpesa/b2c/v1/paymentrequest", payload, {
        headers: {

          'Authorization': `Bearer  ${access_token}`,
          'Content-Type': 'application/json'
        }
      });
      console.log(response);

      res.status(200).json({ success: true, message: 'B2C payment was successful' });
    } catch (error) {
      console.log('B2C payment failed', error)
      res.status(500).json({ success: false, message: 'B2C payment failed' });
    }
  } else {
    res.status(404).end();
  }
}
