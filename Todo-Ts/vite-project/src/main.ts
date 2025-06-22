import './style.css';

interface Todo {
  title: string;
  isCompleted: boolean;
  readonly id: string;
}

const todos: Todo[] = [];

const todoscontainer = document.querySelector(".todoscontainer") as HTMLDivElement;
const todoInput = document.getElementsByName("title")[0] as HTMLInputElement;
const myForm = document.getElementById("myform") as HTMLFormElement;

myForm.onsubmit = (e: SubmitEvent) => {
  e.preventDefault(); // Corrected this line

  const todo: Todo = {
    title: todoInput.value,
    isCompleted: false,
    id: String(Math.random() * 1000),
  };

  todos.push(todo);
  todoInput.value = "";
  renderTodos(todos);
};

const generateTodoItems = (title: string, isCompleted: boolean, id: string) => {
  const todo: HTMLDivElement = document.createElement("div");
  todo.className = "todo";

  // Creating checkbox
  const checkBox: HTMLInputElement = document.createElement("input");
  checkBox.setAttribute("type", "checkbox");
  checkBox.className = "isCompleted";
  checkBox.checked = isCompleted;

  // Creating paragraph
  const paragraph: HTMLParagraphElement = document.createElement("p");
  paragraph.innerHTML = title;
  paragraph.className = checkBox.checked ? "textcut" : "";

  // Handle checkbox toggle
  checkBox.onchange = () => {
    const todoItem = todos.find(item => item.id === id);
    if (todoItem) {
      todoItem.isCompleted = checkBox.checked;
    }
    paragraph.className = checkBox.checked ? "textcut" : "";
  };

  // Creating delete button
  const btn: HTMLButtonElement = document.createElement("button");
  btn.innerText = "X";
  btn.className = "deleteBtn";

  btn.onclick = () => {
    deleteTodo(id);
  };

  // Append all to container
  todo.append(checkBox, paragraph, btn);
  todoscontainer.append(todo);
};

const deleteTodo = (id: string) => {
  const idx = todos.findIndex(item => item.id === id);
  if (idx > -1) {
    todos.splice(idx, 1);
    renderTodos(todos); //  Re-render after deleting
  }
};

const renderTodos = (todos: Todo[]) => {
  todoscontainer.innerHTML = ""; // Clear previous list
  todos.forEach(item => {
    generateTodoItems(item.title, item.isCompleted, item.id);
  });
};
