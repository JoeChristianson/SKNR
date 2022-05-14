body.on('click','.habit-btn',async (e)=>{
    let complete;
    const id = e.target.dataset.habitId;
    if (e.target.dataset.isComplete == "true"){
      complete = false
    }
    else complete = true;
    console.log(complete)
    completeHabit(id,complete)
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


// fix this later
const addHabitToPage = (val,id)=>{
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