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
                     <div class="row gap-3 text-white">
                     <div class="col" >
                     <img width=100%
                      src="${product.imageUrl}"></img>
                      </div>
                     <div class="col">
                    <h1>${product.name}</h1>
                    <p class="font-monospace">${product.brand}</p>
                    <p class="lead">${product.description}</p>
                    <p class="fs-3 text-withe">${product.price + "€"}</p>

                    <button class="btn btn-warning" onclick="handlePageChange()">Edit Product</button>
                    </div>
                    </div>
    `;
  })
  .catch((error) => console.log(error));

const handlePageChange = function () {
  window.location.assign("back-office.html?appId=" + id);
};
