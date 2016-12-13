 //D3 visualizacion 
 //League Manager Cisualization Dashboard
 var datos = [];
 var yScale;
 var xScale;
 var yScaleT;
 var xScaleT;
 var radio;
 var radioScale;
 var svgCanvas;
 var canvasGrafs;
 var selectedItems = []
 var padding = 50;
 var margin = {
     top: 50,
     right: 50,
     bottom: 50,
     left: 50
 };
 var h = 400;
 var w = 720;
 var hG = 300;
 var wG = 720;
 var radio = [];
 var position_x = [];
 var position_y = [];
 var color0 = [];
 var color1 = [];
 var circulos = [];
 var tags = [];
 var direccion = [];
 var segundosT = [];
 var energiaT = [];
 var esfuerzoT = [];
 var intensidadT = [];
 var velocidadT = [];
 var distancia = [];
 var segundos = [];
 var energia = [];
 var esfuerzo = [];
 var intensidad = [];
 var velocidad = [];
 var sprint = [];
 var newD = [];
 var newDT = [];
 var data_5_min = [];
 var barras = [];
 var radDir = 50;
 var tiempo_i;
 var tiempo_f;
 var barWidth;
 var wich;
 var colores_g = ["#3366cc", "#dc3912", "#ff9900", "#109618", "#990099", "#0099c6", "#dd4477", "#66aa00", "#b82e2e", "#316395", "#994499", "#22aa99", "#aaaa11", "#6633cc", "#e67300", "#8b0707", "#651067", "#329262", "#5574a6", "#3b3eac"];
 //Get data from csv and converet the strings to numbers
 var csv = d3.csv("/data/base_final.csv", function(error, data) {
     if (error) {
         //Error Print
         console.log(error);
     } else {
         tags = d3.range(15);
         //Revisar datos Totales
         data.forEach(function(d, i) {
             //console.log('tags', tag_id)
             direccion[i] = +d.heading;
             radio[i] = +d.speed;
             color0[i] = +d.speed;
             color1[i] = +d.speed;
             position_x[i] = +d.x_pos;
             position_y[i] = +d.y_pos;
             segundos[i] = +d.segundos;
             velocidad[i] = +d.speed;
             //console.log(d.total_effort);
         });
     }
     //Nueva variable de datos para resguardar la original
     datos = data;
     //Escalar los datos de x para la cancha
     xScaleT = d3.scale.linear().domain([-5, 110]).range([0, w]);
     //xAxis = d3.svg.axis().scale(xScale).orient("bottom").ticks(5);
     yScaleT = d3.scale.linear().domain([-5, 73]).range([h, 0]);
     //yAxis = d3.svg.axis().scale(yScale).orient("left").ticks(5);
     radioScale = d3.scale.linear().domain([0, d3.max(datos, function(d, i) {
         return radio[i];
     })]).range([5, 20]);
     colorScale0 = d3.scale.linear().domain([0, 3]).range(['#c62828', '#FFE766']);
     colorScale1 = d3.scale.linear().domain([4, 9]).range(['#FFE766', '#00CF36']);
     svgCanvas = d3.select("#data-vis").attr('width', w).attr('height', h);
     cancha();
     wich = 5;
     cual = 'velocidad_C';
     tiempo_i = 0;
     tiempo_f = 300;
     //Sliders 
     var slider = d3.selectAll('#slider-range ').on('click', function() {
         tiempo_i = $('#init-amount').text();
         tiempo_f = $('#fin-amount').text();
         console.log('tiempos', tiempo_i, tiempo_f)
     });
     var slider = d3.selectAll('#slider-range > span').on('click', function() {
         tiempo_i = $('#init-amount').text();
         tiempo_f = $('#fin-amount').text();
         console.log('tiempos', tiempo_i, tiempo_f)
     });
     //console.log('d5', data_5_min)
     cargarDatosG(5, tiempo_i, tiempo_f, "P1", 'velocidad_C');
     cargarDatosT(5, tiempo_i, tiempo_f, "P1")
     cargarDatosJugador(5);
     //Click
     var itemsSelec = d3.selectAll('#left-nav a ').on('click', function() {
         //Vaciar la pantalla y los arreglos
         limpiar();
         limpiarG();
         wich = this.id;
         cargarDatosG(wich, tiempo_i, tiempo_f, "P1", cual);
         cargarDatosT(wich, tiempo_i, tiempo_f, "P1");
         cargarDatosJugador(wich);
     });
     //Seleccionar Categoria de Grafica
     var catSelec = d3.selectAll('#controles button').on('click', function() {
         $('button').removeClass('btn-active');
         d3.select(this).attr('class', ' btn btn-active btn-custom');
         //Vaciar la pantalla y los arreglos
         limpiarG();
         cual = this.id;
         console.log('cual', cual)
         cargarDatosG(wich, tiempo_i, tiempo_f, "P1", cual);
         //cargarDatosT(wich, 1000, 2000, "P1");
         //cargarDatosJugador(wich)
     });
     //Click
     var visualizarB = d3.selectAll('#visualizar_B').on('click', function() {
         //Vaciar la pantalla y los arreglos
         console.log('Visualizar_B')
         limpiar();
         //cargarDatosG(wich, tiempo_i, tiempo_f, "P1", cual);
         cargarDatosT(wich, tiempo_i, tiempo_f, "P1");
         cargarDatosJugador(wich);
     });
 });
 //Dibujar cancha 
 function cancha() {
     svgCanvas.append('rect').attr('class', 'grid').attr('x', w / 2).attr('y', 0).attr('width', w / 2).attr('height', h).style('fill', '#009B09').style('fill-opacity', '0.2').style('stroke', '#fff').style('stroke-width', '5');
     svgCanvas.append('rect').attr('class', 'grid').attr('x', 0).attr('y', 0).attr('width', w / 2).attr('height', h).style('fill', '#009B09').style('fill-opacity', '0.2').style('stroke', '#fff').style('stroke-width', '5');
     svgCanvas.append('rect').attr('class', 'grid').attr('x', 0).attr('y', h / 4 + h / 16).attr('width', w / 8).attr('height', h / 2 - h / 8).style('fill', '#fff').style('fill-opacity', '0.2').style('stroke', '#fff').style('stroke-width', '5');
     svgCanvas.append('rect').attr('class', 'grid').attr('x', 0).attr('y', h / 4 + h / 8).attr('width', w / 16).attr('height', h / 2 - h / 4).style('fill', 'none').style('stroke', '#fff').style('stroke-width', '1');
     svgCanvas.append('rect').attr('class', 'grid').attr('x', w - w / 8).attr('y', h / 4 + h / 16).attr('width', w / 8).attr('height', h / 2 - h / 8).style('fill', '#fff').style('fill-opacity', '0.2').style('stroke', '#fff').style('stroke-width', '5');
     svgCanvas.append('rect').attr('class', 'grid').attr('x', w - w / 16).attr('y', h / 4 + h / 8).attr('width', w / 16).attr('height', h / 2 - h / 4).style('fill', 'none').style('stroke', '#fff').style('stroke-width', '1');
 }
 //Inicio de Carga de Datos de Graficas
 function cargarDatosG(jugador, i_seg, f_seg, p, cu) {
     newD = [];
     var contador = 0;
     var csv_5 = d3.csv("data/base_5_min.csv", function(error, data) {
         data.forEach(function(d) {
             //console.log('d5', d);
             if ((p == d.partido) && (+d.numero == jugador)) {
                 //console.log('segundos', d);
                 newD.push(d);
                 esfuerzo[contador] = +d.total_effort_diff;
                 segundos[contador] = +d.segundos;
                 energia[contador] = +d.total_energy_diff;
                 velocidad[contador] = +d.speed;
                 intensidad[contador] = +d.high_intensity_distance;
                 distancia[contador] = +d.total_dist_diff;
                 sprint[contador] = +d.sprint_distance;
                 //        console.log('Con', contador);
                 contador++;
             }
         });
         switch (cu) {
             case 'velocidad_C':
                 draw_grafs_V(newD, i_seg, f_seg, jugador);
                 break;
             case 'distancia_C':
                 draw_grafs_D(newD, i_seg, f_seg, jugador);
                 break;
             case 'esfuerzo_C':
                 draw_grafs_E(newD, i_seg, f_seg, jugador);
                 break;
             case 'intensidad_C':
                 draw_grafs_I(newD, i_seg, f_seg, jugador);
                 break;
             case 'sprint_C':
                 draw_grafs_SP(newD, i_seg, f_seg, jugador);
                 break;
         }
     });
 }
 //Inicio de Carga de Datos de Trayecto
 function cargarDatosT(jugador, i_seg, f_seg, p) {
     newDT = [];
     limpiar();
     var contador = 0;
     var csv_T = d3.csv("data/base_final.csv", function(error, data) {
         data.forEach(function(d) {
             //console.log('d5', d);
             if ((p == d.partido) && (+d.tag_id == jugador) && (+d.segundos <= f_seg) && (+d.segundos >= i_seg)) {
                 //console.log('segundos', d);
                 newDT.push(d);
                 direccion[contador] = +d.heading;
                 radio[contador] = +d.speed;
                 color0[contador] = +d.speed;
                 color1[contador] = +d.speed;
                 position_x[contador] = +d.x_pos;
                 position_y[contador] = +d.y_pos;
                 segundosT[contador] = +d.segundos;
                 energiaT[contador] = +d.total_energy_diff;
                 velocidadT[contador] = +d.speed;
                 intensidadT[contador] = +d.high_intensity_distance;
                 //        console.log('Con', contador);
                 contador++;
             }
         });
         //console.log('positions', position_x.length, newDT);
         draw_trayectoria_LT(newDT, jugador);
         //draw_trayectoria_LD(newDT, jugador);
         //draw_grafs_S(newD, i_seg, f_seg, jugador);
     });
     //console.log('NEWDT', newDT)
 }
 //Cargar Datos Generales por Jugador
 function cargarDatosJugador(jugador) {
     var csv_jugadores = d3.csv("/data/toluca_jugadores.csv", function(error, data) {
         data.forEach(function(d, i) {
             if ((d.numero == jugador)) {
                 //console.log('Encontrados', d)
                 nombreJug = d.nombre;
                 numeroJug = +d.numero;
                 posicionJug = d.posicion;
                 edadJug = +d.edad;
                 partidosJug = +d.partidos_iniciados;
                 golesJug = +d.goles;
                 disparosJug = +d.disparos;
                 disparosAJug = +d.disparos_arco;
                 faltasJug = +d.faltas;
                 faltasCometidasJug = +d.faltas_cometidas;
                 faltasRecibidasJug = +d.faltas_recibidas;
                 tarjetasAmarillasJug = +d.tarjetas_amarillas;
                 tarjetasRojasJug = +d.tarjetas_rojas;
                 //console.log('seleccionado', d.nombre)
                 //var distp1 = d3.selectAll('#main-container .distancia').data(selectedItems).enter().append('p').text("funcio");
             }
         });
         datosJugadores = data;
         //console.log('select', datosJugadores, 'data/perfil-jugadores/' + numeroJug + '.jpg')
         //Información General del Jugador
         var imgJ = d3.select('#left-nav > div:nth-child(1) > img').data(datosJugadores).attr('src', 'data/perfil-jugadores/' + numeroJug + '.jpg').enter();
         var nomJ = d3.select('#info-jugador > p.nombre > strong').data(datosJugadores).text(nombreJug).enter();
         var numJ = d3.select('#info-jugador > p.numero > strong').data(datosJugadores).text("# " + numeroJug).enter();
         var posJ = d3.select('#info-jugador > p.posicion > strong').data(datosJugadores).text(posicionJug).enter();
         var edaJ = d3.select('#info-jugador > p.edad > strong').data(datosJugadores).text(+edadJug + " Años").enter();
         //Datos Generales del Jugador
         var partidosJ = d3.select('#partidos_i').data(datosJugadores).text(partidosJug).enter();
         var golesJ = d3.select('#goles ').data(datosJugadores).text(golesJug).enter();
         var disparosJ = d3.select('#disp ').data(datosJugadores).text(disparosJug).enter();
         var disparosAJ = d3.select('#disparos_a ').data(datosJugadores).text(disparosAJug).enter();
         var faltasJ = d3.select('#faltas ').data(datosJugadores).text(faltasJug).enter();
         var faltasCometidasJug = d3.select('#faltas_c ').data(datosJugadores).text(faltasCometidasJug).enter();
         var faltasRecibidasJug = d3.select('#faltas_r ').data(datosJugadores).text(faltasRecibidasJug).enter();
         var tarjetasAmarillasJ = d3.select('#tarjetas_a ').data(datosJugadores).text(tarjetasAmarillasJug).enter();
         var tarjetasRojasJ = d3.select('#tarjetas_r ').data(datosJugadores).text(tarjetasRojasJug).enter();
     });
 }
 //Dibujar trayectoria con circulos
 function draw_trayectoria_C(nD, j) {
     //Borrar Circulos de la pantalla
     //console.log('circulos', circulos)
     //console.log('New Data', nD)
     circulos = svgCanvas.selectAll('circle').transition().duration(100).attr('r', 0).remove();
     var lines = svgCanvas.selectAll('line').transition().duration(150).attr('stroke-width', 0).remove()
         //console.log('circulos borrados', circulos)
     circulos = [];
     var newCirculos = svgCanvas.selectAll('circle line').data(nD).enter().append('circle').transition().delay(function(d, i) {
             return i / nD.length * 7000;
         }).attr('cx', function(d, i) {
             return xScaleT(position_x[i]);
         }).attr('cy', function(d, i) {
             return yScaleT(position_y[i]);
         }).attr('r', function(d, i) {
             return radio[i];
         })
         /*Funcion de color con velocidad
         .attr('fill', function(d, i) {
             if (color0[i] <= 4) {
                 return colorScale0(color0[i]);
             } else if (color0[i] > 4) {
                 return colorScale1(color1[i]);
             }
         })*/
         .attr('fill', function(d, i) {
             //   console.log('color', colores_g)
             if (j == 'all') {
                 return colores_g[+d.tag_id]
             }
             return colores_g[j];
         }).attr('radio', function(d, i) {
             return radioScale(radio[i]);
         }).attr('opacity', .8);
 }
 //Dibujar Trayectoria con Lineas
 function draw_trayectoria_LT(nD, j) {
     //console.log('Trayectoria Lineas', nD.length, position_x.length);
     //Dibujar las lineas de la trayectoria
     var lines_trayecto = svgCanvas.selectAll('line').data(nD).enter().append('line').attr('class', 'positionPath').style('stroke', function(d, i) {
         if (color0[i] <= 4) {
             return colorScale0(color0[i]);
         } else if (color0[i] > 4) {
             return colorScale1(color1[i]);
         }
     }).style('stroke-width', function(d, i) {
         return radio[i];
     }).transition().delay(function(d, i) {
         return i / nD.length * 7000;
     }).attr('y1', function(d, i) {
         return yScaleT(position_y[i]);
     }).attr('x1', function(d, i) {
         return xScaleT(position_x[i]);
     }).attr('y2', function(d, i) {
         if (i != nD.length) {
             return yScaleT(position_y[i + 1]);
         } else {
             return yScaleT(position_y[i - 10]);
         }
     }).attr('x2', function(d, i) {
         if (i != nD.length) {
             return xScaleT(position_x[i + 1]);
         } else {
             return xScaleT(position_x[i - 10]);
         }
     });
 }
 //Dibujar la Dirección de la Trayectoria
 function draw_trayectoria_LD(nD, j) {
     //Borrar Circulos de la pantalla
     //console.log('circulos', circulos)
     //console.log('New Data', nD)
     //Dibujar Dirección de la trayectoria
     var lineas_direccion = svgCanvas.selectAll('line').data(nD).enter().append('line').attr('class', 'directionPath').transition().delay(function(d, i) {
         return i / nD.length * 7000;
     }).attr('class', 'positionPath').attr('y2', function(d, i) {
         return yScaleT(position_y[i]) - radDir * Math.sin(direccion[i]);
     }).attr('x2', function(d, i) {
         return xScaleT(position_x[i]) - radDir * Math.cos(direccion[i]);
     }).attr('y1', function(d, i) {
         return yScaleT(position_y[i]);
     }).attr('x1', function(d, i) {
         return xScaleT(position_x[i]);
     }).style('stroke', function(d, i) {
         if (color0[i] <= 4) {
             return colorScale0(color0[i]);
         } else if (color0[i] > 4) {
             return colorScale1(color1[i]);
         }
     }).style('stroke-width', 1);
 }
 //Dibujar la Grafica de Velocidad
 function draw_grafs_V(nD, i_seg, f_seg, j) {
     barWidth = wG / nD.length;
     //Escalar los datos de x de la grafica
     //console.log('NEW', margin.left )
     xScaleAxis = d3.scale.linear().domain([0, nD.length]).range([0, wG - padding * 2]);
     xAxis = d3.svg.axis().scale(xScaleAxis).orient("bottom").ticks(10);
     yScale = d3.scale.linear().domain([d3.max(velocidad), d3.min(velocidad)]).range([hG - padding, 0]);
     //console.log('max', d3.max(costoS));
     yScaleAxis = d3.scale.linear().domain([d3.max(velocidad), d3.min(velocidad)]).range([hG, padding * 2]);
     yAxis = d3.svg.axis().scale(yScaleAxis).orient("left").ticks(5);
     canvasGrafs = d3.select("#graficas_01").attr('width', wG).attr('height', hG);
     //console.log('bW', barWidth);
     canvasGrafs.selectAll('rect').data(nD).enter().append('rect')
     .attr('class', 'bars').attr('width', barWidth / 10).attr('height', function(d, i) {
         return yScale(+d.speed);
     }).attr('x', function(d, i) {
         return xScaleAxis(i) + margin.left + barWidth / 2;
     }).attr('y', function(d, i) {
         return hG - yScale(+d.speed);
     }).on("mouseover", function(d) {
         //Get this bar's x/y values, then augment for the tooltip
         var xPosition = parseFloat(d3.select(this).attr("x")) + barWidth / 8;
         var yPosition = parseFloat(d3.select(this).attr("y")) - 20;
         canvasGrafs.append("text").attr("id", "tooltip").attr("x", xPosition).attr("y", yPosition).attr("text-anchor", "middle").attr("font-family", "sans-serif").attr("font-size", "14px").attr("font-weight", "bold").attr("fill", "#fff").text(+d.speed + " m/s");
     }).on("mouseout", function() {
         //Remove the tooltip
         d3.select("#tooltip").remove();
     });
     canvasGrafs.selectAll('circle').data(nD).enter().append('circle').attr('class', 'bars').attr('r', barWidth / 8).attr('cx', function(d, i) {
         return xScaleAxis(i) + margin.left + barWidth / 2 + barWidth / 20
     }).attr('cy', function(d, i) {
         return hG - yScale(+d.speed);
     }).on("mouseover", function(d) {
         //Get this bar's x/y values, then augment for the tooltip
         var xPosition = parseFloat(d3.select(this).attr("x")) + barWidth / 8;
         var yPosition = parseFloat(d3.select(this).attr("y")) - 20;
         canvasGrafs.append("text").attr("id", "tooltip").attr("x", xPosition).attr("y", yPosition).attr("text-anchor", "middle").attr("font-family", "sans-serif").attr("font-size", "14px").attr("font-weight", "bold").attr("fill", "#fff").text(+d.speed + " m/s");
     }).on("mouseout", function() {
         //Remove the tooltip
         d3.select("#tooltip").remove();
     });
     canvasGrafs.append("rect").attr("class", "axis").attr('width', wG).attr('height', hG / 4).attr('x', 0).attr('y', hG - hG / 4);
     canvasGrafs.append("rect").attr("class", "axis").attr('width', wG).attr('height', hG / 4).attr('x', 0).attr('y', hG - hG / 2);
     canvasGrafs.append("rect").attr("class", "axis").attr('width', wG).attr('height', hG / 4).attr('x', 0).attr('y', hG - hG / 4 - hG / 2);
     canvasGrafs.append("rect").attr("class", "axis").attr('width', wG).attr('height', hG / 4).attr('x', 0).attr('y', 0);
     //canvasGrafs.append("g").attr("class", "axis").attr("transform", "translate(" + padding + "," + (-padding) + ")").call(yAxis);
 }
 //Dibujar la Gráfica de Distancia
 function draw_grafs_D(nD, i_seg, f_seg, j) {
     barWidth = wG / nD.length;
     //Escalar los datos de x de la grafica
     //console.log('NEW', margin.left)
     xScaleAxis = d3.scale.linear().domain([0, nD.length]).range([0, wG - padding * 2]);
     xAxis = d3.svg.axis().scale(xScaleAxis).orient("bottom").ticks(10);
     yScale = d3.scale.linear().domain([d3.max(distancia), d3.min(distancia)]).range([hG - padding, 0]);
     //console.log('max', d3.max(costoS));
     yScaleAxis = d3.scale.linear().domain([d3.max(distancia), d3.min(distancia)]).range([hG, padding * 2]);
     yAxis = d3.svg.axis().scale(yScaleAxis).orient("left").ticks(5);
     canvasGrafs = d3.select("#graficas_01").attr('width', wG).attr('height', hG);
     //console.log('bW', barWidth);
     canvasGrafs.selectAll('rect').data(nD).enter().append('rect').attr('class', 'bars').attr('width', barWidth / 10).attr('height', function(d, i) {
         return yScale(+d.total_dist_diff);
     }).attr('x', function(d, i) {
         return xScaleAxis(i) + margin.left + barWidth / 2;
     }).attr('y', function(d, i) {
         return hG - yScale(+d.total_dist_diff);
     }).on("mouseover", function(d) {
         //Get this bar's x/y values, then augment for the tooltip
         var xPosition = parseFloat(d3.select(this).attr("x")) + barWidth / 8;
         var yPosition = parseFloat(d3.select(this).attr("y")) - 20;
         canvasGrafs.append("text").attr("id", "tooltip").attr("x", xPosition).attr("y", yPosition).attr("text-anchor", "middle").attr("font-family", "sans-serif").attr("font-size", "14px").attr("font-weight", "bold").attr("fill", "#fff").text(+d.total_dist_diff + " mts");
     }).on("mouseout", function() {
         //Remove the tooltip
         d3.select("#tooltip").remove();
     });
     canvasGrafs.selectAll('circle').data(nD).enter().append('circle').attr('class', 'bars').attr('r', barWidth / 8).attr('cx', function(d, i) {
         return xScaleAxis(i) + margin.left + barWidth / 2 + barWidth / 20
     }).attr('cy', function(d, i) {
         return hG - yScale(+d.total_dist_diff);
     }).on("mouseover", function(d) {
         //Get this bar's x/y values, then augment for the tooltip
         var xPosition = parseFloat(d3.select(this).attr("x")) + barWidth / 8;
         var yPosition = parseFloat(d3.select(this).attr("y")) - 20;
         canvasGrafs.append("text").attr("id", "tooltip").attr("x", xPosition).attr("y", yPosition).attr("text-anchor", "middle").attr("font-family", "sans-serif").attr("font-size", "14px").attr("font-weight", "bold").attr("fill", "#fff").text(+d.total_dist_diff + " mts");
     }).on("mouseout", function() {
         //Remove the tooltip
         d3.select("#tooltip").remove();
     });
     canvasGrafs.append("rect").attr("class", "axis").attr('width', wG).attr('height', hG / 4).attr('x', 0).attr('y', hG - hG / 4);
     canvasGrafs.append("rect").attr("class", "axis").attr('width', wG).attr('height', hG / 4).attr('x', 0).attr('y', hG - hG / 2);
     canvasGrafs.append("rect").attr("class", "axis").attr('width', wG).attr('height', hG / 4).attr('x', 0).attr('y', hG - hG / 4 - hG / 2);
     canvasGrafs.append("rect").attr("class", "axis").attr('width', wG).attr('height', hG / 4).attr('x', 0).attr('y', 0);
     //canvasGrafs.append("g").attr("class", "axis").attr("transform", "translate(" + padding + "," + (-padding) + ")").call(yAxis);
 }
 //Dibujar la Grafica de Velocidad
 function draw_grafs_I(nD, i_seg, f_seg, j) {
     barWidth = wG / nD.length;
     //Escalar los datos de x de la grafica
     //console.log('NEW', margin.left )
     xScaleAxis = d3.scale.linear().domain([0, nD.length]).range([0, wG - padding * 2]);
     xAxis = d3.svg.axis().scale(xScaleAxis).orient("bottom").ticks(10);
     yScale = d3.scale.linear().domain([d3.max(intensidad), d3.min(intensidad)]).range([hG - padding, 0]);
     //console.log('max', d3.max(costoS));
     yScaleAxis = d3.scale.linear().domain([d3.max(intensidad), d3.min(intensidad)]).range([hG, padding * 2]);
     yAxis = d3.svg.axis().scale(yScaleAxis).orient("left").ticks(5);
     canvasGrafs = d3.select("#graficas_01").attr('width', wG).attr('height', hG);
     //console.log('bW', barWidth);
     canvasGrafs.selectAll('rect').data(nD).enter().append('rect').attr('class', 'bars').attr('width', barWidth / 10).attr('height', function(d, i) {
         return yScale(+d.high_intensity_distance);
     }).attr('x', function(d, i) {
         return xScaleAxis(i) + margin.left + barWidth / 2;
     }).attr('y', function(d, i) {
         return hG - yScale(+d.high_intensity_distance);
     }).on("mouseover", function(d) {
         //Get this bar's x/y values, then augment for the tooltip
         var xPosition = parseFloat(d3.select(this).attr("x")) + barWidth / 8;
         var yPosition = parseFloat(d3.select(this).attr("y")) - 20;
         canvasGrafs.append("text").attr("id", "tooltip").attr("x", xPosition).attr("y", yPosition).attr("text-anchor", "middle").attr("font-family", "sans-serif").attr("font-size", "14px").attr("font-weight", "bold").attr("fill", "#fff").text(+d.high_intensity_distance + " mts");
     }).on("mouseout", function() {
         //Remove the tooltip
         d3.select("#tooltip").remove();
     });
     canvasGrafs.selectAll('circle').data(nD).enter().append('circle').attr('class', 'bars').attr('r', barWidth / 8).attr('cx', function(d, i) {
         return xScaleAxis(i) + margin.left + barWidth / 2 + barWidth / 20
     }).attr('cy', function(d, i) {
         return hG - yScale(+d.high_intensity_distance);
     }).on("mouseover", function(d) {
         //Get this bar's x/y values, then augment for the tooltip
         var xPosition = parseFloat(d3.select(this).attr("x")) + barWidth / 8;
         var yPosition = parseFloat(d3.select(this).attr("y")) - 20;
         canvasGrafs.append("text").attr("id", "tooltip").attr("x", xPosition).attr("y", yPosition).attr("text-anchor", "middle").attr("font-family", "sans-serif").attr("font-size", "14px").attr("font-weight", "bold").attr("fill", "#fff").text(+d.high_intensity_distance + " m/s");
     }).on("mouseout", function() {
         //Remove the tooltip
         d3.select("#tooltip").remove();
     });
     canvasGrafs.append("rect").attr("class", "axis").attr('width', wG).attr('height', hG / 4).attr('x', 0).attr('y', hG - hG / 4);
     canvasGrafs.append("rect").attr("class", "axis").attr('width', wG).attr('height', hG / 4).attr('x', 0).attr('y', hG - hG / 2);
     canvasGrafs.append("rect").attr("class", "axis").attr('width', wG).attr('height', hG / 4).attr('x', 0).attr('y', hG - hG / 4 - hG / 2);
     canvasGrafs.append("rect").attr("class", "axis").attr('width', wG).attr('height', hG / 4).attr('x', 0).attr('y', 0);
     //canvasGrafs.append("g").attr("class", "axis").attr("transform", "translate(" + padding + "," + (-padding) + ")").call(yAxis);
 }
 //Dibujar la Grafica de Esfuerzo
 function draw_grafs_E(nD, i_seg, f_seg, j) {
     console.log('Esfuerzo')
     barWidth = wG / nD.length;
     //Escalar los datos de x de la grafica
     //console.log('NEW', margin.left )
     xScaleAxis = d3.scale.linear().domain([0, nD.length]).range([0, wG - padding * 2]);
     xAxis = d3.svg.axis().scale(xScaleAxis).orient("bottom").ticks(10);
     yScale = d3.scale.linear().domain([d3.max(esfuerzo), d3.min(esfuerzo)]).range([hG - padding, 0]);
     //console.log('max', d3.max(costoS));
     yScaleAxis = d3.scale.linear().domain([d3.max(esfuerzo), d3.min(esfuerzo)]).range([hG, padding * 2]);
     yAxis = d3.svg.axis().scale(yScaleAxis).orient("left").ticks(5);
     canvasGrafs = d3.select("#graficas_01").attr('width', wG).attr('height', hG);
     //console.log('bW', barWidth);
     canvasGrafs.selectAll('rect').data(nD).enter().append('rect').attr('class', 'bars').attr('width', barWidth / 10).attr('height', function(d, i) {
         return yScale(+d.total_effort_diff);
     }).attr('x', function(d, i) {
         return xScaleAxis(i) + margin.left + barWidth / 2;
     }).attr('y', function(d, i) {
         return hG - yScale(+d.total_effort_diff);
     }).on("mouseover", function(d) {
         //Get this bar's x/y values, then augment for the tooltip
         var xPosition = parseFloat(d3.select(this).attr("x")) + barWidth / 8;
         var yPosition = parseFloat(d3.select(this).attr("y")) - 20;
         canvasGrafs.append("text").attr("id", "tooltip").attr("x", xPosition).attr("y", yPosition).attr("text-anchor", "middle").attr("font-family", "sans-serif").attr("font-size", "14px").attr("font-weight", "bold").attr("fill", "#fff").text(+d.total_effort_diff);
     }).on("mouseout", function() {
         //Remove the tooltip
         d3.select("#tooltip").remove();
     });
     canvasGrafs.selectAll('circle').data(nD).enter().append('circle').attr('class', 'bars').attr('r', barWidth / 8).attr('cx', function(d, i) {
         return xScaleAxis(i) + margin.left + barWidth / 2 + barWidth / 20
     }).attr('cy', function(d, i) {
         return hG - yScale(+d.total_effort_diff);
     }).on("mouseover", function(d) {
         //Get this bar's x/y values, then augment for the tooltip
         var xPosition = parseFloat(d3.select(this).attr("x")) + barWidth / 8;
         var yPosition = parseFloat(d3.select(this).attr("y")) - 20;
         canvasGrafs.append("text").attr("id", "tooltip").attr("x", xPosition).attr("y", yPosition).attr("text-anchor", "middle").attr("font-family", "sans-serif").attr("font-size", "14px").attr("font-weight", "bold").attr("fill", "#fff").text(+d.total_effort_diff);
     }).on("mouseout", function() {
         //Remove the tooltip
         d3.select("#tooltip").remove();
     });
     canvasGrafs.append("rect").attr("class", "axis").attr('width', wG).attr('height', hG / 4).attr('x', 0).attr('y', hG - hG / 4);
     canvasGrafs.append("rect").attr("class", "axis").attr('width', wG).attr('height', hG / 4).attr('x', 0).attr('y', hG - hG / 2);
     canvasGrafs.append("rect").attr("class", "axis").attr('width', wG).attr('height', hG / 4).attr('x', 0).attr('y', hG - hG / 4 - hG / 2);
     canvasGrafs.append("rect").attr("class", "axis").attr('width', wG).attr('height', hG / 4).attr('x', 0).attr('y', 0);
     //canvasGrafs.append("g").attr("class", "axis").attr("transform", "translate(" + padding + "," + (-padding) + ")").call(yAxis);
 }
 //Dibujar la Grafica de Sprint 
 function draw_grafs_SP(nD, i_seg, f_seg, j) {
     //console.log('Sprint')
     barWidth = wG / nD.length;
     //Escalar los datos de x de la grafica
     //console.log('NEW', margin.left )
     xScaleAxis = d3.scale.linear().domain([0, nD.length]).range([0, wG - padding * 2]);
     xAxis = d3.svg.axis().scale(xScaleAxis).orient("bottom").ticks(10);
     yScale = d3.scale.linear().domain([d3.max(sprint), d3.min(sprint)]).range([hG - padding, 0]);
     //console.log('max', d3.max(costoS));
     yScaleAxis = d3.scale.linear().domain([d3.max(sprint), d3.min(sprint)]).range([hG, padding * 2]);
     yAxis = d3.svg.axis().scale(yScaleAxis).orient("left").ticks(5);
     canvasGrafs = d3.select("#graficas_01").attr('width', wG).attr('height', hG);
     //console.log('bW', barWidth);
     canvasGrafs.selectAll('rect').data(nD).enter().append('rect').attr('class', 'bars').attr('width', barWidth / 10).attr('height', function(d, i) {
         return yScale(+d.sprint_distance);
     }).attr('x', function(d, i) {
         return xScaleAxis(i) + margin.left + barWidth / 2;
     }).attr('y', function(d, i) {
         return hG - yScale(+d.sprint_distance);
     }).on("mouseover", function(d) {
         //Get this bar's x/y values, then augment for the tooltip
         var xPosition = parseFloat(d3.select(this).attr("x")) + barWidth / 8;
         var yPosition = parseFloat(d3.select(this).attr("y")) - 20;
         canvasGrafs.append("text").attr("id", "tooltip").attr("x", xPosition).attr("y", yPosition).attr("text-anchor", "middle").attr("font-family", "sans-serif").attr("font-size", "14px").attr("font-weight", "bold").attr("fill", "#fff").text(+d.sprint_distance + 'mts');
     }).on("mouseout", function() {
         //Remove the tooltip
         d3.select("#tooltip").remove();
     });
     canvasGrafs.selectAll('circle').data(nD).enter().append('circle').attr('class', 'bars').attr('r', barWidth / 8).attr('cx', function(d, i) {
         return xScaleAxis(i) + margin.left + barWidth / 2 + barWidth / 20
     }).attr('cy', function(d, i) {
         return hG - yScale(+d.sprint_distance);
     }).on("mouseover", function(d) {
         //Get this bar's x/y values, then augment for the tooltip
         var xPosition = parseFloat(d3.select(this).attr("x")) + barWidth / 8;
         var yPosition = parseFloat(d3.select(this).attr("y")) - 20;
         canvasGrafs.append("text").attr("id", "tooltip").attr("x", xPosition).attr("y", yPosition).attr("text-anchor", "middle").attr("font-family", "sans-serif").attr("font-size", "14px").attr("font-weight", "bold").attr("fill", "#fff").text(+d.sprint_distance + 'mts');
     }).on("mouseout", function() {
         //Remove the tooltip
         d3.select("#tooltip").remove();
     });
     canvasGrafs.append("rect").attr("class", "axis").attr('width', wG).attr('height', hG / 4).attr('x', 0).attr('y', hG - hG / 4);
     canvasGrafs.append("rect").attr("class", "axis").attr('width', wG).attr('height', hG / 4).attr('x', 0).attr('y', hG - hG / 2);
     canvasGrafs.append("rect").attr("class", "axis").attr('width', wG).attr('height', hG / 4).attr('x', 0).attr('y', hG - hG / 4 - hG / 2);
     canvasGrafs.append("rect").attr("class", "axis").attr('width', wG).attr('height', hG / 4).attr('x', 0).attr('y', 0);
     //canvasGrafs.append("g").attr("class", "axis").attr("transform", "translate(" + padding + "," + (-padding) + ")").call(yAxis);
 }

 function limpiar() {
     selectedItems = [];
     direccion = [];
     radio = [];
     color0 = [];
     color1 = [];
     position_x = [];
     position_y = [];
     segundosT = [];
     energiaT = [];
     velocidadT = [];
     intensidadT = [];
     //console.log('C', canvasGrafs)
     d3.selectAll('.positionPath').remove();
 }

 function limpiarG() {
     sprint = [];
     esfuerzo = [];
     velocidad = [];
     intensidad = [];
     segundos = [];
     energia = [];
     //console.log('C', canvasGrafs)
     d3.selectAll('.bars').remove();
     d3.selectAll('.axis').remove();
 }