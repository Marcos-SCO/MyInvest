import UserAlerts from "../../UserAlerts";

export default async function Page(context) {
  const { params } = context;
  const pageNumber = params?.number || '1';

  return (
    <>
      <UserAlerts page={pageNumber} />
    </>
  )
}