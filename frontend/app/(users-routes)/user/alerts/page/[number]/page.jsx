import UserAlerts from "../../UserAlerts";

export default async function Page(context) {
  const { params } = context;
  const pageNumber = params?.number || '1';

  return (
    <>
      <main className='main-container'>
        <UserAlerts page={pageNumber} />
      </main>
    </>
  )
}