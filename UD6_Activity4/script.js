$(document).ready(function() {
  $(".container").droppable();
  $("#generate").on("click", () =>{
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

    $("main").after(`<div class="${color} drag" style="left: ${xNumber}px; top: ${yNumber}px;"></div>`);
    $(".drag").draggable();
  });
  $(".container").on("drop", (e) => {
    console.log(e.target);
  });
});