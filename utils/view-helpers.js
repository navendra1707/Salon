module.exports = {
    isManager: (role) => {
        if (role === "manager") return true;
        else return false;
    },
    isCustomer: (role) => {
        if (role === "customer") return true;
        else return false;
    },
    getFormattedTimeslot:  (timeSlot) => {
        // open at 9:30 closed at 7:30
        var time_slot = parseInt(timeSlot);
       var minute = (time_slot+1)%4*15;
       var hour = (time_slot+1-(time_slot+1)%4)/4+9;
       if (minute<10) minute = "0" + minute;
       if (hour<10) hour = "0" + hour;
       return hour + ":" + minute;
    }
};