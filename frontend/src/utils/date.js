export const createTime = (data)=> {
    const date = new Date(data ? data : null)
    const days = ["الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"]; 
    // أسماء الشهور بالعربي 
    const months = [ "يناير", "فبراير", "مارس", 
        "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", 
        "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر" ];

        const year = date.getFullYear(); 
        const month = String(date.getMonth() + 1).padStart(2, "0"); 
        const day = String(date.getDate()).padStart(2, "0"); 
        const dayName = days[date.getDay()]; 
        const monthName = months[date.getMonth()]; 

        const hours = String(date.getHours()).padStart(2, "0"); 
        const minutes = String(date.getMinutes()).padStart(2, "0"); 
        const seconds = String(date.getSeconds()).padStart(2, "0"); 

        const FullDate = `${year}/${month}/${day}/${dayName}/${monthName} ${hours}:${minutes}:${seconds}`; 
        const createTime = {
            dateYMD: `${year}/${month}/${day}`,
            dateHMS: `${hours}:${minutes}:${seconds}`,
            dateAR: `${dayName}/${monthName}`
        }; 
        const order = { ...data,  createTime: createTime, FullDate: FullDate }; 
        return order;
}
//  function createOrder(data) { const date = new Date(); // أسماء الأيام بالعربي const days = ["الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"]; // أسماء الشهور بالعربي const months = [ "يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر" ]; const year = date.getFullYear(); const month = String(date.getMonth() + 1).padStart(2, "0"); const day = String(date.getDate()).padStart(2, "0"); const dayName = days[date.getDay()]; const monthName = months[date.getMonth()]; // الوقت const hours = String(date.getHours()).padStart(2, "0"); const minutes = String(date.getMinutes()).padStart(2, "0"); const seconds = String(date.getSeconds()).padStart(2, "0"); const orderDate = `${year}/${month}/${day}/${dayName}/${monthName} ${hours}:${minutes}:${seconds}`; const order = { ...data, // بيانات الطلب createdAt: orderDate // زمن الإنشاء }; return order; } 
