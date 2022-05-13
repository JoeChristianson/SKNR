const toDoForm = $("#add-to-do-form");
const newToDo = $("input#new-to-do")

body.on('click','.to-do-btn',async (e)=>{
    let complete;
    const id = e.target.dataset.toDoId;
    if (e.target.dataset.isComplete == "true"){
      complete = false
    }
    else complete = true;
    console.log(complete)
    const response = await fetch('api/todos',{
      method:'PUT',
      body:JSON.stringify({userToDoId:id,isComplete:complete}),
      headers:{'Content-Type':"application/json"}
    })
    console.log(response)
    if(!response.ok){
      alert('failed to complete');
      return
    }
    if(complete){
      console.log("in this")
      e.target.classList.add("done");
      e.target.dataset.isComplete=true;
      e.target.parentElement.children[1].classList.add("done-text")
    }
    else{
      e.target.dataset.isComplete=false;
      e.target.classList.remove("done");
      e.target.parentElement.children[1].classList.remove("done-text")
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
  console.log(id)
  const cont = $(".to-dos-content");
  const wrapper = $("<div>");
  wrapper.addClass("to-do-wrapper");
  const btn = $("<button>");
  const toDoDiv = $("<div>")
  btn.attr({'data-to-do-id':id,'data-is-complete':false});
  btn.addClass("to-do-btn");
  toDoDiv.addClass("to-do");
  toDoDiv.text(val)
  toDoDiv.attr({'data-to-do-id':id,'data-is-complete':false});
  wrapper.append(btn);
  wrapper.append(toDoDiv)
  cont.append(wrapper)
  newToDo.val("")
}