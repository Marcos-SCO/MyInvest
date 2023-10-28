'use client';

import toggleAnimation from '@/components/JS/animation.js';
import { useEffect } from 'react';

const FormPage = () => {

    useEffect(() => {

        const LogText = document.getElementById('LogLink');
        const CadText = document.getElementById('CadLink');

        LogText.addEventListener('click',()=>{ toggleAnimation(0)});
        CadText.addEventListener('click', ()=>{ toggleAnimation(1)});

        return()=>{
            LogText.removeEventListener('click', ()=>{ toggleAnimation(0)});
            CadText.removeEventListener('click', ()=>{toggleAnimation(1)});
        }
    }, []);

    return(
        <div className="FormPage slide1" id="slide1">
            <div className="PageText">
                <h3>Bem-Vindo(a) ao</h3>
                <h1>MyInvest</h1>
                    <br/>
                <h4>
                    <p>
                        Um site dedicado especialmente para facilitar sua vida!
                        <br/>
                        Monitore seus investimentos de forma simples e eficaz,<br/>receba notificações para se manter atualizado de seus ganhos e perdas!
                    </p>
                </h4>
            </div>
        </div>
    )
}

export default FormPage;