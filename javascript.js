// VARIABLES TO RESET WHEN THE GAME RESETS: 
// startquiz_clicks needs to be reset to 0
// questionnumber needs to be reset to 0
// terminate needs to be reset to false


// 'Start Quiz' button starts timer and starts the quiz
var startquiz = document.querySelector("#startquiz")
startquiz.addEventListener("click", function(){
    timer()
    runquiz()
    }
)

//---| Construct game timer |---//
var TimeDisplay = document.querySelector("#TimeDisplay")
TimeDisplay.textContent = "Time: 0"
var startquiz_clicks = 0

function timer() {
    // Code to prevent multiple timers running in parallel from double click of 'Start Quiz' button
    startquiz_clicks = startquiz_clicks + 1
    if (startquiz_clicks > 1) {
        return
    }

    // Timer Code
    countdown = 76
    var timer = setInterval(function() {
        countdown--
        TimeDisplay.textContent = `Time: ${countdown}`
        
        if (countdown === 0){
            clearInterval(timer)
        }

        if (terminate === true){
            clearInterval(timer)
            TimeDisplay.textContent = `Time: 0`
        }

    }, 1000);
}

//---| Start quiz function |---//
function runquiz() {   
    // Remove home screen page elements
    document.querySelector("#quizinfo").remove()
    document.querySelector("#startquiz").remove()

    // Generate 'questions' page elements
    document.querySelector("h1").textContent = ""
    answerbuttons = []
    questionnumber = 0

    // // generate empty answer buttons
    generateAnswerButtons()
    
    //---| 'askquestions' function |---//
    // The 'askquestions' function take the value of 'questionnumber' variable and generates the corresponding questions in the html elements from the 'questions' array
    // Each time an answer button is pressed, the question number value increments by 1 and the function is called again with the incremented number as an argument
    // When the questionnumber exceeds the number of questions (length of 'questions' array), the recursion terminates and the endquiz function will execute
    askquestions(questionnumber)
}

function generateAnswerButtons(){
// generate empty answer buttons
for (var j=0 ; j<4 ; j++){
    var tag = document.createElement("button")
    tag.id = `button${j + 1}`
    answerbuttons.push(tag)
    tag.textContent = ""
    tag.style.width = "fit-content"
    document.querySelector("main").appendChild(tag)

    // Add event listeners to buttons which reveal the answer correctness and call the 'askquestions' function upon user click
    // The correct signal lasts 1300 milliseconds before disappearing, when the next questions are given
    answerbuttons[j].addEventListener("click", function(event){
        // This line of code stops buttons being pressed after 
        if (terminate === true){
            return
        }

        // Check user answer for correctness
        if (this.title === "correct"){
            console.log("CORRECT!!")
                        
            // Answer reveal elements constructed and appended to page
            var linespace1 = document.createElement("br")
            var line = document.createElement("hr")
            var linespace2 = document.createElement("br") 
            var correctsignal = document.createElement("p")
            correctsignal.textContent = "Correct!"
            correctsignal.setAttribute("style", "font-size: 23px; color: grey; font-style: italic")
            document.querySelector("main").appendChild(linespace1).id = "removable"
            document.querySelector("main").appendChild(line).id = "removable2"
            document.querySelector("main").appendChild(linespace2).id = "removable3"
            document.querySelector("main").appendChild(correctsignal).id = "removable4"              

            // Disable buttons until new questions are generated
            event.target.disabled = true 

            // Remove answer reveal elements, Generate new questions, Re-enable buttons
            setTimeout(function(){
                document.querySelector("#removable").remove()
                document.querySelector("#removable2").remove()
                document.querySelector("#removable3").remove()
                document.querySelector("#removable4").remove()

                event.target.disabled = false

                questionnumber = questionnumber + 1  
                askquestions(questionnumber)
            } , 900)
        }
        else{
            console.log("INCORRECT!!")

            // Answer reveal elements constructed and appended to page
            var linespace1 = document.createElement("br")
            var line = document.createElement("hr")
            var linespace2 = document.createElement("br") 
            var correctsignal = document.createElement("p")
            correctsignal.textContent = "Incorrect!"
            correctsignal.setAttribute("style", "font-size: 23px; color: grey; font-style: italic")
            document.querySelector("main").appendChild(linespace1).id = "removable"
            document.querySelector("main").appendChild(line).id = "removable2"
            document.querySelector("main").appendChild(linespace2).id = "removable3"
            document.querySelector("main").appendChild(correctsignal).id = "removable4"              

            // Disable buttons until new questions are generated
            event.target.disabled = true

            // Remove answer reveal elements, Generate new questions, Re-enable buttons
            setTimeout(function(){
                document.querySelector("#removable").remove()
                document.querySelector("#removable2").remove()
                document.querySelector("#removable3").remove()
                document.querySelector("#removable4").remove()
                
                event.target.disabled = false

                questionnumber = questionnumber + 1  
                askquestions(questionnumber)
            } , 900)
        }
    }, true)  
}
}


