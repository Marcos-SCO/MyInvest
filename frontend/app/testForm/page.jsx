import Login from "@/components/Login-Form/Login"
import SignUp from "@/components/SignUp-Form/SignUp"
import FormPage from "@/components/FormPage"

const Form = () =>{
    return(
        <>
            <div className="Login-Form">
                <Login/>
            </div>

            <div className="SignUp-Form">
                <SignUp/>
            </div>

            <div className="Page-Form">
                <FormPage/>
            </div>
        </>
    )
}

export default Form;
