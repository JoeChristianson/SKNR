const getAllHabits = async ()=>{
    const response = await fetch("/api/habit");
    console.log(response)
    const data = await response.json()
    console.log(data)
    return data
}

async function completeHabit(id,isComplete){
    const response = await fetch("/api/habitday/"+id,{
        method:"PUT",
        body:JSON.stringify({
            "isComplete":isComplete
        }),
        headers:{
            "Content-Type":"application/json"
        }
    })
    const result = await response.json();
    console.log(result)
}