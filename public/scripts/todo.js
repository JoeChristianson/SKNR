const body = $("body");
const toDoForm = $("#add-to-do-form");
const newToDo = $("input#new-to-do")

body.on('click','.to-do-btn',async (e)=>{
    let complete;
    if (e.target.dataset.isComplete == "true"){
      complete = false
    }
    else complete = true;
    const response = await fetch('api/todos',{
      method:'PUT',
      body:JSON.stringify({toDoId:e.target.dataset.toDoId,isComplete:complete}),
      headers:{'Content-Type':"application/json"}
    })
    if(!response.ok){
      alert('failed to complete');
      return
    }
    if(complete){
      console.log("in this")
      e.target.classList.add("done");
      e.target.dataset.isComplete=true;
    }
    else{
      e.target.dataset.isComplete=false;
      e.target.classList.remove("done");
    }
})

toDoForm.on('submit',async (e)=>{
    e.preventDefault();
    const response = await fetch('api/todos',{
        method:'POST',
        body:JSON.stringify({toDoName:newToDo.val()}),
        headers:{'Content-Type': 'application/json'}
    })
    if (response.ok) {
        console.log(response.body)
      } else {
        alert('Failed to add to do.');
      }
})