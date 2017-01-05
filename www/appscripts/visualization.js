 //D3 visualizacion 
 //League Manager Cisualization Dashboard
 var datos = [];
 var yScale;
 var xScale;
 var yScaleT;
 var xScaleT;
 var radio;
 var radioScale;
 var canvasCancha;
 var canvasGrafs;
 var selectedItems = []
 var padding = 50;
 var margin = {
     top: 10,
     right: 20,
     bottom: 30,
     left: 50
 };
 var hT, wT;
 var hG, wG;
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
 var colores_g = ['#fc8d59', '#ffffbf', '#91cf60'];
 var colores_g_op = ['rgba(252, 141, 89, 0.4)', 'rgba(255, 255, 191, 0.4)', 'rgba(145, 207, 96, 0.4)'];
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
     radioScale = d3.scale.linear().domain([0, d3.max(datos, function(d, i) {
         return radio[i];
     })]).range([5, 20]);
     cancha('#data-vis');
     colorScale0 = d3.scale.linear().domain([0, 3]).range(['#c62828', '#FFE766']);
     colorScale1 = d3.scale.linear().domain([4, 9]).range(['#FFE766', '#00CF36']);
     canvasCancha = d3.select("#data-vis").attr('width', wT).attr('height', hT);
     wich = 5;
     cual = 'velocidad_C';
     tiempo_i = 0;
     tiempo_f = 300;
     //console.log('d5', data_5_min)
     limpiarG();
     cargarDatosG(5, tiempo_i, tiempo_f, "P1", 'velocidad_C');
     cargarDatosT(5, tiempo_i, tiempo_f, "P1");
     cargarDatosJugador(5);
     //Seleccion de jugaador
     var jugadorSelec = d3.selectAll('#left-nav a ').on('click', function() {
         //Vaciar la pantalla y los arreglos
         limpiar();
         limpiarG();
         wich = this.id;
         cargarDatosG(wich, tiempo_i, tiempo_f, "P1", cual);
         cargarDatosT(wich, tiempo_i, tiempo_f, "P1");
         cargarDatosJugador(wich);
     });
     //Seleccionar Categoria de Grafica
     var categoriaSelec = d3.selectAll('#controles button').on('click', function() {
         $('button').removeClass('btn-active');
         d3.select(this).attr('class', ' btn btn-active btn-custom');
         //Vaciar la pantalla de la grafica y los arreglos
         limpiarG();
         cual = this.id;
         //console.log('cual', cual)
         cargarDatosG(wich, tiempo_i, tiempo_f, "P1", cual);
     });
     // Enviar datos de Sliders al dar click en el slider 
     var slider = d3.selectAll('#slider-range ').on('click', function() {
         tiempo_i = $('#init-amount').text();
         tiempo_f = $('#fin-amount').text();
         //console.log('tiempos', tiempo_i, tiempo_f)
     });
     // Enviar datos de Sliders al dar click en el handler
     var handler = d3.selectAll('#slider-range > span').on('click', function() {
         tiempo_i = $('#init-amount').text();
         tiempo_f = $('#fin-amount').text();
         //console.log('tiempos', tiempo_i, tiempo_f)
     });
     //Ejecutar la visualizacion de la trayectoria, por seleccion del slider
     var visualizarB = d3.selectAll('#visualizar_B').on('click', function() {
         //Vaciar la pantalla de la cancha y los arreglos
         tiempo_i = $('#init-amount').text();
         tiempo_f = $('#fin-amount').text();
         limpiar();
         cargarDatosT(wich, tiempo_i, tiempo_f, "P1");
         cargarDatosJugador(wich);
     });
 });
 //Dibujar cancha 
 function cancha(idDiv) {
     wT = $(idDiv).width();
     hT = $(idDiv).height();
     canvasCancha = d3.select(idDiv)
         //console.log('cancha', wT, hT)
     canvasCancha.append('rect').attr('class', 'grid').attr('x', wT / 2).attr('y', 0).attr('width', wT / 2).attr('height', hT).style('fill', '#165718').style('fill-opacity', '0.8').style('stroke', '#fff').style('stroke-width', '5');
     canvasCancha.append('rect').attr('class', 'grid').attr('x', 0).attr('y', 0).attr('width', wT / 2).attr('height', hT).style('fill', '#165718').style('fill-opacity', '0.8').style('stroke', '#fff').style('stroke-width', '5');
     canvasCancha.append('rect').attr('class', 'grid').attr('x', 0).attr('y', hT / 4 + hT / 16).attr('width', wT / 8).attr('height', hT / 2 - hT / 8).style('fill', '#fff').style('fill-opacity', '0.2').style('stroke', '#fff').style('stroke-width', '5');
     canvasCancha.append('rect').attr('class', 'grid').attr('x', 0).attr('y', hT / 4 + hT / 8).attr('width', wT / 16).attr('height', hT / 2 - hT / 4).style('fill', 'none').style('stroke', '#fff').style('stroke-width', '1');
     canvasCancha.append('rect').attr('class', 'grid').attr('x', wT - wT / 8).attr('y', hT / 4 + hT / 16).attr('width', wT / 8).attr('height', hT / 2 - hT / 8).style('fill', '#fff').style('fill-opacity', '0.2').style('stroke', '#fff').style('stroke-width', '5');
     canvasCancha.append('rect').attr('class', 'grid').attr('x', wT - wT / 16).attr('y', hT / 4 + hT / 8).attr('width', wT / 16).attr('height', hT / 2 - hT / 4).style('fill', 'none').style('stroke', '#fff').style('stroke-width', '1');
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
                 draw_grafs_V(newD, i_seg, f_seg, jugador, '#graficas_01',0);
                 break;
             case 'distancia_C':
                 draw_grafs_D(newD, i_seg, f_seg, jugador, '#graficas_01',0);
                 break;
             case 'esfuerzo_C':
                 draw_grafs_E(newD, i_seg, f_seg, jugador, '#graficas_01',0);
                 break;
             case 'intensidad_C':
                 draw_grafs_I(newD, i_seg, f_seg, jugador, '#graficas_01',0);
                 break;
             case 'sprint_C':
                 draw_grafs_SP(newD, i_seg, f_seg, jugador, '#graficas_01',0);
                 break;
         }
     });
 }
 //Inicio de Carga de Datos de Trayecto
 function cargarDatosT(jugador, i_seg, f_seg, p) {
     newDT = [];
     //console.log('Datos Jugador: ', jugador, i_seg, f_seg, p)
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
                 //console.log('Con', contador);
                 contador++;
             }
         });
         if (newDT.length == 0) {
             console.log('No hay Datos Disponibles')
         }
         //console.log('newDT', newDT.length);
         draw_trayectoria_LT(newDT, jugador, '#data-vis');
     });
     //console.log('NEWDT', newDT)
 }
 //Cargar Datos Generales por Jugador
 function cargarDatosJugador(jugador) {
     var csv_jugadores = d3.csv("/data/toluca_jugadores.csv", function(error, data) {
         data.forEach(function(d, i) {
             if ((d.numero == jugador)) {
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
             }
         });
         datosJugadores = data;
         //Información General del Jugador
         var cuadro_i01 = d3.select('#tit-info01').style({'background-color':colores_g_op[0],'color':'#1D3457'});
         var cuadro_i02 = d3.select('#tit-info02').style({'background-color':colores_g_op[2],'color':'#1D3457'});
         var equipo01 = d3.select('#equipo01').style('background-color',colores_g_op[0]);
         var equipo02 = d3.select('#equipo02').style('background-color',colores_g_op[2]);
         var imgJ = d3.select('#equipo01 > div:nth-child(1) > img').data(datosJugadores).attr('src', 'data/perfil-jugadores/' + numeroJug + '.jpg').enter();
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
 function draw_trayectoria_C(nD, j, idDiv) {
     hT = $(idDiv).height();
     wT = $(idDiv).width();
     hT = hT - margin.bottom - margin.top;
     wT = wT - margin.left - margin.right;
     //Escalar los datos de x para la cancha
     xScaleT = d3.scale.linear().domain([-5, 110]).range([0, wT]);
     //xAxis = d3.svg.axis().scale(xScale).orient("bottom").ticks(5);
     yScaleT = d3.scale.linear().domain([-5, 73]).range([hT, 0]);
     //yAxis = d3.svg.axis().scale(yScale).orient("left").ticks(5);
     canvasCancha = d3.select(idDiv);
     circulos = canvasCancha.selectAll('circle').transition().duration(100).attr('r', 0).remove();
     //console.log('circulos borrados', circulos)
     circulos = [];
     var newCirculos = canvasCancha.selectAll('circle').data(nD).enter().append('circle').transition().delay(function(d, i) {
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
 function draw_trayectoria_LT(nD, j, idDiv) {
     hT = $(idDiv).height();
     wT = $(idDiv).width();
     hT = hT - margin.bottom - margin.top;
     wT = wT - margin.left - margin.right;
     //Escalar los datos de x para la cancha
     xScaleT = d3.scale.linear().domain([-5, 110]).range([0, wT]);
     //xAxis = d3.svg.axis().scale(xScale).orient("bottom").ticks(5);
     yScaleT = d3.scale.linear().domain([-5, 73]).range([hT, 0]);
     //yAxis = d3.svg.axis().scale(yScale).orient("left").ticks(5);
     canvasCancha = d3.select(idDiv);
     var lines_trayecto = canvasCancha.selectAll('line').data(nD).enter().append('line').attr('class', 'positionPath').style('stroke', function(d, i) {
         if (color0[i] <= 4) {
             return colorScale0(color0[i]);
         } else if (color0[i] > 4) {
             return colorScale1(color1[i]);
         }
     }).style('stroke-width', function(d, i) {
         return radio[i];
     }).transition().delay(function(d, i) {
         return i / nD.length * 7000;
     }).attr('x1', function(d, i) {
         return xScaleT(position_x[i]);
     }).attr('y1', function(d, i) {
         return yScaleT(position_y[i]);
     }).attr('x2', function(d, i) {
         if (i < nD.length - 1) {
             return xScaleT(position_x[i + 1]);
         } else {
             return xScaleT(position_x[i - 1]);
         }
     }).attr('y2', function(d, i) {
         if (i < nD.length - 1) {
             return yScaleT(position_y[i + 1]);
         } else {
             return yScaleT(position_y[i - 1]);
         }
     });
 }
 //Dibujar la Dirección de la Trayectoria
 function draw_trayectoria_LD(nD, j, idDiv) {
     hT = $(idDiv).height();
     wT = $(idDiv).width();
     hT = hT;
     wT = wT;
     //Escalar los datos de x para la cancha
     xScaleT = d3.scale.linear().domain([-5, 110]).range([0, wT]);
     //xAxis = d3.svg.axis().scale(xScale).orient("bottom").ticks(5);
     yScaleT = d3.scale.linear().domain([-5, 73]).range([hT, 0]);
     //yAxis = d3.svg.axis().scale(yScale).orient("left").ticks(5);
     canvasCancha = d3.select(idDiv);
     var lineas_direccion = canvasCancha.selectAll('line').data(nD).enter().append('line').attr('class', 'directionPath').transition().delay(function(d, i) {
         return i / nD.length * 7000;
     }).attr('x1', function(d, i) {
         return xScaleT(position_x[i]);
     }).attr('y1', function(d, i) {
         return yScaleT(position_y[i]);
     }).attr('x2', function(d, i) {
         if (i < nD.length - 1) {
             return xScaleT(position_x[i]) - radDir * Math.cos(direccion[i]);
         } else {
             return xScaleT(position_x[i]) - radDir * Math.cos(direccion[i]);
         }
     }).attr('y2', function(d, i) {
         if (i < nD.length - 1) {
             return yScaleT(position_y[i + 1]) - radDir * Math.sin(direccion[i]);
         } else {
             return yScaleT(position_y[i - 1]) - radDir * Math.sin(direccion[i]);
         }
     }).style('stroke', function(d, i) {
         if (color0[i] <= 4) {
             return colorScale0(color0[i]);
         } else if (color0[i] > 4) {
             return colorScale1(color1[i]);
         }
     }).style('stroke-width', 1);
 }
 //Dibujar la Grafica de Velocidad
 function draw_grafs_V(nD, i_seg, f_seg, j, idDiv) {
     wG = $(idDiv).width();
     hG = $(idDiv).height();
     wG = wG - margin.left-30 - margin.right;
     hG = hG - margin.bottom - margin.top;
     canvasGrafs = d3.select(idDiv);
     //Escalar los datos de x de la grafica
     xScaleAxis = d3.scale.linear().domain([0, nD.length - 1]).range([0, wG]);
     xScaleA = d3.scale.linear().domain([0, 90]).range([0, wG]);
     xAxis = d3.svg.axis().scale(xScaleA).orient("bottom").ticks(8);
     yScale = d3.scale.linear().domain([d3.max(velocidad), d3.min(velocidad)]).range([hG, +margin.top]);
     //console.log('max', d3.max(costoS));
     yScaleAxis = d3.scale.linear().domain([d3.max(velocidad), d3.min(velocidad)]).range([margin.top, hG + margin.top]);
     yAxis = d3.svg.axis().scale(yScaleAxis).orient("left").ticks(5);
     canvasGrafs.attr('width', wG).attr('height', hG);
     canvasGrafs.append("rect").attr("class", "axis").attr('width', wG).attr('height', hG / 4).attr('x', margin.left).attr('y', margin.top + hG - hG / 4);
     canvasGrafs.append("rect").attr("class", "axis").attr('width', wG).attr('height', hG / 4).attr('x', margin.left).attr('y', margin.top + hG - hG / 2);
     canvasGrafs.append("rect").attr("class", "axis").attr('width', wG).attr('height', hG / 4).attr('x', margin.left).attr('y', margin.top + hG - hG / 4 - hG / 2);
     canvasGrafs.append("rect").attr("class", "axis").attr('width', wG).attr('height', hG / 4).attr('x', margin.left).attr('y', margin.top);
     //console.log('bW', barWidth);
     var lineasP = d3.svg.area().x(function(d, i) {
         return xScaleAxis(i) + margin.left
     }).y(function(d, i) {
         //console.log('HG', +d.speed)
         return hG - yScale(+d.speed) + margin.top;
     }).y0(hG + margin.top).interpolate("basis");;
     canvasGrafs.selectAll('lineasP').data(nD).enter().append('svg:path').attr('class', 'lineasP').style('fill', 'rgba(252, 141, 89, .4)').attr('d', lineasP(nD));
     /*
       canvasGrafs.selectAll('rect').data(nD).enter().append('rect').attr('class', 'bars').attr('width', barWidth / 6).attr('height', function(d, i) {
           return yScale(+d.speed) ;
       }).attr('x', function(d, i) {
           return xScaleAxis(i) + margin.left + barWidth / 2;
       }).attr('y', function(d, i) {
           return hG - yScale(+d.speed) +margin.top;
       }).on("mouseover", function(d, i) {
           //Get this bar's x/y values, then augment for the tooltip
           var xPosition = parseFloat(d3.select(this).attr("x")) + barWidth / 8;
           var yPosition = parseFloat(d3.select(this).attr("y")) - 20;
          $('#tit-info').text('Minuto ' + d.segundos / 60 );
          $('#info-p').text('Vel Max: '+d.speed+' m/s');
           //canvasGrafs.append("text").attr("id", "tooltip").attr("x", xPosition).attr("y", yPosition).attr("text-anchor", "middle").attr("font-family", "sans-serif").attr("font-size", "14px").attr("font-weight", "bold").attr("fill", "#fff").text(+d.speed + " m/s");
       }).on("mouseout", function() {
           //Remove the tooltip
          $("#tit-info").text();
          $('#info-p').text();
           //d3.select("#tooltip").remove();
       });
       */
     canvasGrafs.append('g').attr("class", "axisY").attr("transform", "translate(" + margin.left + "," + (hG + margin.top) + ")").call(xAxis);
     canvasGrafs.append('g').attr("class", "axisY").attr("transform", "translate(" + margin.left + "," + (0) + ")").call(yAxis);
     canvasGrafs.selectAll('.axisY').style({
         'stroke': 'none',
         'fill': 'none'
     })
     canvasGrafs.selectAll('.axisY text').style({
         'fill': '#1D3457'
     })
 }
 //Dibujar la Gráfica de Distancia
 function draw_grafs_D(nD, i_seg, f_seg, j, idDiv,numE) {
     wG = $(idDiv).width();
     hG = $(idDiv).height();
     wG = wG - margin.left - margin.right-20;
     hG = hG - margin.bottom - margin.top;
     canvasGrafs = d3.select(idDiv);
     //Escalar los datos de x de la grafica
     xScaleAxis = d3.scale.linear().domain([0, nD.length - 1]).range([0, wG]);
     xScaleA = d3.scale.linear().domain([0, 90]).range([0, wG]);
     xAxis = d3.svg.axis().scale(xScaleA).orient("bottom").ticks(8);
     yScale = d3.scale.linear().domain([d3.max(distancia), d3.min(distancia)]).range([hG, +margin.top]);
     //console.log('max', d3.max(costoS));
     yScaleAxis = d3.scale.linear().domain([d3.max(distancia), d3.min(distancia)]).range([margin.top, hG + margin.top]);
     yAxis = d3.svg.axis().scale(yScaleAxis).orient("left").ticks(5);
     canvasGrafs.attr('width', wG).attr('height', hG);
     canvasGrafs.append("rect").attr("class", "axis").attr('width', wG).attr('height', hG / 4).attr('x', margin.left).attr('y', margin.top + hG - hG / 4);
     canvasGrafs.append("rect").attr("class", "axis").attr('width', wG).attr('height', hG / 4).attr('x', margin.left).attr('y', margin.top + hG - hG / 2);
     canvasGrafs.append("rect").attr("class", "axis").attr('width', wG).attr('height', hG / 4).attr('x', margin.left).attr('y', margin.top + hG - hG / 4 - hG / 2);
     canvasGrafs.append("rect").attr("class", "axis").attr('width', wG).attr('height', hG / 4).attr('x', margin.left).attr('y', margin.top);
     var lineasP = d3.svg.area().x(function(d, i) {
         return xScaleAxis(i) + margin.left;
     }).y(function(d, i) {
         //console.log('HG', hG - yScale(+d.total_dist_diff) + margin.top)
         return hG - yScale(+d.total_dist_diff) + margin.top;
     }).y0(hG + margin.top).interpolate("basis");
     canvasGrafs.selectAll('lineasP').data(nD).enter().append('svg:path').attr('class', 'lineasP').style('fill', colores_g_op[numE]).attr('d', lineasP(nD));
     canvasGrafs.append('g').attr("class", "axisY").attr("transform", "translate(" + margin.left + "," + (hG + margin.top) + ")").call(xAxis);
     canvasGrafs.append('g').attr("class", "axisY").attr("transform", "translate(" + margin.left + "," + (0) + ")").call(yAxis);
     canvasGrafs.selectAll('.axisY').style({
         'stroke': 'none',
         'fill': 'none'
     })
     canvasGrafs.selectAll('.axisY text').style('fill', '#1D3457');
 }
 //Dibujar la Grafica de Velocidad
 function draw_grafs_I(nD, i_seg, f_seg, j, idDiv,numE) {
     wG = $(idDiv).width();
     hG = $(idDiv).height();
     wG = wG - margin.left - margin.right;
     hG = hG - margin.bottom - margin.top;
     canvasGrafs = d3.select(idDiv);
     //Escalar los datos de x de la grafica
     xScaleAxis = d3.scale.linear().domain([0, nD.length - 1]).range([0, wG]);
     xScaleA = d3.scale.linear().domain([0, 90]).range([0, wG]);
     xAxis = d3.svg.axis().scale(xScaleA).orient("bottom").ticks(8);
     yScale = d3.scale.linear().domain([d3.max(intensidad), d3.min(intensidad)]).range([hG, +margin.top]);
     //console.log('max', d3.max(costoS));
     yScaleAxis = d3.scale.linear().domain([d3.max(intensidad), d3.min(intensidad)]).range([margin.top, hG + margin.top]);
     yAxis = d3.svg.axis().scale(yScaleAxis).orient("left").ticks(5);
     canvasGrafs.attr('width', wG).attr('height', hG);
     //console.log('bW', barWidth);
     canvasGrafs.append("rect").attr("class", "axis").attr('width', wG).attr('height', hG / 4).attr('x', margin.left).attr('y', margin.top + hG - hG / 4);
     canvasGrafs.append("rect").attr("class", "axis").attr('width', wG).attr('height', hG / 4).attr('x', margin.left).attr('y', margin.top + hG - hG / 2);
     canvasGrafs.append("rect").attr("class", "axis").attr('width', wG).attr('height', hG / 4).attr('x', margin.left).attr('y', margin.top + hG - hG / 4 - hG / 2);
     canvasGrafs.append("rect").attr("class", "axis").attr('width', wG).attr('height', hG / 4).attr('x', margin.left).attr('y', margin.top);
     var lineasP = d3.svg.area().x(function(d, i) {
         return xScaleAxis(i) + margin.left
     }).y(function(d, i) {
         //console.log('HG', +d.total_dist_diff)
         return hG - yScale(+d.high_intensity_distance) + margin.top;
     }).y0(hG + margin.top).interpolate("basis");;
     canvasGrafs.selectAll('lineasP').data(nD).enter().append('svg:path').attr('class', 'lineasP').style('fill', colores_g_op[numE]).attr('d', lineasP(nD));
     /*
      canvasGrafs.selectAll('rect').data(nD).enter().append('rect').attr('class', 'bars').attr('width', barWidth / 4).attr('height', function(d, i) {
          return yScale(+d.high_intensity_distance);
      }).attr('x', function(d, i) {
          return xScaleAxis(i) + margin.left + barWidth / 2;
      }).attr('y', function(d, i) {
          return hG - yScale(+d.high_intensity_distance)+ margin.top ;
      }).on("mouseover", function(d, i) {
          //Get this bar's x/y values, then augment for the tooltip
          var xPosition = parseFloat(d3.select(this).attr("x")) + barWidth / 8;
          var yPosition = parseFloat(d3.select(this).attr("y")) - 20;
          $('#tit-info').text('Minuto ' + d.segundos / 60 );
         $('#info-p').text('Intensidad Max: '+d.high_intensity_distance+' mts');
          //canvasGrafs.append("text").attr("id", "tooltip").attr("x", xPosition).attr("y", yPosition).attr("text-anchor", "middle").attr("font-family", "sans-serif").attr("font-size", "14px").attr("font-weight", "bold").attr("fill", "#fff").text(+d.speed + " m/s");
      }).on("mouseout", function() {
          //Remove the tooltip
           $("#tit-info").text();
         $('#info-p').text();
          //d3.select("#tooltip").remove();
      });
      canvasGrafs.selectAll('circle').data(nD).enter().append('circle').attr('class', 'bars').attr('r', barWidth / 4).attr('cx', function(d, i) {
          return xScaleAxis(i) + margin.left + barWidth / 2 + barWidth / 10
      }).attr('cy', function(d, i) {
          return hG - yScale(+d.high_intensity_distance) +margin.top ;
      }).on("mouseover", function(d) {
          //Get this bar's x/y values, then augment for the tooltip
          var xPosition = parseFloat(d3.select(this).attr("x")) + barWidth / 8;
          var yPosition = parseFloat(d3.select(this).attr("y")) - 20;
          canvasGrafs.append("text").attr("id", "tooltip").attr("x", xPosition).attr("y", yPosition).attr("text-anchor", "middle").attr("font-family", "sans-serif").attr("font-size", "14px").attr("font-weight", "bold").attr("fill", "#fff").text(+d.high_intensity_distance + " m/s");
      }).on("mouseout", function() {
          //Remove the tooltip
          d3.select("#tooltip").remove();
      });*/
     canvasGrafs.append('g').attr("class", "axisY").attr("transform", "translate(" + margin.left + "," + (hG + margin.top) + ")").call(xAxis);
     canvasGrafs.append('g').attr("class", "axisY").attr("transform", "translate(" + margin.left + "," + (0) + ")").call(yAxis);
     canvasGrafs.selectAll('rect .axis').style('fill', '#f7fafa')
     canvasGrafs.selectAll('.axisY').style({
         'stroke': 'none',
         'fill': 'none'
     })
     canvasGrafs.selectAll('.axisY text').style({
         'fill': '#1D3457'
     })
 }
 //Dibujar la Grafica de Esfuerzo
 function draw_grafs_E(nD, i_seg, f_seg, j, idDiv,numE) {
     wG = $(idDiv).width();
     hG = $(idDiv).height();
     wG = wG - margin.left - margin.right;
     hG = hG - margin.bottom - margin.top;
     canvasGrafs = d3.select(idDiv);
     //Escalar los datos de x de la grafica
     xScaleAxis = d3.scale.linear().domain([0, nD.length - 1]).range([0, wG]);
     xScaleA = d3.scale.linear().domain([0, 90]).range([0, wG]);
     xAxis = d3.svg.axis().scale(xScaleA).orient("bottom").ticks(8);
     yScale = d3.scale.linear().domain([d3.max(esfuerzo), d3.min(esfuerzo)]).range([hG, +margin.top]);
     //console.log('max', d3.max(costoS));
     yScaleAxis = d3.scale.linear().domain([d3.max(esfuerzo), d3.min(esfuerzo)]).range([margin.top, hG + margin.top]);
     yAxis = d3.svg.axis().scale(yScaleAxis).orient("left").ticks(5);
     canvasGrafs.attr('width', wG).attr('height', hG);
     canvasGrafs.append("rect").attr("class", "axis").attr('width', wG).attr('height', hG / 4).attr('x', margin.left).attr('y', margin.top + hG - hG / 4);
     canvasGrafs.append("rect").attr("class", "axis").attr('width', wG).attr('height', hG / 4).attr('x', margin.left).attr('y', margin.top + hG - hG / 2);
     canvasGrafs.append("rect").attr("class", "axis").attr('width', wG).attr('height', hG / 4).attr('x', margin.left).attr('y', margin.top + hG - hG / 4 - hG / 2);
     canvasGrafs.append("rect").attr("class", "axis").attr('width', wG).attr('height', hG / 4).attr('x', margin.left).attr('y', margin.top); //console.log('bW', barWidth);
     var lineasP = d3.svg.area().x(function(d, i) {
         return xScaleAxis(i) + margin.left
     }).y(function(d, i) {
         //console.log('HG', +d.total_dist_diff)
         return hG - yScale(+d.total_effort_diff) + margin.top;
     }).y0(hG + margin.top).interpolate("basis");;
     canvasGrafs.selectAll('lineasP').data(nD).enter().append('svg:path').attr('class', 'lineasP').style('fill', colores_g_op[numE]).attr('d', lineasP(nD));
     //console.log('bW', barWidth);
     /*
     canvasGrafs.selectAll('rect').data(nD).enter().append('rect').attr('class', 'bars').attr('width', barWidth / 4).attr('height', function(d, i) {
         return yScale(+d.total_effort_diff) ;
     }).attr('x', function(d, i) {
         return xScaleAxis(i) + margin.left + barWidth / 2;
     }).attr('y', function(d, i) {
         return hG - yScale(+d.total_effort_diff) +margin.top ;
     }).on("mouseover", function(d, i) {
         //Get this bar's x/y values, then augment for the tooltip
         var xPosition = parseFloat(d3.select(this).attr("x")) + barWidth / 8;
         var yPosition = parseFloat(d3.select(this).attr("y")) - 20;
         $('#tit-info').text('Minuto ' + d.segundos / 60 );
        $('#info-p').text('Esfuerzo Max: '+d.total_effort_diff+' mts');
         //canvasGrafs.append("text").attr("id", "tooltip").attr("x", xPosition).attr("y", yPosition).attr("text-anchor", "middle").attr("font-family", "sans-serif").attr("font-size", "14px").attr("font-weight", "bold").attr("fill", "#fff").text(+d.speed + " m/s");
     }).on("mouseout", function() {
         //Remove the tooltip
          $("#tit-info").text();
        $('#info-p').text();
         //d3.select("#tooltip").remove();
     });
     canvasGrafs.selectAll('circle').data(nD).enter().append('circle').attr('class', 'bars').attr('r', barWidth / 4).attr('cx', function(d, i) {
         return xScaleAxis(i) + margin.left + barWidth / 2 + barWidth / 10
     }).attr('cy', function(d, i) {
         return hG - yScale(+d.total_effort_diff) +margin.top ;
     }).on("mouseover", function(d) {
         //Get this bar's x/y values, then augment for the tooltip
         var xPosition = parseFloat(d3.select(this).attr("x")) + barWidth / 8;
         var yPosition = parseFloat(d3.select(this).attr("y")) - 20;
         canvasGrafs.append("text").attr("id", "tooltip").attr("x", xPosition).attr("y", yPosition).attr("text-anchor", "middle").attr("font-family", "sans-serif").attr("font-size", "14px").attr("font-weight", "bold").attr("fill", "#fff").text(+d.total_effort_diff);
     }).on("mouseout", function() {
         //Remove the tooltip
         d3.select("#tooltip").remove();
     });*/
     canvasGrafs.append('g').attr("class", "axisY").attr("transform", "translate(" + margin.left + "," + (hG + margin.top) + ")").call(xAxis);
     canvasGrafs.append('g').attr("class", "axisY").attr("transform", "translate(" + margin.left + "," + (0) + ")").call(yAxis);
     canvasGrafs.selectAll('.axisY').style({
         'stroke': 'none',
         'fill': 'none'
     })
     canvasGrafs.selectAll('.axisY text').style({
         'fill': '#1D3457'
     })
 }
 //Dibujar la Grafica de Sprint 
 function draw_grafs_SP(nD, i_seg, f_seg, j, idDiv,numE) {
     wG = $(idDiv).width();
     hG = $(idDiv).height();
     wG = wG - margin.left - margin.right;
     hG = hG - margin.bottom - margin.top;
     canvasGrafs = d3.select(idDiv);
     //Escalar los datos de x de la grafica
     xScaleAxis = d3.scale.linear().domain([0, nD.length - 1]).range([0, wG]);
     xScaleA = d3.scale.linear().domain([0, 90]).range([0, wG]);
     xAxis = d3.svg.axis().scale(xScaleA).orient("bottom").ticks(8);
     yScale = d3.scale.linear().domain([d3.max(sprint), d3.min(sprint)]).range([hG, +margin.top]);
     //console.log('max', d3.max(costoS));
     yScaleAxis = d3.scale.linear().domain([d3.max(sprint), d3.min(sprint)]).range([margin.top, hG + margin.top]);
     yAxis = d3.svg.axis().scale(yScaleAxis).orient("left").ticks(5);
     canvasGrafs.attr('width', wG).attr('height', hG);
     canvasGrafs.append("rect").attr("class", "axis").attr('width', wG).attr('height', hG / 4).attr('x', margin.left).attr('y', margin.top + hG - hG / 4);
     canvasGrafs.append("rect").attr("class", "axis").attr('width', wG).attr('height', hG / 4).attr('x', margin.left).attr('y', margin.top + hG - hG / 2);
     canvasGrafs.append("rect").attr("class", "axis").attr('width', wG).attr('height', hG / 4).attr('x', margin.left).attr('y', margin.top + hG - hG / 4 - hG / 2);
     canvasGrafs.append("rect").attr("class", "axis").attr('width', wG).attr('height', hG / 4).attr('x', margin.left).attr('y', margin.top);
     //console.log('bW', barWidth);
     var lineasP = d3.svg.area().x(function(d, i) {
         return xScaleAxis(i) + margin.left
     }).y(function(d, i) {
         //console.log('HG', +d.total_dist_diff)
         return hG - yScale(+d.sprint_distance) + margin.top;
     }).y0(hG + margin.top).interpolate("basis");;
     canvasGrafs.selectAll('lineasP').data(nD).enter().append('svg:path').attr('class', 'lineasP').style('fill', colores_g_op[numE]).attr('d', lineasP(nD));
     /*
      canvasGrafs.selectAll('rect').data(nD).enter().append('rect').attr('class', 'bars').attr('width', barWidth / 4).attr('height', function(d, i) {
          return yScale(+d.sprint_distance) ;
      }).attr('x', function(d, i) {
          return xScaleAxis(i) + margin.left + barWidth / 2;
      }).attr('y', function(d, i) {
          return hG - yScale(+d.sprint_distance) +margin.top ;
      }).on("mouseover", function(d, i) {
          //Get this bar's x/y values, then augment for the tooltip
          var xPosition = parseFloat(d3.select(this).attr("x")) + barWidth / 8;
          var yPosition = parseFloat(d3.select(this).attr("y")) - 20;
          $('#tit-info').text('Minuto ' + d.segundos / 60 );
         $('#info-p').text('Vel Max: '+d.sprint_distance+' mts');
          //canvasGrafs.append("text").attr("id", "tooltip").attr("x", xPosition).attr("y", yPosition).attr("text-anchor", "middle").attr("font-family", "sans-serif").attr("font-size", "14px").attr("font-weight", "bold").attr("fill", "#fff").text(+d.speed + " m/s");
      }).on("mouseout", function() {
          //Remove the tooltip
           $("#tit-info").text();
         $('#info-p').text();
          //d3.select("#tooltip").remove();
      });
      canvasGrafs.selectAll('circle').data(nD).enter().append('circle').attr('class', 'bars').attr('r', barWidth / 4).attr('cx', function(d, i) {
          return xScaleAxis(i) + margin.left + barWidth / 2 + barWidth / 10
      }).attr('cy', function(d, i) {
          return hG - yScale(+d.sprint_distance) +margin.top ;
      }).on("mouseover", function(d) {
          //Get this bar's x/y values, then augment for the tooltip
          var xPosition = parseFloat(d3.select(this).attr("x")) + barWidth / 8;
          var yPosition = parseFloat(d3.select(this).attr("y")) - 20;
          canvasGrafs.append("text").attr("id", "tooltip").attr("x", xPosition).attr("y", yPosition).attr("text-anchor", "middle").attr("font-family", "sans-serif").attr("font-size", "14px").attr("font-weight", "bold").attr("fill", "#fff").text(+d.sprint_distance + 'mts');
      }).on("mouseout", function() {
          //Remove the tooltip
          d3.select("#tooltip").remove();
      });*/
     canvasGrafs.append('g').attr("class", "axisY").attr("transform", "translate(" + margin.left + "," + (hG + margin.top) + ")").call(xAxis);
     canvasGrafs.append('g').attr("class", "axisY").attr("transform", "translate(" + margin.left + "," + (0) + ")").call(yAxis);
     canvasGrafs.selectAll('.axisY').style({
         'stroke': 'none',
         'fill': 'none'
     })
     canvasGrafs.selectAll('.axisY text').style({
         'fill': '#1D3457'
     })
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
     d3.selectAll('line .positionPath').remove();
 }

 function limpiarG() {
     sprint = [];
     esfuerzo = [];
     velocidad = [];
     intensidad = [];
     segundos = [];
     energia = [];
     distancia = []
     //console.log('C', canvasGrafs)
     d3.selectAll('.lineasP').remove()
     d3.selectAll('.bars').remove();
     d3.selectAll('.axis').remove();
     d3.selectAll('.axisY').remove();
 }