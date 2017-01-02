$(function() {
    var handleI = $("#custom-handleI");
    var handleF = $("#custom-handleF");
    $("#slider-range").slider({
        range: true,
        min: 0,
        max: 5400,
        step: 600,
        values: [0, 5400],
        create: function() {

            handleI.text($('#init-amount').slider("value", 0));
            handleF.text($('#fin-amount').slider("value", 1));
        },
        slide: function(event, ui) {
            handleI.text(Math.round(ui.values[0] / 60));
            handleF.text(Math.round(ui.values[1] / 60));
            
            $("#init-amount").text(ui.values[0]);
            $("#fin-amount").text(ui.values[1]);

            
        }
    });
    $("#init-amount").val($("#slider-range").slider("values", 0));
    $("#fin-amount").val($("#slider-range").slider("values", 1));
    var axisScale = d3.scale().linear().domain([range(0,5400)]).range([0,90])
    var axisTime = d3.axis.scale(axisScale);
console.log('Slider',axisTime)
    var axiSlider = d3.select('#sliderWrap').append(g).attr('class','axis').attr('transform','translate(0,'+(this.height)+')').call(axiSlider);

});