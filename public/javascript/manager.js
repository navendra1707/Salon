const managerBtnHandler = async function(event) {
  var calendarEl = document.getElementById('calendar');
  // get all appointments
  const response = await fetch('/api/appointments', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  // if found:
  if (response.ok) {
    // array of appointents 
    var appts = [];

    // converting data received to formated array according to FullCalendar
    const apptData = await response.json();
    const appointments = apptData.appointments;
    appointments.forEach(appt => {
      appts.push({
        "title" : appt.user.first_name + " " + appt.user.last_name,
        "start" : getFormattedDate(appt.date, appt.time_slot),
        "description" : appt.user.email + "\nPhone: " + appt.user.phone,
      });
    });
    
    // get calendar div and render appt datas into
    var calendar = new FullCalendar.Calendar(calendarEl, {
      plugins: [ 'dayGrid' ],
      initialView: 'dayGridMonth',

      eventRender: function(info) {
        var tooltip = new Tooltip(info.el, {
          title: info.event.extendedProps.description,
          placement: 'top',
          trigger: 'hover',
          container: 'body'
        });
      },
      events: appts
    });

    calendar.render();
  
  // if not found anymore or fail
  } else {
    alert('Failed ON server');
  } 
};

const customerSearchHandler = async function() {
  const phoneInput = document.getElementById('phone-input');
  const customerNameDiv = document.getElementById('customer-name-div');
  var phoneNumber = isPhoneNumber(phoneInput.value);
  if (phoneNumber) {
    // get all appointments
    const response = await fetch('/api/users?role=customer&phone='+phoneNumber, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    
    if (response.ok) {
      const customers = await response.json();
      customerNameDiv.innerHTML = "<label>Customer:</label>  " + customers[0].first_name + " " + customers[0].last_name;
      customerNameDiv.dataset.userId = customers[0].id;
      customerNameDiv.style.display = "block";
    } else {
      if (confirm("Please register for this customer first!")) {
        document.location.replace('/signup');
      } else {
        document.location.replace('/manager');
      } 
    }
  } else alert('Please input a phone number');
}

document
  .querySelector('#customer-search-btn')
  .addEventListener('click', customerSearchHandler);

document.addEventListener("DOMContentLoaded", managerBtnHandler);
