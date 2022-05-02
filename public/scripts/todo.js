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
        const respBody = await response.json();
        console.log(respBody)
        addToDoToPage(newToDo.val(),respBody.id)
      } else {
        alert('Failed to add to do.');
      }
})

const addToDoToPage = (val,id)=>{
  const cont = $(".to-dos-content");
  const btn = $("<button>");
  btn.attr({'data-to-do-id':id,'data-is-complete':false});
  btn.addClass("to-do-btn");
  btn.text(val)
  cont.append(btn)
}