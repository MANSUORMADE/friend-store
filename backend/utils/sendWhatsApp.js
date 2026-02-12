import fetch from "node-fetch";
import axios from 'axios'

export const sendTelegramApp = async (message)=> {
  try {
    const res =await axios.post(`https://api.telegram.org/bot${process.env.PUT_YOUR_TOKEN}/sendMessage`,{chat_id: process.env.CHAT_ID,text:message})
    console.log(res.data)
  } catch(err) {
    console.log(err)
  }
}
export const sendWhatsApp = async (phone, otp) =>{
const res = await axios.post(`https://graph.facebook.com/v24.0/${process.env.WHATSAPP_PHONE_ID}/messages`,
      {
            messaging_product: "whatsapp",
            to: phone,
            type: "text",
            text:{
              body: otp
            }
          },
          {
            headers: {
              Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
              "Content-Type": "application/json"
            }
          }
        );
      console.log(res.data)
}
export const sendWhatsAppCode = async (phone, otp) =>{
  try{
    const res = await axios.post(`https://graph.facebook.com/v24.0/${process.env.WHATSAPP_PHONE_ID}/messages`,
          {
                messaging_product: "whatsapp",
                to: "249927353157",
                type: "template",
                template: {
                  name: "code",
                  language: { code: "ar" },
                  components: [
                    {
                      type: "header",
                      parameters: [
                        {
                          type: "text",
                          text: "name"
                        }
                      ]
                    },
                    {
                      type: "body",
                      parameters: [
                        {
                          type: "text",
                          text: String(otp)
                        }
                      ]
                    },
                     {
                      type: "button",
                      sub_type: "copy_code",
                      index: "0",
                      parameters: [
                        {
                          type: "coupon_code",
                          coupon_code: String(otp)
                        }
                      ]
                    }
                  ]
                }
              },
              {
                headers: {
                  Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
                  "Content-Type": "application/json"
                }
              }
            );
          console.log(res.data)
          console.log(phone,otp)
        } catch(err) {
    console.log(err.response.data)

  }
}
  // components: [
  //                   {
  //                     type: "header",
  //                     parameters: [
  //                       {
  //                         type: "text",
  //                         text: "name"
  //                       }
  //                     ]
  //                   },
  //                   {
  //                     type: "body",
  //                     parameters: [
  //                       {
  //                         type: "text",
  //                         text: String(otp)
  //                       }
  //                     ]
  //                   },
  //                    {
  //                     type: "button",
  //                     sub_type: "copy_code",
  //                     index: "0",
  //                     parameters: [
  //                       {
  //                         type: "coupon_code",
  //                         coupon_code: String(otp)
  //                       }
  //                     ]
  //                   }
  //                 ]

{/* <script> */}
  {/* window.fbAsyncInit = function() {
    FB.init({
      appId      : '{your-app-id}',
      cookie     : true,
      xfbml      : true,
      version    : '{api-version}'
    });
      
    FB.AppEvents.logPageView();   
      
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "https://connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));
</script> */}

// {
//     status: 'connected',
//     authResponse: {
//         accessToken: '...',
//         expiresIn:'...',
//         signedRequest:'...',
//         userID:'...'
//     }
// }

{/* <fb:login-button 
  config_id="{config_id}"
  onlogin="checkLoginState();">
</fb:login-button>

function checkLoginState() {
  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
} */}