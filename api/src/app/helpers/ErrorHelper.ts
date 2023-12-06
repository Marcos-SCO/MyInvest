import AuthError from "../Auth/exceptions/AuthError";
import CommonError from "../Auth/exceptions/CommonError";

function errorMessageHelper(res: any, error: any, options?: any) {

  const specifiedStatus = (options && options?.specifiedStatus) ?
    options?.specifiedStatus : 401;

  const generalStatus = (options && options?.generalStatus) ?
    options?.generalStatus : 404;

  const customMessage = (options && options?.customMessage) ?
    options?.customMessage : 'Not Found';

  const isSpecifiedError = error instanceof CommonError || error instanceof AuthError;

  if (isSpecifiedError) return res.status(specifiedStatus).send({ error: error.message });

  console.log(error);

  return res.status(generalStatus).json({ error: customMessage });
}

export default errorMessageHelper;