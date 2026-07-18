const home = document.getElementById("Home");
const evaluatemenu = document.getElementById("evaluatemenu");
const  historymenu=document.getElementById("History");
const savedmenu=document.getElementById("SavedReports");
const About=document.getElementById("About");
const content = document.getElementById("content");
let history=[];
let savedReports=[];
let currentReport = null;
let currentReportId = null;

if (!localStorage.getItem("token")) {
    window.location.replace("login.html");
}
//Homepage rendering
function renderHome(){
        content.innerHTML=` <div class="card">
            <h2 style="color: #437bff;"> Welcome to AI Project Evaluator </h2><br>
            <h4 style="color: #343538;">What you can do with our <span style="color: #437bff;">AGENT</span></h4>
            <br>
           
<div class='cards-container' style="display:grid;grid-template-columns:repeat(2,1fr);gap:20px;">
<div class='card' style="background-color: #f4b400;color:white;">
<h2>Innovation Score</h2>
<p>Measure Innovation and Originality</p>
</div>
<div class='card' style="background-color: #34a853;color:white;">
<h2>Complexity Analysis</h2>
<p>Measure Project Complexity</p>
</div>
<div class='card' style="background-color: #ea4335;color:white;">
<h2>Risks</h2>
<p>Measure Project Risks</p>
</div>
<div class='card' style="background-color: #8e44ff ;color:white;">
<h2>Viva Questions</h2>
<p>Generate potential viva questions</p>

</div>
<button onclick="renderEvaluate()" style="grid-column: 1 / -1;">Evaluate Project</button>

</div>
<br>

        </div>`


    }
    //Evaluate page rendering
