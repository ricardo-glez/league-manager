 //D3 Tables 
 //League Manager Table Dashboard
 var datosP = [];
 var datosG;
 var colores_g = ["#3366cc", "#dc3912", "#ff9900", "#109618", "#990099", "#0099c6", "#dd4477", "#66aa00", "#b82e2e", "#316395", "#994499", "#22aa99", "#aaaa11", "#6633cc", "#e67300", "#8b0707", "#651067", "#329262", "#5574a6", "#3b3eac"];
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
     var itemsSelec = d3.selectAll('#nav-partidos button').on('click', function() {
         //Vaciar la pantalla y los arreglos
         $('button').removeClass('btn-active');
         d3.select(this).attr('class', 'btn btn-active btn-custom');
         var wich = this.id;
         console.log('wich', wich);
         cargarTituloPartido('Toluca', wich);

     });
     
     //Finaliza Carga de Datos Nuevos
 });

 function cargarTituloPartido(quien, cual) {
     var csv_partidos = d3.csv("/data/partidos.csv", function(error, data) {
         var contador = 0;
         if (error) {
             //Error Print
             console.log(error);
         } else {
             //Revisar datos
             data.forEach(function(d, i) {
                 if ((d.Club == quien) || (d.Vs == quien)) {
                    var boton =  $("#"+contador).text(d.Club+' vs '+d.Vs);
                    //console.log('botones', boton)
                     datosP.push(d);
                     contador ++;
                 }
             });
             var neCasa = $('#nombre-equipo-casa').text(datosP[cual].Club);
             var eCasa = $('#equipo-casa').attr('src','/data/logos/'+datosP[cual].Club+'-100.png');
             var neVisita = $('#nombre-equipo-visita').text(datosP[cual].Vs);
             var eVisita = $('#equipo-visita').attr('src','/data/logos/'+datosP[cual].Vs+'-100.png');
             var lugarP = $('#lugar').text(datosP[cual].Lugar);
             var fechaP = $('#fecha').text(datosP[cual].Fecha);
             //Finaliza Carga de Datos Nuevos
         }
     });
 }

 function cargarDatosEquipo(datosGrales, p, t) {
     datosGrales.forEach(function(d, i) {
         if ((d.tiempo == t) && (d.partido == p)) {
             // statements
             var numJ = d3.select('#J-' + d.tag + '-numero_T').data(datosGrales).text('#'+d.numero).enter();
             var nomJ = d3.select('#J-' + d.tag + '-jugadores_T').data(datosGrales).text(d.nombre).enter();
             var distJ = d3.select('#J-' + d.tag + '-distancia_T').data(datosGrales).text(+d.max_distance+'mts').enter();
             var esfJ = d3.select('#J-' + d.tag + '-esfuerzo_T').data(datosGrales).text(+d.max_effort).enter();
             var intJ = d3.select('#J-' + d.tag + '-intensidad_T').data(datosGrales).text(+d.max_high_intensity).enter();
             var velJ = d3.select('#J-' + d.tag + '-velocidad_T').data(datosGrales).text(+d.max_speed+'m/s').enter();
             var spriJ = d3.select('#J-' + d.tag + '-sprint_T').data(datosGrales).text(+d.max_sprint).enter();
             //console.log("num ", i, d)
         }
     });
 }
