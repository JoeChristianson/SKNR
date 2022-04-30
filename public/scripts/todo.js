const body = $("body");
const toDoForm = $("#add-to-do-form");
const newToDo = $("input#new-to-do")

body.on('click','.to-do-btn',(e)=>{
    console.log('bam')
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