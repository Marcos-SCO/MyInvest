// Loading ui and suspense

export default function Loading() {
  return (
    <div className="loadingContainer text-center flex items-center justify-center">
      <div className="loadingBody">
        <h2 className="loadingText text-primary">Carregando...</h2>
        <p>Esperamos que não por muito tempo :)</p>
      </div>
    </div>
  )
}
