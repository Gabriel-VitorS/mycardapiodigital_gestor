import APIRequestAuth from "../../../Fetch/APIRequestAuth"
import { useEffect, useState } from "react"
import { BsSearch, BsPlusLg, BsX } from "react-icons/bs"
import { useRouter } from "next/router"

import Pagination from "../../../Components/Pagination/Pagination"
import Loader from "../../../Components/Loader/Loader"

const Categorias = () =>{
    const router = useRouter()
    const [categorias, setCategorias] = useState()
    const [params, setParams] = useState('')
    const [pagination, setPagination] = useState()

    const [loader, setLoader] = useState(false)
    useEffect(()=>{
        getCategorias(1,params)
    }, [params])

    async function getCategorias(page, filter) {
        setLoader(true)
        await APIRequestAuth(`category?page=${page}&${filter}`, 'GET')
        .then(data => {
            setCategorias(data.body.data.data)
            setLoader(false)
            setPagination(data.body.data.meta)
            
        }).catch((err)=> {setLoader(false); console.log(err)})
    }

    async function filtrarCategoria() {
        const selectValue = document.querySelector('#filtro').value
        const inputFilter = document.querySelector('#filterInput').value

        if(selectValue === '' || inputFilter === '')
            return

        setParams(`${selectValue}=${inputFilter}`)

    }

    function clearFilter(){
        document.querySelector('#filterInput').value = ''
        setParams('')
    }

    function pushToidCategoria(e){
        const id = e.target.dataset.id

        router.push({
            pathname: '/gestor/categorias/[idCategoria]',
            query: {idCategoria: id}
        })

        
    }

    function changePage(e){
        let pagina = e.target.innerText

        if(Number(pagina)){
            getCategorias( Number(pagina), params )
        }else if(pagina === '»'){
            getCategorias( Number(document.querySelector('.page-link.active').innerHTML) + 1, params )
        }else{
            getCategorias( Number(document.querySelector('.page-link.active').innerHTML) - 1, params )
        }
    }



    return(
        <>
            <div>
                <div className="row mb-3">

                    <div className="col-lg-2">

                        <select className="form-select form-select"  id="filtro">
                            <option value="">Selecione um filtro</option>
                            <option value="name">Nome</option>
                        </select>

                    </div>

                    <div className="col-lg-2 ">
                        <div className="d-flex">
                            <input type="text" id="filterInput" className="form-control" />
                            {
                               params.length > 0 ? <BsX style={{cursor: 'pointer'}} title="Remover filtro" className="ms-1 mt-1 text-danger" onClick={clearFilter} size={30}></BsX> : ''
                            }
                        </div>
                        
                    </div>

                    <div className="col-md-5">
                        
                        <button onClick={filtrarCategoria} className="btn btn-warning me-2"><BsSearch className="pb-1 pe-1" /> Filtrar</button>
                        <button onClick={pushToidCategoria} data-id='0' className="btn btn-primary"> <BsPlusLg className="pb-1 pe-1" /> Incluir</button>
                    </div>
 
                </div>

                <div style={{overflow: 'auto'}}>
                    <table className="table table-bordered table-hover">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Nome</th>
                                <th>Ordem</th>
                            </tr>
                        </thead>

                        <tbody>
                            
                            {categorias && categorias.map((value, index) => (
                                <tr style={{cursor: 'pointer'}} key={value.id} onClick={pushToidCategoria}>
                                    <td data-id={value.id} scope="row" >{value.id}</td>
                                    <td data-id={value.id}> {value.name}</td>
                                    <td data-id={value.id}> {value.order}</td>
                                </tr>

                                )
                            )}
                            
                        </tbody>
                    </table>
                </div>

            </div>

            {loader && <Loader message={'Carregando'} />}

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

export default Categorias