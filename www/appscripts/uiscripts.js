$(function() {
    var handleI = $("#custom-handleI");
    var handleF = $("#custom-handleF");
    $("#slider-range").slider({
        range: true,
        min: 0,
        max: 5400,
        values: [0, 5400],
        create: function() {
            handleI.text($('#init-amount').slider("value", 0));
            handleF.text($('#fin-amount').slider("value", 1));
        },
        slide: function(event, ui) {
            $("#init-amount").text(ui.values[0]);
            $("#fin-amount").text(ui.values[1]);
            handleI.text(Math.round(ui.values[0] / 60));
            handleF.text(Math.round(ui.values[1] / 60));
        }
    });
    $("#init-amount").val($("#slider-range").slider("values", 0));
    $("#fin-amount").val($("#slider-range").slider("values", 1));
});