$(document).ready(function() {
  let id = 0;
  let red = 0;
  let blue = 0;
  let green = 0;
  show();
  $(".container").droppable();
  function show() {
    $("#redCounter").text(`${red}`);
    $("#blueCounter").text(`${blue}`);
    $("#greenCounter").text(`${green}`);
  };
  $("#generate").on("click", () =>{
    id++;
    let colorNumber = Math.floor(Math.random() * (4 - 1) + 1);
    let xNumber = Math.floor(Math.random() * (900 - 1) + 1);
    let yNumber = Math.floor(Math.random() * (900 - 1) + 1);
    let color;
    if(colorNumber == 1) {
      color = "red1";
    } else if(colorNumber == 2) {
      color = "blue1";
    } else if(colorNumber == 3) {
      color = "green1";
    }

    $("main").after(`<div id="${id}" class="${color} drag" style="left: ${xNumber}px; top: ${yNumber}px;"></div>`);
    $(".drag").draggable();
  });
  $(".container").on("drop", (e) => {
    if($(e.target).hasClass("red") && $(e.originalEvent.target).hasClass("red1")) {
      red++;
    } else if($(e.target).hasClass("blue") && $(e.originalEvent.target).hasClass("blue1")) {
      blue++;
    } else if($(e.target).hasClass("green") && $(e.originalEvent.target).hasClass("green1")) {
      green++;
    }
    show();
  });
});