import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"


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

publishBtn.addEventListener("click", function(){
  let inputValue = textInputFieldEl.value

  push(remindersInDB, inputValue )

  console.log(`${inputValue} in database`)
})

