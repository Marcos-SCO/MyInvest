import SignInForm from "./form/SignInForm";

export const metadata = {}

export default function signIn() {
  metadata.title = `MyInvest - Login`;

  return (
    <div className='signIn'>
      <SignInForm />
    </div>
  )
}
