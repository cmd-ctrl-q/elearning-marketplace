import { Menu } from 'antd';
import Link from 'next/link';
import {
  AppstoreOutlined,
  LoginOutlined,
  UserAddOutlined,
} from '@ant-design/icons';

const { Item } = Menu;

export const TopNav = () => {
  return (
    <Menu mode='horizontal'>
      <Item key='home' icon={<AppstoreOutlined />}>
        <Link href='/'>
          <a>App</a>
        </Link>
      </Item>

      <Item key='login' icon={<LoginOutlined />}>
        <Link href='/login'>
          <a>Login</a>
        </Link>
      </Item>

      <Item key='register' icon={<UserAddOutlined />}>
        <Link href='/register'>
          <a>Register</a>
        </Link>
      </Item>
    </Menu>
  );
};
