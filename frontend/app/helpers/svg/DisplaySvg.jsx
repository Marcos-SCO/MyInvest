import myInvestLogoItem from './itens/myInvestLogo';

import { attributesToString } from 'app/helpers/dom';

const svgArray = {
  myInvestLogo: (props) => myInvestLogoItem(props),

  googleIcon: (props) => `<svg ${props} xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" width="30" height="30"><path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/><title>Google Logo</title><desc>Google Logo</desc></svg>`,

  magnifyingGlass: (props) => `<svg ${props} width="28px" height="28px" fill="#000000" data-name="Layer 1" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path class="cls-1" d="m13.073 12.291-2.9266-2.9265a3.9711 3.9711 0 1 0-0.78284 0.78284l2.9266 2.9266zm-6.064-2.4516a2.8291 2.8291 0 1 1 2.8291-2.8296 2.8329 2.8329 0 0 1-2.8292 2.8296z"/></svg>`,

  userAvatar: (props) => `<svg ${props} width="28px" height="28px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 21C5 17.134 8.13401 14 12 14C15.866 14 19 17.134 19 21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,

  plusSign: (props) => `<svg ${props} width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 12H18M12 6V18" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,

  bell: (props) => `<svg ${props} width="32" height="32" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m9.002 17h-3.3956c-1.2584 0-1.8876 0-2.02-0.0977-0.14873-0.1098-0.18507-0.1746-0.20118-0.3587-0.01433-0.1639 0.37131-0.795 1.1426-2.057 0.79635-1.3031 1.4726-3.2004 1.4726-5.8866 0-1.4852 0.63214-2.9096 1.7574-3.9598 1.1252-1.0502 2.6513-1.6402 4.2426-1.6402s3.1174 0.59 4.2426 1.6402c1.1253 1.0502 1.7574 2.4746 1.7574 3.9598 0 2.6862 0.6762 4.5835 1.4726 5.8866 0.7712 1.262 1.1569 1.8931 1.1426 2.057-0.0161 0.1841-0.0525 0.2489-0.2012 0.3587-0.1324 0.0977-0.7616 0.0977-2.02 0.0977h-3.394m-5.9984 0-0.00164 1c0 1.6569 1.3432 3 3 3 1.6569 0 3-1.3431 3-3v-1m-5.9984 0h5.9984" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/></svg>`,

  check: (props) => `<svg ${props} width="32" height="32" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M4 12.6111L8.92308 17.5L20 6.5" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/></svg>`,

  checkCircle: (props) => `<svg ${props} width="32" height="32" fill="none" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M3 10a7 7 0 019.307-6.611 1 1 0 00.658-1.889 9 9 0 105.98 7.501 1 1 0 00-1.988.22A7 7 0 113 10zm14.75-5.338a1 1 0 00-1.5-1.324l-6.435 7.28-3.183-2.593a1 1 0 00-1.264 1.55l3.929 3.2a1 1 0 001.38-.113l7.072-8z" fill="#000" fill-rule="evenodd"/></svg>`,

  trash: (props) => `<svg ${props} width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 12L14 16M14 12L10 16M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M18 6V16.2C18 17.8802 18 18.7202 17.673 19.362C17.3854 19.9265 16.9265 20.3854 16.362 20.673C15.7202 21 14.8802 21 13.2 21H10.8C9.11984 21 8.27976 21 7.63803 20.673C7.07354 20.3854 6.6146 19.9265 6.32698 19.362C6 18.7202 6 17.8802 6 16.2V6" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,

  arrowNext: (props) => `<svg ${props} width="32" height="32" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M6.1584 3.13508C6.35985 2.94621 6.67627 2.95642 6.86514 3.15788L10.6151 7.15788C10.7954 7.3502 10.7954 7.64949 10.6151 7.84182L6.86514 11.8418C6.67627 12.0433 6.35985 12.0535 6.1584 11.8646C5.95694 11.6757 5.94673 11.3593 6.1356 11.1579L9.565 7.49985L6.1356 3.84182C5.94673 3.64036 5.95694 3.32394 6.1584 3.13508Z" fill="#000000" style="font-weight:500;" /></svg>`,

  doubleArrowNext: (props) => `<svg ${props} width="32px" height="32px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.5 5L11.7929 11.2929C12.1834 11.6834 12.1834 12.3166 11.7929 12.7071L5.5 19" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M13.5 5L19.7929 11.2929C20.1834 11.6834 20.1834 12.3166 19.7929 12.7071L13.5 19" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,

};

function DisplaySvg({ name, ...props }) {
  const svgItem = svgArray[name] || false;
  if (!svgItem) return;

  const stringAttributeProps = props ? attributesToString(props) : '';

  return (<span className='svg-container' dangerouslySetInnerHTML={{ __html: svgItem(stringAttributeProps) }} />);
}

export default DisplaySvg;