import APIRequestAuth from "../../Fetch/APIRequestAuth"
import { useState } from "react"

const OrderInput = ({order}) =>{
    const [invalidMessage, setInvalidMessage] = useState('')

    const verifyOrder = async (e) => {
        const input = e.target
        if(order == input.value)
            return

        input.classList.remove('is-valid')
        input.dataset.valid = 'false'
        
        const request = await APIRequestAuth('category/verify_order', 'POST',{
            'order': input.value
        })

        if(!request)
            return

        if(request.status != 200){

            return
        }

        if(request.body.isValid == false){
            setInvalidMessage('Essa ordem já está cadastra em outra categoria.')
            input.classList.add('is-invalid')
            return
        }

        input.dataset.valid = 'true'
        input.classList.add('is-valid')
        input.classList.remove('is-invalid')


        
    }
    function onlyNumbers(evt){
        evt.target.value = evt.target.value.replace(/[^0-9]/g, '').replace(/(\..*)\./g, '$1');
    }
    return(
        <div className="mb-2">
        <label htmlFor='order'>Ordem de exibição</label>
        <input type='text' onBlur={verifyOrder} onInput={onlyNumbers} data-valid='false' className="form-control" name='order' id='order' required={true}/>

        <div className="invalid-feedback">
            {invalidMessage}
        </div>
    </div>
    )
}

export default OrderInput