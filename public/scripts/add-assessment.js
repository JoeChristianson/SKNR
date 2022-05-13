const addAssessmentBtn = $("#add-assessment-btn");
const addAssessmentName = $("#add-assessment-name");
const addAssessmentMetric = $("#add-assessment-metric")
const addAssessmentModal = $("#add-assessment-modal")

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
    addAssessmentModal.addClass("hide")
})

const loadAssessments = async()=>{
    const response = await fetch("/api/assessment")
}