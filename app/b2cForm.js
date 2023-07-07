import { useState } from 'react';

export default function B2cPayment() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [accountReference, setAccountReference] = useState('');
  const [transactionDescription, setTransactionDescription] = useState('')
  //const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = fetch("/api/test", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ phoneNumber, amount, accountReference, transactionDescription }),
    });
    const data = (await response).json()
      .then((data) => { console.log('B2C payment successfull') })
      .catch((error) => { console.log(error) });
  }

  // const response =  fetch('https://mydomain.com/b2c/result',{
  //  method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body:JSON.stringify({phoneNumber, amount})
  //   })
  //   .then((response) => response.json())
  //   .then((data) => {console.log('result logged')})
  //   .catch((error) => {console.log(error)})
  //   console.log(data)


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
        {/* <br />
        
         <label>
            Account Reference;
         <input
         type='text'
         value={accountReference}
         onChange={(e) => setAccountReference(e.target.value)}></input>
         </label>
         <br />

         <label>
            Transaction Description:
         <input
         type='text'
         value={transactionDescription}
         onChange={(e) => setTransactionDescription(e.target.value)}></input>
         </label> */}

        <button type="submit">Make B2C Payment</button>
      </form>
      {/* <p>{message}</p> */}
    </div>
  );
}


  //    try {
  //     const response = await fetch("/api/b2c", {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ phoneNumber, amount, accountReference,transactionDescription }),
  //     });

  //     const data = await response.json()
  //     .then((res) => {
  //       if (res.ok) {
  //         return res;
  //       }

  //       throw new Error("failed to simulate B2C payment");
  //     })
  //     .then((res) => {
  //       console.log("Successful B2C payment");
  //     }).
  // };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <label>
//           Phone Number:
//           <input type="text"
//             value={phoneNumber}
//             onChange={(e) => setPhoneNumber(e.target.value)} />
//         </label>
//         <br />

//         <label>
//           Amount:
//           <input type="number"
//             value={amount}
//             onChange={(e) => setAmount(e.target.value)} />
//         </label>
//         {/* <br />
        
//          <label>
//             Account Reference;
//          <input
//          type='text'
//          value={accountReference}
//          onChange={(e) => setAccountReference(e.target.value)}></input>
//          </label>
//          <br />

//          <label>
//             Transaction Description:
//          <input
//          type='text'
//          value={transactionDescription}
//          onChange={(e) => setTransactionDescription(e.target.value)}></input>
//          </label> */}

//         <button type="submit">Make B2C Payment</button>
//       </form>
//       {/* <p>{message}</p> */}
//     </div>
//   );
// }