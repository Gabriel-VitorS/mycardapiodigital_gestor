import APIRequestAuth from "../../../Fetch/APIRequestAuth"
import { useEffect, useState } from "react"
import { BsSearch, BsPlusLg, BsX } from "react-icons/bs"
import { useRouter } from "next/router"

import Pagination from "../../../Components/Pagination/Pagination"
const Produto = () =>{
    const router = useRouter()
    const [produtos, setProdutos] = useState()
    const [params, setParams] = useState('') //parametros de filtro

    const [pagination, setPagination] = useState()

    const [loader, setLoader] = useState(false)

    useEffect(()=>{
        getProduct(1,params)
    }, [params])

    async function getProduct(page, filter) {
        await APIRequestAuth(`product?page=${page}&${filter}`, 'GET')
        .then(data => {
            console.log(data)
            setProdutos(data.body.data.data)
            setLoader(false)
            setPagination(data.body.data.meta)
            
        }).catch((err)=> {setLoader(false); console.log(err)})
    }

    async function filtrarProduto() {
        const selectValue = document.querySelector('#filtro').value
        let inputFilter = document.querySelector('#filterInput').value

        if(selectValue === '' || inputFilter === '')
            return

        if(selectValue === 'highlight'){
            if(inputFilter.toLocaleLowerCase() === 's' || inputFilter.toLocaleLowerCase() === 'sim')
                inputFilter = 'true'
            else
                inputFilter = 'false'
        }

        if(selectValue === 'visible_online'){
            if(inputFilter.toLocaleLowerCase() === 's' || inputFilter.toLocaleLowerCase() === 'sim')
                inputFilter = 'true'
            else
                inputFilter = 'false'
        }

        setParams(`${selectValue}=${inputFilter}`)

    }

    function changePage(e){
        let pagina = e.target.innerText

        if(Number(pagina)){
            getProduct( Number(pagina), params )
        }else if(pagina === '»'){
            getProduct( Number(document.querySelector('.page-link.active').innerHTML) + 1, params )
        }else{
            getProduct( Number(document.querySelector('.page-link.active').innerHTML) - 1, params )
        }
    }

    function clearFilter(){
        document.querySelector('#filterInput').value = ''
        setParams('')
    }

    return (
        <>

            <div>
                
                <div className="row mb-3">
                    <div className="col-lg-2">

                        <select className="form-select form-select"  id="filtro">
                            <option value="">Selecione um filtro</option>
                            <option value="name">Nome</option>
                            <option value="highlight">Destaque</option>
                            <option value="visible_online">Visível online</option>
                            <option value="category_id">Id categoria</option>
                        </select>

                    </div>

                    <div className="col-lg-2 ">
                        <div className="d-flex">
                            <input type="text" id="filterInput" className="form-control" />
                            {
                               params.length > 0 ? <BsX className="ms-1 mt-1 text-danger" onClick={clearFilter} size={30}></BsX> : ''
                            }
                        </div>
                        
                    </div>
 

                    <div className="col-md-3">
                        
                        <button onClick={filtrarProduto} className="btn btn-warning me-2"><BsSearch className="pb-1 pe-1" /> Filtrar</button>
                        <button onClick={()=>{}} className="btn btn-primary"> <BsPlusLg className="pb-1 pe-1" /> Incluir</button>
                    </div>

                    <div className="col-md-2">
                        
                    </div>

                </div>

                <div style={{overflow: 'auto'}}>
                    <table className="table table-bordered table-hover">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Nome</th>
                                <th>Valor</th>
                                <th>Destaque</th>
                                <th>Visível online</th>
                                <th>Id categoria</th>
                            </tr>
                        </thead>

                        <tbody>
                            
                            {produtos && produtos.map((value, index) => (
                                <tr key={value.id}>
                                    <td scope="row" >{value.id}</td>
                                    <td>{value.name}</td>
                                    <td>{value.value.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</td>
                                    <td>{value.highlight === 'true' ? 'Sim' : 'Não'}</td>
                                    <td>{value.visible_online === 'true' ? 'Sim' : 'Não'}</td>
                                    <td>{value.category_id}</td>
                                </tr>

                                )
                            )}
                            
                        </tbody>
                    </table>
                </div>
            </div>

            
            {
                pagination && 
                <Pagination
                last_page={pagination.last_page}
                current_page={pagination.current_page}
                previous_page_url={pagination.previous_page_url}
                next_page_url={pagination.next_page_url}
                page={changePage}
                />
            }
                
        </>
    )
}

export default Produto