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

    fetch("https://sandbox.safaricom.co.ke/mpesa/c2b/v1/registerurl", {
        method: 'POST',
        headers,
        body: JSON.stringify({
            "ShortCode": 600996,
            "ResponseType": "Completed",
            "ConfirmationURL": process.env.confirmationURL,
            "ValidationURL": process.env.validationURL,

        })

    })
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log(error));



    res.status(200).json({ message: 'hello' })
}

// let headers = new Headers();
// headers.append("Content-Type", "application/json");
// headers.append("Authorization", "Bearer QfG0yd2dw4DA6OeDUJVfXkwEgnH7");

// fetch("https://sandbox.safaricom.co.ke/mpesa/c2b/v1/registerurl", {
//     method: 'POST',
//     headers,
//     body: JSON.stringify({
//         "ShortCode": 600996,
//         "ResponseType": "Completed",
//         "ConfirmationURL": process.env.ConfirmationURL,
//         "ValidationURL": process.env.ValidationURL,


//     })

// })
//     .then(response => response.text())
//     .then(result => console.log(result))
//     .catch(error => console.log(error));