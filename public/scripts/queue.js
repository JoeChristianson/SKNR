console.log("in the queue js")
const queueTextInp = $("#new-queue-text");
const addToQueueBtn = $("#add-queue-item-btn")
const queueCont = $("#queue-cont")


addToQueueBtn.on("click",async (e)=>{
    const newItem = queueTextInp.val();
    const queueLength = document.querySelectorAll("#queue-cont button").length
    console.log(queueLength)
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

queueCont.on("dragstart","button",dragStart)
queueCont.on("dragenter","button",dragEnter)
queueCont.on("dragover","button",dragOver)
queueCont.on("dragleave","button",dragLeave)
queueCont.on("drop","button",drop)


const queueDrag = {}

function dragStart(e){
    queueDrag.draggedId = e.currentTarget.dataset.id;
    queueDrag.draggedUQIId = e.currentTarget.dataset["queue-item-id"]
    const parent = e.currentTarget.parentNode;
    queueDrag.startOrd = Array.prototype.indexOf.call(parent.children, e.currentTarget)+1;
    setTimeout(()=>{
        e.target.classList.add("hide")
    },0)
}

function dragEnter(e){
    e.preventDefault()
    e.target.classList.add("drag-over");
}

function dragOver(e){
    e.preventDefault()
    queueDrag.targetId = e.currentTarget.dataset.id
    e.target.classList.add("drag-over");
}

function dragLeave(e){
    e.target.classList.remove("drag-over")
}

function drop(e){
    console.log(e)
    e.target.classList.remove("drag-over");
    const draggedItem = document.querySelector(`[data-id="${queueDrag.draggedId}"]`)
    draggedItem.classList.remove("hide");
    const parent = e.currentTarget?.parentNode;
    console.log(parent)
    if (parent.id !=="queue-cont"){
        console.log("not proper drop");
        parent.append(draggedItem) 
        return;
    }
    queueDrag.endOrd = Array.prototype.indexOf.call(parent.children, e.currentTarget)+1;
    e.target.parentNode.insertBefore(draggedItem,e.target);
    reorder(draggedItem.dataset.id,e.target.dataset.id)

}

async function reorder(id,start,drop){
    console.log(start,drop)
    const resp = await fetch("/api/queue/reorder",{
        method:"PUT",
        body:JSON.stringify({
            id:queueDrag.draggedUQIId,start:queueDrag.startOrd,drop:queueDrag.endOrd
        }),
        headers:{
            "Content-Type":"application/json"
        }
    })
    const data = resp.json()
    console.log(data)
}

document.addEventListener("dragend",(e)=>{
    console.log(e.target.classList.remove("hide"))
})