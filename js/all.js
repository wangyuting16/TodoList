let todoData = [];
const add = document.querySelector(".addTodoList")
const todo = document.querySelector(".todo");
const todoList = document.querySelector(".content-todoList");
const filter = document.querySelector(".content-filter");
const deleteIsDoneItem = document.querySelector(".deleteIsDoneItem");
const isToDoneNum = document.querySelector(".isToDoneNum");

//新增代辦事項
add.addEventListener("click", function () {
    if (todo.value.trim() == "") {
        alert("請新增代辦事項!")
    }
    else {
        let data = {
            value: todo.value,
            isDone: false
        }
        todoData.push(data);
        todo.value = "";
        InitTodoList();
    }
})

//切換選單
filter.addEventListener("click", function (e) {
    //取得點選前active所在元素
    const active = document.querySelector(".active");
    //移除該元素的active
    active.classList.remove("active")
    //目前點選的區塊加上active
    e.target.classList.add("active");
    InitTodoList();
})

//勾取 or 叉叉 event
todoList.addEventListener("click", function (e) {
    let event = e.target.getAttribute("data-event");
    let index = e.target.getAttribute("data-num");
    if (event == "check") {
        todoData[index].isDone = !todoData[index].isDone;
    } else if (event == "cross") {
        todoData.splice(index,1);
    }
    InitTodoList();
})

//清除已完成項目
deleteIsDoneItem.addEventListener("click", function () {
    let newData = [];
    todoData.forEach(function (item) {
        if (!item.isDone) {
            newData.push(item);
        }
    })
    todoData = newData;
    InitTodoList();
})

//初始化代辦事項清單
function InitTodoList() {
    //取得點選前active所在元素
    const active = document.querySelector(".active");
    let filterStatus = active.getAttribute("data-filter")
    let str = "";
    let istodonenum = 0;
    todoData.forEach(function (item, index) {
        let icon = item.isDone ? "check" : "square";
        let isCheckClassName = item.isDone ? "isCheck" : "isNotCheck";
        let template = `<li class="${isCheckClassName}">
                            <i class="far fa-${icon} ${icon}" data-num=${index} data-event="check"></i>
                            <p>${item.value}</p>
                            <i class="fas fa-times cross" data-num=${index} data-event="cross"></i>
                        </li>`;
        if (filterStatus == "all") {
            str += template;
        } else if (item.isDone == (filterStatus == "isDone")) {
            str += template;
        }
        //計算待完成項目
        if (!item.isDone) {
            istodonenum++;
        }
    })
    todoList.innerHTML = str;
    isToDoneNum.innerHTML = `${istodonenum} 待完成項目`;
}

InitTodoList();