import Link from "next/link";

export default function NotFound() {
  const FRONT_END_BASE_URL = process.env.FRONT_END_BASE_URL;

  return (
    <main className="gradient">
      <div className="main-container notFound text-center">
        <div class="text-white min-h-screen flex items-center">
          <div class="container mx-auto py-5 flex flex-wrap items-center">
            <div class="imageContainer w-full md:w-5/12 text-center p-4">
              <img src={`${FRONT_END_BASE_URL}/img/tioSam.webp`} alt="Not Found" />
            </div>
            <div class="w-full md:w-7/12 text-center md:text-left p-4">
              <div class="text-9xl font-medium">404</div>
              <div class="text-xl md:text-3xl font-medium mb-4">
                Oops. Essa página não existe "My FriendO"!
              </div>
              <div class="text-lg mb-8">
                Você deve ter digitado o endereço errado ou simplesmente a página foi movida para outro caminho.
              </div>
              <a href={`${FRONT_END_BASE_URL}/`}><p className="buttonTransition text-5xl font-medium">Voltar para Home</p></a>
            </div>
          </div>
        </div>
      </div>

    </main>
  )
}
