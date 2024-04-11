let input=document.querySelector("input")
let button=document.querySelector(".task-done")
let priority=document.querySelector("#tasks")
var lowpriority=document.querySelector(".lowpriority")
var highpriority=document.querySelector(".highpriority")
var middlepriority=document.querySelector(".middlepriority")
var listpriority1=document.querySelector(".listofpriority1")
var listpriority2=document.querySelector(".listofpriority2")
var listpriority3=document.querySelector(".listofpriority3")
var lowpriorityvaluels=[]
var highpriorityvaluels=[]
var middlepriorityvaluels=[]
const getLocalstoragefromLS=(key)=>{
        return JSON.parse(localStorage.getItem(key))
}
addtoLocalStorage=(key,value,arr)=>{
    arr.push(value)
    if(key!="default-value"){
    localStorage.setItem(key,JSON.stringify(arr))
    }
}

const add=(value,key)=>{
    var listoftask=document.createElement("li")
    listoftask.innerHTML=`<div class="tasktext">${value}</div> <div class="icons"><img class="tick" src="check.svg" alt=""><img src="trash.svg" class="cross" alt=""></div>`
    if(priority.value=="High"||key=="High"){
        listpriority1.appendChild(listoftask)
        addtoLocalStorage(priority.value,value,lowpriorityvaluels)
    }
    else if(priority.value=="Middle"||key=="Middle"){
        listpriority2.appendChild(listoftask)
        addtoLocalStorage(priority.value,value,middlepriorityvaluels)
    }
    else if(priority.value=="Low"||key=="Low"){
        listpriority3.appendChild(listoftask)
        addtoLocalStorage(priority.value,value,highpriorityvaluels)
    }
    input.value=""
    let tick=listoftask.querySelector(".tick")
    let cross=listoftask.querySelector(".cross")
    tick.addEventListener("click",()=>{
        listoftask.style.backgroundColor="#6eeb34"
        let tick=listoftask.querySelector(".tick")
        tick.remove()
        overflowingY()
   })
     cross.addEventListener("click",()=>{
        let ele=listoftask
        var valuetoremove=ele.querySelector(".tasktext").innerText
        var parentelementofdi=ele.parentElement
        var key1=null
       if(parentelementofdi==listpriority2){
            key1="Middle"
        }
        else if(parentelementofdi==listpriority1){
            key1="High"
        }
        else if(parentelementofdi==listpriority3){
            key1="Low"
        }
        
       
        listoftask.remove()
        if(key1=="High"){
            var storedArrayString=localStorage.getItem(key1)
            var storedArray=JSON.parse(storedArrayString)
            var indexofdeleteitemfromls=storedArray.indexOf(valuetoremove)
            storedArray.splice(indexofdeleteitemfromls,1)
            localStorage.setItem(key1,JSON.stringify(storedArray))
        }
        if(key1=="Middle"){
            var storedArrayString=localStorage.getItem(key1)
            var storedArray=JSON.parse(storedArrayString)
            var indexofdeleteitemfromls=storedArray.indexOf(valuetoremove)
            storedArray.splice(indexofdeleteitemfromls,1)
            localStorage.setItem(key1,JSON.stringify(storedArray))
        }
        if(key1=="Low"){
            var storedArrayString=localStorage.getItem(key1)
            var storedArray=JSON.parse(storedArrayString)
            var indexofdeleteitemfromls=storedArray.indexOf(valuetoremove)
            storedArray.splice(indexofdeleteitemfromls,1)
            localStorage.setItem(key1,JSON.stringify(storedArray))
        }
        overflowingY()
     })
    }
    button.addEventListener("click",()=>{
        if(input.value==""||input.value.trim()==""){
            alert("Enter a valid task")
        }
        else{
            if(priority.value=="default-value"){
                alert("Please Choose priority of the task")
            }
            else{
                add(input.value,null)
            }
            overflowingY()
        }
    })
 function overflowingY(){
    if(lowpriority.scrollHeight>lowpriority.clientHeight){
        lowpriority.style.overflowY='scroll'
    }
    else{
        lowpriority.style.overflowY='hidden'

    }
    if(middlepriority.scrollHeight>middlepriority.clientHeight){
        middlepriority.style.overflowY='scroll'
    }
    else{
        middlepriority.style.overflowY='hidden'

    }
    if(highpriority.scrollHeight>highpriority.clientHeight){
        highpriority.style.overflowY='scroll'
    }
    else{
        highpriority.style.overflowY='hidden'

    }
 }
 showfirsttime()
 function showfirsttime(){
    for (let index = 0; index < localStorage.length; index++) {
        var key=localStorage.key(index)
        var values=JSON.parse(localStorage.getItem(key))
        if(values&&(Array.isArray(values))){
        values.forEach(element => {
            add(element,key)
            
        });
    }
    }
 }