function endquiz(){
    // Generate post-game screen ("all done!", "your final score is ...", "enter initials:____")
    // set startquizclicks = 0, so 'start game' button works again upon returning to homepage
    startquiz_clicks = 0

    // Remove existing elements in 'main'
    for (var i=0; document.querySelector("main").firstChild ; i++){
        document.querySelector("main").firstChild.remove()
    }

    // Add Postgame Screen elements
    var alldone = document.createElement("h1")
    alldone.textContent = "All done!"
    alldone.setAttribute("style", "font-size: x-large; justify-content: center")

    var finalscore = document.createElement("p")
    finalscore.textContent = `Your final score is: ${countdown}.`

    var container = document.createElement("div")
    container.setAttribute("style", "width:360px; display: flex; flex-direction: row; justify-content: space-between; align-items: center")

    var enterinitials = document.createElement("p")
    enterinitials.textContent = "Enter initials:"
    enterinitials.style.marginLeft = "0"

    var textinput = document.createElement("input")
    textinput.type = 'text'


    var textinputsubmit = document.createElement("input")     
    textinputsubmit.type = 'submit'
    textinputsubmit.id = 'submit'
    textinputsubmit.style.height = "24px"

    var makespace = document.createElement("br")
    var makespace1 = document.createElement("br")

    document.querySelector("main").appendChild(alldone).id = "removable"
    document.querySelector("main").appendChild(makespace).id = "removable1"
    document.querySelector("main").appendChild(finalscore).id = "removable2"
    document.querySelector("main").appendChild(makespace1).id = "removable3"
    document.querySelector("main").appendChild(container).id = "removable4"
    document.querySelector("main").childNodes[4].appendChild(enterinitials).id = "removable5"
    document.querySelector("main").childNodes[4].appendChild(textinput).id = "removable6"
    document.querySelector("main").childNodes[4].appendChild(textinputsubmit).id = "removable7"

    // Submit initials button - event listener
    document.querySelector("main").childNodes[4].childNodes[2].addEventListener("click", function(){
        if (textinput.value.length > 0){
            // define 'highscore' object 
            highscore_object = {
                rank: 0,
                initials: textinput.value,
                score: countdown
            }

            // Append user score to localstorage

            // check for existence of 'userscore' key. If it doesn't exist, create one.
            var scorenumber = JSON.parse(localStorage.getItem("userscore1"))
            if (scorenumber === null){
                localStorage.setItem("userscore1", JSON.stringify(highscore_object))
            }

            // if a 'userscore' key exists, check for the highest value one so the new one can be +1
            else{
                num = 0
                
                for (var i = 0; i < localStorage.length; ++i) {
                    var key = localStorage.key(i)

                    if (key.substring(0, 9) === "userscore"){
                        key = key.substring(9)

                        if (key > num){
                            num = key
                        }
                    }
                  }

                  num = Number(num) + 1
                  localStorage.setItem(`userscore${num}`, JSON.stringify(highscore_object))
                }
            
            // run highscores function to generate highscores page
            highscores()
        }

        else {
            console.log("bad input!")
            // display "invalid input element"
        }
    })
}


