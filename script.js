// select elemnts in DOM
const form = document.querySelector("#itemForm")
const itemInput = document.querySelector("#itemInput")
const itemList = document.querySelector("#itemList")
const filters = document.querySelectorAll(".nav-item")
const alertDiv = document.querySelector("#message");

// create an empty item list
let todoItems = [];

//show the data from localstorage in the list
const getList = function(todoItems){
    itemList.innerHTML = ""
    if(todoItems.length > 0){
        todoItems.forEach((item) => {

            const iconClass = item.isDone ? "bi-check-circle-fill" : "bi-check-circle";

            let liTag = `<li class="list-group-item d-flex justify-content-between align-items-center">
            <span>${item.name}</span>
            <span>
                <a href="#"> <i class="bi ${iconClass} green"></i></a>
                <a href="#"> <i class="bi bi-pencil-square blue "></i></a>
                <a href="#"> <i class="bi bi-trash red"> </i>
                </a>
            </span>
        </li>`;
            itemList.insertAdjacentHTML('beforeend', liTag)
        })
    }else{
        let liTag = `
        <li class="list-group-item d-flex justify-content-between align-items-center">
               <span>No Records Found.</span>
        </li>`;
        itemList.insertAdjacentHTML("beforeend", liTag);
    }
}

//get items from local Storage
const getLocalStorage = function(){
    const todoStorage = localStorage.getItem('todoItems')
    if(todoStorage === "undefined" || todoStorage === null){
        todoItems = []
    }else{
        todoItems = JSON.parse(todoStorage);
    };
    console.log("items", todoItems)
    getList(todoItems)
};



//set in local storage

const setLocalStorage = function(todoItems){
    localStorage.setItem('todoItems', JSON.stringify(todoItems));
}

document.addEventListener("DOMContentLoaded", ()=>{
    form.addEventListener("submit", (e) =>{
        e.preventDefault();
        const itemName = itemInput.value.trim();
        if(itemName.length === 0){
            alert('Please enter a task....')
        }
        else{
            const currentItemIndex = document.querySelector('#objIndex').value;
            if (currentItemIndex) {
                //update items
                updateItem(currentItemIndex, itemName);
                document.querySelector('#objIndex').value = '';
                alert('Item has been updated')
            }else {
                const itemObj = {
                    name: itemName,
                    isDone: false,
                    addedAt: new Date().getTime()
                };
                todoItems.push(itemObj);
                setLocalStorage(todoItems);
                alert('New item has been added')
            };
            getList(todoItems);
        }
        itemInput.value = '';
    });


    //filter tabs








});