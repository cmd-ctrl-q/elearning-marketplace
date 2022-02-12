import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Menu } from 'antd';
import Link from 'next/link';
import {
  AppstoreOutlined,
  LoginOutlined,
  LogoutOutlined,
  UserAddOutlined,
} from '@ant-design/icons';
import { Context } from '../context';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

const { Item } = Menu;

export const TopNav = () => {
  const [current, setCurrent] = useState('');

  const { state, dispatch } = useContext(Context);

  const router = useRouter();

  useEffect(() => {
    typeof window !== 'undefined' && setCurrent(window.location.pathname);
    console.log(window.location.pathname);
  }, [setCurrent]);

  const logout = async () => {
    dispatch({ type: 'LOGOUT' });
    window.localStorage.removeItem('user');
    const { data } = await axios.get('/api/logout');
    toast(data.message);
    window.location.pathname = '/login';
    router.push('/login');
  };

  return (
    <Menu mode='horizontal' selectedKeys={[current]}>
      <Item
        key='/'
        onClick={(e) => setCurrent(e.key)}
        icon={<AppstoreOutlined />}
      >
        <Link href='/'>
          <a>App</a>
        </Link>
      </Item>

      <Item
        key='/login'
        onClick={(e) => setCurrent(e.key)}
        icon={<LoginOutlined />}
      >
        <Link href='/login'>
          <a>Login</a>
        </Link>
      </Item>

      <Item
        key='/register'
        onClick={(e) => setCurrent(e.key)}
        icon={<UserAddOutlined />}
      >
        <Link href='/register'>
          <a>Register</a>
        </Link>
      </Item>

      <Item
        key='/logout'
        onClick={logout}
        icon={<LogoutOutlined />}
        className='float-right'
      >
        Logout
      </Item>
    </Menu>
  );
};
