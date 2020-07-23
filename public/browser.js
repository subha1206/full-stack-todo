document.addEventListener("click", (e) => {
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
          console.log(res)
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
});
