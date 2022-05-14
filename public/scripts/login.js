const regForm = $(".register-form");
const emailTest = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/

regForm.on('submit',(e)=>{
  e.preventDefault();
  console.log("working")
  signupFormHandler()
})

const timeObjF = ()=>{
  const obj = {}
  obj.now = moment();
  obj.full = obj.now._d;
  obj.absoluteTime = obj.now.unix();
  obj.offset = moment().utcOffset();
  obj.offsetTime = (obj.now.unix()+obj.offset*60)/3600/24;
  obj.hour = obj.offsetTime%1*24
  obj.absoluteDate = Math.floor((obj.now.unix()+obj.offset*60)/3600/24);
  obj.tommorow = obj.absoluteDate+1
  obj.midnight = obj.tommorow*3600*24
  obj.timeRemaining = obj.midnight-obj.absoluteTime
  obj.hoursRemaining = 24-obj.hour
  obj.now = null;
  obj.absoluteTime = null;
  obj.offset = null;
  obj.full = null;
  for (let i in obj){
    if (typeof obj[i]!=="number"){
      console.log(typeof obj[i])
      delete obj[i]
    }
  }
  console.log(obj)
  return obj
}

const loginFormHandler = async (event) => {
    event.preventDefault();
  
    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
    let timeObj = timeObjF();
    if (email && password) {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ email, password,timeObj}),
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

