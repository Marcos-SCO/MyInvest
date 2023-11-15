import myInvestLogoItem from './itens/myInvestLogo';

import { attributesToString } from 'app/helpers/dom';

const svgArray = {
  myInvestLogo: (props) => myInvestLogoItem(props),

  googleIcon: (props) => `<svg ${props} xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" width="30" height="30"><path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/><title>Google Logo</title><desc>Google Logo</desc></svg>`,

  magnifyingGlass: (props) => `<svg ${props} width="28px" height="28px" fill="#000000" data-name="Layer 1" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path class="cls-1" d="m13.073 12.291-2.9266-2.9265a3.9711 3.9711 0 1 0-0.78284 0.78284l2.9266 2.9266zm-6.064-2.4516a2.8291 2.8291 0 1 1 2.8291-2.8296 2.8329 2.8329 0 0 1-2.8292 2.8296z"/></svg>`,
};

function DisplaySvg({ name, ...props }) {
  const svgItem = svgArray[name] || false;
  if (!svgItem) return;

  const stringAttributeProps = props ? attributesToString(props) : '';

  return (<span className='svg-container' dangerouslySetInnerHTML={{ __html: svgItem(stringAttributeProps) }} />);
}

export default DisplaySvg;