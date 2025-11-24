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

    </div>

    </div>

`
