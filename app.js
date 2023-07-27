img = document.createElement("img");
img.src = "./thumbsUp.png";
let counter = 1;

window.onload = () => {
  const form1 = document.querySelector("#addForm");

  let items = document.getElementById("items");
  let submit = document.getElementById("submit");

  let editItem = null;

  form1.addEventListener("submit", addItem);
  items.addEventListener("click", removeItem);
};

function addItem(e) {
  e.preventDefault();

  if (submit.value != "Submit") {
    editItem.target.parentNode.childNodes[1].data =
      document.getElementById("item").value;

    submit.value = "Submit";
    document.getElementById("item").value = "";

    let success = document.querySelector("h2");
    success.appendChild(img);

    setTimeout(function () {
      success.removeChild(img);
    }, 2000);

    return false;
  }

  let newItem = document.getElementById("item").value;
  if (newItem.trim() == "" || newItem.trim() == null) return false;
  else document.getElementById("item").value = "";

  let success = document.querySelector("h2");
  success.appendChild(img);

  setTimeout(function () {
    success.removeChild(img);
  }, 2000);

  let li = document.createElement("li");
  li.className = "list-group-item";

  let deleteButton = document.createElement("button");

  deleteButton.className = "btn-danger btn btn-sm float-right delete";

  deleteButton.appendChild(document.createTextNode("Delete"));

  let editButton = document.createElement("button");

  editButton.className = "btn-success btn btn-sm float-right edit";
  editButton.appendChild(document.createTextNode("Edit"));

  // numbering
  let numberSpan = document.createElement("span");
  numberSpan.className = "item-number";
  numberSpan.appendChild(document.createTextNode(counter + ". "));
  li.appendChild(numberSpan);
  counter++;

  li.appendChild(document.createTextNode(newItem));
  li.appendChild(editButton);
  li.appendChild(deleteButton);

  li.setAttribute("data-item-text", newItem);
  items.appendChild(li);
}

function removeItem(e) {
  e.preventDefault();
  if (e.target.classList.contains("delete")) {
    if (confirm("Are you Sure?")) {
      let li = e.target.parentNode;
      items.removeChild(li);
      let success = document.querySelector("h2");
      success.appendChild(img);

      //   remake the number positions
      counter--;
      renumberItems();

      setTimeout(function () {
        success.removeChild(img);
      }, 2000);
    }
  }
  if (e.target.classList.contains("edit")) {
    document.getElementById("item").value =
      e.target.parentNode.getAttribute("data-item-text");
    submit.value = "EDIT";
    editItem = e;
  }
}

function renumberItems() {
  // Get all the list items
  const listItems = items.querySelectorAll("li");

  // Reset the counter
  counter = 1;

  // Update the numbering for each list item
  listItems.forEach((li) => {
    const numberSpan = li.querySelector(".item-number");
    if (numberSpan) {
      numberSpan.textContent = counter + ". ";
      counter++;
    }
  });
}

function toggleButton(ref, btnID) {
  document.getElementById(btnID).disabled = false;
}
