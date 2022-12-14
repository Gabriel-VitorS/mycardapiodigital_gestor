import Link from 'next/link'

const Home = () => {
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

export default Home