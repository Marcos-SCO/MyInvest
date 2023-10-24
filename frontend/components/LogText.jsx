import Link from "next/link";

const CadText = () => {
    return(
        <>
            <p className="CadText">
                Já possuí uma conta? <Link href="/testLoginV2" className="CadLink">Acesse agora</Link>!
            </p>
        </>
    )
}

export default CadText;