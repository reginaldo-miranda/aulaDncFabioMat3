/*let tasks = [
    {id: 1, description: 'comprar pao' , checked: false},
    {id: 2, description: 'passear com o cachorro' , checked: false},
    {id: 3, description: 'fazer almoco', checked: false},
]*/
const getTasksFromLocalStorage = () => {
    const localTasks = JSON.parse(window.localStorage.getItem('tasks'));
    return localTasks ? localTasks : [];
}

const setTasksInLocalStorage = (tasks) => {
    window.localStorage.setItem('tasks', JSON.stringify(tasks));
}
const removeTask = (taskId) => {
    const tasks = getTasksFromLocalStorage();
    const updatedTasks = tasks.filter(({id}) => parseInt(id) !== parseInt(taskId));
    setTasksInLocalStorage(updatedTasks)

    document
    .getElementById("todo-list")
    .removeChild(document.getElementById(taskId));
}

const removeDoneTasks = () => {
    const tasks = getTasksFromLocalStorage();
    const tasksToRemove = tasks
    .filter(({checked}) => checked)
    .map(({id}) => id)
    const updatedTasks = tasks.filter(({ checked}) => !checked);
    setTasksInLocalStorage(updatedTasks)

    tasksToRemove.forEach((taskToRemove) => {
        document
        .getElementById("todo-list")
        .removeChild(document.getElementById(taskToRemove));
        
    })

}
const createTaskListItem = (task, checkbox) => {

    const list = document.getElementById('todo-list');

  
    const toDo = document.createElement('li');

    const removeTaskButton = document.createElement("button");

   
    removeTaskButton.textContent = 'x';
    removeTaskButton.ariaLabel = 'Remover tarefa';
   
    removeTaskButton.onclick = () => removeTask(task.id);


    toDo.id = task.id;
    toDo.appendChild(checkbox);
    toDo.appendChild(removeTaskButton);
   
    list.appendChild(toDo);

    return toDo;
}

const onCheckboxClick = (event) => {
  const [id] = event.target.id.split('-');
  const tasks = getTasksFromLocalStorage();

  const updatedTasks = tasks.map((task) => {
    
    return parseInt(task.id) === parseInt(id)
        ? { ...task, checked: event.target.checked}
    : task
    })
    setTasksInLocalStorage(updatedTasks)
}

const getCheckboxImput = ({id, description, checked}) => {
    const checkbox = document.createElement('input');
    const label = document.createElement('label');
    const Wrapper = document.createElement('div');
    const checkboxId = `${id}-checkbox`;

    checkbox.type = 'checkbox';
    checkbox.id = checkboxId;
    checkbox.checked = checked || false;
    checkbox.addEventListener('change' , onCheckboxClick)

    label.textContent = description;
    label.htmlFor = checkboxId;
    Wrapper.className = 'checkbox-label-container';

    Wrapper.appendChild(checkbox);
    Wrapper.appendChild(label);

    return Wrapper;
}

const getNewTaskId = () => {
    const tasks = getTasksFromLocalStorage()
    const lastId = tasks[tasks.length - 1]?.id;
    return lastId ? lastId + 1 : 1;
}

const getNewTaskData = (event) => {
    const description = event.target.elements.description.value;
    const id = getNewTaskId();
    return {description, id};
}



const createTask = (event) => {
    event.preventDefault();
    const newTaskData = getNewTaskData(event);

    const checkbox = getCheckboxImput(newTaskData);
    createTaskListItem(newTaskData, checkbox);


    const tasks = getTasksFromLocalStorage();

    const updatedTasks = [
        ...tasks,
        { id: newTaskData.id, description: newTaskData.description, checked: false }
    ]
    setTasksInLocalStorage(updatedTasks)
    document.getElementById('description').value = ''
} 

window.onload = function() {
    const form = document.getElementById('create-todo-form');
    form.addEventListener('submit', createTask);

    const tasks = getTasksFromLocalStorage();

    tasks.forEach((task) => {
        const checkbox = getCheckboxImput(task);
       
        createTaskListItem(task, checkbox);
      
    });
}
