const params = new URLSearchParams(window.location.search);
let id = params.get("appId");
let lastId = localStorage.getItem("lastId");

console.log(lastId);
const URL = id ? "https://striveschool-api.herokuapp.com/api/product/" + id : "https://striveschool-api.herokuapp.com/api/product/";
const method = id ? "PUT" : "POST";

const form = document.getElementById("backoffice-form");
const delBtn = document.getElementById("delete-btn");
const confBtn = document.getElementById("confirm-btn");
const cancBtn = document.getElementById("canc-btn");
const resetBtn = document.getElementById("reset-btn");
const confirmAl = document.getElementById("alert");
const divBtn = document.getElementById("btn-div");
const alText = document.querySelector("#alert p");
const notAlert = document.getElementById("trasparent");
const idInput = document.getElementById("idInput");
const drop = document.querySelector(".dropdown-item");

const fetchChange = function () {
  const subtitle = document.getElementById("subtitle");
  if (id) {
    subtitle.innerText = "- Edit resource";
    drop.innerText = "— Create resource";
    idInput.value = id;
    divBtn.classList.remove("d-none");
    const saveId = localStorage.setItem("lastId", id);

    fetch(URL, {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODE0OGU1YjFjMjUwNDAwMTUxYWI2YTEiLCJpYXQiOjE3NDYxNzc2MjcsImV4cCI6MTc0NzM4NzIyN30.8vC4Lmi_aN0n_Vct-PIwkdaJRbeE-8CaZmD2Y-u5EIc",
      },
    })
      .then((resp) => {
        if (!resp.ok) {
          throw new Error("Fetch error");
        }

        return resp.json();
      })
      .then((product) => {
        document.getElementById("name").value = product.name;
        document.getElementById("description").value = product.description;
        document.getElementById("brand").value = product.brand;
        document.getElementById("image").value = product.imageUrl;
        document.getElementById("price").value = product.price;
      })
      .catch((error) => console.log(error));
  } else {
    subtitle.innerText = "— Create resource";
    drop.innerText = "- Edit resource";
  }
};

drop.onclick = function (e) {
  e.preventDefault();
  if (subtitle.innerText === "— Create resource") {
    drop.innerText = "— Create resource";
    window.location.assign("back-office.html?appId=" + lastId);
  } else {
    drop.innerText = "- Edit resource";
    window.location.assign("back-office.html?");
  }
};

form.onsubmit = function (e) {
  e.preventDefault();
  const nameInput = document.getElementById("name");
  const descriptionInput = document.getElementById("description");
  const brandInput = document.getElementById("brand");
  const imageInput = document.getElementById("image");
  const priceInput = document.getElementById("price");
  id = idInput.value;

  const newProduct = {
    name: nameInput.value,
    description: descriptionInput.value,
    brand: brandInput.value,
    imageUrl: imageInput.value,
    price: priceInput.value,
  };

  fetch(URL, {
    method: method,
    body: JSON.stringify(newProduct),
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODE0OGU1YjFjMjUwNDAwMTUxYWI2YTEiLCJpYXQiOjE3NDYxNzc2MjcsImV4cCI6MTc0NzM4NzIyN30.8vC4Lmi_aN0n_Vct-PIwkdaJRbeE-8CaZmD2Y-u5EIc",
      "Content-Type": "application/json",
    },
  })
    .then((resp) => {
      console.log(resp);
      if (!resp.ok) {
        throw new Error("Fetch error");
      }
      return resp.json();
    })
    .then((createProduct) => {
      if (id) {
        alert(createProduct.name + " has been modified");
      } else {
        alert("Product with id " + createProduct._id + " was created");
        form.reset();
      }
    })
    .catch((error) => console.log(error));

  window.location.assign("back-office.html?appId=" + id);
  console.log("SUBMIT", newProduct);
};

delBtn.onclick = function () {
  alText.innerText = "Do you want to permanently delete the product?";
  confirmAl.classList.remove("d-none");
  notAlert.classList.remove("d-none");
  confBtn.onclick = function () {
    fetch(URL, {
      method: "DELETE",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODE0OGU1YjFjMjUwNDAwMTUxYWI2YTEiLCJpYXQiOjE3NDYxNzc2MjcsImV4cCI6MTc0NzM4NzIyN30.8vC4Lmi_aN0n_Vct-PIwkdaJRbeE-8CaZmD2Y-u5EIc",
      },
    })
      .then((resp) => {
        if (resp.ok) {
          alert("hai correttamente eliminato la risorsa");
          window.location.assign("./index.html");
        }
      })
      .catch((error) => console.log(error));
    confirmAl.classList.add("d-none");
    notAlert.classList.add("d-none");
  };
};
cancBtn.onclick = function () {
  confirmAl.classList.add("d-none");
  notAlert.classList.add("d-none");
};

resetBtn.onclick = function () {
  alText.innerText = "Do you want to reset the form?";
  confirmAl.classList.remove("d-none");
  notAlert.classList.remove("d-none");
  confBtn.onclick = function () {
    form.reset();
    confirmAl.classList.add("d-none");
    notAlert.classList.add("d-none");
  };
};

notAlert.onclick = function () {
  confirmAl.classList.add("shake");
  setTimeout(() => {
    confirmAl.classList.remove("shake");
  }, 300);
};

window.onload = function () {
  fetchChange();
};
