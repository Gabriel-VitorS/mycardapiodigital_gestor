import { useEffect, useState } from "react"
import {useRouter} from 'next/router'
import Head from "next/head"
import Link from "next/link"

import Notification from "../../Components/Notification/Notification"
import { BsFillArrowLeftCircleFill } from 'react-icons/bs'
import FormLogin from "../../Components/FormLogin/FormLogin"
const Entrar = (props) => {
    const router = useRouter()
    const [toast, setToast] = useState(false)

    let message = ''
    if(router.query.message)
        message = router.query.message

    useEffect(()=>{
        if(message !== '')
        setToast(true)
    }, [message])

    return (
        <>
            <Head>
                <title>Entrar</title>
            </Head>

            <nav className="navbar">
                <div className='container-fluid'>
                    <Link className='navbar-brand' href={'/'}>
                        <BsFillArrowLeftCircleFill  />
                        <span className='ms-2 fs-3' >Voltar</span>
                    </Link>
                </div>
            </nav>

            <div className="container">
                <h2>Entrar</h2>
                <FormLogin />
                <Notification type='success' text={message} visible={toast} setToast={setToast} /> 
            </div>
        </>
    )
}

export default Entrar