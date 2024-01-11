$(document).ready(function() {
    let game = $("#game");
    let numberDivs = Math.floor(Math.random() * (24 - 6) + 6);
    if(numberDivs%2 != 0) {
        numberDivs++;
    }
    let numbers = [];
    for(let i = 0; i<numberDivs/2;i++){
        numbers.push(i+1);
        if(i === numberDivs-1) {
            numbers.push(i+2);
            i = 0;
        }
    }
    console.log(numbers);
    for(let i = 0; i<numberDivs;i++) {
        game.append(`<div class="card"><p>${(i+1)}</p></div>`);
    }

    $(".card").on("click", function() {
        $(".card").addClass("checked");
    })
});