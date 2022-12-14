import Link from 'next/link'

export default function Home() {
  return (
    <div >
      <Link href={'/cadastrar'}>
        cadastrar
      </Link>

      <Link href={'/entrar'}>
        Login
      </Link>
  
    </div>
  )
}
