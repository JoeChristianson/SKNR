const regForm = $(".register-form");
const emailTest = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/

regForm.on('submit',(e)=>{
  e.preventDefault();
  console.log("working")
  signupFormHandler()
})

const loginFormHandler = async (event) => {
    event.preventDefault();
  
    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
  
    if (email && password) {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        console.log(response)
        document.location.replace('/');
      } else {
        alert('Failed to log in.');
      }
    }
  };
  
  const signupFormHandler = async () => {
    const username = document.querySelector('#username-register').value.trim();
    const email = document.querySelector('#email-register').value.trim();
    const password = document.querySelector('#password-register').value.trim();
    const passwordConfirm = document.querySelector('#password-confirm').value.trim();
    if(password!==passwordConfirm){
      alertFailure("passwords do not match");
      return
    }
    if(username.length<6){
      alertFailure("Username must be at least six characters");
      return
    }
    if(password.length<8){
      alertFailure("Password must be at least eight characters");
      return
    }
    if(!emailTest.test(email)){
      alertFailure("Invalid E-mail");
      return
    }
    if (username && email && password) {
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ username, email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json()
      console.log(data)
      if (response.ok) {
        console.log(response)
        // document.location.replace('/registration-success');
      } else {
        alertFailure(data.message)
      }
    }
  };
  
  document.querySelector('.login-form').addEventListener('submit', loginFormHandler); 

  function alertFailure(message){
    alert(message)
  }