const logOutBtn = $("#log-out-btn")
const addItemBtn = $("#add-item-btn")
const addItemModal = $("#add-item-modal")
const closeAddItemModalBtn = $("#close-add-item-modal")
const modals = $(".modal")
const body = $("body")
// const 

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


addItemBtn.on("click",()=>{
    addItemModal.removeClass("hide")
})

addItemModal.on("click",".add",(e)=>{
    const modal = e.currentTarget.dataset.action;
    openModal(modal)
})

function openModal(modal){
    document.querySelectorAll(".modal").forEach(modal=>{
        modal.classList.add("hide")
    })
    if (!modal){
        return
    }
    $(`#${modal}-modal`).removeClass("hide")
}

body.on("click",".close",()=>{
    openModal(false)
})

body.on("click",".open",(e)=>{
    const modal = e.currentTarget.dataset.action
    openModal(modal)
})