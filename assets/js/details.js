const params = new URLSearchParams(window.location.search);
const id = params.get("appId");

const URL = "https://striveschool-api.herokuapp.com/api/product/";

fetch(URL + id, {
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODE0OGU1YjFjMjUwNDAwMTUxYWI2YTEiLCJpYXQiOjE3NDYxNzc2MjcsImV4cCI6MTc0NzM4NzIyN30.8vC4Lmi_aN0n_Vct-PIwkdaJRbeE-8CaZmD2Y-u5EIc",
  },
})
  .then((resp) => resp.json())
  .then((product) => {
    const container = document.getElementById("details");

    container.innerHTML = `
                     <div class="d-flex gap-3">
                     <img width=150 src="${product.imageUrl}"></img>
                     <div>
                    <h1>${product.name}</h1>
                    <p class="font-monospace">${product.brand}</p>
                    <p class="lead">${product.description}</p>
                    <p class="fs-3 text-${product.price ? "primary" : "success"}">${product.price ? product.price + "€" : "gratis"}</p>

                    <button class="btn btn-warning" onclick="handlePageChange()">Edit Product</button>
                    </div>
                    </div>
    `;
  })
  .catch((error) => console.log(error));

const handlePageChange = function () {
  window.location.assign("back-office.html?appId=" + id);
};
