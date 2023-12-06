import SignInForm from "./form/SignInForm";

import ChangePageAttributes from "../../app/hooks/ChangePageAttributes";

export const metadata = {}

export default function signIn() {
  metadata.title = `MyInvest - Login`;

  <ChangePageAttributes pageName={'signIn'} />

  return (
    <div className='signIn'>
      <SignInForm />
    </div>
  )
}
