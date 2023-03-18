'use strcit';

const taskInput = document.querySelector('#add-task__input');
const addTaskBtn = document.querySelector('#add-task__button');
const taskList = document.querySelector('#todo-list');
const deleteList = document.querySelector('#delete-list');
const listTitle = document.querySelector('#list-title');
const todoBody =  document.querySelector('#todo-body')
let saveTodoList = localStorage.getItem('save-list');
let saveListTitle = localStorage.getItem('list-title');


 

 


window.addEventListener('load', () => {
 
  if(saveTodoList) {
    taskList.innerHTML = saveTodoList;
    deleteList.classList.add('_visible');
    
  };

  if(saveListTitle) {
    listTitle.value = saveListTitle;
  }

  if(listTitle) {
    let listTitleValue = listTitle.value;
      listTitle.addEventListener('focus', () => {
        listTitle.value = '';
      });
      listTitle.addEventListener('blur', () => {
          if(listTitle.value === '') {
            listTitle.value = listTitleValue;
          };
          localStorage.setItem('list-title',listTitle.value);
      });
     
  }

  


});



const removeTask = () => {
  
  let removeItem  = document.querySelector('._del');
  let parent = removeItem.parentNode;
  parent.removeChild(removeItem);

};

const addTask = () => {
   let taskName = taskInput.value;
   
   if(taskInput.value === '') {
     taskInput.classList.add('_error');
     taskInput.placeholder = 'Fill the blank';
   } else {
    let newTask= `<li class="todo-list__item todo-item">
    <p class="todo-item__text">${taskName}</p>
    <div class="todo-item__icon">
        <button id="done-btn"  type="button"><span class="button_icon-checkmark _icon-checkmark"></span></button>
        <button id="del-btn" type="button"><span class="_icon-cross"></span></button>
    </div>
 </li>`;
   taskList.innerHTML += newTask;
   taskInput.classList.remove('_error');
   taskInput.value = '';
   taskInput.placeholder = 'New Task';
   };
   const taskItems = document.querySelectorAll('.todo-item');
   if(taskItems.length !== 0) {
      deleteList.classList.add('_visible');
   }
  
  
}

document.addEventListener('click', e => {
    let target = e.target;
    if(target.closest('#add-task__button')) {
         addTask();
    }

    if(target.closest('#done-btn')) {
      target.parentElement.parentElement.parentElement.classList.toggle('_done');
   
    } else if (target.closest('#del-btn')) {
      target.parentElement.parentElement.parentElement.classList.toggle('_del');
      removeTask();
    }

    if(target.closest('#delete-list')) {
        taskList.innerHTML = '';
        deleteList.classList.remove('_visible');
      
    }
    localStorage.setItem('save-list', taskList.innerHTML);
   
})