import fetch from "node-fetch";

export const sendWhatsApp = async (phone, otp) => {
  const res = await fetch(
    `https://graph.facebook.com/v18.0/${process.env.WHATSAPP_PHONE_ID}/messages`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to: phone,
        type: "text",
        text: {
          body: `تم تقديم الطلب: ${otp}`,
        },
      }),
    }
  );
  console.log(res)
  console.log(phone)
  


  // return res.json();
}
