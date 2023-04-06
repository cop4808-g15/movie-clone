import Link from 'next/link'

function NavBar() {
  return (
    <div>
      <Link href="/">Home</Link>
      <Link href="/favorites">Favorites</Link>
    </div>
  )
}

export default NavBar
