const submitBtn = document.querySelector(".btn-primary");

const itemTemplate = (item) => {
  return ` <li class="list-group-item list-group-item-action d-flex align-items-center justify-content-between">
  <span class="item-text">${item.text}</span>
  <div>
    <button data-id="${item._id}" class="edit-me btn btn-secondary btn-sm mr-1">Edit</button>
    <button data-id="${item._id}" class="delete-me btn btn-danger btn-sm">Delete</button>
  </div>
</li>`;
};

let listTemplate = items.map((item) => {
  return itemTemplate(item);
}).join('')
document
  .getElementById("item-list")
  .insertAdjacentHTML("beforeend", listTemplate);
submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const userInput = document.querySelector("#input").value;
  if (userInput) {
    axios
      .post("/create-item", {
        text: userInput,
      })
      .then((res) => {
        document
          .getElementById("item-list")
          .insertAdjacentHTML("beforeend", itemTemplate(res.data));
        document.querySelector("#input").value = "";
      })
      .catch((err) => {
        console.log(err);
      });
  }
});

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-me")) {
    if (confirm("Do you want to delete the item ?")) {
      axios
        .post("/delete-item", {
          id: e.target.getAttribute("data-id"),
        })
        .then((res) => {
          e.target.parentElement.parentElement.remove();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  if (e.target.classList.contains("edit-me")) {
    let userEdit = prompt(
      "Enter your text here...",
      e.target.parentElement.parentElement.querySelector(".item-text").innerHTML
    );

    if (userEdit) {
      axios
        .post("/update-item", {
          text: userEdit,
          id: e.target.getAttribute("data-id"),
        })
        .then((res) => {
          e.target.parentElement.parentElement.querySelector(
            ".item-text"
          ).innerHTML = userEdit;
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
});
