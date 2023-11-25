import React from 'react';

import OpenModalContainer from '../../../modal/OpenModalHandler';
import DisplaySvg from '../../../../app/helpers/svg/DisplaySvg';

export default function OpenPriceAlertModal({ userId = false }) {
  return (
    <OpenModalContainer className="priceAlertModalButton myButtonSvg" modalId={userId ? `priceAlert` : 'authContainer'}>
      <DisplaySvg name={'bell'} width="18" height="18" /> Definir Alerta de preço
    </OpenModalContainer>
  )
}
