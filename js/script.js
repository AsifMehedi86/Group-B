
document.addEventListener("DOMContentLoaded", () => {
  // 🌙 Load and toggle theme
  const toggleBtn = document.getElementById("toggleTheme");
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-theme");
  }
  toggleBtn?.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");
    localStorage.setItem("theme",
      document.body.classList.contains("dark-theme") ? "dark" : "light"
    );
  });

  // 🕑 Live clock
  setInterval(() => {
    const el = document.getElementById("timeDisplay");
    if (el) {
      const now = new Date();
      el.textContent = "Current time: " + now.toLocaleTimeString();
    }
  }, 1000);

  //  Dish category switching
  const buttons = document.querySelectorAll(".category-nav button");
  const sections = document.querySelectorAll(".dishes");

  buttons.forEach(button => {
    button.addEventListener("click", () => {
      const targetId = button.getAttribute("data-cat");

      sections.forEach(section => {
        section.hidden = section.id !== targetId;
      });

      buttons.forEach(b => b.classList.remove("active"));
      button.classList.add("active");
    });
  });

 
  const popupImages = document.querySelectorAll(".popup-img");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const closeBtn = document.querySelector(".close-btn");

  popupImages.forEach(img => {
    img.addEventListener("click", () => {
      lightbox.style.display = "flex";
      lightboxImg.src = img.src;
    });
  });

  closeBtn?.addEventListener("click", () => {
    lightbox.style.display = "none";
    lightboxImg.src = "";
  });

  lightbox?.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      lightbox.style.display = "none";
      lightboxImg.src = "";
    }
  });
});


const buttons = document.querySelectorAll(".category-nav button");
const dishes = document.querySelectorAll(".dishes");

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const cat = button.getAttribute("data-cat");

    dishes.forEach(section => {
      section.hidden = section.id !== cat;
    });

    
    buttons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");
  });
});


function saveBasket(basket) {
  localStorage.setItem("basket", JSON.stringify(basket));
}

function loadBasket() {
  return JSON.parse(localStorage.getItem("basket")) || [];
}

function updateBasketDisplay() {
  const basketItemsEl = document.getElementById("basketItems");
  const totalItemsEl = document.getElementById("totalItems");
  const totalPriceEl = document.getElementById("totalPrice");

  const basket = loadBasket();

  basketItemsEl.innerHTML = "";
  let total = 0;

  basket.forEach((item, index) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - £${item.price.toFixed(2)}`;

    
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.style.marginLeft = "10px";
    removeBtn.addEventListener("click", () => {
      removeFromBasket(index);
    });

    li.appendChild(removeBtn);
    basketItemsEl.appendChild(li);

    total += item.price;
  });

  totalItemsEl.textContent = basket.length;
  totalPriceEl.textContent = total.toFixed(2);
}

function removeFromBasket(index) {
  const basket = loadBasket();
  basket.splice(index, 1);
  saveBasket(basket);
  updateBasketDisplay();
}


function addToBasket(name, price) {
  const basket = loadBasket();
  basket.push({ name, price });
  saveBasket(basket);
  updateBasketDisplay();
}


updateBasketDisplay();




