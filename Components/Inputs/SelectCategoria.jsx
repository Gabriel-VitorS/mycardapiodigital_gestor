import { useEffect, useState } from "react"
import APIRequestAuth from "../../Fetch/APIRequestAuth"
const SelectCategoria = () =>{
    const [categorias, setCategorias] = useState()

    useEffect(()=>{
        APIRequestAuth('category?limit=300', 'GET')
        .then((data) =>{
            if(data.status !== 200)
                return

                setCategorias(data.body.data.data)

        })
    }, [])

    return (
        <>
        <label>
            Selecione uma categoria
        </label>
        <select className="form-select" id="category_id" name="category_id">
            {
                categorias && categorias.map((value) => (
                    <option key={value.id} value={value.id}>{value.name}</option>
                ))
            }
        </select>
        </>
    )
}

export default SelectCategoria