 var datos = [];
 var datosSel = [];
 var h = 600;
 var w = 920;
 var yScale;
 var xScale;
 var barWidth;
 var costoS = [];
 var svgCanvas;
 var selectedItems = [];
 var newBarWidth = 0;
 var navBar;
 var xAxis;
 var yAxis;
 var totalSelection = 0;
 var padding = 50;
 var edos = {};
 var colors = [];
 var margin = {
     top: 50,
     right: 50,
     bottom: 50,
     left: 50
 };
 //Get data from csv and converet the strings to numbers
 var csv = d3.csv("/data/data.csv", function(error, data) {
     if (error) {
         //¿Que paso?
         console.log(error);
     } else {
         //Revisar el costo semestral 
         data.forEach(function(d, i) {
             costoS[i] = +d.costoSem;
             //calcular el grosor de las barras y crear un arreglo csólo con los nombres de los estados
             barWidth = (w / data.length)
                 //console.log("check:", costoS[i]);
             edos[i] = d.estado;
             //console.log('test',typeof costoS[i],data.length , w , barWidth);
             //console.log(barWidth);
         });
     }
     //Nueva variable de datos para resguardar la original
     datos = data;
     //Crear la barra de navegacion de las graficas
     navBar = d3.select('#categorias').append('ul');
     datos.forEach(function(d, i) {
         //Condicional que agrega los nombres de los estados en la barra de navegación 
         if ((edos[i] < 1) || (edos[i] != edos[i - 1])) {
             d3.select('#categorias ul').append('li').text(function() {
                 if ((edos[i] < 1) || (edos[i] != edos[i - 1])) {
                     return edos[i];
                 }
             });
             return edos[i];
         }
     });
     // Comportamiento de la barar de navegación por medio de un click al nombre del estado
     var menu = d3.selectAll("#categorias ul li").on("click", function(d, i) {
         selectedItems = [];
         costoS = [];
         newBarWidth = 0;
         var which = this.innerHTML;
         var counter = 0;
         datos.forEach(function(d, i) {
             //console.log("key: ", d.estado, which); 
             if (d.estado == which) {
                 //console.log("found:", d.costoSem);
                 selectedItems[counter] = d;
                 costoS[counter] = +d.costoSem;
                 newBarWidth = (w / totalSelection);
                 newBarWidth = newBarWidth * .5;
                 counter = counter + 1;
             }
             totalSelection = counter;
         });
         //Redibujar los datos si se activa el menu
         console.log("Total Seleccionado: ", totalSelection);
         console.log("Costos: ", costoS);
         console.log("barWidth: ", newBarWidth);
         drawData(selectedItems);
     });
     //Escalar los datos de x de la grafica
     xScale = d3.scale.ordinal().domain(d3.range(datos.estado)).rangeRoundBands([0, w], 0.05);
     xScaleAxis = d3.scale.linear().domain([0, datos.length]).range([0, w]);
     xAxis = d3.svg.axis().scale(xScaleAxis).orient("bottom").ticks(5);
     yScale = d3.scale.linear().domain([0, d3.max(costoS)]).range([h, 0]);
     //console.log('max', d3.max(costoS));
     yScaleAxis = d3.scale.linear().domain([0, d3.max(costoS)]).range([h, 0]);
     yAxis = d3.svg.axis().scale(yScaleAxis).orient("left").ticks(5);
     svgCanvas = d3.select("#bar-chart").attr('width', w).attr('height', h).attr();
     svgCanvas.selectAll('rect').data(datos).enter().append('rect').attr('width', barWidth).attr('height', function(d, i) {
         return yScale(costoS[i]) - margin.bottom;
     }).attr('x', function(d, i) {
         return xScaleAxis(i) + margin.left;
     }).attr('y', function(d, i) {
         return h - yScale(costoS[i]);
     });
     svgCanvas.append("g").attr("class", "axis").attr("transform", "translate(" + padding + "," + (h - padding) + ")").call(xAxis);
     svgCanvas.append("g").attr("class", "axis").attr("transform", "translate(" + padding + "," + (-padding) + ")").call(yAxis);
     //console.log('datos',  datos, 'costos', costoS);
 });

 function drawData(newData) {
     //Reiniciar losarreglos utilizados anteriormente   
     svgCanvas.selectAll('rect').remove();
     svgCanvas.selectAll('g.axis').remove();
     svgCanvas.selectAll('g.ticks').remove();
     xScale = d3.scale.ordinal().domain(d3.range(newData.estados)).rangeRoundBands([0, w]);
     //console.log('test', newData, totalSelection);
     xScaleAxis = d3.scale.linear().domain([0, totalSelection]).range([0, w - 100]);
     xAxis = d3.svg.axis().scale(xScaleAxis).orient("bottom").ticks(5);
     yScale = d3.scale.linear().domain([0, d3.max(costoS)]).range([h, 0]);
     console.log('max', d3.max(costoS));
     yScaleAxis = d3.scale.linear().domain([0, d3.max(costoS)]).range([h, 0]);
     yAxis = d3.svg.axis().scale(yScaleAxis).orient("left").ticks(5);
     svgCanvas.selectAll('rect').data(newData)
         //.transition()
         .enter().append('rect').attr('width', newBarWidth).attr('height', function(d, i) {
             //console.log('test', costoS);
             //console.log('testing height: ', h- yScale(costoS[i]));
             return h - yScale(costoS[i]);
         }).attr('x', function(d, i) {
             return xScaleAxis(i) + margin.left;
         }).attr('y', function(d, i) {
             return yScale(d.costoSem) - margin.bottom;
         });
     svgCanvas.append("g").attr("class", "axis").attr("transform", "translate(" + padding + "," + (h - padding) + ")").call(xAxis);
     svgCanvas.append("g").attr("class", "axis").attr("transform", "translate(" + padding + "," + (-padding) + ")").call(yAxis);
     //console.log('datos',  datos, 'costos', costoS);  
 }