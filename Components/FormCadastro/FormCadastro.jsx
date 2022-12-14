import { useState, FormEvent } from "react"
import { useRouter } from "next/router"
import Link from "next/link"

import Input from "../Inputs/NormalInput"
import CpfCnpjInput from "../Inputs/CpfCnpjInput"
import EmailInput from "../Inputs/EmailInput"
import PasswordInput from "../Inputs/PasswordInput"
import Notification from "../Notification/Notification"
import Loader from "../Loader/Loader"

const FormCadastro = () =>{
    const router = useRouter()

    const [toast, setToast] = useState(false)
    const [typeAlert, setTypeAlert] = useState('text-bg-danger')
    const [messageAlert, setMessagelert] = useState('')
    const [loader, setLoader] = useState(false)

    async function cadastrarEmpresa(e){
        e.preventDefault()
        const name = document.querySelector('#name')
        const cpf_cnpj = document.querySelector('#cpf_cpnj')
        const email = document.querySelector('#email')
        const password = document.querySelector('#password')
        const password_confirmation = document.querySelector('#password_confirmation')

        //verifica se os inputs são validos
        if(
            name.dataset.valid == 'false'
            || cpf_cnpj.dataset.valid == 'false'
            || email.dataset.valid == 'false'
            || password.dataset.valid == 'false'
            || password_confirmation.dataset.valid == 'false'
            )
                return
                
        setLoader(true)
        const request = await APIRequest('register', 'POST', {
            name:name.value,
            cpf_cnpj: cpf_cnpj.value,
            email: email.value,
            password: password.value,
            password_confirmation: password_confirmation.value
        })

        if(request.status !== 200){
            setTypeAlert('danger')
            setMessagelert(`Error: ${request.status}. ${request.body.message}`)
            showToast()
            setLoader(false)
            return
        }
        setLoader(false)
        router.push({
            pathname: '/entrar',
            query: {message: 'Cadastro realizado com sucesso. Faça o login com os dados cadastrados'}
        }, '/entrar')
    }

    return (
        <>
            <form onSubmit={cadastrarEmpresa} >
                
                <Input
                type="text"
                id="name"
                label="Nome:"
                invalidMessage="Digite seu nome ou o nome da empresa."
                required={true}
                />
            
                <CpfCnpjInput />
                
                <EmailInput />
                
                <PasswordInput />

                <div className="row justify-content-center mt-3">
                    <div className="col-auto">
                        <button className="btn btn-primary" type="submit">Cadastrar</button>
                    </div>
                </div>

                <div className="row justify-content-center">
                    <div className="col-auto">
                        <Link className="btn btn-link" href={'/entrar'}>
                            Entrar
                        </Link>
                    </div>
                </div>

                {loader && <Loader message="Cadastrando"></Loader> }

                

                <Notification
                    type={typeAlert}
                    text={messageAlert}
                    visible={toast}
                    setToast={setToast}
                />
            </form>
        </>
    )

}

export default FormCadastro