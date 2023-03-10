import { Nav } from '@/components/Nav';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <h1>Hello</h1>
      <Nav />
      <Link href='/portfolio'>Portfolio</Link>
    </>
  );
}
