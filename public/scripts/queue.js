console.log("in the queue js")
const queueTextInp = $("#new-queue-text");
const addToQueueBtn = $("#add-queue-item-btn")
const queueCont = $("#queue-cont")

addToQueueBtn.on("click",async (e)=>{
    const newItem = queueTextInp.val();
    const queueLength = document.querySelectorAll(".queue-item").length
    const response = await fetch("/api/queue",{
        method:"POST",
        body:JSON.stringify({
            name:newItem,
            ordinal:(queueLength+1)
        }),
        headers:{
            "Content-Type":"application/json"
        }
    })
    const data = await response.json()
    console.log(data)
    if (data){
        const btn = $("<button>");
        btn.text(newItem);
        btn.attr("data-id",data[0].id)
        queueCont.append(btn)
    }
    queueTextInp.val("")
})

queueCont.on("click","button", async (e)=>{
    e.currentTarget.classList.toggle("done");
    const id = e.currentTarget.dataset.id;
    if(e.currentTarget.classList.contains("done")){

        const response = await fetch("/api/queue/complete/"+id,{
            method:"PUT"
        });
    }else{
        const response = await fetch("/api/queue/incomplete/"+id,{
            method:"PUT"
        });
    }
})

queueCont.on("contextmenu","button",(e)=>{
    e.preventDefault();
// this will pull up a module
 
})