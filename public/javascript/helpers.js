var globalServices;
var globalTechnicians;

const isPhoneNumber = function(str) {
    const num = str.replace(/\D/g, '');
    if (num.length != 10) return false;
    return num;
}

const getFormattedDate = (dateStr, timeSlot) => {
    // open at 9:30 closed at 7:30
   var minute = (timeSlot+1)%4*15;
   var hour = (timeSlot+1-(timeSlot+1)%4)/4+9;
   if (minute<10) minute = "0" + minute;
   if (hour<10) hour = "0" + hour;
   return dateStr + "T" + hour + ":" + minute + ":00";
 }