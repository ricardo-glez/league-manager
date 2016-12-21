//D3 Tables
//League Manager Table Dashboard
var datosMaximos;
var datosJugadores;
var padding = 20;
var p1 = "P1";
var p2 = "P2";
var t1 = "T1";
var t2 = "T2";
var margin = {
    top: 50,
    right: 50,
    bottom: 50,
    left: 50
};
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
/*///////////////////////////////////////////////////
Nuevo Arreglo para la grafica general de jugador
*/ ///////////////////////////////////////////////////
var grafGral = [];
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
    var rand = Math.random(5, 10);
    //console.log('rand')
    cargarDatosJugador(5);
    cargarInfoGral(5);
    var itemsSelec = d3.selectAll('#nav-jugador a ').on('click', function() {
        //Vaciar la pantalla y los arreglos
        selectedItems = [];
        grafGral = [];
        distancia = [];
        esfuerzo = [];
        intensidad = [];
        velocidad = [];
        sprint = [];
        d3.selectAll('.lineasP').remove();
        d3.selectAll('.puntos').remove();
        d3.selectAll('.bars').remove();
        d3.selectAll('.axis').remove();
        var wich = this.id;
        //console.log('clicked', wich)
        cargarDatosJugador(wich);
        cargarInfoGral(wich);
    });
    //Finaliza Carga de Datos Nuevos
});

