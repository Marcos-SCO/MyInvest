import GBtn from '@/components/GoogleBtnRec'

export default function AdTest(){
    return(
        <>
            <div className="AdTest">
                <div className="AdTexts">
                    <h1 className="AdH1">Simples e Prático</h1>
                    <h4>Fique alerta sobre o preço de seus ativos!</h4>
                </div>
                
                <div className='AdGBtn'>
                    <GBtn placeholder="Cadastro"/>
                </div>
            </div>
        </>
    )
}