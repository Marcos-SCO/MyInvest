import Link from "next/link";

export default function NotFound() {
  const FRONT_END_BASE_URL = process.env.FRONT_END_BASE_URL;

  return (
    <main className="text-center">
      <h2 className="text-3xl">Ouve um problema.</h2>
      <p>Não conseguimos encontrar a página que você estava procurando.</p>
      <p>Voltar para <Link href={`${FRONT_END_BASE_URL}`}>Home</Link></p>
    </main>
  )
}
