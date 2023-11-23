import React, { useContext } from 'react';
import { MyContext } from '../context/context';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const { user, setUser } = useContext(MyContext);
  const { loginError, setLoginError } = useContext(MyContext);

  const navigate = useNavigate();

  const loginUser = (e) => {
    e.preventDefault();
    // POST request
    fetch('http://localhost:8000/api/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: e.target.email.value,
        password: e.target.password.value,
      }),
    })
      .then((res) => {
        const token = res.headers.get('token');
        if (token) {
          localStorage.setItem('token', token);
        }
        return res.json();
      })
      .then((result) => {
        if (result.success) {
          setUser(result.data);
          e.target.reset();
          navigate('/records');
        } else {
          console.log(result.message);
          setLoginError(result.message);
        }
      })
      .catch((err) => console.log(err));
  };
  console.log(user);

  return (
    <div>
      <h1>Login Page</h1>

      <form onSubmit={loginUser}>
        <label htmlFor='email'>Email :</label>
        <input type='email' id='email' name='email' /> <br />
        <label htmlFor='password'>Password : </label>
        <input type='password' id='password' name='password' /> <br />
        <p className={loginError !== '' ? 'error-msg' : 'invisible'}>
          {loginError}
        </p>
        <button>Login</button>
      </form>
    </div>
  );
}
