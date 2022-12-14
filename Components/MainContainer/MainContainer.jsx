import {useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import Head from "next/head"
import { BsJournalAlbum, BsList, BsArrowLeftShort } from "react-icons/bs"
import nookies  from 'nookies'
import { jwtVerify } from 'jose'
import { NavDropdown } from "react-bootstrap"
import style from  '../../styles/MainContainer.module.css'

const MainContainer = (props) =>{
    const [name, setname] = useState('')
    const [menu, setMenu] = useState(false)
    useEffect(()=>{
        jwt()
    }, [useRouter().pathname.includes('gestor')])

    async function jwt(){
        const cookie = await nookies.get().jwt
        const secret = process.env.NEXT_PUBLIC_JWT_KEY

        const {payload} = await jwtVerify(`${cookie}`, new TextEncoder().encode(secret))
        setname(payload.name)

    }

    return(
        <>
            <Head>
                <title>{ useRouter().pathname.includes('configuracoes') ? 'Configurações'
                        : useRouter().pathname.includes('categorias') ? 'Categorias'
                        : useRouter().pathname.includes('produtos') ? 'Produtos'
                        : 'Gestor'}</title>
            </Head>

            <main className="d-flex flex-nowrap">

                <nav className={`d-flex flex-column flex-shrink-0 p-3 bg-light ${style.navMenu} ${menu && style.showNav}`} >

                    <Link href={'/gestor'} className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
                        <BsJournalAlbum size={25}  /> <span className="ms-2 fs-4">Cardapio Digital</span>
                    </Link>

                    <hr />

                    <div className="nav nav-pills flex-column mb-auto" >
                        <div className="nav-item">
                            <Link onClick={() => setMenu(false)} className={`nav-link ${useRouter().pathname.split('/').length == 2 ? 'active text-light' : 'link-dark'}`}  href={'/gestor'}>
                                <span className=""> Início </span>
                            </Link>
                        </div>

                        <div className="nav-item">
                            <Link onClick={() => setMenu(false)} className={`nav-link ${useRouter().pathname.includes('configuracoes') ? 'active text-light' : 'link-dark'}` }  href={'/gestor/configuracoes'}>
                                <span>Configurações</span>
                            </Link>
                        </div>

                        <div className="nav-item">
                            <Link onClick={() => setMenu(false)} className={`nav-link ${useRouter().pathname.includes('categorias') ? 'active text-light' : 'link-dark'}`}  href={'/gestor/categorias'}>
                                Categorias
                            </Link>
                        </div>

                        <div className="nav-item">
                            <Link onClick={() => setMenu(false)} className={`nav-link ${useRouter().pathname.includes('produtos') ? 'active text-light' : 'link-dark'}`}  href={'/gestor/produtos'}>
                                Produtos
                            </Link>
                        </div>

                    </div>

                    <hr />
                    <div className="d-flex justify-content-md-center justify-content-between">
                        <NavDropdown title={name}>
                            <NavDropdown.Item>Configurações de conta</NavDropdown.Item>
                            <NavDropdown.Item>Sair</NavDropdown.Item>
                        </NavDropdown>

                        <BsArrowLeftShort size={30} onClick={() => setMenu(false)} className="d-md-none .d-lg-block" />
                    </div>
                    
                </nav>
                <section className="w-100">

                    <header className="navbar navbar-expand-lg bg-light p-3">

                        <div className="container-fluid">

                            <div className="row d-flex w-100 justify-content-around">

                                <div className="col-6">
                                    <BsList onClick={() => setMenu(true)}  className="d-md-none .d-lg-block" size={30} />
                                </div>

                                <div className="col-6 text-end">
                                    <span className="fs-4" >
                                    { useRouter().pathname.includes('configuracoes') ? 'Configurações'
                                    : useRouter().pathname.includes('categorias') ? 'Categorias'
                                    : useRouter().pathname.includes('produtos') ? 'Produtos'
                                    : 'Início'}
                                    </span>
                                </div>
                                
                                
                            </div>

                        </div>
                    
                    </header>

                    <section className={style.sectionMain} > {/*higth 92%  */}
                        {props.children}
                    </section>
                    
                </section>

            </main>
        </>
    )
}

export default MainContainer