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
  document.addEventListener("DOMContentLoaded", loadOrder);
};

let draggedItem = null;

// Function to handle the drag start event when starting to reorder
function handleDragStart(e) {
  e.dataTransfer.effectAllowed = "move";
  e.dataTransfer.setData("text/plain", e.target.id);
  draggedItem = e.target;
  draggedItem.classList.add("dragging");
}

// Function to handle the drag over event during reordering
function handleDragOver(e) {
  e.preventDefault();
}

// Function to handle the drag enter event during reordering
function handleDragEnter(e) {
  e.preventDefault();
  if (e.target !== draggedItem && e.target.tagName === "LI") {
    e.target.classList.add("reordering");
  }
}

// Function to handle the drag leave event during reordering
function handleDragLeave(e) {
  e.preventDefault();
  e.target.classList.remove("reordering");
}

// Function to handle the drag end event when reordering ends
function handleDragEnd(e) {
  e.preventDefault();
  draggedItem.classList.remove("dragging");
  const listItems = document.querySelectorAll("#items li");
  listItems.forEach((item) => item.classList.remove("reordering"));
  saveOrder(); // Save the updated order to local storage
}

// Function to handle the drop event when reordering is completed
function handleDrop(e) {
  e.preventDefault();
  const reorderItem = e.target;
  if (reorderItem !== draggedItem && reorderItem.tagName === "LI") {
    const items = document.getElementById("items");
    const newOrder = Array.from(items.children);
    const draggedIndex = newOrder.indexOf(draggedItem);
    const reorderIndex = newOrder.indexOf(reorderItem);

    // Update the order of list items
    if (draggedIndex < reorderIndex) {
      items.insertBefore(draggedItem, reorderItem.nextSibling);
    } else {
      items.insertBefore(draggedItem, reorderItem);
    }

    // Dynamically update the numbering
    updateNumbering();

    // Save the updated order to local storage
    saveOrder();
  }
}

// Function to save the order of list items to local storage
function saveOrder() {
  const listItems = document.querySelectorAll("#items li");
  const order = [];
  listItems.forEach((item) => {
    order.push(item.id);
  });
  localStorage.setItem("itemOrder", JSON.stringify(order));
}

// Function to load the order of list items from local storage
function loadOrder() {
  const order = JSON.parse(localStorage.getItem("itemOrder"));
  if (order) {
    const items = document.getElementById("items");
    order.forEach((itemId) => {
      const item = document.getElementById(itemId);
      if (item) {
        items.appendChild(item);
      }
    });

    // Update the numbering when loading the order
    updateNumbering();
  }
}

// function that adds new item to the list
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
  li.setAttribute("draggable", "true");

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

  li.addEventListener("dragstart", handleDragStart);
  li.addEventListener("dragover", handleDragOver);
  li.addEventListener("dragenter", handleDragEnter);
  li.addEventListener("dragleave", handleDragLeave);
  li.addEventListener("drop", handleDrop);
  li.addEventListener("dragend", handleDragEnd);

  items.appendChild(li);

  saveOrder();
}

// function that removes item from the list
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

function updateNumbering() {
  const listItems = document.querySelectorAll("#items li");
  listItems.forEach((item, index) => {
    const numberSpan = item.querySelector(".item-number");
    if (numberSpan) {
      numberSpan.textContent = index + 1 + ". ";
    }
  });
}

function toggleButton(ref, btnID) {
  document.getElementById(btnID).disabled = false;
}
