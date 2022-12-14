import { useState } from "react"

const PasswordInput = () =>{
    const [invalidMessage, setInvalidMessage] = useState('Digite a senha.')
    const [invalidMessageConfirmation, setInvalidMessageConfirmation] = useState('Digite a confirmação de senha.')

    function verifyPassword(){
        const password = document.querySelector('#password')

        password.dataset.valid = 'false'
        password.classList.remove('is-valid')

        if(password.value === ''){
            password.classList.add('is-invalid')
            return
        }
        
        password.dataset.valid = 'true'
        password.classList.remove('is-invalid')
        password.classList.add('is-valid')
        
    }

    function verifyConfirmPassword(){
        const confirmPassword =  document.querySelector('#password_confirmation')
        const password = document.querySelector('#password')

        confirmPassword.dataset.valid = 'false'
        confirmPassword.classList.remove('is-valid')

        if(confirmPassword.value === ''){
            confirmPassword.classList.add('is-invalid')
            setInvalidMessageConfirmation('Digite a confirmação de senha.')
            return
        }

        if(confirmPassword.value !== password.value){
            confirmPassword.classList.add('is-invalid')
            setInvalidMessageConfirmation('A senha não coincide.')
            return
        }

        confirmPassword.dataset.valid = 'true'
        confirmPassword.classList.remove('is-invalid')
        confirmPassword.classList.add('is-valid')
    }

    return(
        <>
            <div className="mb-2">
                <label htmlFor="password">Senha:</label>
                <input type="password" onBlur={verifyPassword} className="form-control" data-valid='false' name="password" id="password" required/>
                <div className="invalid-feedback">
                    {invalidMessage}
                </div>
            </div>

            <div className="mb-2">
                <label htmlFor="password_confirmation">Confirmar senha:</label>
                <input type="password" onInput={verifyConfirmPassword} onBlur={verifyConfirmPassword} data-valid='false' className="form-control" name="password_confirmation" id="password_confirmation" required />
                <div className="invalid-feedback">
                    {invalidMessageConfirmation}
                </div>
            </div>

        </>
    )
}

export default PasswordInput