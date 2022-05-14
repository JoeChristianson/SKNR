const assessmentSubmissionBtn = $("#assessment-submission")

assessmentSubmissionBtn.on("click",async(e)=>{
    const assessmentInputs = new Array(...document.querySelectorAll(".assessment"));
    const assessments = assessmentInputs.map(inp =>{
        console.log(inp)
        const value = inp.type === "checkbox"?inp.checked:inp.value
        return {id:inp.dataset.daId,value}
    })
    console.log(assessments);
    const response = await fetch("/api/assessment-days",{
        method:"PUT",
        body:JSON.stringify({changes:assessments}),
        headers:{
            "Content-Type":"application/json"
        }
    })
    console.log(response)
    window.location.replace("/")
})