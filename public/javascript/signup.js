const signupFormHandler = async (event) => {
    event.preventDefault();
    const phone = isPhoneNumber(document.querySelector('#authentication-signup-phone').value);
    const password = document.querySelector('#authentication-signup-password').value.trim();
    const email = document.querySelector('#authentication-signup-email').value.trim();
    const firstname = document.querySelector('#authentication-signup-firstname').value.trim();
    const lastname = document.querySelector('#authentication-signup-lastname').value.trim();
    const role = "customer";

    if (password && email && firstname) {
      const response = await fetch('/signup', {
        method: 'POST',
        body: JSON.stringify({ 
            phone: phone, 
            password: password,
            email: email,
            first_name: firstname,
            last_name: lastname,
            role: role
        }),
        headers: { 'Content-Type': 'application/json' }, 
      });
      if (response.ok) {
        document.location.replace('/login');
      } else {
        alert('Failed to log in');
      }
    } else alert("Please input your information.");
  };
  
  document
    .querySelector('#authentication-signup-submit')
    .addEventListener('click', signupFormHandler);