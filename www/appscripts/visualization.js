 //D3 visualizacion 
 //League Manager Cisualization Dashboard
 var datos = [];
 var yScale;
 var xScale;
 var radio;
 var radioScale;
 var svgCanvas;
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
 var radio = [];
 var position_x = [];
 var position_y = [];
 var color0 = [];
 var color1 = [];
 var circulos = [];
 var tags = [];
 var direccion = [];
 var radDir = 18;
 var colores_g = ["#3366cc", "#dc3912", "#ff9900", "#109618", "#990099", "#0099c6", "#dd4477", "#66aa00", "#b82e2e", "#316395", "#994499", "#22aa99", "#aaaa11", "#6633cc", "#e67300", "#8b0707", "#651067", "#329262", "#5574a6", "#3b3eac"];
 //Get data from csv and converet the strings to numbers
 var csv = d3.csv("/data/01.csv", function(error, data) {
     if (error) {
         //Error Print
         console.log(error);
     } else {
         tags = d3.range(15);
         //Revisar datos 
         data.forEach(function(d, i) {
             //console.log('tags', tag_id)
             direccion[i] = +d.heading;
             radio[i] = +d.speed;
             color0[i] = +d.speed;
             color1[i] = +d.speed;
             position_x[i] = +d.x_pos;
             position_y[i] = +d.y_pos;
             //console.log(d.total_effort);
         });
     }
     console.log('direcc', radDir * Math.cos(direccion[0]), radDir * Math.sin(direccion[0]));
     //console.log('radio', radio);
     //Nueva variable de datos para resguardar la original
     datos = data;
     //Escalar los datos de x de la grafica
     xScale = d3.scale.linear().domain([-5, 110]).range([0, w]);
     //xAxis = d3.svg.axis().scale(xScale).orient("bottom").ticks(5);
     yScale = d3.scale.linear().domain([-5, 73]).range([h, 0]);
     //yAxis = d3.svg.axis().scale(yScale).orient("left").ticks(5);
     radioScale = d3.scale.linear().domain([0, d3.max(datos, function(d, i) {
         return radio[i];
     })]).range([5, 20]);
     //console.log('radio test', typeof(radio[0]), radioScale(radio))
     colorScale0 = d3.scale.linear().domain([0, 4]).range(['#c62828', '#FFE766']);
     colorScale1 = d3.scale.linear().domain([5, 11]).range(['#FFE766', '#00CF36']);
     svgCanvas = d3.select("#data-vis").attr('width', w).attr('height', h);
     cancha();
     cargarDatos(5);
     cargarDatosJugador(5)
     var itemsSelec = d3.selectAll('#left-nav a ').on('click', function() {
         //Vaciar la pantalla y los arreglos
         selectedItems = [];
         radio = [];
         position_x = [];
         position_y = [];
         color0 = [];
         color1 = [];
         var wich = this.id;
         cargarDatos(wich);
         cargarDatosJugador(wich)
     });
     //Dibujar cancha 
     function cancha() {
         svgCanvas.append('rect').attr('class', 'grid').attr('x', w / 2).attr('y', 0).attr('width', w / 2).attr('height', h).style('fill', '#009B09').style('fill-opacity','0.2').style('stroke', '#fff').style('stroke-width', '5');
         svgCanvas.append('rect').attr('class', 'grid').attr('x', 0).attr('y', 0).attr('width', w / 2).attr('height', h).style('fill', '#009B09').style('fill-opacity','0.2').style('stroke', '#fff').style('stroke-width', '5');
         //svgCanvas.append('rect').attr('class', 'grid').attr('x', w / 4).attr('y', 0).attr('width', w / 2).attr('height', h).style('fill', 'none').style('stroke', '#fff').style('stroke-width', 2);
         //svgCanvas.append('rect').attr('class', 'grid').attr('x', 0).attr('y', h / 4).attr('width', w).attr('height', h / 2).style('fill', 'none').style('stroke', '#fff').style('stroke-width', 2);
         //svgCanvas.append('rect').attr('class', 'grid').attr('x', 0).attr('y', h / 4).attr('width', w).attr('height', h / 2).style('fill', 'none').style('stroke', '#fff').style('stroke-width', 2);
         svgCanvas.append('rect').attr('class', 'grid').attr('x', 0).attr('y', h / 4 + h / 16).attr('width', w / 8).attr('height', h / 2 - h / 8).style('fill', '#fff').style('fill-opacity','0.2').style('stroke', '#fff').style('stroke-width', '5');
         svgCanvas.append('rect').attr('class', 'grid').attr('x', 0).attr('y', h / 4 + h / 8).attr('width', w / 16).attr('height', h / 2 - h / 4).style('fill', 'none').style('stroke', '#fff').style('stroke-width', '1');
         svgCanvas.append('rect').attr('class', 'grid').attr('x', w - w / 8).attr('y', h / 4 + h / 16).attr('width', w / 8).attr('height', h / 2 - h / 8).style('fill', '#fff').style('fill-opacity','0.2').style('stroke', '#fff').style('stroke-width', '5');
         svgCanvas.append('rect').attr('class', 'grid').attr('x', w - w / 16).attr('y', h / 4 + h / 8).attr('width', w / 16).attr('height', h / 2 - h / 4).style('fill', 'none').style('stroke', '#fff').style('stroke-width', '1');
         //svgCanvas.append('circle').attr('class', 'grid').attr('cx', w/2 ).attr('cy', h / 2 ).attr('r', w / 16).style('fill', 'none').style('stroke', '#fff').style('stroke-width', '1');
     }

     function cargarDatosJugador(jugador) {
         //console.log('data', datos);
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
             console.log('select', datosJugadores, 'data/perfil-jugadores/' + numeroJug + '.jpg')
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
     //Inicio de Carga de Datos
     function cargarDatos(jugador) {
         var newCsv = d3.csv("/data/0" + jugador + ".csv", function(error, newData) {
             if (error) {
                 //Error Print
                 console.log(error);
             } else {
                 //Revisar datos 
                 newData.forEach(function(d, i) {
                     //console.log('tags', tag_id)
                     direccion[i] = +d.heading;
                     radio[i] = +d.speed;
                     color0[i] = +d.speed;
                     color1[i] = +d.speed;
                     position_x[i] = +d.x_pos;
                     position_y[i] = +d.y_pos;
                 });
             }
             //Borrar Circulos de la pantalla
             //console.log('circulos', circulos)
             circulos = svgCanvas.selectAll('circle').transition().duration(1000).attr('r', 0).remove();
             var lines = svgCanvas.selectAll('line').transition().duration(150).attr('stroke-width', 0).remove()
                 //console.log('circulos borrados', circulos)
             circulos = [];
             var newCirculos = svgCanvas.selectAll('circle line').data(newData).enter().append('circle').transition().delay(function(d, i) {
                     return i / newData.length * 10000;
                 }).attr('cx', function(d, i) {
                     return xScale(position_x[i]);
                 }).attr('cy', function(d, i) {
                     return yScale(position_y[i]);
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
                     if(jugador == 'all'){
                        return colores_g[+d.tag_id]

                     }
                     return colores_g[jugador];
                 })
                 .attr('radio', function(d, i) {
                     return radioScale(radio[i]);
                 }).attr('opacity', .8);
             /*var lineas = svgCanvas.selectAll('line')
                .data(newData)
                .enter()
                .append('line')
                .transition()
                    .delay(function (d, i) {
                          return i/newData.length * 1000 ;
                      })          
                      .attr('class', 'positionPath')
                      .attr('y2', function (d, i) {
                          return yScale(position_y[i])-radDir*Math.sin(direccion[i]);
                      })
                      .attr('x2', function (d, i) {
                          return xScale(position_x[i])-radDir*Math.cos(direccion[i]);
                      })
                      .attr('y1', function (d, i) {
                                 return yScale(position_y[i]);
                         }
                       )
                      .attr('x1', function (d, i) {
                                 return xScale(position_x[i]);
                         }
                       )
                       .style('stroke', function(d, i) {
                          if (color0[i] <= 4) {
                              return colorScale0(color0[i]);
                          } else if (color0[i] > 4) {
                              return colorScale1(color1[i]);
                          }
                      })
                       .style('stroke-width', 1)            
                      ;*/
             /*Dibujar las lineas de la trayectoria
                          var lines = svgCanvas.selectAll('line')
                          .data(newData)
                          .enter()
                          .append('line')
                          .transition()
                          .delay(function (d, i) {
                              return i/newData.length * 1000 ;
                          })          
                          .attr('class', 'positionPath')
                          .attr('y1', function (d, i) {
                              return yScale(position_y[i]);
                          } )
                          .attr('x1', function (d, i) {
                              return xScale(position_x[i]);
                          } )
                          .attr('y2', function (d, i) {
                                 if(i != newData.length ){
                                     return yScale(position_y[i+1]);
                                 }else {
                                     return yScale(position_y[i]);
                                 }
                             }
                           )
                          .attr('x2', function (d, i) {
                                 if(i != newData.length ){
                                     return xScale(position_x[i+1]);
                                 }else {
                                     return xScale(position_x[i]);
                                 }
                             }
                           )
                           .style('stroke', function(d, i) {
                              if (color0[i] <= 4) {
                                  return colorScale0(color0[i]);
                              } else if (color0[i] > 4) {
                                  return colorScale1(color1[i]);
                              }
                          })
                           .style('stroke-width', function (d,i) {
                              return radio[i];
                          })            
                          ;*/
         });
     }
     //Finaliza Carga de Datos Nuevos
 });