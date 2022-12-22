const ValueInput = () =>{
    function verifyInput(e){
        
        if(e.target.value === ''){
            e.target.classList.remove('is-valid')
            e.target.classList.add('is-invalid')
            e.target.dataset.valid = 'false'
        }
        else{
            e.target.classList.add('is-valid')
            e.target.classList.remove('is-invalid')
            e.target.dataset.valid = 'true'
        }
    }

    function onlyNumbers(evt){
        evt.target.value = evt.target.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
    }


    return(
        <div className="mb-2">
            <label htmlFor='value'>Valor</label>

            <div className="input-group mb-3">
                <span className="input-group-text">R$</span>

                    <input type='text' onBlur={verifyInput} onInput={onlyNumbers} data-valid='false' className="form-control" name='value' id='value' required={true}/>
                <div className="invalid-feedback">
                    Digite o valor
                </div>
            </div>

        </div>
    )
}

export default ValueInput