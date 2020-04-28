import { createStore } from "redux";
let input = document.getElementById("input-redux");
let list = document.getElementById("list-redux");

function drawTodos() {
  list.innerHTML = "";
  let todos = store.getState();
  for (let key in todos) {
    let li = document.createElement("li");
    li.id = key;
    let classDone = todos[key].done ? "done" : "";
    li.innerHTML = `
    <span id="${key}" class="${classDone}">${todos[key].text}</span>
    <span data-id="${key}" data-action="delete">X</span>
    `;
    setListeners(li);
    list.appendChild(li);
  }
}

function setListeners(li) {
  li.addEventListener("click", e => {
    if (e.target.getAttribute("data-action") === "delete") {
      let id = e.target.getAttribute("data-id");
      store.dispatch({
        type: "DELETE_TODO",
        id
      });
      return;
    }
    let key = e.target.id;
    let todos = store.getState();
    todos[key].done = !todos[key].done;
    store.dispatch({
      type: "UPDATE_TODO",
      todo: todos[key]
    });
  });
}

input.addEventListener("keydown", e => {
  if (e.key === "Enter") {
    let text = e.target.value;
    let todo = { text, done: false };
    store.dispatch({
      type: "ADD_TODO",
      todo
    });
  }
});

//Reducers
function todosReducer(state = {}, action) {
  switch (action.type) {
    case "ADD_TODO":
      action.todo["id"] = Object.keys(state).length;
      return { ...state, [Object.keys(state).length]: action.todo };
    case "UPDATE_TODO":
      return { ...state, [action.todo.id]: action.todo };
    case "DELETE_TODO":
      delete state[action.id];
      return { ...state };
    default:
      return state;
  }
}

/*REDUX 
  1. Store need one reducer 
*/

//Create store
let store = createStore(todosReducer, {
  0: {
    text: "Created store",
    done: true,
    id: 0
  }
});
store.subscribe(drawTodos);
drawTodos();
