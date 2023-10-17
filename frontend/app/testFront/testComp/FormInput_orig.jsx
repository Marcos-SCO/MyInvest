import { useState } from "react";

import { useRouter } from "next/router";

const FormInput = (props) => {
    const [inputState, setInputState] = useState({
        email: '',
        password: ''
      });
    
      const handleInput = (e) => setInputState({ ...inputState, [e.target.name]: e.target.value });
    
      const router = useRouter();
    
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        const { email, password } = inputState;
    
        const result = await signIn('credentials', {
          email,
          password,
          redirect: false
        });
    
        if (result?.error) {
          console.error(result);
          return;
        }
    
        router.replace('/admin');
      }

    return(
        <div className="formInput">
            <form className="InForm">
                <label className="lblForm">{props.placeholder}</label>
                <input placeholder={props.placeholder} className="InputForm" onChange={e=>props.setInputState(e.target.value)}/>
            </form>
        </div>
    )
}

export default FormInput;