function drawGralStats(nD, idName) {
    var hG = $(idName).height();
    var wG = $(idName).width();
    hG = hG - margin.top;
    console.log('w , h', wG, hG, nD)
    barWidth = wG / nD.length;
    xScaleAxis = d3.scale.ordinal().domain(["PJ", "G", "D", "DA", "F", "FC", "FR", "TA", "TR"]).rangeBands([padding, wG - padding]);
    var xAxis = d3.svg.axis().scale(xScaleAxis).orient("bottom");
    yScale = d3.scale.linear().domain([d3.max(nD, function(d) {
        return d[1, 1]
    }), d3.min(nD, function(d) {
        return d[1, 1]
    })]).range([hG - padding, 0]);
    //console.log('max', d3.max(costoS));
    yScaleAxis = d3.scale.linear().domain([50, 0]).range([hG, padding * 2]);
    yAxis = d3.svg.axis().scale(yScaleAxis).orient("left").ticks(5);
    var lineas = d3.svg.area().x(function(d, i) {
        switch (d[0]) {
            case "Partidos Jugados":
                return xScaleAxis("PJ") + margin.right / 2;
                break;
            case "Goles":
                return xScaleAxis("G") + margin.right / 2;
                break;
            case "Disparos":
                return xScaleAxis("D") + margin.right / 2;
                break;
            case "Disparos Arco":
                return xScaleAxis("DA") + margin.right / 2;
                break;
            case "Faltas":
                return xScaleAxis("F") + margin.right / 2;
                break;
            case "Faltas Cometidas":
                return xScaleAxis("FC") + margin.right / 2;
                break;
            case "Faltas Recibidas":
                return xScaleAxis("FR") + margin.right / 2;
                break;
            case "Tarjetas Amarillas":
                return xScaleAxis("TA") + margin.right / 2;
                break;
            case "Tarjetas Rojas":
                return xScaleAxis("TR") + margin.right / 2;
                break;
        }
    }).y1(function(d, i) {
        return hG - yScale(d[1, 1]);
    }).y0(hG);
;
    canvasGrafs = d3.select(idName);
    //console.log('bW', barWidth);
    /*canvasGrafs.selectAll('rect').data(nD).enter().append('rect').attr('class', 'bars').attr('width', barWidth / 4).attr('height', function(d, i) {
        //console.log('sss',d,  typeof(d[1,1]))
        return yScale(d[1, 1]);
    }).attr('x', function(d, i) {
        switch (d[0]) {
            case "Partidos Jugados":
                return xScaleAxis("PJ") +margin.right/2    ;
            break;
            case "Goles":
                return xScaleAxis("G") +margin.right/2 ;
            break;
            case "Disparos":
                return xScaleAxis("D") +margin.right/2 ;
            break;
            case "Disparos Arco":
                return xScaleAxis("DA") +margin.right/2 ;
            break;
            case "Faltas":
                return xScaleAxis("F") +margin.right/2;
            break;
            case "Faltas Cometidas":
                return xScaleAxis("FC") +margin.right/2;
            break;
            case "Faltas Recibidas":
                return xScaleAxis("FR") +margin.right/2;
            break;
            case "Tarjetas Amarillas":
                return xScaleAxis("TA") +margin.right/2;
            break;
            case "Tarjetas Rojas":
                return xScaleAxis("TR") +margin.right/2;
            break;        
        }
    }).attr('y', function(d, i) {
        return hG - yScale(d[1, 1]);
    })

    .on("mouseover", function(d) {
        //Get this bar's x/y values, then augment for the tooltip
        var xPosition = parseFloat(d3.select(this).attr("x")) + barWidth / 8;
        var yPosition = parseFloat(d3.select(this).attr("y")) - 20;
        $('#tit-info').text(d[1, 0]);
        $('#info-p').text(d[1, 1]);
    }).on("mouseout", function() {
        //Remove the tooltip
        $("#tit-info").text();
        $('#info-p').text();
    });*/
    canvasGrafs.selectAll('lineasP').data(nD).enter().append("svg:path")
    .attr('class', "lineasP")
    .style('fill','#f7fafa')
    .attr("d", lineas(nD));

    canvasGrafs.data(nD).selectAll('circles').data(nD).enter().append('circle')
        .attr('class','puntos' )
        .attr('cx',function(d, i) {
        switch (d[0]) {
            case "Partidos Jugados":
                return xScaleAxis("PJ") +margin.right/2    ;
            break;
            case "Goles":
                return xScaleAxis("G") +margin.right/2 ;
            break;
            case "Disparos":
                return xScaleAxis("D") +margin.right/2 ;
            break;
            case "Disparos Arco":
                return xScaleAxis("DA") +margin.right/2 ;
            break;
            case "Faltas":
                return xScaleAxis("F") +margin.right/2;
            break;
            case "Faltas Cometidas":
                return xScaleAxis("FC") +margin.right/2;
            break;
            case "Faltas Recibidas":
                return xScaleAxis("FR") +margin.right/2;
            break;
            case "Tarjetas Amarillas":
                return xScaleAxis("TA") +margin.right/2;
            break;
            case "Tarjetas Rojas":
                return xScaleAxis("TR") +margin.right/2;
            break;        
        }
    })
        .attr('cy', function(d, i) {
        return hG - yScale(d[1, 1]);
    }) 
        .attr('r', 5 )
        .style('fill', '#D55619')
        .on("mouseover", function(d) {
        //Get this bar's x/y values, then augment for the tooltip
        var xPosition = parseFloat(d3.select(this).attr("x")) + barWidth / 8;
        var yPosition = parseFloat(d3.select(this).attr("y")) - 20;
        $('#tit-info').text(d[1, 0]);
        $('#info-p').text(d[1, 1]);
    }).on("mouseout", function() {
        //Remove the tooltip
        $("#tit-info").text();
        $('#info-p').text();
    })
        ;
    canvasGrafs.append("rect").attr("class", "axis").attr('width', wG).attr('height', hG / 4).attr('x', 0).attr('y', hG - hG / 4);
    canvasGrafs.append("rect").attr("class", "axis").attr('width', wG).attr('height', hG / 4).attr('x', 0).attr('y', hG - hG / 2);
    canvasGrafs.append("rect").attr("class", "axis").attr('width', wG).attr('height', hG / 4).attr('x', 0).attr('y', hG - hG / 4 - hG / 2);
    canvasGrafs.append("rect").attr("class", "axis").attr('width', wG).attr('height', hG / 4).attr('x', 0).attr('y', 0);
    canvasGrafs.append('g').attr("class", "axis").attr("transform", "translate(0," + (hG) + ")").call(xAxis);
}

function cargarDatosJugador(jugador) {
    var seleccion = [];
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
                grafGral.push(["Partidos Jugados", partidosJug]);
                grafGral.push(["Goles", golesJug]);
                grafGral.push(["Disparos", disparosJug]);
                grafGral.push(["Disparos Arco", disparosAJug]);
                grafGral.push(["Faltas", faltasJug]);
                grafGral.push(["Faltas Cometidas", faltasCometidasJug]);
                grafGral.push(["Faltas Recibidas", faltasRecibidasJug]);
                grafGral.push(["Tarjetas Amarillas", tarjetasAmarillasJug]);
                grafGral.push(["Tarjetas Rojas", tarjetasRojasJug]);
                seleccion = [{
                    goles: golesJug,
                    disparos: disparosJug,
                    disparosArco: disparosAJug,
                    faltas: faltasJug,
                    faltasCometidas: faltasCometidasJug,
                    tarjetasA: tarjetasAmarillasJug,
                    tarjetasR: tarjetasRojasJug
                }];
                //console.log('seleccionado', seleccion)
                //var distp1 = d3.selectAll('#main-container .distancia').data(selectedItems).enter().append('p').text("funcio");
            }
        });
        //grafGral = seleccion;
        //console.log(seleccion[0])
        drawGralStats(grafGral, '#gral-stats');
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