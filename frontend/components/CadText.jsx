import Link from "next/link";

const CadText = () => {
    return(
        <>
            <p className="CadText">
                Não tem uma conta? <Link href="/testSignupV2" className="CadLink">Crie agora</Link>!
            </p>
        </>
    )
}

export default CadText;