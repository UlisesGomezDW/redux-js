let inputJS = document.getElementById("input-js");
let list = document.getElementById("list-clasic");
let todos = {
  0: {
    text: "Ir al cine",
    done: false
  },
  1: {
    text: "Ir al baño",
    done: true
  },
  2: {
    text: "Ir a comer",
    done: false
  }
};

function drawTodos() {
  list.innerHTML = "";
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
      let key = e.target.getAttribute("data-id");
      delete todos[key];
      drawTodos();
      return;
    }
    let key = e.target.id;
    todos[key].done = !todos[key].done;
    drawTodos();
  });
}

inputJS.addEventListener("keydown", e => {
  if (e.key === "Enter") {
    let text = e.target.value;
    let id = Object.keys(todos).length;
    todos[id] = { text, done: false };
    drawTodos();
  }
});

drawTodos();
