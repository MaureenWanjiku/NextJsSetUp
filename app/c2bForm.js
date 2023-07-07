import { useState } from 'react';

export default function C2BPayment() {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [amount, setAmount] = useState('');
    //const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = fetch("/api/c2b", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ phoneNumber, amount }),
        });
        const data = (await response).json()
            .then((data) => { console.log('C2B payment successfull') })
            .catch((error) => { console.log(error) });

    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Phone Number:
                    <input type="text"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)} />
                </label>
                <br />

                <label>
                    Amount:
                    <input type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)} />
                </label>

                <button type="submit">Make C2B Payment</button>
            </form>
            {/* <p>{message}</p> */}
        </div>
    );
}