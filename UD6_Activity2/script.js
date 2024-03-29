$(document).ready(function () {
  const container = document.getElementsByClassName("container-popup");
  const message = document.getElementById("message");
  let game = $("#game");
  let number1 = 0;
  let number2 = 0;
  let score = 0;
  let firstCard;

  // It generates a random number that can only be even
  let numberDivs = Math.floor(Math.random() * (24 - 14) + 14);
  if (numberDivs % 2 != 0) {
    numberDivs++;
  }

  // It creates an array of numbers with the same positions as the generated number
  let numbers = [];
  for (let i = 0; i < 2; i++) {
    // The array it's filled with numbers from 1 to half the generated number
    for (let ii = 0; ii < numberDivs / 2; ii++) {
      numbers.push(ii + 1);
    }
  }

  // This sort scrambles the array
  numbers = numbers.sort(() => {
    return Math.random() - 0.5;
  });

  // This loop shows the cards in the HTML
  for (let i = 0; i < numberDivs; i++) {
    game.append(`<div class="card"><p>${numbers[i]}</p></div>`);
  }

  $(".card").on("click", (e) => {
    if (!$(e.target).attr("class").includes("checked")) {
      $(e.target).addClass("checked");
      let p = $(e.target).html();
      if (number1 == 0) {
        number1 = $(p).text();
        $(message).text("");
        firstCard = $(e.target);
      } else if (number2 == 0) {
        number2 = $(p).text();

        setTimeout(function () {
          if (number1 == number2) {
            score++;
            $(message).text("The pair are the same numbers");
            if (score == numberDivs / 2) {
              container[0].style.display = "block";
            }
          } else {
            $(message).text("The pair are NOT the same numbers");
            $(e.target).removeClass("checked");
            firstCard.removeClass("checked");
          }
          number1 = 0;
          number2 = 0;
        }, 500);
      }
    }
  });
});
