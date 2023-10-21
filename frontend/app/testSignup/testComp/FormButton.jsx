'use client'

const FormButton = ({ props, onClick }) => {
    return (
        <div className="DivBtn">
            <button type="button" onClick={onClick} className="FButton">
                <h3 className="BtnText1">Sign Up</h3>
            </button>
        </div>
    )
  };
  
  export default FormButton;