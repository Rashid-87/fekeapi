const roterRow = document.querySelector(".router__row");

fetch(`https://fakestoreapi.com/products/${location.hash.slice(1)}`)
  .then((res) => res.json())
  .then((item) =>
    (roterRow.innerHTML += `
    <div class="router__cards">
     <img class="router__img" src="${item.image}" alt="${item.title}">
    <div class="router__card">
      <h3 class="router__title">${item.title}</h3>
      <h4 class="router__price">${item.price} $</h4>
      <p class="router__text">${item.description}</p>
      <a class="router__next" href="/index.html">
        <span><svg xmlns="http://www.w3.org/2000/svg" height="38px" viewBox="0 -960 960 960" width="28px" fill="currentColor"><path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z"/></svg></span>
      Next</a>
    </div>
       </div>
   </div>
    `)
  );
