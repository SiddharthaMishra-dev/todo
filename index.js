let input = document.getElementById("input");
let notes = document.querySelector(".notes");
let msg = document.getElementById("msg");
let form = document.getElementById("form");
let data = [];
form.addEventListener("submit", (e) => {
  e.preventDefault();
  formValidation();
});

let formValidation = () => {
  if (input.value === "") {
    msg.innerHTML = "Notes must not be empty!";
  } else {
    msg.innerHTML = "";
  }
  acceptData();
};

let acceptData = () => {
  data.push({
    text: input.value,
  });
  console.log(data);
  localStorage.setItem("data", JSON.stringify(data));
  createNote();
  input.value = "";
};

let createNote = () => {
  notes.innerHTML = "";
  data.map((note, id) => {
    return (notes.innerHTML += `
        <div class="singleNote" id=${id}>
            <p>${note.text}</p>
            <span class="functions">
              <i onclick="editNote(this)" class="fa-solid fa-pen-to-square"></i>
              <i onclick="removeNote(this)" class="fa-solid fa-trash"></i>
            </span>
          </div>
    `);
  });
};
let editNote = (e) => {
  let selectedNote = e.parentElement.parentElement;
  input.value = selectedNote.children[0].innerHTML;
  removeNote(e);
  // input.value = e.parentElement.previousElementSibling.innerHTML;
};

let removeNote = (e) => {
  e.parentElement.parentElement.remove();
  e.parentElement.parentElement.remove();
  data.splice(e.parentElement.parentElement.id, 1);
  localStorage.setItem("data", JSON.stringify(data));
};
(() => {
  data = JSON.parse(localStorage.getItem("data")) || [];
  createNote();
})();
