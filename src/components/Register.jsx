import React from 'react';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

export default function Register() {
  const navigate = useNavigate();

  const registerUser = (e) => {
    e.preventDefault();
    const user = {
      firstName: e.target.firstname.value, // targetting NAME in INPUT field
      lastName: e.target.lastname.value,
      email: e.target.email.value,
      password: e.target.password.value,
    };
    // making POST request (to send data)
    fetch('https://shop-be-b5xf.onrender.com/api/users/register', {
      method: 'POST', // DELETE only need METHOD (no --/headers/body/--)
      // u can send JSON, XML, grapghQL data (need 2 say, what type of data u're sending !!)
      headers: { 'Content-Type': 'application/json' }, // META DATA (like HEAD in HTML)
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((result) => {
        if (!result.success) {
          console.log(result.message);
          toast.error(JSON.stringify(result.message));
        } else {
          e.target.reset();
          toast.success('you successfully registered!');
          setTimeout(() => {
            navigate('/login');
          }, 1500);
        }
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <div>
      <h1>Register User Page</h1>
      <Toaster position='top-center' />
      {/* only rendered, when toast-method called !! */}
      {/* whenever u use FORM ---> onSUBMIT on the form, NOT the BTN !! 
      
      --htmlFor--  ===> FOCUS (INPUT gets focus, when u click on the LABEL*/}
      <form onSubmit={registerUser}>
        <label htmlFor='firstname'>First Name:</label>
        <input type='text' id='firstname' name='firstname' /> <br />
        <label htmlFor='lastname'>Last Name:</label>
        <input type='text' id='lastname' name='lastname' /> <br />
        <label htmlFor='email'>Email:</label>
        <input type='email' id='email' name='email' /> <br />
        <label htmlFor='password'>Password: </label>
        <input type='password' id='password' name='password' /> <br />
        <button>register</button>
      </form>
    </div>
  );
}
