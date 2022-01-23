import { useState } from 'react';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    console.table({ name, email, password });
  };

  return (
    <>
      <div class='jumbotron bg-primary py-5 d-flex justify-content-center display-1 text-light fw-bold shadow'>
        Register
      </div>

      <div className='container col-md-5 offset-md-4 pb-5'>
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            className='form-control mb-4 p-4'
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder='Enter name'
            required
          />

          <input
            type='email'
            className='form-control mb-4 p-4'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Enter email'
            required
          />

          <input
            type='password'
            className='form-control mb-4 p-4'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Enter password'
            required
          />

          <button type='submit' className='btn btn-block btn-primary'>
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default Register;
