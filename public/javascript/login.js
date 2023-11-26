const loginFormHandler = async (event) => {
  event.preventDefault();
  const phone = isPhoneNumber(document.querySelector('#authentication-login-phone').value);
  const password = document.querySelector('#authentication-login-password').value.trim();
  
  if (password) {
    const response = await fetch('/login', {
      method: 'POST',
      body: JSON.stringify({ phone, password }),
      //letting the API know that I'm sending it json data 
      headers: { 'Content-Type': 'application/json' }, 
    });
    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to log in');
    }
  } else alert("Please input your phone number and password.");
};

document
  .querySelector('#authentication-login-submit')
  .addEventListener('click', loginFormHandler);