function highscores(){
    // Remove existing elements in 'main'
    for (var i=0; document.querySelector("main").firstChild ; i++){
        document.querySelector("main").firstChild.remove()
    }

    // Construct highscores object array from localstorage
    var highscorelist = []
    for (var i = 0; i < localStorage.length; ++i) {
        if (localStorage.key(i).substring(0, 9) === "userscore"){
            var key = JSON.parse(localStorage.getItem(localStorage.key(i)))
            highscorelist.push(key)
        }
    }
    //Generate highscores screen ("'Highscores!' title; highscore1, highscore 2, ..., highscore"; 'go back' button; 'clear highscores' button)
    // Heading
    var highscoresheading = document.createElement("h1")
    highscoresheading.textContent = "Highscores!"
    highscoresheading.setAttribute("style", "font-size: x-large; justify-content: center")
    document.querySelector("main").appendChild(highscoresheading)

    // Ordered highscores list (constructed from 'highscorelist' object array)
    var rank = 0
    descendingobjects = []
    for (i=0 ; highscorelist.length > 0 ; i++){
        rank = rank + 1
        scorelist = []
        for (var i=0 ; i < highscorelist.length ; i++){
            scorelist.push(highscorelist[i].score)
        }

        if (highscorelist.length = scorelist.length){
            console.log("BOOMER")
        }
        else{
            console.log("COOMER")
        }

        console.log(scorelist)

        var max = Math.max(...scorelist)
        var index = scorelist.indexOf(max)
        
        highscorelist[index].rank = rank
        descendingobjects.push(highscorelist[index])
        highscorelist.splice(index, 1)
    }
    console.log(descendingobjects)

    // Append Highscore elements

    // Go back button

    // Clear highscores button

}

function homepage(){
    // return to homepage (generate homepage screen), whether from endquiz or highscores page
}

// Create question objects and assemble them into an array
var question1 = {
    title: "QUESTION 1!",
    choices: ["A1 is this", "A2", "Ahioh3", "A4jij ij j"],
    answer: "A2"
}

var question2 = {
    title: "QUESTION 2!",
    choices: ["A1", "A2", "A3", "A4"],
    answer: "A4"
}

var question3 = {
    title: "QUESTION 3!",
    choices: ["A1", "A2", "A3", "A4"],
    answer: "A2"
}

var question4 = {
    title: "QUESTION 4!",
    choices: ["A1", "A2", "A3", "A4"],
    answer: "A1"
}

var question5 = {
    title: "QUESTION 5!",
    choices: ["A1", "A2", "A3", "A4"],
    answer: "A3"
}

var questions = [question1, question2, question3, question4, question5]

// 'askquestions' function asks quiz questions sequentially
terminate = false
function askquestions(questionnumber){
    // terminate recursion step, generate end of quiz page
    if (questionnumber === questions.length){
        console.log("TERMINATING ASKQUESTIONS FUNCTION")
        terminate = true
        
        // Endquiz function loads the quiz endgame screen
        endquiz()
        return
    }

    // Populate empty quiz elements
    for (var j=0 ; j<4 ; j++){
        // Populate question title element
        document.querySelector("h1").textContent = questions[questionnumber].title

        // Populate answer button elements with text
        answerbuttons[j].textContent = questions[questionnumber].choices[j]

        // Assign correct/incorrect to each answer button
        if (answerbuttons[j].textContent === questions[questionnumber].answer){
            answerbuttons[j].title = "correct"
        }
        else {
            answerbuttons[j].title = "incorrect"
        }    
    }
}