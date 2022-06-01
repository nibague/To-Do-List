// select elemnts in DOM
const form = document.querySelector("#itemForm")
const itemInput = document.querySelector("#itemInput")
const itemList = document.querySelector("#itemList")
const filters = document.querySelectorAll(".nav-item")
const alertDiv = document.querySelector("#message");

// create an empty item list
let todoItems = [];


//filter items
const getItemsFilter = function(type){
    let filterItems = [];
    switch (type) {
        case 'todo':
            filterItems = todoItems.filter((item)=> !item.isDone);
            break;
        case 'done':
            filterItems = todoItems.filter((item)=> item.isDone);
            break;
        default:
            filterItems = todoItems;
    };
    getList(filterItems);
};

//delete item
const removeItem = function (item) {
    const removeIndex = todoItems.indexOf(item);
    todoItems.splice(removeIndex, 1);
}


//update item
const updateItem = function (currentItemIndex, value){
    const newItem = todoItems[currentItemIndex];
    newItem.name = value;
    todoItems.splice(currentItemIndex, 1, newItem);
    setLocalStorage(todoItems);

}

const handleItem = function(itemData){
    const items = document.querySelector('.list-group-item');
    items.forEach((item)=>{
        //done

        if(item.querySelector('.title').getAttribute('data-time') == itemData.addedAt) {
            item.querySelector('[data-done]').addEventListener('click', function(e) {
                e.preventDefault();

                const itemIndex = todoItems.indexOf(itemData);
                const currentItem = todoItems[itemIndex];

                const currentClass = currentItem.isDone
                  ? "bi-check-circle-fill"
                  : "bi-check-circle";

                currentItem.isDone = currentItem.isDone ? false :true;
                todoItems.splice(itemIndex, 1, currentItem);
                setLocalStorage(todoItems);

                const iconClass = currentItem.isDone
                    ? "bi-check-circle-fill"
                    : "bi-check-circle";


                this.firstElementChild.classList.replace(currentClass, iconClass);
                const filterType = document.querySelector("#tabValue").value;
                getItemsFilter(filterType);

            });

            //edit
            item.querySelector("[data-edit]").addEventListener("click", function (e) {
                e.preventDefault();
                itemInput.value = itemData.name;
                document.querySelector("#objIndex").value = todoItems.indexOf(itemData);
            });

            //delete
            item.querySelector("[data-delete]").addEventListener("click", function (e) {
                e.preventDefault();
                if (confirm("Are you sure you want to remove this item?")) {
                    itemsList.removeChild(item);
                    removeItem(itemData);
                    setLocalStorage(todoItems);
                    alertMessage("Item has been deleted", "alert-success");
                    return todoItems.filter((item) => item != itemData);
                };
            });
        };


    });

};


//show the data from localstorage in the list
const getList = function(todoItems){
    itemList.innerHTML = ""
    if(todoItems.length > 0){
        todoItems.forEach((item) => {

            const iconClass = item.isDone ? "bi-check-circle-fill" : "bi-check-circle";

            let liTag = `<li class="list-group-item d-flex justify-content-between align-items-center">
            <span class="title" data-time=${item.addedAt}>${item.name}</span>
            <span>
                <a href="#" data-done> <i class="bi ${iconClass} green"></i></a>
                <a href="#" data-edit> <i class="bi bi-pencil-square blue "></i></a>
                <a href="#" data-delete> <i class="bi bi-trash red"> </i>
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
    filters.forEach((tab)=> {
        tab.addEventListener('click', function (e) {
            e.preventDefault();
            const tabType = this.getAttribute('data-type');
            document.querySelectorAll('.nav-link').forEach((nav)=> {
                nav.classList.remove('active');
            });
            this.firstElementChild.classList.add('active');
            getItemsFilter(tabType);
            document.querySelector('#tabValue').value = tabType;
        });


    });
    //load items
    getLocalStorage();

});