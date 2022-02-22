import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Menu } from 'antd';
import Link from 'next/link';
import {
  AppstoreOutlined,
  CoffeeOutlined,
  LoginOutlined,
  LogoutOutlined,
  UserAddOutlined,
} from '@ant-design/icons';
import { Context } from '../context';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

const { Item, SubMenu } = Menu;

export const TopNav = () => {
  const [current, setCurrent] = useState('');

  const { state, dispatch } = useContext(Context);
  const { user } = state;

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

      {user === null && (
        <>
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
        </>
      )}

      {user !== null && (
        <SubMenu
          key='/menu'
          className='ms-auto'
          icon={<CoffeeOutlined />}
          title={user && user.name}
        >
          <Item key='/logout' onClick={logout}>
            Logout
          </Item>
        </SubMenu>
      )}
    </Menu>
  );
};
