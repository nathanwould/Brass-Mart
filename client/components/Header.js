import Link from 'next/link';
import Cart from './Cart';
import Nav from './Nav';

export default function Header({ Layout }) {
  const { Header } = Layout;
  return (
    <Header style={{ padding: 0 }}>
      <Nav Layout={Layout }/>
      <Cart />
    </Header>
  );
}
