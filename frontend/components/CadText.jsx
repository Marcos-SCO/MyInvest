import Link from "next/link";
import { useState } from "react";

const CadText = ({Cad}) => {

    return(
        <>
            <p className="CadText">
                Não tem uma conta? <button className="CadLink">Crie agora</button>!
            </p>
        </>
    )
}

export default CadText;