$(document).ready(function() {
  let id = 0;
  let red = 0;
  let blue = 0;
  let green = 0;
  show();
  function show() {
    $("#redCounter").text(`${red}`);
    $("#blueCounter").text(`${blue}`);
    $("#greenCounter").text(`${green}`);
  };
  $("#red").droppable({
    accept: ".red1",
    drop: (e) => {
      if(!($(e.originalEvent.target.parentElement).hasClass("dropped"))) {
        red++;
        $(e.originalEvent.target.parentElement).addClass("dropped");
      }
      show();
    },
    out: (e) => {
      if($(e.originalEvent.target.parentElement).hasClass("dropped")) {
        red--;
        $(e.originalEvent.target.parentElement).removeClass("dropped");
      }
      show();
    }
  });
  $("#blue").droppable({
    accept: ".blue1",
    drop: (e) => {
      if(!($(e.originalEvent.target.parentElement).hasClass("dropped"))) {
        blue++;
        $(e.originalEvent.target.parentElement).addClass("dropped");
      }
      show();
    },
    out: (e) => {
      if($(e.originalEvent.target.parentElement).hasClass("dropped")) {
        blue--;
        $(e.originalEvent.target.parentElement).removeClass("dropped");
      }
      show();
    }
  });
  $("#green").droppable({
    accept: ".green1",
    drop: (e) => {
      if(!($(e.originalEvent.target.parentElement).hasClass("dropped"))) {
        green++;
        $(e.originalEvent.target.parentElement).addClass("dropped");
      }
      show();
    },
    out: (e) => {
      if($(e.originalEvent.target.parentElement).hasClass("dropped")) {
        green--;
        $(e.originalEvent.target.parentElement).removeClass("dropped");
      }
      show();
    }
  });
  $("#generate").on("click", () =>{
    id++;
    let colorNumber = Math.floor(Math.random() * (4 - 1) + 1);
    let xNumber = Math.floor(Math.random() * (400 - 10) + 10);
    let yNumber = Math.floor(Math.random() * (400 - 10) + 10);
    let color;
    if(colorNumber == 1) {
      color = "red1";
    } else if(colorNumber == 2) {
      color = "blue1";
    } else if(colorNumber == 3) {
      color = "green1";
    }
    $(".box").after(`
      <div id="${id}" class="${color} drag" style="left: ${xNumber}px; top: ${yNumber}px;">
        <div class="postit-header">
          <button class="delete-postit">x</button>
        </div>
        <div class="body-postit">
          <textarea cols="30" rows="10"></textarea>
        </div>
      </div>`
    );
    $(".drag").draggable();
    $(".delete-postit").on("click", (e) =>{
      $(".container-popup").css("display", "block");
      $("#yes").on("click", () =>{
        if($(e.target.parentElement.parentElement).hasClass("dropped")) {
          if($(e.target.parentElement.parentElement).hasClass("red1")) {
            red--;
          } else if($(e.target.parentElement.parentElement).hasClass("blue1")) {
            blue--;
          } else if($(e.target.parentElement.parentElement).hasClass("green1")) {
            green--;
          }
          show();
        }
        $(e.target.parentElement.parentElement).remove();
        $(".container-popup").css("display", "none");
      });
      $("#no").on("click", () =>{
        $(".container-popup").css("display", "none");
      });
    });
  });
});