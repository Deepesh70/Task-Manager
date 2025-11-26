/*
 * State Management
 * Initial state object to hold the list of tasks.
 */
const state = {
    taskList: [],
};

/*
 * DOM Selections
 * Selecting necessary DOM elements for manipulation.
 */
const taskContents = document.querySelector('.task_contents');
const taskModal = document.querySelector('.task_modal_body');

/*
 * HTML Templates
 * Functions to generate HTML content for tasks and modals.
 */
const htmlTaskContent = ({ id, title, description, tags, url }) => `
    <div class="col-md-6 col-lg-4 mt-3" id=${id} key=${id} >
    <div class="card shadow-sm task_card" >
    <div class="card-header d-flex gap-2 justify-content-end task_card_header" >
    
    <button type="button" class="btn btn-outline-info mr-2" name="${id}" onclick="editTask.apply(this, arguments)">
        <i class="fas fa-pencil-alt" name="${id}"></i>
    </button>
    <button type="button" class="btn btn-outline-danger mr-2" name="${id}" onclick="deleteTask.apply(this, arguments)">
        <i class="fas fa-trash-alt" name="${id}"></i>
    </button>
    </div>
    <div class="card-body">
    ${url && `<img width="100%" src=${url} alt="card image cap" class="card-image-top md-3 rounded-lg"/> `}
    <h4 class="task_card_title">${title}</h4>
    <p class="task_card_description">${description}</p>
    <p class="task_card_tags">${tags}</p>
    </div>
    <div class="card-footer" >
        <button
            type="button"
            class="btn btn-outline-primary float-right"
            data-bs-toggle="modal"
            data-bs-target="#showTask"
            id=${id}
            onclick='openTask.apply(this, arguments)'>Open Task</button>
    </div>
    </div>
    </div>
`;

// Modal Content Template 
const htmlModalContent = ({ id, title, description, url, tags }) => {
    const date = new Date(parseInt(id));
    return `
        <div id=${id}>
            ${url && `<img width="100%" src=${url} alt="card image cap" class="img-fluid place_holder_image mb-3"/> `}
            <strong class="text-sm text-muted">Created on ${date.toDateString()}</strong>
            <h3 class="my-3">${title}</h3>
            <p class="lead">${description}</p>
        </div>
    `;
};

/*
 * Local Storage Management
 * Functions to save and load tasks from local storage.
 */
const updateLocalStorage = () => {
    localStorage.setItem('tasks', JSON.stringify({ tasks: state.taskList }));
};

const loadInitialData = () => {
    const localStorageCopy = JSON.parse(localStorage.tasks || '{}');
    if (localStorageCopy.tasks) state.taskList = localStorageCopy.tasks;
    state.taskList.forEach(card => {
        taskContents.insertAdjacentHTML('beforeend', htmlTaskContent(card));
    });
};

/*
 * Event Handlers
 * Functions to handle user interactions like submitting forms and opening tasks.
 */
const handleSubmit = (event) => {
    event.preventDefault();
    const id = `${Date.now()}`;
    const input = {
        url: document.getElementById('imageUrl').value,
        title: document.getElementById('title').value,
        description: document.getElementById('description').value,
        tags: document.getElementById('tags').value,
    };
    if (!input.title || !input.description || !input.tags) {
        alert('All fields are required');
        return;
    }
    taskContents.insertAdjacentHTML('beforeend', htmlTaskContent({ ...input, id }));
    state.taskList.push({ ...input, id });
    updateLocalStorage();
};

// Open Task
const openTask = (e) => {
    if (!e) e = window.event;
    const getTask = state.taskList.find(({ id }) => id === e.target.id);
    taskModal.innerHTML = htmlModalContent(getTask);
};

/* Delete Task */
const deleteTask = (e) => {
    if (!e) e = window.event;
    const targetID = e.target.getAttribute('name');
    // Update state
    state.taskList = state.taskList.filter(({ id }) => id !== targetID);
    // Persist changes
    updateLocalStorage();
    // Remove DOM element
    const taskElem = document.getElementById(targetID);
    if (taskElem) taskElem.remove();
};




// Edit Task

const editTask = (e) => {
    if(!e) e = window.event;

    const targetId = e.target.id;
    const type = e.target.tagName;

    let parentNode;
    let taskTitle;
    let taskDesciption;
    let taskType;
    let submitButton;
 
    if(type == "BUTTON"){
        parentNode = e.target.parentNode.parentNode;

    }else {
        parentNode = e.target.parentNode.parentNode.parentNode;
        
    }

    taskTitle = parentNode.childNodes[3].childNodes[3];
    taskDesciption = parentNode.childNodes[3].childNodes[5];
    taskType = parentNode.childNodes[3].childNodes[7]; 
    submitButton = parentNode.childNodes[5].childNodes[1];
    console.log(taskTitle,submitButton);
}