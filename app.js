"use strict";
let randomNumberArray = [];
let randomNumber;
let userSelection = [];
let pointsScored = 0;
let cards = document.querySelectorAll(".cards");
let userClickedCard = document.getElementsByClassName("cards");
const icons = [
  {
    name: "burger",
    iconLink: '<i class="fas fa-hamburger fa-2x"></i>',
  },
  {
    name: "burger",
    iconLink: '<i class="fas fa-hamburger fa-2x"></i>',
  },
  {
    name: "cheese",
    iconLink: '<i class="fas fa-cheese fa-2x"></i>',
  },
  {
    name: "cheese",
    iconLink: '<i class="fas fa-cheese fa-2x"></i>',
  },
  {
    name: "hot-dog",
    iconLink: '<i class="fas fa-hotdog fa-2x"></i>',
  },
  {
    name: "hot-dog",
    iconLink: '<i class="fas fa-hotdog fa-2x"></i>',
  },
  {
    name: "ice-cream",
    iconLink: '<i class="fas fa-ice-cream fa-2x"></i>',
  },
  {
    name: "ice-cream",
    iconLink: '<i class="fas fa-ice-cream fa-2x"></i>',
  },
  {
    name: "cookie",
    iconLink: '<i class="fas fa-cookie fa-2x"></i>',
  },
  {
    name: "cookie",
    iconLink: '<i class="fas fa-cookie fa-2x"></i>',
  },
  {
    name: "apple",
    iconLink: '<i class="fas fa-apple-alt fa-2x"></i>',
  },
  {
    name: "apple",
    iconLink: '<i class="fas fa-apple-alt fa-2x"></i>',
  },
  {
    name: "carrot",
    iconLink: '<i class="fas fa-carrot fa-2x"></i>',
  },
  {
    name: "carrot",
    iconLink: '<i class="fas fa-carrot fa-2x"></i>',
  },
  {
    name: "pizza",
    iconLink: '<i class="fas fa-pizza-slice fa-2x"></i>',
  },
  {
    name: "pizza",
    iconLink: '<i class="fas fa-pizza-slice fa-2x"></i>',
  },
];
shuffleCardElements();

function displayCards() {
  // let indexAndElement=[this.getAttribute('data-index'),this.getAttribute("data-set")]
  if (!this.lastElementChild.classList.contains("win")) {
    this.lastElementChild.style.transform = "rotateY(-180deg)";
  }
  setTimeout(() => {
    this.lastElementChild.lastElementChild.style.visibility = "visible";
    this.lastElementChild.firstElementChild.style.visibility = "visible";
  }, 100);
  userSelection.push([
    this.getAttribute("data-index"),
    this.getAttribute("data-set"),
  ]);
  if (userSelection.length > 2) {
    userSelection.length = 0;
    userSelection.push([
      this.getAttribute("data-index"),
      this.getAttribute("data-set"),
    ]);
  }

  for (let i = 0; i < userSelection.length; i++) {
    if (i > 0) {
      // document.querySelectorAll(".cards").forEach((e) => {
      //   e.style.pointerEvents = "none";
      // });
      if (userSelection[i] !== userSelection[i + 1]) {
        cardsUnMatched();
      }
      if (userSelection[0][1] === userSelection[1][1]) {
        cardsMatched();
      }
    }
  }
}

function cardsStyling({ rotationDegree, visibility, index }) {
  userClickedCard[index].lastElementChild.style.transform = `${rotationDegree}`;
  userClickedCard[
    index
  ].lastElementChild.lastElementChild.style.visibility = `${visibility}`;
  userClickedCard[
    index
  ].lastElementChild.firstElementChild.style.visibility = `${visibility}`;
}

function cardsUnMatched() {
  for (const [index, element] of userSelection) {
    setTimeout(() => {
      userClickedCard[index].lastElementChild.style.backgroundColor =
        " #F4766F ";
      cardsStyling({
        rotationDegree: "rotateY(180deg)",
        visibility: "hidden",
        index: index,
      });
      setTimeout(() => {
        userClickedCard[index].lastElementChild.style.backgroundColor =
          "transparent";
      }, 100);
      // cards.forEach((e) => {
      // //   // console.log(userSelection.length);
      // //   if(userSelection.length===2){
      //           e.style.pointerEvents = "auto";
      // //   }
      // //   else{
      // //     e.style.pointerEvents = "none";
      // //   }
      // // // //   if (!e.classList.contains("win")) {
      // // // //   } else {
      // // // //     e.style.pointerEvents = "none";
      // // // //   }
      //  });
    }, 2000);
  }
}
function cardsMatched() {
  pointsScored++;
  for (const [index, element] of userSelection) {
    setTimeout(() => {
      userClickedCard[index].classList.add("win");
      // userClickedCard[index].style.pointerEvents = "none";
      userClickedCard[
        index
      ].lastElementChild.lastElementChild.style.backgroundColor = "#21C197";
      cardsStyling({
        rotationDegree: "rotateY(0deg)",
        visibility: "visible",
        index: index,
      });
    }, 2000);
  }
  if (pointsScored === 8) {
    setTimeout(() => {
      document.querySelector(".winner-modal").style.display="flex";
      document.querySelector(".winner-modal").style.zIndex="99"
   setTimeout(() => {
          window.location.reload();
   }, 3000);
    }, 3000);
  }
}

function shuffleCardElements() {
  for (let i = 0; i < document.getElementsByTagName("div").length; i++) {
    // generate unique randomNumber numbers according to the number of divs
    for (let i = 0; i < document.getElementsByTagName("div").length; i++) {
      randomNumber = Math.floor(Math.random() * 16);
      randomNumberArray.indexOf(randomNumber) < 0 &&
        randomNumberArray.push(randomNumber);
      // elements of the memory game will shuffle to a new block on every page load
    }
  }
  // display the elements on box as per the random array
  setTimeout(() => {
    cards.forEach((e, i) => {
      e.addEventListener("click", displayCards);
      let { name, iconLink } = icons[randomNumberArray[i]];
      e.lastElementChild.lastElementChild.innerHTML = iconLink;
      e.setAttribute("data-set", name);
      e.setAttribute("data-index", i);
    });
  }, 1000);
}
