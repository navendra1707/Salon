const apptTimeslotSelectHandler = function() {
  let apptTimeslotSelect = document.querySelector('#appt-timeslot-select');
  let timeslotArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39];
  timeslotArray = timeslotArray.map(timeslot => {
    let minute = (timeslot+1)%4*15;
    let hour = (timeslot+1-(timeslot+1)%4)/4+9;
    if (minute<10) minute = "0" + minute;
    if (hour<10) hour = "0" + hour;
    return hour + ":" + minute;
  });
  for (let index = 1; index <= timeslotArray.length; index++) {
    let timeslotOption = document.createElement("option");
    timeslotOption.disabled = false;
    timeslotOption.innerHTML = timeslotArray[index-1];
    timeslotOption.value = index;
    apptTimeslotSelect.append(timeslotOption);
  }
}

apptTimeslotSelectHandler();

var index = 0;
var servInput;
var techInput;

const fetchAllServices = async function() {
  servInput = document.createElement("select");
  const response = await fetch('/api/services', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  if (response.ok) {
    var services = await response.json();
    globalServices = services;
    for (let i = 0; i <= services.length; i++) {
      const servOpt = document.createElement("option");
      if (i==0) {
        servOpt.innerHTML = "Service ?";
        servOpt.value = -1;
      } else {
        servOpt.innerHTML = services[i-1].name;
        servOpt.dataset.time = services[i-1].time_frame/15;
        servOpt.value = services[i-1].id;
      }
      servInput.append(servOpt);
    }
  } else {
    alert('Failed ON server');
  }
}

const fetchAllTechnicians = async function() {
  techInput = document.createElement("select");
  const response = await fetch('/api/users?role=technician', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  if (response.ok) {
    var technicians = await response.json();
    globalTechnicians = technicians;
    for (let i = -1; i <= technicians.length; i++) {
      const techOpt = document.createElement("option");
      if (i==-1) {
        techOpt.innerHTML = "Technician ?";
        techOpt.value = -1;
      } else if (i==0) {
        techOpt.innerHTML = "Any technicians";
        techOpt.value = 0;
      } else {
        techOpt.innerHTML = technicians[i-1].first_name;
        techOpt.value = technicians[i-1].id;
      }
      techInput.append(techOpt);
    }
  } else {
    alert('Failed ON server');
  }
}

const checkAvailableHandler = async function (event) {
  var serv = event.currentTarget.parentNode.children[0];
  var techId = event.currentTarget.parentNode.children[1].value;
  var date = document.getElementById("appt-day-input").value;
  var timeslot = document.getElementById("appt-timeslot-select").value;
  if (techId < 0 || !date || !timeslot || !serv.value) {
    alert("Need info before checking.");
    return;
  }
  if (techId !== "0") {
      const response = await fetch('/api/appointments/available', {
        method: 'POST',
        body: JSON.stringify({"user_id": techId, "date": date, "time_slot": timeslot, "time_frame": serv.options[serv.selectedIndex].dataset.time}),
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok) alert("Available");
      else alert("Unavailable");
  } else alert("Available");
}

const addBookingService = async function() {
  const servTechDiv = document.getElementById('service-tech-div');

  index++;

  var servInputTemp = document.createElement("select"); 
  servInputTemp.innerHTML = servInput.innerHTML;
  servInputTemp.className = "serv-input";

  var techInputTemp = document.createElement("select");
  techInputTemp.innerHTML = techInput.innerHTML;
  techInputTemp.className = "tech-input";
  
  var checkAvailableBtn = document.createElement("button");
  checkAvailableBtn.innerHTML = "Check Available";
  checkAvailableBtn.className = "check-available-btn";

  checkAvailableBtn.addEventListener("click", checkAvailableHandler);

  const servtechdivtemp = document.createElement("div");
  servtechdivtemp.id = "appt-serv-tech-" + index;
  servtechdivtemp.className = "appt-serv-tech";

  servtechdivtemp.append(servInputTemp);
  servtechdivtemp.append(techInputTemp);
  servtechdivtemp.append(checkAvailableBtn);

  servTechDiv.append(servtechdivtemp);
}

document
  .querySelector('#serv-tech-add-more-btn')
  .addEventListener('click', addBookingService);

const aptSubmitBtnHandler = async function () {
  var date = document.getElementById("appt-day-input").value;
  var timeslot = document.getElementById("appt-timeslot-select").value;
  var userId = document.getElementById("customer-name-div").dataset.userId;
  var apptId;
  try {
    var response = await fetch('/api/appointments/', {
      method: 'POST',
      body: JSON.stringify({"user_id": userId, "date": date, "time_slot": timeslot}),
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      var apptData = await response.json();
      apptId = apptData.appointment_id;
    }
  } catch (err) {
    alert(err);
  }

  var servTechDiv = document.getElementById("service-tech-div");
  var totalServices = servTechDiv.children.length;
  var bookingData = [];
  for (let i=1; i<=totalServices; i++) {
    let servId = servTechDiv.children[i-1].children[0].value;
    let techId = servTechDiv.children[i-1].children[1].value;
    if (servId > 0) {
      if (techId == 0) bookingData.push({"appointment_id": apptId, "service_id": servId });
      else if (techId > 0) bookingData.push({"appointment_id": apptId, "service_id": servId, "user_id": techId});
    }
  }
  
  try {
    var response = await fetch('/api/bookings/', {
      method: 'POST',
      body: JSON.stringify({"data": bookingData}),
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) document.location.reload();
  } catch (err) {
    alert(err);
  }
}

fetchAllServices();
fetchAllTechnicians();

document
  .querySelector('#appt-submit-btn')
  .addEventListener('click', aptSubmitBtnHandler);