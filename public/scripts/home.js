const logOutBtn = $("#log-out-btn")
const addItemBtn = $("#add-item-btn")
const addItemModal = $("#add-item-modal")
const closeAddItemModalBtn = $("#close-add-item-modal")
const modals = $(".modal")

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

closeAddItemModalBtn.on("click",()=>{
    addItemModal.addClass("hide")
})

addItemModal.on("click",".add",(e)=>{
    const modal = e.currentTarget.dataset.action;
    openModal(modal)
})

function openModal(modal){
    document.querySelectorAll(".modal").forEach(modal=>{
        modal.classList.add("hide")
    })
    $(`#${modal}-modal`).removeClass("hide")
}

