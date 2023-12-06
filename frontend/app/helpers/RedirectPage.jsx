import { useEffect } from 'react';
import { useRouter } from 'next/router';


export default function RedirectPage() {
  const router = useRouter();
  console.log('red');
  console.log('red', redirectTo);

  router.push(redirectTo);
  // useEffect(() => {
  //   return router.push(redirectTo);
  // }, [redirectTo]);

  return (<div>ola</div>);
}

