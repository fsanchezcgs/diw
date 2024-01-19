$(document).ready(function() {
    $("textarea").after("<p></p>");
    
    $("textarea").each((index, e) => {
        $(e).data("character", $(e).val().length);
        $(e).next().text($(e).data("character")+ 
        " characters");
        console.log($(e).next().next());
    });

    $("textarea").each((index, e) => {
        $(e).on("keyup", function() {
            $(e).data("character", $(e).val().length);
            $(e).next().text($(e).data("character")+ 
            " characters");
        });
    });
});