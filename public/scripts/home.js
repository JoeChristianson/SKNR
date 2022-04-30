const logOutBtn = $("#log-out-btn")

logOutBtn.on('click',(e)=>{
    logOut()
})

const logOut = async ()=>{
    console.log('logging out')
    const response = await fetch('api/users/logout',{
        method:'POST',
        body:JSON.stringify({action:'logout'}),
        headers:{'Content-Type': 'application/json'},
    });
    if (response.ok){
        console.log(response);
        document.location.replace('/login');
    }else {
        alert("failed to logout")
    }
}