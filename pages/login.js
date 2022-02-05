import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { SyncOutlined } from '@ant-design/icons/lib/icons';
import Link from 'next/link';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const { data } = await axios.post('/api/login', {
        email,
        password,
      });

      setLoading(false);
      toast.success('Login successful.');
    } catch (err) {
      setLoading(false);
      toast.error(err.response.data);
    }
  };

  return (
    <>
      <div className='jumbotron bg-primary py-5 d-flex justify-content-center display-1 text-light fw-bold shadow'>
        Login
      </div>

      <div className='container col-md-5 offset-md-4 pb-5'>
        <form onSubmit={handleSubmit}>
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

          <button
            type='submit'
            className='btn btn-block btn-primary'
            disabled={!email || !password || loading}
          >
            {loading ? <SyncOutlined spin value='Login' /> : 'Login'}
          </button>
        </form>

        <p className='text-center p-3'>
          Not yet registered?
          <Link href='/register'>
            <a>&nbsp;Register</a>
          </Link>
        </p>
      </div>
    </>
  );
};

export default Login;
