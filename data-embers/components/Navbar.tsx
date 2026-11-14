import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="navbar">
      <h1 className="logo">
        <Link href="/">Data Embers</Link>
      </h1>
      <ul className="nav-list">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/calendar">Calendar</Link>
        </li>
        <li>
          <Link href="/about">About</Link>
        </li>
      </ul>
    </nav>
  );
}
