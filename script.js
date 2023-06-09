import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"


const appSettings = {
  databaseURL:"https://soloprojectscrimba-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const remindersInDB = ref(database, "Reminder")
//console.log(app)

const textInputFieldEl = document.getElementById("text-input")
const publishBtn = document.getElementById("publish-btn")
const reminderListEL = document.getElementById("reminder-list")


//================================================================
// add reminder to the Db nad app screen
publishBtn.addEventListener("click", function(){
  let inputValue = textInputFieldEl.value

  push(remindersInDB, inputValue )

  clearReminderInputEl()
})

//================================================================
// fetch reminder from the DB to display
onValue(remindersInDB, function(snapshot){
  
  if(snapshot.exists()){
    let reminderArray = Object.entries(snapshot.val())

    clearReminderListEl()

    for(let i = 0; i < reminderArray.length; i++){
      let currentReminder = reminderArray[i]
      let currnetReminderID = currentReminder[0]
      let currnetReminderValue = currentReminder[1]
      
      appendReminderToReminderListEl(currentReminder)
    }
  } else {
      reminderListEL.innerHTML = `<p style="background-color:wheat; text-align:center">Nothing to remember</p>`
  }
})


// ================================================================
function clearReminderInputEl(){
  textInputFieldEl.value = ""
}
function clearReminderListEl(){
  reminderListEL.innerHTML = ""
}

function appendReminderToReminderListEl(reminder){
  let reminderID = reminder[0]
  let reminderValue = reminder[1]

  // append new reminder to the list and the DB
  let newReminderEl=document.createElement("p")
  newReminderEl.innerHTML = reminderValue

  //remove a reminder from the list and the DB
  newReminderEl.addEventListener("dblclick", function(){
    
    let exactLocationOfReminderInDB = ref(database, `Reminder/${reminderID}`)
    remove(exactLocationOfReminderInDB)
  })
  reminderListEL.append(newReminderEl)
}