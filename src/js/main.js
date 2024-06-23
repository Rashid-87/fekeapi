window.addEventListener("load", function () {
  const goodsWrapper = document.querySelector(".goods__wrapper");
  const headerLink = document.querySelectorAll(".header__link");
  const inputSearch = document.querySelector(".basket__input");
  const basketSub = document.querySelector(".basket__sub");
  const overlaySumma = document.querySelector(".overlay__summ");
  const basketPrice = document.querySelector(".basket__prices");
  const overlayHeader = document.querySelector(".overlay__header");
  let category = "";
  let fetchedProducts = [];
  let basket = [];

  const addAll = () => {
    goodsWrapper.innerHTML = "";
    fetch(
      `https://fakestoreapi.com/products/${
        category === "jewelery"
          ? "category/jewelery"
          : category === "men's clothing"
          ? "category/men's clothing"
          : category === "women's clothing"
          ? "category/women's clothing"
          : category === "electronics"
          ? "category/electronics"
          : ""
      }`
    )
      .then((res) => res.json())
      .then((res) =>
        res.forEach((item) => {
          fetchedProducts = res;
          goodsWrapper.innerHTML += `
      <div class="goods__cards">
          <div class="goods__card">
            <a href="./src/router/router.html#${item.id}">
            <img class="goods__img" src="${item.image}" alt="${item.title}">
             </a>
            <h3 class="goods__title">${item.title}</h3>
            <h4 class="goods__price">Price: ${item.price} $</h4>
            <p class="goods__text">${item.description}</p>
          </div>
         <button class="goods__btn" data-id="${item.id}">В корзину</button>
        </div>
      </div>
      `;
        })
      )
      .then(() => {
        let goodsBtn = document.querySelectorAll(".goods__btn");
        Array.from(goodsBtn).forEach((el) => {
          el.addEventListener("click", function handleClick() {
            el.removeEventListener("click", handleClick);
            let find = fetchedProducts.find(
              (item) => item.id === +el.dataset.id
            );
            let countAdd = basket.find((item) => item.id === find.id);
            if (countAdd) {
              countAdd.counter += 1;
            } else {
              find.counter = 1;
              basket = [...basket, find];
            }
            fetProducts();
          });
        });
      });
    };

  const fetProducts = () => {
    overlaySumma.textContent = Math.round(basket.reduce((acc, el) => acc + el.price * el.counter, 0));
    basketSub.textContent = Math.round(basket.length);
    overlayHeader.innerHTML = "";
    basket.forEach((item) => {
      overlayHeader.innerHTML += `
      <div class="overlay__row">
      <img class="overlay__img" src="${item.image}" alt="" />
         <div class="overlay__info">
           <h4 class="overlay__subtitle">${item.title}</h4>
           <h5 class="overlay__ptice">Price: ${item.price * item.counter}</h5>
         </div>
      <button class="overlay__delit" data-id="${item.id}">+</button>
        <div class="overlay__wrapp">
          <button class="overlay__minus" data-id="${item.id}">-</button>
          <p class="overlay__counter">${item.counter}</p>
          <button class="overlay__plus" data-id="${item.id}">+</button>
        </div>
    </div>
    `;
    });
    let overlayPlus = document.querySelectorAll(".overlay__plus");
    Array.from(overlayPlus).forEach((el) => {
      el.addEventListener("click", () => {
        basket.forEach((item) => {
          if (item.id === +el.dataset.id) {
            if (item.counter < 10) {
              item.counter += 1;
            }
          }
        });
        fetProducts();
      });
    });
    let overlayMinus = document.querySelectorAll(".overlay__minus");
    Array.from(overlayMinus).forEach((el) => {
      el.addEventListener("click", () => {
        basket.forEach((item) => {
          if (item.id === +el.dataset.id) {
            if (item.counter > 1) {
              item.counter -= 1;
            }
          }
        });
        fetProducts();
      });
    });
    basketPrice.textContent = Math.round(basket.reduce((acc, el) => acc + el.price * el.counter, 0)
    );
    let overlayDelit = document.querySelectorAll(".overlay__delit");
    Array.from(overlayDelit).forEach((el) => {
      el.addEventListener("click", () => {
        basket = basket.filter((item) => item.id !== +el.dataset.id);
        fetProducts();
      });
    });
  };

  fetProducts();
  Array.from(headerLink).forEach((el) => {
    el.addEventListener("click", () => {
      category = el.textContent;
      Array.from(headerLink).forEach((item) => {
        if (item.textContent === category) {
          item.style.color = "#eb5a1e";
        } else {
          item.style.color = "black";
        }
      });
      addAll();
    });
  });

  addAll();
  inputSearch.addEventListener("input", (e) => {
    const searchValue = e.target.value.toLowerCase();
    fetch(`https://fakestoreapi.com/products`)
      .then((res) => res.json())
      .then((products) => {
        const filteredProducts = products.filter((product) => {
          return product.title.toLowerCase().includes(searchValue);
        });
        goodsWrapper.innerHTML = "";
        filteredProducts.forEach((item) => {
          goodsWrapper.innerHTML += `
            <div class="goods__cards">
              <div class="goods__card">
                <a href="./src/router/router.html#${item.id}">
                  <img class="goods__img" src="${item.image}" alt="${item.title}">
                </a>
                <h3 class="goods__title">${item.title}</h3>
                <h4 class="goods__price">${item.price} $</h4>
                <p class="goods__text">${item.description}</p>
              </div>
              <button class="goods__btn">В корзину</button>
            </div>
          `;
        });
      });
    });
});
