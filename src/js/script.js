  let corZina = document.querySelector(".basket__icons");
  let overLay = document.querySelector(".overlay");
  let overX = document.querySelector(".overlay__x");

  const scrollControll = {
    pleuScroll() {
      document.body.style.cssText = `
    overflow: hidden; `;
    },
    entScroll() {
      document.body.style.cssText = "";
    },
  };

  corZina.addEventListener("click", () => {
    overLay.style.display = "block";
    scrollControll.pleuScroll();
  });

  overLay.addEventListener("click", (e) => {
    if (e.target === overLay) {
      overLay.style.display = "none";
      scrollControll.entScroll();
    }
  });

  overX.addEventListener("click", () => {
    overLay.style.display = "none";
    scrollControll.entScroll();
  });
