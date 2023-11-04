
import config from "@/config";

const { API_BASE_URL } = config;

// const myInvestLogo = `${API_BASE_URL}/img/myInvest.jpg`;
const myInvestLogo = `https://picsum.photos/150/100`;

export async function AssetEmailTemplate(emailTemplateVariables: any) {

  const { assetTicker, definedAlertPrice, currentPrice, lastOpenPrice, lastClosedPrice } = emailTemplateVariables;

  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
  <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
  <html lang="pt-br">
  
    <head>My Invest - alerta de ativos</head>

    <div id="__react-email-preview" style="display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;max-width:0">
      My Invest - alerta de ativos
    </div>
  
    <body style="background-color:#f3f3f5;font-family:HelveticaNeue,Helvetica,Arial,sans-serif">

      <table align="center" role="presentation" cellSpacing="0" cellPadding="0" border="0" width="100%" style="max-width:680px;width:100%;margin:0 auto;background-color:#ffffff">

        <tr style="width:100%">
          <td>

            <table style="display:flex;background:#f3f3f5;padding:20px 30px" align="center" border="0" cellPadding="0" cellSpacing="0" role="presentation" width="100%">
              <tbody>
                <tr>
                  <td><img src="${myInvestLogo}" width="146" style="display:block;outline:none;border:none;text-decoration:none" /></td>
                </tr>
              </tbody>
            </table>

            <table width="100%" style="border-radius:5px 5px 0 0;display:flex;flex-direciont:column;background-color:#275fa9" align="center" role="presentation" cellSpacing="0" cellPadding="0" border="0">

              <tbody style="width:100%">

                <tr style="width:100%">
                  <td style="padding:20px 30px 15px">
                    
                    <h1 style="color:#fff;font-size:27px;font-weight:bold;line-height:27px">
                      Seu ativo chegou no preço definido!
                    </h1>

                    <p style="font-size:17px;line-height:24px;margin:16px 0;color:#fff">
                      Use sua estrategia e alcance novos patamares no portfolio de investimentos!
                    </p>

                  </td>

                  <td style="padding:30px 10px">
                    <img src="https://react-email-demo-ijnnx5hul-resend.vercel.app/static/stack-overflow-header.png" width="340" style="display:block;outline:none;border:none;text-decoration:none" />
                  </td>
                </tr>

              </tbody>

            </table>

            <table style="padding:30px 30px 40px 30px" align="center" border="0" cellPadding="0" cellSpacing="0" role="presentation" width="100%">
              <tbody>
                <tr>
                  <td>

                    <h2 style="margin:0 0 15px;font-weight:bold;font-size:21px;line-height:21px;color:#0c0d0e">
                      Ativo ${assetTicker}
                    </h2>

                    <ul>
                      <li>
                        <p style="font-size:15px;line-height:21px;margin:16px 0;color:#3c3f44">
                          Lembrete definido no preço: ${definedAlertPrice}
                        </p>
                      </li>

                      <li>
                        <p style="font-size:15px;line-height:21px;margin:16px 0;color:#3c3f44">
                          Preço: atual: ${currentPrice}
                        </p>
                      </li>
                      
                      <li>
                        <p style="font-size:15px;line-height:21px;margin:16px 0;color:#3c3f44">
                          Ultimo abertura: ${lastOpenPrice}
                        </p>
                      </li>

                      <li>
                        <p style="font-size:15px;line-height:21px;margin:16px 0;color:#3c3f44">
                          Ultimo fechamento: ${lastClosedPrice}
                        </p>
                      </li>

                    </ul>
                    
                    <hr style="width:100%;border:none;border-top:1px solid #eaeaea;margin:30px 0" />
                    
                    <h2 style="margin:0 0 15px;font-weight:bold;font-size:21px;line-height:21px;color:#0c0d0e">
                      Use the search bar at the top of the page to find what you need
                    </h2>

                    <p style="font-size:15px;line-height:21px;margin:16px 0;color:#3c3f44">Here are a few simple search tips to get you started:</p>

                    <ul>
                      <li>
                        <p style="font-size:15px;line-height:21px;margin:16px 0;color:#3c3f44">To find a specific phrase, enter it in quotes: &quot;local storage&quot;</p>
                      </li>
                      
                      <li>
                        <p style="font-size:15px;line-height:21px;margin:16px 0;color:#3c3f44">To search within specific tag(s), enter them in square brackets: [javascript]</p>
                      </li>

                      <li>
                        <p style="font-size:15px;line-height:21px;margin:16px 0;color:#3c3f44">Combine them to get even more precise results - [javascript] &quot;local storage&quot; searches for the phrase “local storage” in questions that have the [javascript] tag</p>
                      </li>

                    </ul>

                    <p style="font-size:15px;line-height:21px;margin:16px 0;color:#3c3f44">
                      The more information you can put in the search bar, the more likely you will be to either find the answer you need or feel confident that no one else has asked the question before.
                    </p>
                    
                    <hr style="width:100%;border:none;border-top:1px solid #eaeaea;margin:30px 0" />
                    
                    <h2 style="margin:0 0 15px;font-weight:bold;font-size:21px;line-height:21px;color:#0c0d0e">
                      Take a break and read about the worst coder in the world
                    </h2>

                    <table style="margin-top:24px;display:block" align="center" border="0" cellPadding="0" cellSpacing="0" role="presentation" width="100%">

                      <tbody>
                        <tr>

                          <td>
                            <a target="_blank" style="color:#fff;text-decoration:none;background-color:#0095ff;border:1px solid #0077cc;font-size:17px;line-height:17px;padding:13px 17px;border-radius:4px;max-width:120px;display:block;" 
                            href="${API_BASE_URL}">
                              I need a break...
                            </a>
                          </td>

                        </tr>
                      </tbody>

                    </table>
                  </td>
                </tr>

              </tbody>
            </table>

          </td>

        </tr>
      </table>

      <table style="width:680px;margin:32px auto 0 auto;padding:0 30px" align="center" border="0" cellPadding="0" cellSpacing="0" role="presentation" width="100%">

        <tbody>
          <tr>
            <td>

              <p style="font-size:12px;line-height:15px;margin:0;color:#9199a1">Você recebeu este e-mail através da função de monitoramento de ativos.</p>
              
              <hr style="width:100%;border:none;border-top:1px solid #eaeaea;margin:30px 0;border-color:#d6d8db" />
              
              <img src="${myInvestLogo}" width="111" style="display:block;outline:none;border:none;text-decoration:none" />

              <p style="font-size:12px;line-height:15px;margin:4px 0;color:#9199a1"><strong>MyInvest</strong>, sua carteira de investimentos sempre atualizada</p>

              <p style="font-size:11px;line-height:11px;margin:0 0 32px 0;border-radius:1px;border:1px solid #d6d9dc;padding:4px 6px 3px 6px;font-family:Consolas,monospace;color:#e06c77;max-width:min-content">&lt;3</p>

            </td>
          </tr>

        </tbody>

      </table>

    </body>
  
  </html>`;
}