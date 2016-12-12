 //D3 Tables 
 //League Manager Table Dashboard
 var datosMaximos;
 var datosJugadores;
 var p1 = "P1";
 var p2 = "P2";
 var t1 = "T1";
 var t2 = "T2"; 
 var colores_g = ["#3366cc", "#dc3912", "#ff9900", "#109618", "#990099", "#0099c6", "#dd4477", "#66aa00", "#b82e2e", "#316395", "#994499", "#22aa99", "#aaaa11", "#6633cc", "#e67300", "#8b0707", "#651067", "#329262", "#5574a6", "#3b3eac"];
 /*///////////////////////////////////////////////////
 Variables del desempeño individual por partido/tiempo
 *////////////////////////////////////////////////////
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
 *////////////////////////////////////////////////////
 var nombreJug;
 var numeroJug;
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
 
  //Get data from csv and converet the strings to numbers
 var csv_final = d3.csv("/data/toluca_final_por_tiempos.csv", function(error, data) {
     var contador = 0;
     if (error) {
         //Error Print
         console.log(error);
     } else {
         //Revisar datos 
         jugador = d3.range(1, 16);
         data.forEach(function(d, i) {
             //console.log('tags', tag_id)
             distancia[i] = +d.max_distance;
             esfuerzo[i] = +d.max_effort;
             intensidad[i] = +d.max_high_intensity;
             velocidad[i] = +d.max_speed;
             sprint[i] = +d.max_sprint;
             //console.log(d.total_effort);
         });
     }
     datosMaximos = data;
     var rand = Math.random(5,10);
     console.log('rand')
     cargarDatosJugador(5);
         cargarInfoGral(5);
     var itemsSelec = d3.selectAll('#nav-jugador a ').on('click', function() {
         //Vaciar la pantalla y los arreglos
         selectedItems = [];
         distancia = [];
         esfuerzo = [];
         intensidad = [];
         velocidad = [];
         sprint = [];
         var wich = this.id;
         //console.log('clicked', wich)
         cargarDatosJugador(wich);
         cargarInfoGral(wich);
     });
     //Finaliza Carga de Datos Nuevos
     
 });

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
         console.log('select', datosJugadores, 'data/perfil-jugadores/'+numeroJug+'.jpg')
         //Información General del Jugador
         var imgJ = d3.select('#left-nav > div:nth-child(1) > img').data(datosJugadores).attr('src','data/perfil-jugadores/'+numeroJug+'.jpg').enter();
         var nomJ = d3.select('#info-jugador > p.nombre > strong').data(datosJugadores).text(nombreJug).enter();
         var numJ = d3.select('#info-jugador > p.numero > strong').data(datosJugadores).text("# "+numeroJug).enter();
         var posJ = d3.select('#info-jugador > p.posicion > strong').data(datosJugadores).text(posicionJug).enter();
         var edaJ = d3.select('#info-jugador > p.edad > strong').data(datosJugadores).text(+edadJug+" Años").enter();
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

 function cargarInfoGral(jugador) {
     //console.log('data', datos);
     datosMaximos.forEach(function(d, i) {
         if ((datosMaximos[i].tag == jugador)) {
             //console.log('Encontrados', d)
             distancia[i] = +d.max_distance;
             esfuerzo[i] = +d.max_effort;
             intensidad[i] = +d.max_high_intensity;
             velocidad[i] = +d.max_speed;
             sprint[i] = +d.max_sprint;
             selectedItems.push(d);
             //console.log('seleccionado', d)
             //var distp1 = d3.selectAll('#main-container .distancia').data(selectedItems).enter().append('p').text("funcio");
         }
     });
     //console.log('maximos', distancia[i])
     var distT1 = d3.select("#dist > td.t1")
         // create a cell in each row for each column
         .data(selectedItems).text(selectedItems[0].max_distance + " m").enter();
     var distT2 = d3.select("#dist > td.t2")
         // create a cell in each row for each column
         .data(selectedItems).text(selectedItems[2].max_distance + " m").enter();
     var esfT1 = d3.select("#esf > td.t1")
         // create a cell in each row for each column
         .data(selectedItems).text(selectedItems[0].max_effort).enter();
     var esfT2 = d3.select("#esf > td.t2")
         // create a cell in each row for each column
         .data(selectedItems).text(selectedItems[2].max_effort).enter();
     var intT1 = d3.select("#int > td.t1")
         // create a cell in each row for each column
         .data(selectedItems).text(selectedItems[0].max_high_intensity).enter();
     var intT2 = d3.select("#int > td.t2")
         // create a cell in each row for each column
         .data(selectedItems).text(selectedItems[2].max_high_intensity).enter();
     var velT1 = d3.select("#vel > td.t1")
         // create a cell in each row for each column
         .data(selectedItems).text(selectedItems[0].max_speed + " m/s").enter();
     var velT2 = d3.select("#vel > td.t2")
         // create a cell in each row for each column
         .data(selectedItems).text(selectedItems[2].max_speed + " m/s").enter();
     var sprT1 = d3.select("#spr > td.t1")
         // create a cell in each row for each column
         .data(selectedItems).text(selectedItems[0].max_sprint).enter();
     var sprT2 = d3.select("#spr > td.t2")
         // create a cell in each row for each column
         .data(selectedItems).text(selectedItems[2].max_sprint).enter();
     //console.log('selected', selectedItems);
 }