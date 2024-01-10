$(document).ready(function() {
    $("#sum").on("click", function () {
        let input1 = $("#input1").val();
        let input2 = $("#input2").val();
        if($.isNumeric(input1) && $.isNumeric(input2)) {
            input1 = parseInt(input1, 10);
            input2 = parseInt(input2, 10);
            $("span").text(input1 + input2);
        }
    });
});