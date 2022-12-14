import Link from "next/link";
import { setCookie } from "nookies";
import { useState } from "react";
import Router from "next/router";

import Input from "../Inputs/NormalInput"
import Notification from "../Notification/Notification"
import Loader from "../Loader/Loader"
import APIRequest from "../../Fetch/APIRequest";

const FormLogin = () =>{
    const [toast, setToast] = useState(false)
    const [message, setMessage] = useState('')

    const [loader, setLoader] = useState(false)

    async function login(e){
        
        e.preventDefault()

        const email = document.querySelector('#email')
        const password = document.querySelector('#password')

        if(email.dataset.valid == 'false' || password.dataset.valid == 'false')
            return

        setLoader(true)
        
        const request = await APIRequest('login', 'POST', {email: email.value, password: password.value})
        if(!request){
            setLoader(false)
            setToast(true)
            setMessage('Falha na comunicação com o servidor')
            return
        }
        if(request.status === 422){
            setLoader(false)
            setToast(true)
            setMessage('Dados inválidos')
            return
        }

        if(request.status !== 200){
            setLoader(false)
            setToast(true)
            setMessage(`Error: ${request.status}. ${request.body.message}`)
            return
        }

        setCookie(null, 'jwt', request.body.data, {
            maxAge: 60 * 60 * 60, // 60 * 60 * 1
        })

        Router.push('/gestor')
        
    }

    return(
        <>
            <form onSubmit={login}>
                <Input type="email" id="email" required={true} label='E-mail:' invalidMessage="Digite o e-mail" />

                <Input type="password" id="password" required={true} label='Senha:' invalidMessage="Digite a senha" />

                <div className="row justify-content-center mt-3">
                    <div className="col-auto">
                        <button className="btn btn-primary" type="submit">Entrar</button>
                    </div>
                </div>

                <div className="row justify-content-center">
                    <div className="col-auto">
                        <Link className="btn btn-link" href={'/cadastrar'}>
                            Cadastrar
                        </Link>
                    </div>
                </div>
            </form>

            {loader && <Loader message="Verificando dados"></Loader> }

            <Notification type='danger' text={message} visible={toast} setToast={setToast} /> 
        </>
    )
}

export default FormLogin