function renderEvaluate(){
        content.innerHTML=`<div class="left-panel">

                <div class="card">

                    <h2>
                        Project Details
                    </h2>

                    <label>
                        Project Title
                    </label>

                    <input
                        id="title"
                        placeholder="Enter Project Title">

                    <label>
                        Domain
                    </label>

                    <select id="domain">

                        <option>AI</option>
                        <option>Web</option>
                        <option>Cloud</option>
                        <option>IoT</option>
                        <option>Cyber Security</option>

                    </select>

                    <label>
                        Project Abstract
                    </label>

                    <textarea
                        id="abstract">
                    </textarea>

                    <label>
                        Technologies Used
                    </label>

                    <textarea
                        id="technology">
                    </textarea>

                    <button
                        onclick="evaluateProject()">

                        Evaluate Project

                    </button>

                </div>

            </div>

            <!-- RIGHT -->

            <div class="right-panel">

                <div class="card">

                    <h2>
                        Evaluation Result
                    </h2>

                    <div class="scores">

                        <div class="score-card">
                            <h4>Innovation</h4>
                            <h1 id="innovation">
                                --
                            </h1>
                        </div>

                        <div class="score-card">
                            <h4>Complexity</h4>
                            <h1 id="complexity">
                                --
                            </h1>
                        </div>

                        <div class="score-card">
                            <h4>Feasibility</h4>
                            <h1 id="feasibility">
                                --
                            </h1>
                        </div>

                        <div class="score-card">
                            <h4>Overall</h4>
                            <h1 id="overall">
                                --
                            </h1>
                        </div>

                    </div>

                    <div class="result-card">

                        <h3>
                            Project Summary
                        </h3>

                        <p id="summary"></p>

                    </div>

                    <div class="result-card">

                        <h3>
                            Risks
                        </h3>

                        <ul id="risks"></ul>

                    </div>

                    <div class="result-card">

                        <h3>
                            Improvements
                        </h3>

                        <ul id="improvements"></ul>

                    </div>

                    <div class="result-card">

                        <h3>
                            Suggested Technologies
                        </h3>

                        <p id="tech"></p>

                    </div>

                    <div class="result-card">

                        <h3>
                            Viva Questions
                        </h3>

                        <ol id="viva"></ol>

                    </div>
                    <button
id="saveReportButton" onclick="saveReport(currentReportId)" style="display:none;">Save Report
</button>

                </div>
`
    }
    async function saveReport(id){

    currentReportId = id;

    const response = await fetch(
        `https://ai-project-evaluator-gqe8.onrender.com/save/${id}`,
        {
            method:"POST",
            headers:{
                "Authorization":"Bearer " + localStorage.getItem("token")
            }
        }
    );

    const result = await response.json();

    alert(result.message);

}

    //History rendering
    async function renderHistory() {

   const response = await fetch(
"https://ai-project-evaluator-gqe8.onrender.com/history",
{
headers:{
"Authorization":
"Bearer " + localStorage.getItem("token")
}
}
);

    const history = await response.json();

    let html = `<h2>Evaluation History</h2>`;

    if(history.length===0){

        html+=`
        <div class="card">
            <h3>No History Found</h3>
        </div>
        `;

    }else{

        history.forEach(report=>{

            html+=`

            <div class="card">

                <h3>${report.title}</h3>

                <p><strong>Domain:</strong> ${report.domain}</p>

                <p><strong>Overall:</strong> ${report.overall}/10</p>

                <p>${report.date}</p>

                <button onclick="saveReport(${report.id})">

                    Save Report

                </button>

            </div>

            `;

        });

    }

    content.innerHTML=html;

}

    
async function renderSavedReports(){

    const response=await fetch(
"https://ai-project-evaluator-gqe8.onrender.com/saved",
{
headers:{
"Authorization":
"Bearer " + localStorage.getItem("token")
}
}
)

    const reports=await response.json();
    savedReports = reports;

    let html=`<h2>Saved Reports</h2>`;

    if(reports.length===0){

        html+=`

        <div class="card">

            <h3>No Saved Reports</h3>

        </div>

        `;

    }

    else{

        reports.forEach(report=>{

            html+=`

            <div class="card">
                        <h3>${report.title}</h3>
                        <p><strong>Domain:</strong> ${report.domain}</p>
                        <p><strong>Abstract:</strong> ${report.abstract}</p>
                        <p><strong>Technologies:</strong> ${report.technology}</p>
                        <p><strong>Overall Score:</strong> ${report.overall}/10</p>
                        <p><strong>Summary:</strong> ${report.summary}</p>
                        <p><strong>Risks:</strong> ${report.risks.join(", ")}</p>
                        <p><strong>Improvements:</strong> ${report.improvements.join(", ")}</p>
                        <p><strong>Suggested Technologies:</strong> ${report.suggestedTechnologies.join(", ")}</p>
                        <p><strong>Viva Questions:</strong> ${report.vivaQuestions.join(", ")}</p>
                        <p><strong>Date:</strong> ${report.date}</p>
                        <button onclick="downloadReport(${report.id})">
    Download Report
</button>
                    </div>
                    

            `;

        });

    }

    content.innerHTML=html;

}function downloadReport(id){

    const report = savedReports.find(
        r => r.id === id
    );


    const text = `
AI PROJECT EVALUATION REPORT

Title:
${report.title}

Domain:
${report.domain}

Abstract:
${report.abstract}

Technologies:
${report.technology}


Scores:

Innovation: ${report.innovation}/10
Complexity: ${report.complexity}/10
Feasibility: ${report.feasibility}/10
Overall: ${report.overall}/10


Summary:
${report.summary}


Risks:
${report.risks.join("\n")}


Improvements:
${report.improvements.join("\n")}


Suggested Technologies:
${report.suggestedTechnologies.join("\n")}


Viva Questions:
${report.vivaQuestions.join("\n")}
`;


    const blob = new Blob(
        [text],
        {type:"text/plain"}
    );


    const link=document.createElement("a");

    link.href=URL.createObjectURL(blob);

    link.download =
    `${report.title}_Evaluation_Report.txt`;


    link.click();

}






