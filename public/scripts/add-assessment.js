const addAssessmentBtn = $("#add-assessment-btn");
const addAssessmentName = $("#add-assessment-name");
const addAssessmentMetric = $("#add-assessment-metric")

addAssessmentBtn.on("click",async ()=>{
    const body = {
        assessmentName:addAssessmentName.val(),
        metric:addAssessmentMetric.val()
    }
    console.log(body)
    const response = await fetch("/api/assessments",{
        method:'POST',
        body:JSON.stringify(body),
        headers:{
            "Content-type":"application/json"
        }
    });
    console.log(response)
})