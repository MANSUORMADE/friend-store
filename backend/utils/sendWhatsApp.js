import fetch from "node-fetch";
import axios from 'axios'

export const sendTelegramApp = async (message)=> {
  try {
    const res =await axios.post(`https://api.telegram.org/bot${process.env.PUT_YOUR_TOKEN}/sendMessage`,{chat_id: process.env.CHAT_ID,text:message})
    console.log(res)
  } catch(err) {
    console.log(err)
  }
}
export async function sendWhatsApp(phone, otp) {
  // const res = await fetch(
  //   `https://graph.facebook.com/v18.0/${process.env.WHATSAPP_PHONE_ID}/messages`,
  //   {
  //     method: "POST",
  //     headers: {
  //       "Authorization": `Bearer ${process.env.WHATSAPP_TOKEN}`,
  //       "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify({
  //       messaging_product: "whatsapp",
  //       to: phone, // مثال: 249909737254
  //       type: "template",
  //       template: {
  //         name: "student_otp",
  //         language: {
  //           code: "ar"
  //         },
  //         components: [
  //           {
  //             type: "body",
  //             parameters: [
  //               {
  //                 type: "text",
  //                 text: otp.toString()
  //               }
  //             ]
  //           }
  //         ]
  //       }
  //     })
  //   }
  // );

  // const data = await res.json();
  // console.log(data);
}

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