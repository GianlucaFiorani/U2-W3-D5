const cartOpener = document.querySelector(".cartOpener");
const cartCol = document.querySelector(".cartCol");
const follow = document.getElementById("follow");
const body = document.querySelector("body");
let sum = 0;

body.onpointermove = function (e) {
  console.log(e.clientX);
  follow.style.left = `${e.clientX}px`;
  follow.style.top = `${e.clientY}px`;
  follow.style.left = `${e.pageX}px`;
  follow.style.top = `${e.pageY}px`;
};

const URL = "https://striveschool-api.herokuapp.com/api/product/";
let tot = 0;
const fecthProducts = () => {
  fetch(URL, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODE0OGU1YjFjMjUwNDAwMTUxYWI2YTEiLCJpYXQiOjE3NDYxNzc2MjcsImV4cCI6MTc0NzM4NzIyN30.8vC4Lmi_aN0n_Vct-PIwkdaJRbeE-8CaZmD2Y-u5EIc",
    },
  })
    .then((resp) => {
      if (resp.ok) {
        return resp.json();
      }
    })
    .then((productObj) => {
      console.log(productObj);

      const row = document.querySelector(".productGrid");

      productObj.forEach((product) => {
        const col = document.createElement("div");
        col.className = "col-md-4";
        const card = document.createElement("div");
        card.className = "card";
        const imgCont = document.createElement("div");
        imgCont.className = "text-center";
        const img = document.createElement("img");
        img.className = "card-img-top";
        img.src = product.imageUrl;
        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body", "bg-light", "fs-6");
        const h5 = document.createElement("h5");
        h5.className = "card-title";
        h5.innerText = product.name;
        const p = document.createElement("p");
        p.className = "font-monospace";
        p.innerText = "price: ";
        const description = document.createElement("p");
        description.innerText = product.description;
        const span = document.createElement("span");
        span.innerText = product.price.toFixed(2) + " $";
        const cartBtn = document.createElement("a");
        cartBtn.classList.add("cartBtn", "btn", "btn-outline-primary", "fs-6");
        cartBtn.innerText = "Add to cart";
        const editBtn = document.createElement("a");
        editBtn.classList.add("editBtn", "btn", "btn-warning", "ms-2", "fs-6");
        editBtn.innerText = "Edit";

        p.appendChild(span);
        cardBody.appendChild(h5);
        cardBody.appendChild(description);
        cardBody.appendChild(p);
        cardBody.appendChild(cartBtn);
        cardBody.appendChild(editBtn);
        imgCont.appendChild(img);
        card.appendChild(imgCont);
        card.appendChild(cardBody);
        col.appendChild(card);
        row.appendChild(col);
        setInterval(() => {
          img.style.width = `${((card.offsetWidth - 100) / img.naturalHeight) * img.naturalWidth}px`;
          if (window.innerWidth < 991 && !cartCol.classList.contains("d-none")) {
            row.classList.add("d-none");
          } else {
            row.classList.remove("d-none");
          }
        }, 50);

        editBtn.onclick = function () {
          window.location.assign("back-office.html?appId=" + product._id);
        };

        const allCartBtn = document.querySelectorAll(".cartBtn");

        imgCont.onmouseover = function (e) {
          follow.style.opacity = "100%";
        };

        imgCont.onmouseout = function (e) {
          follow.style.opacity = "0";
        };

        imgCont.onclick = function (e) {
          e.preventDefault();
          window.location.href = `details.html?appId=${product._id}`;
        };

        allCartBtn.forEach((btn) => {
          btn.onclick = function (e) {
            e.preventDefault();
            const pill = document.querySelector(".badge");
            const ul = document.querySelector(".cart");
            const li = document.createElement("li");
            const a = document.createElement("a");
            const a1 = document.createElement("a");
            const plus = document.createElement("button");
            const p = document.createElement("button");
            const minus = document.createElement("button");
            const img = document.createElement("img");
            const btn = document.createElement("button");
            const row = document.createElement("div");
            const colValue = document.createElement("div");
            const col = document.createElement("div");
            const col1 = document.createElement("div");
            const col2 = document.createElement("div");
            const col3 = document.createElement("div");
            const h3 = document.querySelector(".total");
            const allLi = document.querySelectorAll("li");

            li.value = 1;
            row.className = "row";
            row.classList.add("align-items-center");
            colValue.className = "col-1";
            col.className = "col-3";
            col1.className = "col-3";
            col2.className = "col-3";
            col3.className = "col-2";
            colValue.style.zIndex = 1;
            btn.classList.add("btn", "btn-danger");
            plus.classList.add("btn", "btn-outline-dark");
            p.classList.add("btn-value", "btn", "btn-dark");
            p.style.width = "42px";
            minus.classList.add("btn", "btn-outline-dark");
            p.innerText = `${li.value}`;
            btn.innerHTML = `<i class="bi bi-cart-x"></i>`;
            plus.innerHTML = `<i class="bi bi-arrow-up"></i>`;
            minus.innerHTML = `<i class="bi bi-arrow-down"></i>`;
            const cardTitle = e.currentTarget.closest(".card-body").querySelector(".card-title");
            const cardPrice = e.currentTarget.closest(".card-body").querySelector("span");
            const cardImg = e.currentTarget.closest(".card").querySelector("img");
            img.src = cardImg.src;
            img.style.height = "100px";
            a.innerText = cardTitle.innerText;
            a1.innerText = cardPrice.innerText;
            colValue.appendChild(plus);
            colValue.appendChild(p);
            colValue.appendChild(minus);
            col.appendChild(img);
            col1.appendChild(a);
            col2.appendChild(a1);
            col3.appendChild(btn);
            tot += parseFloat(cardPrice.innerText);
            h3.innerText = `Total: ${tot.toFixed(2)}$`;
            row.appendChild(colValue);
            row.appendChild(col);
            row.appendChild(col1);
            row.appendChild(col2);
            row.appendChild(col3);
            li.appendChild(row);

            ul.appendChild(li);
            console.log(li.value);
            sum += li.value;
            pill.innerText = sum;
            console.log(sum);

            if (cartCol.classList.contains("d-none")) {
              pill.classList.remove("d-none");
            }

            allLi.forEach((el) => {
              const titleNow = el.querySelector("a");
              if (titleNow.innerText === a.innerText) {
                el.value += 1;
                const p = el.querySelector(".btn-value");
                p.innerText = `${el.value}`;
                li.remove();
              }
            });

            plus.onclick = function () {
              sum += 1;
              pill.innerText = sum;
              li.value += 1;
              p.innerText = `${li.value}`;
              tot += parseFloat(cardPrice.innerText);
              h3.innerText = `Total: ${Math.abs(tot).toFixed(2)}$`;
            };
            minus.onclick = function () {
              sum -= 1;
              pill.innerText = sum;
              li.value -= 1;
              p.innerText = `${li.value}`;
              if (li.value == 0) {
                li.remove();
              }
              tot -= parseFloat(cardPrice.innerText);
              h3.innerText = `Total: ${Math.abs(tot).toFixed(2)}$`;
            };
            btn.onclick = function (e) {
              li.remove();
              sum -= li.value;
              pill.innerText = sum;
              tot -= parseFloat(a1.innerText) * li.value;
              h3.innerText = `Total: ${Math.abs(tot).toFixed(2)}$`;
            };
          };
        });
      });
    })
    .catch((error) => console.log(error));
};

cartOpener.onclick = function (e) {
  const pill = document.querySelector(".badge");
  const container = document.querySelector(".container");
  const row = document.querySelector(".productGrid");
  cartCol.classList.toggle("d-none");

  if (sum === 0) {
    pill.classList.add("d-none");
    pill.innerText = sum;
  } else {
    pill.classList.toggle("d-none");
  }

  if (window.innerWidth < 991) {
    row.classList.toggle("d-none");
  } else {
    row.classList.remove("d-none");
  }
  container.classList.toggle("me-0");
};

window.onload = () => {
  fecthProducts();
};
