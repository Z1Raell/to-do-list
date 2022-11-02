let input = document.querySelector('#input');
let add = document.querySelector('.add');
let toDoList = [];
let list = document.querySelector(".to-do_list");
let toDOItems = document.querySelectorAll(".todo-items");







if (localStorage.getItem('token')) {
    toDoList = (JSON.parse(localStorage.getItem('token')))
    dispalytoDo();
}

list.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete')) {
        let neadParentTarget = e.target.parentElement.parentElement;
        toDoList.splice(+(neadParentTarget.getAttribute('data-id')), 1);
        localStorage.setItem('token', JSON.stringify(toDoList));
        dispalytoDo();
    }

    if (e.target.classList.contains('compleat')) {
        let neadParentTarget = e.target.parentElement.parentElement;
        toDoList.forEach((item, i) => {
            console.log(+neadParentTarget.getAttribute('data-id') === i);
            if (+neadParentTarget.getAttribute('data-id') === i) {
                item.checked = !item.checked
            }
        });
        localStorage.setItem('token', JSON.stringify(toDoList));
        dispalytoDo();
    }

})


add.addEventListener('click', () => {
    if (input.value === '') {
        return;
    }
    let task = {
        description: input.value,
        checked: false
    }
    toDoList.push(task);
    localStorage.setItem('token', JSON.stringify(toDoList))
    dispalytoDo();
    if (toDoList.length === 0) {
        list.innerHTML = '';
    }

    input.value = '';

});




function dispalytoDo() {
    let displayMessage = '';
    if (!toDoList.length) {
        list.innerHTML = '';
    }
    toDoList.forEach((item, i) => {
        displayMessage += `
         <div class="todo-items ${item.checked ? 'compleated' : ''}" data-id="${i}">
             <p>
                ${item.description}
             </p>
             <div>
                <button class="compleat">
                     &#10004;
                </button>
                <button class="delete">
                    &#10008;
                </button>
             </div>
       </div>
       `
        list.innerHTML = displayMessage
    })
}



