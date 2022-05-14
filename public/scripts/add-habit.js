const addHabitBtn = $("#add-habit-btn");
const addHabitName = $("#add-habit-name");
const addHabitModal = $("#add-habit-modal")

addHabitBtn.on("click",async ()=>{
    const body = {
        habitName:addHabitName.val(),
    }
    console.log(body)
    const response = await fetch("/api/habit",{
        method:'POST',
        body:JSON.stringify(body),
        headers:{
            "Content-type":"application/json"
        }
    });
    addHabitModal.addClass("hide")
})