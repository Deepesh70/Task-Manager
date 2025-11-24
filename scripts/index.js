const state = {
    taskList: [],
};

const taskContents = document.querySelector(".task_contents");
const taskModal = document.querySelector(".task_modal_body");

const htmlTaskContent = ({ id, title, description, tags, imageUrl }) => `
    <div class="col-md-6 col-lg-4 mt-3" id=${id} key=${id} >
    <div class="card shadow-sm task_card" >
    <div class="card-header d-flex gap-2 justify-content-end task_card_header" >
    
    <button type="button" class="btn btn-outline-info mr-2" name=${id} ">
    <i class="fas fa-pencil-alt " name=${id} ></i>
    </button>
    <button type="button" class="btn btn-outline-danger mr-2" name=${id} ">
    <i class="fas fa-trash-alt " name=${id} ></i>
    </button>

    </div>
    <div class="card-body">
    ${url && `<img width="100%" src=${url} alt="card image cap class="card-image-top md-3 rounded-lg"/> `} 
    <h4 class="task_card_title">${title}</h4    >
    <p class="task_card_description">${description}</p>
    <p class="task_card_tags">${tags}</p>
    </div> 

    <div class="card-footer">
    <button
        type="button"
        class="btn btn-outline-primary float-right"
        data-bs-toggle="modal"
        data-bs-target="#taskModal"

    >Open Task
    </button>
    </div>
    </div>

    </div>

`;


const htmlModalContent = ({id, title, description, url, tags}) => {
    const date = new Date(parseInt(id));
    return `
    <div id=${id}>
         ${url && `<img width="100%" src=${url} alt="card image cap class="img-fluid place_holder_image mb-3"/> `} 
         <strong class="text-sm text-muted">Created on ${date.toDateString()}</strong>
         <h3 class="my-3">${title}</h3>
         <p class="lead">${description}</p>

    </div>
    `;
}


const updateLocalStorage = () => {
    localStorage.setItem(
        "task", JSON.stringify({ tasks: state.taskList,})
    );
};

const loadInitialData= () => {
    const localStorageCopy = JSON.parse(localStorage.tasks);

    if(localStorageCopy) state.taskList = localStorageCopy.tasks;

    state.taskList.map((cardDate) => {
        taskContents.insertAdjacentHTML("beforeend", htmlTaskContent(cardDate));
    });
};

const hadleSubmit = (event) => {
    const id = `${Date.now()}`;
    const input = {
        url: document.getElementById("imageUrl").value,
        title: document.getElementById("title").value,
        description: document.getElementById("description").value,
        tags: document.getElementById("tags").value,
    };

    taskContents.insertAdjacentHTML(
        "beforeend",
        htmlTaskContent({
            ...input,
            id,
        })
    )
    state.taskList.push({
        ...input,
        id,
    })
    updateLocalStorage();
    
}