const apptEditHandler = async function(event) {
  console.log(globalServices);
  console.log(globalTechnicians);
  var apptId = event.currentTarget.parentNode.children[0].dataset.apptId;
  const response = await fetch('/api/appointments/'+apptId, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    var appointment = await response.json();
    console.log(appointment);
    document.querySelector('.appointment-title').innerHTML = 'UPDATE YOUR APPOINTMENT';
    document.getElementById('appt-day-input').setAttribute('value', appointment.date);
    document.getElementById('appt-timeslot-select').value = appointment.time_slot;
    
    var servTechDiv = document.getElementById('service-tech-div');
    servTechDiv.innerHTML = "";

    for (let index = 0; index <= appointment.bookings.length-1; index++) {
      let servInputTemp = document.createElement("select"); 
      servInputTemp.innerHTML = servInput.innerHTML;
      servInputTemp.className = "serv-input";
      servInputTemp.value = appointment.bookings[index].service_id;
    
      let techInputTemp = document.createElement("select");
      techInputTemp.innerHTML = techInput.innerHTML;
      techInputTemp.className = "tech-input";
      if (appointment.bookings[index].user_id == null) techInputTemp.value = 0;
      else techInputTemp.value = appointment.bookings[index].user_id;
      
      let checkAvailableBtn = document.createElement("button");
      checkAvailableBtn.innerHTML = "Check Available";
      checkAvailableBtn.className = "check-available-btn";
    
      checkAvailableBtn.addEventListener("click", checkAvailableHandler);
    
      let servtechdivtemp = document.createElement("div");
      servtechdivtemp.id = "appt-serv-tech-" + index;
      servtechdivtemp.className = "appt-serv-tech";
    
      servtechdivtemp.append(servInputTemp);
      servtechdivtemp.append(techInputTemp);
      servtechdivtemp.append(checkAvailableBtn);
    
      servTechDiv.append(servtechdivtemp);
    }
  }
  document.getElementById('appt-update-btn').setAttribute('style', 'display: initial');
  document.getElementById('appt-submit-btn').setAttribute('style', 'display: none');
  document.querySelector('.appointment-customer-history').setAttribute('style', 'display: none');
}

document.querySelectorAll('.appt-edit-btn').forEach(
  eachBtn => eachBtn.addEventListener('click', apptEditHandler)
);


const apptDeleteHandler = async function(event) {
  var apptId = event.currentTarget.parentNode.children[0].dataset.apptId;
  const response = await fetch('/api/appointments/', {
    method: 'DELETE',
    body:  JSON.stringify({"apptId": apptId}),
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.reload(); 
  }
}

document.querySelectorAll('.appt-delete-btn').forEach(
  eachBtn => eachBtn.addEventListener('click', apptDeleteHandler)
);

const updateApptHandler = async function () {
}
document.getElementById('appt-update-btn').addEventListener('click', updateApptHandler);
