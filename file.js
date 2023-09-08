let todoItemsContainer = document.getElementById("todoItemsContainer")
let addTodoButton = document.getElementById("addTodoButton")
let saveTodoButton = document.getElementById("saveTodoButton")

// let todoList = [
//     {
//         text:"Learn HTML",
//         uniqueNo:1
//     },
//     {
//         text:"Learn CSS",
//         uniqueNo:2
//     },
//     {
//         text:"Learn JS",
//         uniqueNo:3
//     }
// ]

todoList = getTodoListFromLocalStorage()

let todoCount = todoList.length

function createAndAppendTodo(todo){
    let checkboxId = "checkbox" + todo.uniqueNo
    let labelId = "label" + todo.uniqueNo
    let todoId = "todo" + todo.uniqueNo

    let todoElement = document.createElement("li")
    todoElement.classList.add("todo-item-container", "d-flex", "flex-row")
    todoElement.id = todoId
    todoItemsContainer.appendChild(todoElement)

    let inputElement = document.createElement("input")
    inputElement.type = "checkbox"
    inputElement.id = checkboxId
    inputElement.classList.add("checkbox-input")
    inputElement.checked = todo.ischecked
    inputElement.onclick = function(){
        labelElement.classList.toggle("checked")

        let todoObjectIndex = todoList.findIndex(function(eachTodo){
            let eachTodoId = "todo" + eachTodo.uniqueNo

            if(eachTodoId === todoId){
                return true
            }
            else{
                return false
            }
        })

        let todoObject = todoList[todoObjectIndex]

        if(todoObject.ischecked === true){
            todoObject.ischecked = false
        }
        else{
            todoObject.ischecked = true
        }
    }
    todoElement.appendChild(inputElement)

    let labelContainer = document.createElement("div")
    labelContainer.classList.add("label-container", "d-flex", "flex-row")
    todoElement.appendChild(labelContainer)

    let labelElement = document.createElement("label")
    labelElement.classList.add("checkbox-label")
    labelElement.setAttribute("for",checkboxId)
    labelElement.textContent = todo.text
    labelElement.id = labelId
    if(todo.ischecked === true){
        labelElement.classList.add("checked")
    }
    labelContainer.appendChild(labelElement)

    let deleteIconContainer = document.createElement("div")
    deleteIconContainer.classList.add("delete-icon-container")
    labelContainer.appendChild(deleteIconContainer)

    let deleteIcon = document.createElement("i")
    deleteIcon.classList.add("far", "fa-trash-alt","delete-icon")
    deleteIcon.onclick = function(){
        todoItemsContainer.removeChild(todoElement)
        let deleteElementIndex = todoList.findIndex(function(eachTodo){
            let eachTodoId = "todo" + eachTodo.uniqueNo;

            if (eachTodoId === todoId) {
                return true;
            } 
            else {
                return false;
            }
        })
        todoList.splice(deleteElementIndex,1)
    }
    labelContainer.appendChild(deleteIcon)

}

addTodoButton.onclick = function(){
    let userInputElement = document.getElementById("todoUserInput")
    let userInputValue = userInputElement.value

    if(userInputValue === ""){
        alert("Please enter valid text")
        return
    }

    todoCount = todoCount+1

    let newTodo = {
        text: userInputValue,
        uniqueNo:todoCount+1
    }
    todoList.push(newTodo)

    createAndAppendTodo(newTodo)
    userInputElement.value = ""


}

saveTodoButton.onclick = function(){
    localStorage.setItem("todoList",JSON.stringify(todoList))
}

function getTodoListFromLocalStorage(){
    let stringifiedTodoList = localStorage.getItem("todoList")
    let parsedTodoList = JSON.parse(stringifiedTodoList)

    if(parsedTodoList === null){
        return []
    }
    else{
        return parsedTodoList
    }
}

for(let todo of todoList){
    createAndAppendTodo(todo)
}