//about rendering
function AboutSection() {
   content.innerHTML=`<section id="about-section" class="page-section">

                <div class="card">

                    <h2>About the AI Evaluator Agent</h2>

                    <p>
                        This agent reads your project title, domain, abstract and technologies,
                        then uses a locally-hosted AI model (Llama 3.2 via Ollama) to generate a
                        structured evaluation: scores, a summary, risks, improvements, suggested
                        technologies and viva questions.
                    </p>

                    <br>
                    <br><div class="cards-container" style="display:flex;gap:20px;overflow-x:auto;">
<div class='card' style="background-color: #f4b400;color:white; text-align:center;">
<h2>Project Input</h2>

</div>
<div class='card' style="background-color: #34a853;color:white;text-align:center">
<h2>AI Analysis</h2>

</div>
<div class='card' style="background-color: #ea4335;color:white;text-align:center">
<h2>Evaluation</h2>

</div>
<div class='card' style="background-color: #8e44ff ;color:white;text-align:center">
<h2>Report</h2>


</div>


                </div>
                <br>
        <p>
        It helps students, educators and professionals quickly assess the quality and feasibility of a project idea, providing actionable insights for improvement.
    </p>
    <br>
  <h3> Feel free to write a review or feedback </h3>
  <p>Contact: <a href="mailto:kellakushmitha@gmail.com">kellakushmitha@gmail.com</a></p>

            </section>`
}

    //for timeline or initial page display
    renderHome();
    //calling rendered functions inorder to navigate
    evaluatemenu.onclick = renderEvaluate;
    home.onclick = renderHome;
    historymenu.onclick=renderHistory;
    savedmenu.onclick=renderSavedReports;
    About.onclick=AboutSection;
//evaluate project func for sending ad recieving data
async function evaluateProject() {
   
  
    const title = document.getElementById("title").value.trim();
    const domain = document.getElementById("domain").value;
    const abstract = document.getElementById("abstract").value.trim();
    const technology = document.getElementById("technology").value.trim();
 

    // Validation
    if (!title || !abstract || !technology) {
        alert("Please fill all fields.");
        return;
    }

    const data = {
        title: title,
        domain: domain,
        abstract: abstract,
        technology: technology
    };

    // Loading state
    document.getElementById("summary").innerHTML =
        "⏳ Evaluating project... Please wait.";

    try {
console.log("Evaluate button clicked");
        const response = await fetch(
            "https://ai-project-evaluator-gqe8.onrender.com/evaluate",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                     "Authorization":"Bearer " + localStorage.getItem("token")
                },

                body: JSON.stringify(data)
            }
        );

        if (!response.ok) {
            throw new Error(
                `Server Error: ${response.status}`
            );
        }

        const result = await response.json();
        currentReportId = result.id;
        const report = {
    title: title,
    domain: domain,
    abstract: abstract,
    technology: technology,

    innovation: result.innovation,
    complexity: result.complexity,
    feasibility: result.feasibility,
    overall: result.overall,

    summary: result.summary,
    risks: result.risks,
    improvements: result.improvements,
    suggestedTechnologies: result.suggested_technologies,
    vivaQuestions: result.viva_questions,

    date: new Date().toLocaleString()
};

saveReportButton.style.display = "block"; // 




        
        document.getElementById("innovation").innerHTML =
            `${result.innovation}/10`;

        document.getElementById("complexity").innerHTML =
            `${result.complexity}/10`;

        document.getElementById("feasibility").innerHTML =
            `${result.feasibility}/10`;

        document.getElementById("overall").innerHTML =
            `${result.overall}/10`;

        document.getElementById("summary").innerHTML =
            result.summary || "No summary available.";

        
        document.getElementById("risks").innerHTML =
            (result.risks || [])
                .map(item => `<li>${item}</li>`)
                .join("");

       
        document.getElementById("improvements").innerHTML =
            (result.improvements || [])
                .map(item => `<li>${item}</li>`)
                .join("");

       
        document.getElementById("tech").innerHTML =
            (result.suggested_technologies || [])
                .join(", ");

        document.getElementById("viva").innerHTML =
            (result.viva_questions || [])
                .map(item => `<li>${item}</li>`)
                .join("");

    }
    catch (error) {

        console.error(error);

        document.getElementById("summary").innerHTML =
            `❌ Error:Cant fetch at this moment`;

        document.getElementById("innovation").innerHTML = "--";
        document.getElementById("complexity").innerHTML = "--";
        document.getElementById("feasibility").innerHTML = "--";
        document.getElementById("overall").innerHTML = "--";

        document.getElementById("risks").innerHTML = "";
        document.getElementById("improvements").innerHTML = "";
        document.getElementById("tech").innerHTML = "";
        document.getElementById("viva").innerHTML = "";
    }
}
document.getElementById("logout").onclick=function(){

localStorage.removeItem("token");

window.location="login.html";

}
