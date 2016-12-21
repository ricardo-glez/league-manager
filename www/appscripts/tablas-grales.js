 //D3 Tables
 //League Manager Table Dashboard
 var datosPartidos = [];
 var probPartidos = [];
 var datosG;
 var colores_g = ['#fc8d59', '#ffffbf', '#91cf60'];
 /*///////////////////////////////////////////////////
 Variables del desempeño individual por partido/tiempo
 */ ///////////////////////////////////////////////////
 var distancia = [];
 var dist_max;
 var intensidad = [];
 var velocidad = [];
 var sprint = [];
 var selectedItems = [];
 var selectedPlayer = {};
 var esfuerzo = [];
 /*///////////////////////////////////////////////////
 Variables de la información general de cada jugador
 */ ///////////////////////////////////////////////////
 var nombreJug;
 var numeroJug;
 var jugador;
 var posicionJug;
 var edadJug;
 var partidosJug;
 var golesJug;
 var disparosJug;
 var disparosArcoJug;
 var faltasJug;
 var faltasCometidasJug;
 var faltasRecibidasJug;
 var tarjetasAmarillasJug;
 var tarjetasRojasJug;
 var porcetajes = [];
 var fontScale;
 /*/////////////////////////////////////
 Variables de las graficas
 */ ////////////////////////////////////
 var xScale, yScale, xAxis, yAxis, xScaleH, yScaleH;
 var margin = {
     top: 20,
     right: 20,
     bottom: 20,
     left: 20
 };
 var wG, hG;
 //Get data from csv and converet the strings to numbers
 var csv_final = d3.csv("/data/toluca_final_por_tiempos.csv", function(error, data) {
     var contador = 0;
     if (error) {
         //Error Print
         console.log(error);
     } else {
         //Revisar datos
         data.forEach(function(d, i) {
             //console.log('tags', tag_id)
             jugador = +d.tag;
             distancia[i] = +d.max_distance;
             esfuerzo[i] = +d.max_effort;
             intensidad[i] = +d.max_high_intensity;
             velocidad[i] = +d.max_speed;
             sprint[i] = +d.max_sprint;
             //console.log(d.total_effort);
         });
     }
     datosG = data;
     cargarDatosEquipo(datosG, "P1", "T1");
     cargarTituloPartido('Toluca', 0);
     //cargarInfoGral(5);
     var itemsSelec = $('#nav-partidos button ').on('click', function() {
         //Vaciar la pantalla y los arreglos
         limpiar()
         var par = $(this).find('p');
         $('button').removeClass('btn-active');
         $(this).attr('class', 'btn btn-active btn-custom-i');
         var wich = par["0"].id;
         //console.log('wich', wich);
         cargarTituloPartido('Toluca', wich);
     });
     //Finaliza Carga de Datos Nuevos
 });

 function limpiar() {
     d3.select('#grafPorcentajes').selectAll('g.slice').remove()
     d3.select('#grafPorcentajes').selectAll('g.slice text').remove()
     d3.select('#grafPorcentajes0').selectAll('rect').remove()
     d3.select('.yaxis').remove()
     d3.select('#grafCompa').selectAll('.lineasP').remove()

 }

 function cargarTituloPartido(quien, cual) {
     var csv_partidos = d3.csv("/data/partidosRe.csv", function(error, data) {
         var contador = 0;
         //tipo 0  es Casa tipo 1 es vistiante
         var tipo;
         var eC, eV, ataqueC, defensaC, ataqueV, defensaV;
         if (error) {
             //Error Print
             console.log(error);
         } else {
             //Revisar datos
             data.forEach(function(d, i) {
                 if ((d.Club == quien) || (d.Vs == quien)) {
                     var boton = $("#" + contador).text(d.Club + ' vs ' + d.Vs);
                     eC = $('#eC' + contador).attr('src', '/data/logos/' + d.Club + '-100.png').attr('width', 30);
                     eV = $('#eV' + contador).attr('src', '/data/logos/' + d.Vs + '-100.png').attr('width', 30);
                     //console.log('botones', boton)
                     //console.log('data',d.Ataque, d.Defensa);
                     datosPartidos.push(d);
                     contador++;
                     //console.log('filtrado',contador, d, i);
                 }
             });
             var neCasa = $('#nombre-equipo-casa').text(datosPartidos[cual].Club);
             var golesFav = $('#golesF').text(datosPartidos[cual].GolFavor);
             var golesContra = $('#golesC').text(datosPartidos[cual].GolContra);
             var eCasa = $('#equipo-casa').attr('src', '/data/logos/' + datosPartidos[cual].Club + '-100.png');
             var neVisita = $('#nombre-equipo-visita').text(datosPartidos[cual].Vs);
             var eVisita = $('#equipo-visita').attr('src', '/data/logos/' + datosPartidos[cual].Vs + '-100.png');
             var lugarP = $('#lugar').text(datosPartidos[cual].Lugar);
             var fechaP = $('#fecha').text(datosPartidos[cual].Fecha);
             var aL = +datosPartidos[cual].AtaqueCL;
             var dL = +datosPartidos[cual].DefensaCL;
             var aV = +datosPartidos[cual].AtaqueVS;
             var dV = +datosPartidos[cual].DefensaVS;
             var gC = +datosPartidos[cual].GanaCL;
             var eC = +datosPartidos[cual].EmpataCL;
             var pC = +datosPartidos[cual].PierdeCL;
             var posC = datosPartidos[cual].PosesionCl;
             var posV = datosPartidos[cual].PosesionCont;
             var tirC = datosPartidos[cual].TirosCl;
             var tirV = datosPartidos[cual].TirosCont;
             var tirGC = datosPartidos[cual].TirosAGolCl;
             var tirGV = datosPartidos[cual].TirosAGolCont;
             var faltasC = datosPartidos[cual].FaltasCl;
             var faltasV = datosPartidos[cual].FaltasCont;
             var faltasC = datosPartidos[cual].FaltasCl;
             var cornerC = datosPartidos[cual].CornersCl;
             var cornerV = datosPartidos[cual].CornersCont;
             var paradaC = datosPartidos[cual].ParadasCl;
             var paradaV = datosPartidos[cual].ParadasCont;
             var fueraC = datosPartidos[cual].FueraJuegoCl;
             var fueraV = datosPartidos[cual].FueraJuegoCont;
             var tarjAC = datosPartidos[cual].TAmarillaCl;
             var tarjAV = datosPartidos[cual].TAmarillaCont;
             var tarjRC = datosPartidos[cual].TRojaCl;
             var tarjRV = datosPartidos[cual].TRojaCont;
             comparaciones = [
                 [{
                     'key': 'Pos',
                     'value': posC
                 }, {
                     'key': 'Tiros',
                     'value': tirC
                 }, {
                     'key': 'TirosAG',
                     'value': tirGC
                 }, {
                     'key': 'Faltas',
                     'value': faltasC
                 }, {
                     'key': 'Corners',
                     'value': cornerC
                 }, {
                     'key': 'Parada',
                     'value': paradaC
                 }, {
                     'key': 'Fuera',
                     'value': fueraC
                 }, {
                     'key': 'TarjetaA',
                     'value': tarjAC
                 }, {
                     'key': 'TarjetaR',
                     'value': tarjRC
                 }, ],
                 [{
                     'key': 'Pos',
                     'value': posV
                 }, {
                     'key': 'Tiros',
                     'value': tirV
                 }, {
                     'key': 'TirosAG',
                     'value': tirGV
                 }, {
                     'key': 'Faltas',
                     'value': faltasV
                 }, {
                     'key': 'Corners',
                     'value': cornerV
                 }, {
                     'key': 'Parada',
                     'value': paradaV
                 }, {
                     'key': 'Fuera',
                     'value': fueraV
                 }, {
                     'key': 'TarjetaA',
                     'value': tarjAV
                 }, {
                     'key': 'TarjetaR',
                     'value': tarjRV
                 }, ]
             ];
             porcentajes = [{
                 "key": 'CG',
                 "value": gC * 100
             }, {
                 "key": 'CE',
                 "value": eC * 100
             }, {
                 "key": 'CP',
                 "value": pC * 100
             }];
             varEquipo = [{
                 "key": "AttC",
                 'value': aL
             }, {
                 "key": "DefC",
                 'value': dL
             }, {
                 "key": "AttV",
                 'value': aV
             }, {
                 "key": "DefV",
                 'value': dV
             }, ];
             fontScale = d3.scale.linear().domain(d3.extent(porcentajes, function(d) {
                 return d.value;
             })).range([2, 6]);
             var porcentajesC = d3.select('#porcentajeC').data([porcentajes]).text(Math.round(porcentajes[0].value) + '%').style('font-size', function(d, i) {
                 //console.log('DDD', d[i])
                 return fontScale(Math.round(d[0].value)) + 'em';
             }).enter();
             var porcentajesComp = d3.select('#pComp').data([datosPartidos]).text(' que gana ' + datosPartidos[cual].Club).enter();
             var porcentajesCompV = d3.select('#pCompV').data([datosPartidos]).text(' que gana ' + datosPartidos[cual].Vs).enter();
             drawPorcentajes(porcentajes, '#grafPorcentajes');
             if ('Toluca' == datosPartidos[cual].Club) {
                 tipo = 0;
                 //console.log('Tipo', tipo, "CASA", porcentajes);
                 cargarProbabilidades(datosPartidos[cual].Vs, +datosPartidos[cual].GolFavor);
             } else if ('Toluca' == datosPartidos[cual].Vs) {
                 tipo = 1;
                 //onsole.log('Tipo', tipo, "VISITA", +datosPartidos[cual].GolContra);
                 cargarProbabilidades(datosPartidos[cual].Club, +datosPartidos[cual].GolContra);
             }
             drawAtDef(varEquipo, '#grafPorcentajes0')
             drawCompE(comparaciones[0], "#grafCompa", 0);
             drawCompE(comparaciones[1], "#grafCompa",1);
             //Finaliza Carga de Datos Nuevos
         }
     });
 }

 function cargarDatosEquipo(datosGrales, p, t) {
     datosGrales.forEach(function(d, i) {
         if ((d.tiempo == t) && (d.partido == p)) {
             // statements
             var numJ = d3.select('#J-' + d.tag + '-numero_T').data(datosGrales).text('#' + d.numero).enter();
             var nomJ = d3.select('#J-' + d.tag + '-jugadores_T').data(datosGrales).text(d.nombre).enter();
             var distJ = d3.select('#J-' + d.tag + '-distancia_T').data(datosGrales).text(+d.max_distance + 'mts').enter();
             var esfJ = d3.select('#J-' + d.tag + '-esfuerzo_T').data(datosGrales).text(+d.max_effort).enter();
             var intJ = d3.select('#J-' + d.tag + '-intensidad_T').data(datosGrales).text(+d.max_high_intensity).enter();
             var velJ = d3.select('#J-' + d.tag + '-velocidad_T').data(datosGrales).text(+d.max_speed + 'm/s').enter();
             var spriJ = d3.select('#J-' + d.tag + '-sprint_T').data(datosGrales).text(+d.max_sprint).enter();
             //console.log("num ", i, d)
         }
     });
 }

 function drawPorcentajes(nD, idDiv) {
     var w = $(idDiv).width(), //width
         h = $(idDiv).height(), //height
         w = w - margin.left - margin.right,
         h = h - margin.top - margin.bottom,
         r = (w / 4 - w / 2),
         centro = [h / 2 - r / 4, w / 2];
     //radius
     color = d3.scale.category20c(); //builtin range of colors
     var vis = d3.select("#grafPorcentajes").data([nD]) //associate our data with the document
         .attr("width", w) //set the width and height of our visualization (these will be attributes of the <svg> tag
         .attr("height", h).append("svg:g") //make a group to hold our pie chart
         .attr("transform", "translate(" + centro[1] + "," + centro[0] + ")") //move the center of the pie chart from 0, 0 to radius, radius
     var arc = d3.svg.arc() //this will create <path> elements for us using arc data
         .outerRadius(r).innerRadius(r / 2 + r / 8);
     var pie = d3.layout.pie() //this will create arc data for us given a list of values
         .value(function(d) {
             return +d.value;
         });
     //console.log('pie', pie) //we must tell it out to access the value of each element in our data array
     var arcs = vis.selectAll("g.slice") //this selects all <g> elements with class slice (there aren't any yet)
         .data(pie) //associate the generated pie data (an array of arcs, each having startAngle, endAngle and value properties) 
         .enter()
         //this will create <g> elements for every "extra" data element that should be associated with a selection. The result is creating a <g> for every object in the data array
         .append("svg:g") //create a group to hold each slice (we will have a <path> and a <text> element associated with each slice)
         .attr("class", "slice"); //allow us to style things in the slices (like text)
     arcs.append("svg:path").attr("d", arc).attr('fill', '#faf7f7').style('opacity', .2).transition().delay(function(d, i) {
         return i / nD.length * 1000;
     }).attr("fill", function(d, i) {
         return colores_g[i];
     }).attr("d", arc).style("opacity", 1);
     arcs.append("svg:text") //add a label to each slice
         .attr('font-size', 0).attr('class', 'textSlice').attr("transform", function(d) { //set the label's origin to the center of the arc
             //we have to make sure to set these before calling arc.centroid
             d.innerRadius = r / 2;
             d.outerRadius = r;
             //console.log('centroid', arc.centroid(d))
             return "translate(" + arc.centroid(d) + ")"; //this gives us a pair of coordinates like [50, 50]
         }).attr('fill', '#1D3457').style('font-weight', 700).attr('font-size', 12 + 'px').attr("text-anchor", function(d) {
             // are we past the center?
             return (d.endAngle + d.startAngle) / 2 > Math.PI ? "end" : "start";
         }) //center the text on it's origin
         .text(function(d, i) {
             return Math.round(nD[i].value);
         }); //get the label from our original data array
     var porcentajeG = d3.select('#porcentajeC').data([nD]).text(Math.round(nD[0].value) + '%').style('font-size', function(d, i) {
         return fontScale(Math.round(d[0].value)) + 'em'; // body... 
     });
     var porcentajeV = d3.select('#porcentajeV').data([nD]).text(Math.round(nD[2].value) + '%').style('font-size', function(d, i) {
         return fontScale(Math.round(d[2].value)) + 'em'; // body... 
     });
 }

 function drawCompE(nD, idDiv, cu) {
     //console.log('DAD', nD, idDiv)
     w = $(idDiv).width();
     h = $(idDiv).height();
     w = w - margin.left - margin.right,
         h = h + margin.top - margin.bottom;
     yScaleH = d3.scale.linear().domain(d3.extent(nD, function(d) {
         //console.log('EXtent',d.value)
         return d.value;
     })).range([0, h]);
     xScaleH = d3.scale.ordinal().domain(["Pos", "Tiros", 'TirosAG', 'Faltas', 'Corners', 'Parada', 'Fuera', 'TarjetaA', 'TarjetaR']).rangePoints([0, h]);
     //var xScaleA = d3.scale.ordinal().domain(['Ataque', 'Defensa']).range([0 - margin.bottom, h + margin.bottom]);
     //var yAxisH = d3.svg.axis().scale(yScaleA).orient("left").ticks(4);
     var grafica = d3.select(idDiv).attr('w', w).attr('h', h);
     var lineas = d3.svg.area().x(function(d) {
         //console.log('X', xScaleH(d.key), d.key)
         return xScaleH(d.key)
     }).y1(function(d) {
         //console.log('Y', h - yScaleH(+d.value), d.value)
         return yScaleH(+d.value);
     }).y0(h).interpolate("basis");
;
     grafica.append('g').selectAll('lineasP').data(nD).enter().append('svg:path').attr('class', 'lineasP')
     .style('fill', colores_g[cu]).attr('d', lineas(nD));
     //grafica.append("g").attr("class", "yaxis").attr("transform", "translate(" + w / 2 + ',' + margin.top + ")").call(yAxisH);
 }

 function drawAtDef(nD, idDiv) {
     //console.log('DAD', nD, idDiv)
     w = $(idDiv).width();
     h = $(idDiv).height();
     w = w - margin.left - margin.right;
     h = h - margin.top - margin.bottom;
     var xScaleH = d3.scale.linear().domain(d3.extent(nD, function(d) {
         return d.value;
     })).range([w / 20, w / 3]);
     var yScaleH = d3.scale.ordinal().domain(['Ataque', 'Defensa']).range([0, h]);
     var yScaleA = d3.scale.ordinal().domain(['Ataque', 'Defensa']).range([0 - margin.bottom, h + margin.bottom]);
     var yAxisH = d3.svg.axis().scale(yScaleA).orient("left").ticks(4);
     var grafica = d3.select(idDiv).attr('w', w).attr('h', h);
     grafica.append('g').attr("transform", "translate(" + w / 2 + ",0)").attr('id', 'bars-AD').selectAll('rect').data(nD).enter().append('rect').attr("class", function(d) {
         return 'rect-' + d.key
     }).attr('height', h / 2 - margin.top).attr({
         'x': function(d, i) {
             if (d.key == "AttC") {
                 return -(xScaleH(d.value))
             } else if (d.key == "AttV") {
                 return 0
             } else if (d.key == "DefV") {
                 return 0
             } else if (d.key == "DefC") {
                 return -(xScaleH(d.value))
             }
         },
         'y': function(d, i) {
             return yScaleH(d.key);
         }
     }).style('fill', function(d, i) {
         if (d.key == "AttC") {
             return colores_g[0]
         } else if (d.key == "AttV") {
             return colores_g[2]
         } else if (d.key == "DefV") {
             return colores_g[2]
         } else if (d.key == "DefC") {
             return colores_g[0]
         }
     }).style('stroke-width', 0).attr('width', function(d) {
         return xScaleH(d.value)
     }).append('p').text('some text');
     grafica.append("g").attr("class", "yaxis").attr("transform", "translate(" + w / 2 + ',' + margin.top + ")").call(yAxisH);
     grafica.append('line').attr('class', 'divider').attr('x1', -w / 2).attr('y1', 0).attr('x2', -w / 2).attr('y2', h).style('fill', '#000').style('stroke-width', 5);
 }

 function cargarProbabilidades(versus, cuantos) {
     // body...
     var csv_probalilidades = d3.csv("/data/probabilidad_toluca_equipos.csv", function(error, data) {
         var contador = 0;
         var probSuc = [];
         var probabilidad;
         var porcentajeG, porcentajeE, porcentajeP;
         var pGane = [];
         var pCont = [];
         if (error) {
             //Error Print
             console.log(error);
         } else {
             //Revisar datos
             data.forEach(function(d, i) {
                 //Condicional para conocer la probabilidad de que se de el resultado que sucedio
                 if ((versus == d.Contrincante) && (+d.GE == cuantos)) {
                     probPartidos.push(d);
                     probSuc[0] = +d.GC0
                     probSuc[1] = +d.GC1;
                     probSuc[2] = +d.GC2;
                     probSuc[3] = +d.GC3;
                     probSuc[4] = +d.GC4;
                     probSuc[5] = +d.GC5;
                     probSuc[6] = +d.GC6;
                     probSuc[7] = +d.GC7;
                     probSuc[8] = +d.GC8;
                     probSuc[9] = +d.GC9;
                     probSuc[10] = +d.GC10;
                 }
             });
             probabilidad = probabilidad_suceso(probSuc);
             //$('#porcentajeC').text(probabilidad + '%');
             //Por cada objeto cr
             //Finaliza Carga de Datos Nuevos
         }
     });
 }

 function probabilidad_suceso(nD) {
     var probabilidad = 0;
     for (i in nD) {
         //console.log('Probabilidad:',probabilidad, i);
         probabilidad += nD[i];
     }
     return probabilidad * 100
         // body...
 }