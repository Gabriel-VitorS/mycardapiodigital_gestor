import { useState } from "react"
import APIRequest from "../../Fetch/APIRequest"
const EmailInput = () =>{
    const [invalidMessage, setInvalidMessage] = useState('Digite um E-mail.')

    async function verifyEmail(e){
        const input = e.target
        const inputValue = e.target.value

        input.classList.remove('is-valid')
        input.dataset.valid = 'false'
        
        if(inputValue === ''){
            setInvalidMessage('Digite um E-mail.')
            input.classList.add('is-invalid')
            return
        }

        if(!inputValue.includes('@')){
            setInvalidMessage('Digite um E-mail valido.')
            input.classList.add('is-invalid')
            return
        }

        const request = await APIRequest('verify_email', 'POST', {email:inputValue})

        if(!request)
            return
        
        if(request.body.isValid == false){
            setInvalidMessage('E-mail já cadastrado.')
            input.classList.add('is-invalid')
            return
        }

        input.dataset.valid = 'true'
        input.classList.add('is-valid')
        input.classList.remove('is-invalid')

    }

    return(
        <div className="mb-2">
            <label htmlFor="email">E-mail:</label>

            <input type="email" onBlur={verifyEmail} data-valid='false' autoComplete='false' className="form-control" name="email" id="email" required />

            <div className="invalid-feedback">
                {invalidMessage}
            </div>
        </div>
    )
}

export default EmailInput