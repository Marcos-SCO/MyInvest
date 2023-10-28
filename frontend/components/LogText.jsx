import Link from "next/link";
import Animation from '@/components/JS/animation.js'

const LogText = () => {

    const handleClick = () => {    
        Animation();
      };
    return(
        <>
            <p className="CadText">
                Já possuí uma conta? <button className='CadLink' id="LogLink" onClick={handleClick}>Acesse agora</button>!
            </p>
        </>
    )
}

export default LogText;