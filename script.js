let amountWorkers = 1;
let menu = document.getElementsByClassName("menu")[0];
let modal = document.getElementsByClassName("modal")[0];
let moneyCounter = document.getElementsByClassName("moneyText")[0];
let itemsBought = 0
let options = document.getElementsByClassName('options')[0]
let modalWrapper = document.getElementsByClassName("menu-wrapper")[0];
let optionsBar = document.getElementsByClassName('options_bar')[0]
let cancelBarBtn = document.getElementsByClassName("options_btn")[0];
let foodBarBtn = document.getElementsByClassName("food_btn")[0];
let closeBarBtn = document.getElementsByClassName("close_btn")[0];

// false 0 '' Null undefined NaN

function getStartMoney() {

  if (localStorage.getItem("money") != null) {
   return +localStorage.getItem("money");

  } else {
    localStorage.setItem("money", 1500);
    return 1500;
  }

}

let money = getStartMoney();


moneyCounter.textContent = money;


options.addEventListener('click', function () {
  optionsBar.style.display = 'flex'
  options.style.display = 'none'

})

cancelBarBtn.addEventListener('click', function () {
  optionsBar.style.display = "none";
  options.style.display = "flex";
})

foodBarBtn.addEventListener('click', function () {

  modalWrapper.classList.toggle('activemodal')
  options.style.display = 'flex'
  menu.classList.toggle('active')
  optionsBar.style.display = 'none'
})

let myMenu = [
  {
    title: "Ice Cream",
    photo: "icecream.png",
    speed: 2,
    price: 300,
    id: 1,
    block: 0,
  },

  {
    title: "Pizza",
    photo: "pizza.png",
    speed: 5,
    price: 500,
    id: 2,
    block: 0,
  },

  {
    title: "Hot Dog",
    photo: "hot_dog.png",
    speed: 5,
    price: 400,
    id: 3,
    block: 15,
  },

  {
    title: "Milk Shake",
    photo: "milkshake.png",
    speed: 4,
    price: 300,
    id: 4,
    block: 10,
  },

  {
    title: "Pop",
    photo: "pop.png",
    speed: 1,
    price: 100,
    id: 5,
    block: 0,
  },

  {
    title: "Burger",
    photo: "burger.png",
    speed: 7,
    price: 1000,
    block: 20,
    id: 6,
  },

  {
    title: "Waffles",
    photo: "waffles.png",
    speed: 3,
    price: 500,
    block: 15,
    id: 7,
  },

  {
    title: "Fries",
    photo: "fries.png",
    speed: 2,
    price: 200,
    block: 0,
    id: 8,
  },
];



function showMenu() {
  for (let i = 0; i < myMenu.length; i++) {
    let class_ = ''
    if (itemsBought < myMenu[i].block) {
      class_ = 'block'
    }


    menu.innerHTML += `
    <div class="menu-card ${class_}">

        <img src="img/menu/${myMenu[i].photo}" alt="" class="menu-card__image">
        <div class="menu-card__body">
          <div class="menu-card__info">
            <div  class="menu-card__texts">
              <h2 class="menu-card__title">${myMenu[i].title}</h2>
              <h2 class="menu-card__block">Buy ${myMenu[i].block} More Items To Unblock!</h2>
              <h2 class="menu-card__price">${myMenu[i].price}$</h2>
            </div>
            <div class="timer">
              <h2 class="menu-card__time" title="Seconds Cook Time">${myMenu[i].speed} </h2>
              <img src="img/clock.png" alt="">
            </div>
          </div>
          <button data-id="${myMenu[i].id}" class="buy_btn">Buy This</button>
          </div>
        </div>
        `;
      }
    }
    showMenu();



    let buyBtn = document.getElementsByClassName('buy_btn')

    for (let i = 0; i < buyBtn.length; i++) {
      buyBtn[i].addEventListener('click', function () {
        let id = buyBtn[i].dataset.id
        buyProduct(id)
      })
    }



    function changeBalance(sum, operation, el) {
      if (operation == '+') {
        money += sum

      }


      if (operation == "-") {
        if (money-sum < 0) {
          showAlert(
            "Not Available",
            `You don't have enough money to buy the item ${el.title} (${el.price}$) or this item is blocked.`
            );

            return false
          } else {
            money -= sum;
            moneyCounter.textContent = money;

            showAlert("Bought", `You bought the item ${el.title}`);
            localStorage.setItem('money', money)
            return true;
    }

  }
}

// DRY
//


function unlockProduct() {

  menu.innerHTML = ''
  showMenu()

  let buyBtn = document.getElementsByClassName("buy_btn");

  for (let i = 0; i < buyBtn.length; i++) {
    buyBtn[i].addEventListener("click", function () {
      let id = buyBtn[i].dataset.id;
      buyProduct(id);
    });
  }

}


function buyProduct(id) {
  let el = findProductById(id);
  if (el.block <= itemsBought)
  {
    if (changeBalance(el.price, "-", el)) {
      itemsBought += 1;
      unlockProduct();
    } else {
    }
  }
  else {
    showAlert(
      "Not Available",
      `You don't have enough money to buy the item ${el.title} (${el.price}$) or this item is blocked.`
      );
  }
}

function findProductById(id) {
  for (let i = 0; i < myMenu.length; i++) {
    if (myMenu[i].id == id) {
      return myMenu[i];
    }
  }
}

function showAlert (title, text) {

  modal.getElementsByClassName('modal__title')[0].textContent = title;
  modal.getElementsByClassName("modal__text")[0].textContent = text;
  setTimeout(function () {
   }, 200);
  modal.style.right = "100px";
  setTimeout(
    function () {
      modal.style.right = '-1000px'
    }, 4000
  )
}
