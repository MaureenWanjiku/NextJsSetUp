import axios from "axios"
export default async function handler(req, res) {
    const consumerKey = process.env.consumerKey
    const consumerSecret = process.env.consumerSecret
    const test = `Basic ${Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64')}`
    // console.log(test)


    const { data: { access_token } } = await axios.get('https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials', {
        headers: {
            Authorization: `Basic ${Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64')}`
        }
    }
    )



    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `Bearer ${access_token}`);

    fetch("https://sandbox.safaricom.co.ke/mpesa/b2c/v1/paymentrequest", {
        method: 'POST',
        headers,
        body: JSON.stringify({
            "InitiatorName": process.env.initiatorName,
            "SecurityCredential": process.env.securityCredential,
            "CommandID": "BusinessPayment",
            "Amount": 1,
            "PartyA": 600987,
            "PartyB": 254708374149,
            "Remarks": "Test remarks",
            "QueueTimeOutURL": "https://mydomain.com/b2c/queue",
            "ResultURL": "https://5afd-105-163-158-165.ngrok-free.app/api/result",
            // "ResultURL": "http://localhost:3000/api/result",
           "ResultURL": "https://mydomain.com/b2c/result",
            "Occassion": "",
        })
    })
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log(error));

    res.status(200).json({ message: 'hello' })
}

