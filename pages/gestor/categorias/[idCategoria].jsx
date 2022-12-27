import APIRequestAuth from "../../../Fetch/APIRequestAuth"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

import Input from "../../../Components/Inputs/NormalInput"

import Loader from "../../../Components/Loader/Loader"
import ModalAlert from "../../../Components/ModalAlert/ModalAlert"
import ModalConfirm from "../../../Components/ModalConfirm/ModalConfirm"
import Notification from "../../../Components/Notification/Notification"
import OrderInput from "../../../Components/Inputs/OrderInput"

const Categoria = () =>{
    const router = useRouter()
    const idCategoria = router.query.idCategoria
    const [order, setOrder] = useState(0)
    
    const [loader, setLoader] = useState()
    const [messageAlert, setMessageAlert] = useState('')
    const [alert, setAlert] = useState(false)
    const [confirm, setConfirm] = useState(false)
    const [notification, setNotification] = useState(false)

    useEffect(()=>{
        getDetailCategory()
    }, [idCategoria])

    const getDetailCategory = async () =>{
        if(idCategoria != 0){
            setLoader(true)
            const request = await APIRequestAuth(`category/${idCategoria}`, 'GET').catch((err) => console.log(err))
            setLoader(false)
            
            if(!request)
                return

            if(request.status == 200){
                document.querySelector('#name').value = request.body.data.name
                document.querySelector('#name').dataset.valid = 'true'
                document.querySelector('#name').classList.add('is-valid')

                document.querySelector('#order').value = request.body.data.order
                document.querySelector('#order').dataset.valid = 'true'
                document.querySelector('#order').classList.add('is-valid')
                setOrder(request.body.data.order)
            }

        }
    }

    const requestPostOrPut = async () =>{
        const name = document.querySelector("#name")
        const order = document.querySelector('#order')

        if(name.dataset.valid == 'false'
            || order.dataset.valid == 'false')
        return

        setLoader(true)
        const request = await APIRequestAuth(`${idCategoria == 0 ? 'category': `category/${idCategoria}` }`, `${idCategoria == 0 ? 'POST' : 'PUT'}`, {
            name: name.value,
            order: order.value
        })
        setLoader(false)

        if(!request){
            setNotification(true)
            return
        }

        if(request.status == 401){
            router.push('/entrar')
            return
        }

        if(request.status != 200){
            setNotification(true)
            return
        }

        idCategoria == 0 ? setMessageAlert('Categoria incluída com sucesso !') : setMessageAlert('Categoria atualizada com sucesso!')
        setAlert(true)
    }

    const deleteCategoria = async () =>{
        setLoader(true)
        const request = await APIRequestAuth(`category/${idCategoria}`, 'DELETE')
        setLoader(false)

        if(!request){
            setNotification(true)
            return
        }

        if(request.status == 401){
            router.push('/entrar')
            return
        }

        if(request.status != 200){
            setNotification(true)
            return
        }

        setMessageAlert('Categoria deletada com sucesso !')
        setAlert(true)
    }

    const buttonAlert = () =>{
        router.push('/gestor/categorias')
    }

    return(
            <>

                <div>

                    <div className="container mb-3">
                        <span className="fs-3">{idCategoria == 0 ? 'Incluir Categoria' : `Categoria id: ${idCategoria}`}</span>
                    </div>

                    <div className="container">
                        <form className="row">
                            <div className="col-md-6 mt-2">
                                <Input type="text" id="name" required={true} label='Nome' invalidMessage="Digite o nome" />
                            </div>
                            
                            <div className="col-md-6 mt-2">
                                <OrderInput order={order}/>
                            </div>
                        
                        </form>                            
                    </div>
                </div>

                <footer className="d-flex justify-content-around">
                    <button onClick={()=>{router.back(1)}} className="btn btn-secondary">Voltar</button>
                    <div>
                        {
                            idCategoria != 0 ?
                                <>
                                <button onClick={()=>{setConfirm(true)}} className="btn btn-danger me-2">Deletar</button>
                                <button className="btn btn-success ms-2" onClick={requestPostOrPut}>Salvar</button>
                                </>
                            : <button onClick={requestPostOrPut} className="btn btn-success">Incluir</button>
                        }
                    </div>
                    
                </footer>

                {loader && <Loader message={'Carregando dados'} />}
                {alert && <ModalAlert onClick={buttonAlert} message={messageAlert} />}
                {confirm && <ModalConfirm message={'Deseja deletar a categoria?'} onClick={deleteCategoria} setConfirm={setConfirm} />}
                {notification && <Notification type={'danger'} text={'Houve um erro. Contate o suporte'} visible={notification} setToast={setNotification} />}
            </>
        
    )
}

export default Categoria