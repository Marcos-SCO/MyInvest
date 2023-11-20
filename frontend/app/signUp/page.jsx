import SignUpForm from "./form/SignUpForm";

export const metadata = {}

export default function signIn() {
  metadata.title = `MyInvest - Cadastrar`;

  return (
    <div className='signUp'>
      <SignUpForm />
    </div>
  )
}
