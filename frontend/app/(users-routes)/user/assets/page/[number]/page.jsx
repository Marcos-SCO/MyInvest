import UserAssets from "../../UserAssets";

export default async function Page(context) {
  const { params } = context;
  const pageNumber = params?.number || '1';

  return (
    <>
      <main className='main-container'>
        <UserAssets page={pageNumber} />
      </main>
    </>
  )
}