import APIRequestAuth from "../../../Fetch/APIRequestAuth"
import APIRequestAuthFile from "../../../Fetch/APIRequestAuthFile"
import { useRouter } from "next/router"
import { useEffect, useState, useRef } from "react"

import Input from "../../../Components/Inputs/NormalInput"
import ValueInput from "../../../Components/Inputs/ValueInput"
import SelectCategoria from "../../../Components/Inputs/SelectCategoria"
import CropImage from "../../../Components/CropImage/CropImage"

import Loader from "../../../Components/Loader/Loader"
import ModalAlert from "../../../Components/ModalAlert/ModalAlert"
const Produto = () =>{
    const router = useRouter()
    const [loader, setLoader] = useState()
    const [alert, setAlert] = useState(false)
    const idProduto = router.query.idProduto
    const image = useRef()

    useEffect(()=>{
        getDetailProduct()
    }, [idProduto])

    const getDetailProduct = async () =>{
        if(idProduto != 0){
            setLoader(true)
            const request = await APIRequestAuth(`product/${idProduto}`, 'GET').catch((err) => console.log(err))
            setLoader(false)
            
            if(!request)
                return

            if(request.status == 200){
                document.querySelector('#name').value = request.body.data.name
                document.querySelector('#name').dataset.valid = 'true'
                document.querySelector('#name').classList.add('is-valid')

                document.querySelector('#value').value = request.body.data.value
                document.querySelector('#value').dataset.valid = 'true'
                document.querySelector('#value').classList.add('is-valid')

                document.querySelector('#category_id').value = request.body.data.category_id

                image.current.src = `http://${request.body.data.url_image}`
                if(request.body.data.highlight == 'true')
                    document.querySelector('#highlight').checked = true

                if(request.body.data.visible_online == 'true')
                    document.querySelector('#visible_online').checked = true
            }

        }
    }

    const cadastraProduto = async () =>{

        const name = document.querySelector('#name')
        const highlight = document.querySelector('#highlight')
        const visible_online = document.querySelector('#visible_online')
        const value = document.querySelector('#value')
        const image = document.querySelector('#imageFile')
        const category_id = document.querySelector('#category_id')

        if(
            name.dataset.valid == 'false'
            || value.dataset.valid == 'false'
            )
                return

        const formData = new FormData()
        formData.append('name', name.value)
        formData.append('value', value.value)
        formData.append('category_id', category_id.value)

        if(image.files[0])
            formData.append('image', image.files[0])

        formData.append('highlight', `${highlight.checked}`)
        formData.append('visible_online', `${visible_online.checked}`)
        
        setLoader(true)
        const request = await APIRequestAuthFile('product', 'POST', formData)
        setLoader(false)

        if(!request){
            return
        }

        if(request.status == 200){
            setAlert(true)
            // router.push('/gestor/produtos')
        }
    }

    const buttonAlert = () =>{
        router.push('/gestor/produtos')
    }

    return(
        <>
            
            <div>
                <div className="container mb-3">
                    <span className="fs-3">{idProduto == 0 ? 'Incluir Produto' : `Produto id: ${idProduto}`}</span>
                </div>
                <div>
                    <div className="container">
                        <form className="row">
                            <div className="col-md-6">
                                <Input type="text" id="name" required={true} label='Nome' invalidMessage="Digite o nome" />
                            </div>
                            

                            <div className="col-md-6 mt-3">
                                <div className="form-check">
                                    <label className="form-check-label">
                                        Destaque?
                                    </label>
                                    <input className="form-check-input" id="highlight" type="checkbox"/>

                                </div>

                                <div className="form-check">
                                    <label className="form-check-label">
                                        Visível online?
                                    </label>
                                    <input id="visible_online" className="form-check-input" type="checkbox"  />

                                </div>
                            </div>
                            
                            <div className="col-md-6 mt-2">
                                <ValueInput />
                            </div>

                            <div className="col-md-6 mt-2">
                                <SelectCategoria />
                            </div>

                            <CropImage referencia={image} />
                            <img src="" id="teste" />
                        
                        </form>                            
                    </div>
                </div>
            </div>

            <footer className="d-flex justify-content-around">
                <button onClick={()=>{router.back(1)}} className="btn btn-secondary">Voltar</button>
                <div>
                    {
                        idProduto != 0 ?
                            <>
                            <button className="btn btn-danger me-2">Deletar</button>
                            <button className="btn btn-success ms-2">Salvar</button>
                            </>
                        : <button onClick={cadastraProduto} className="btn btn-success">Incluir</button>
                    }
                </div>
                
            </footer>

            {loader && <Loader message={'Carregando dados'} />}
            {alert && <ModalAlert onClick={buttonAlert} message={'Produto incluido com sucesso !'} />}
        </>
    )
}

export default Produto