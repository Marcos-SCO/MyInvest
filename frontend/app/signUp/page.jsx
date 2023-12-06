import SignUpForm from "./form/SignUpForm";

import ChangePageAttributes from "../../app/hooks/ChangePageAttributes";

export const metadata = {}

export default function signIn() {
  metadata.title = `MyInvest - Cadastrar`;

  <ChangePageAttributes pageName={'signUp'} />

  return (
    <div className='signUp'>
      <SignUpForm />
    </div>
  )
}
