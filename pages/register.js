import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { SyncOutlined } from '@ant-design/icons/lib/icons';
import Link from 'next/link';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const { data } = await axios.post('/api/register', {
        name,
        email,
        password,
        password_confirm: passwordConfirm,
      });

      setLoading(false);
      toast.success('Registration successful.');
    } catch (err) {
      setLoading(false);
      toast.error(err.response.data);
    }
  };

  return (
    <>
      <div className='jumbotron bg-primary py-5 d-flex justify-content-center display-1 text-light fw-bold shadow'>
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

          <input
            type='password'
            className='form-control mb-4 p-4'
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            placeholder='Re-enter password'
            required
          />

          <button
            type='submit'
            className='btn btn-block btn-primary'
            disabled={
              !name || !email || !password || !passwordConfirm || loading
            }
          >
            {loading ? <SyncOutlined spin value='Submit' /> : 'Submit'}
          </button>
        </form>

        <p className='text-center p-3'>
          Already registered?
          <Link href='/login'>
            <a>&nbsp;Login</a>
          </Link>
        </p>
      </div>
    </>
  );
};

export default Register;
