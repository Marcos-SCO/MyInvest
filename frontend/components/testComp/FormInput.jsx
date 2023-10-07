const FormInput = (props) => {
    return(
        <div className="formInput">
            <form className="InForm">
                <label className="lblForm">{props.placeholder}</label>
                <input placeholder={props.placeholder} className="InputForm"/>
            </form>
        </div>
    )
}

export default FormInput;