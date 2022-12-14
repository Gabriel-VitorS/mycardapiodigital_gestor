import { cpf, cnpj } from "cpf-cnpj-validator"
import { useState } from "react"

const CpfCnpjInput = () =>{
    const [maxLenght, setMaxLenght] = useState(11)
    const [invalidMessage, setInvalidMessage] = useState('Digite um CPF.')

    function changeCpfCnpj(e){
        e.target.id === 'cnpj' ? setMaxLenght(14) : setMaxLenght(11)
        document.querySelector('#cpf_cpnj').value = ''
        
    }

    function checkCpfCnpj(e){
        e.target.dataset.valid = 'false'
        if(maxLenght === 11){

            if(e.target.value === ''){
                setInvalidMessage('Digite um CPF.')
                e.target.classList.add('is-invalid')
                return
            }

            if( !cpf.isValid(e.target.value) ){
                setInvalidMessage('CPF invalido.')
                e.target.classList.add('is-invalid')
                return
            }

            e.target.classList.remove('is-invalid')
            e.target.classList.add('is-valid')
            e.target.dataset.valid = 'true'

        }else{

            if(e.target.value === ''){
                setInvalidMessage('Digite um CNPJ.')
                e.target.classList.add('is-invalid')
                return
            }

            if( !cnpj.isValid(e.target.value) ){
                setInvalidMessage('CNPJ invalido.')
                e.target.classList.add('is-invalid')
                return
            }

            e.target.classList.remove('is-invalid')
            e.target.classList.add('is-valid')
            e.target.dataset.valid = 'true'
        }
    }

    function onlyNumbers(evt){
        evt.target.value = evt.target.value.replace(/[^0-9]/g, '').replace(/(\..*)\./g, '$1');
    }

    return(
        <div className="mb-2">
            <div className="row m-0">
                <div className="form-check col-md-1">
                    <input type="radio" onClick={changeCpfCnpj} name="cpf_cnpj" className="form-check-input" id="cpf" defaultChecked />
                    <label htmlFor="cpf" className="form-check-label">CPF</label>
                </div>
                <div className="form-check col-md-1">
                    <input type="radio" onClick={changeCpfCnpj} name="cpf_cnpj" className="form-check-input" id="cnpj" />
                    <label htmlFor="cpf" className="form-check-label">CNPJ</label>
                </div>
            </div>

            <input type="text" onBlur={checkCpfCnpj} data-valid='false' onInput={onlyNumbers} placeholder="Digite o CPF ou CNPJ" maxLength={maxLenght} required={true} className="form-control" name="cpf_cpnj" id="cpf_cpnj" />
            <div className="invalid-feedback">
                {invalidMessage}
            </div>
        </div>
    )
    
}

export default CpfCnpjInput