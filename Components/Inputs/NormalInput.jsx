const Input = ({type, id, required, label, invalidMessage}) =>{
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

    return (
        <div className="mb-2">
            <label htmlFor={id}>{label}</label>
            <input type={type} onBlur={verifyInput} data-valid='false' className="form-control" name={id}id={id} required={required}/>
            <div className="invalid-feedback">
                {invalidMessage}
            </div>
        </div>
    )
}

export default Input