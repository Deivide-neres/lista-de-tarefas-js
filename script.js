// Seleção de elementos
const listaForm = document.querySelector('#lista-form');
const editForm = document.querySelector('#edit-form');
const todoInput = document.querySelector('#lista-input');
const editInput = document.querySelector('#search-input');
const cancelEditBtn = document.querySelector('#cancel-edit-btn');
const todoList = document.querySelector('#todo-list');
const filterSelect = document.querySelector('#filter-select');
const searchForms = document.querySelectorAll('#search form'); 
const searchInputs = document.querySelectorAll('#search-input');

let todoBeingEdited = null;

// Gera ID único para cada tarefa
const generateId = () => '_' + Math.random().toString(36).substr(2, 9);

// Salva uma nova tarefa
const saveTodo = (text) => {
    const todo = document.createElement('div');
    todo.classList.add('todo');
    todo.dataset.id = generateId();

    const todoTitle = document.createElement('h3');
    todoTitle.innerText = text;
    todo.appendChild(todoTitle);

    const doneBtn = document.createElement('button');
    doneBtn.classList.add('finish-todo');
    doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
    todo.appendChild(doneBtn);

    const editBtn = document.createElement('button');
    editBtn.classList.add('edit-todo');
    editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
    todo.appendChild(editBtn);

    const removeBtn = document.createElement('button');
    removeBtn.classList.add('remove-todo');
    removeBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    todo.appendChild(removeBtn);

    todoList.appendChild(todo);

    todoInput.value = '';
    todoInput.focus();
};

// Alterna entre formulário de lista e edição
const toggleForms = () => {
    editForm.classList.toggle('hide');
    listaForm.classList.toggle('hide');
    todoList.classList.toggle('hide');
};

// Atualiza tarefa sendo editada
const updateTodo = (text) => {
    if (todoBeingEdited) {
        todoBeingEdited.querySelector('h3').innerText = text;
        todoBeingEdited = null;
    }
};

// Filtra tarefas
const filterTodos = (filterValue) => {
    const todos = document.querySelectorAll('.todo');
    todos.forEach(todo => {
        switch(filterValue){
            case 'all':
                todo.style.display = 'flex';
                break;
            case 'done':
                todo.style.display = todo.classList.contains('done') ? 'flex' : 'none';
                break;
            case 'to-do':
                todo.style.display = !todo.classList.contains('done') ? 'flex' : 'none';
                break;
        }
    });
};

// Pesquisa tarefas
const searchTodos = (query) => {
    const todos = document.querySelectorAll('.todo');
    todos.forEach(todo => {
        const title = todo.querySelector('h3').innerText.toLowerCase();
        todo.style.display = title.includes(query.toLowerCase()) ? 'flex' : 'none';
    });
};

// Eventos
listaForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const inputValue = todoInput.value.trim();
    if(inputValue){
        saveTodo(inputValue);
    }
});

document.addEventListener('click', (e) => {
    const target = e.target;
    const parentElement = target.closest('div.todo');
    if(!parentElement) return;

    if(target.classList.contains('finish-todo')){
        parentElement.classList.toggle('done');
        filterTodos(filterSelect.value);
    }

    if(target.classList.contains('remove-todo')){
        e.preventDefault(); // evita recarregar a página
        parentElement.remove();
    }

    if(target.classList.contains('edit-todo')){
        e.preventDefault();
        toggleForms();
        editInput.value = parentElement.querySelector('h3').innerText;
        editInput.placeholder = '';
        editInput.focus();
        todoBeingEdited = parentElement;
    }  
});

cancelEditBtn.addEventListener('click', (e) => {
    e.preventDefault();
    toggleForms();
    todoBeingEdited = null;
});

editForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const editInputValue = editInput.value.trim();
    if(editInputValue){
        updateTodo(editInputValue);
    }
    toggleForms();
});

// Filtrar tarefas
filterSelect.addEventListener('change', (e) => {
    filterTodos(e.target.value);
});

// Buscar tarefas
searchForms.forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault(); // previne o submit da pesquisa
    });
});

searchInputs.forEach(input => {
    input.addEventListener('input', (e) => {
        searchTodos(e.target.value);
    });
});