console.log("in the queue js")
const queueTextInp = $("#new-queue-text");
const addToQueueBtn = $("#add-queue-item-btn")

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
})

const loadInitialQueue = ()=>{
    
}