import Link from "next/link";
import { useState } from "react";

import Animation from '@/components/JS/animation.js'

const CadText = () => {

    const handleClick = () => {
        Animation();
      };

    return(
        <>
            <p className="CadText">
                Não tem uma conta? <button className="CadLink" id="CadLink" onClick={handleClick}>Crie agora</button>!
            </p>
        </>
    )
}

export default CadText;