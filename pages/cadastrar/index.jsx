import Head from 'next/head'
import Link from 'next/link'
import { BsFillArrowLeftCircleFill } from 'react-icons/bs'

import FormCadastro from '../../Components/FormCadastro/FormCadastro'
const Cadastrar = () =>{
    return (
        <>
            <Head>
                <title>Cadastrar</title>
            </Head>

            <nav className="navbar">
                <div className='container-fluid'>
                    <Link className='navbar-brand' href={'/'}>
                        <BsFillArrowLeftCircleFill  />
                        <span className='ms-2 fs-3' >Voltar</span>
                    </Link>
                
                </div>
            </nav>

            <div className='container'>


                <h2>Cadastrar</h2>

                <div className='row justify-content-center'>
                    <FormCadastro />
                </div>
                
                
                
            </div>
        </>
    )
}

export default Cadastrar