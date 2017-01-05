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
    top: 10,
    right: 30,
    bottom: 30,
    left: 20
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
var numPartidos;
/*///////////////////////////////////////////////////
Nuevo Arreglo para la grafica general de jugador
*/ ///////////////////////////////////////////////////
var grafGral = [];
//Get data from csv and converet the strings to numbers
var csv_final = d3.csv("/data/toluca_final_por_tiempos.csv", function(error, data) {
    var contador = 0;
    var numPar = 0;
    var prevPar = null;
    var par;
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
            par = d.partido;
            if ((prevPar == null) || (par != prevPar)) {
                numPar++;
            }
            prevPar = par;
        });
        numPartidos = numPar;
        //console.log('NP', numPartidos)
    }
    datosMaximos = data;
    var rand = Math.random(5, 10);
    //console.log('rand')
    cargarDatosJugador(5);
    cargarInfoGral(5);
    var dT  = cargarInfoGral(5);
    drawMaxStats(dT, '#gral-stats-max', 0)
    var itemsSelec = d3.selectAll('#nav-jugador a').on('click', function() {
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
        drawMaxStats(cargarInfoGral, '#gral-stats-max', 0)

    });
    //Finaliza Carga de Datos Nuevos
});

function drawMaxStats(nD, idDiv, nV) {
    wG = $(idDiv).width();
    hG = $(idDiv).height();
    wG = wG - margin.left - margin.right;
    hG = hG - margin.bottom - margin.top;
    canvasGrafs = d3.select(idDiv);
    xScaleAxis = d3.scale.linear().domain([0,numPartidos]).range([0, wG]);
    xAxis = d3.svg.axis().scale(xScaleAxis).orient("bottom");
    yScale = d3.scale.linear().domain([d3.max(distancia), d3.min(distancia)]).range([hG, +margin.top]);
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
        switch (nV) {
            case 0:
                console.log('HG', nD[i].max_distance)
                return hG - yScale(nD[i].max_distance) + margin.top;
                break;
            case 1:
                console.log('HG', nD[i].max_effort)
                return hG - yScale(nD[i].max_effort) + margin.top;
                break;
            case 2:
                onsole.log('HG', nD[i].max_high_intensity)
                return hG - yScale(nD[i].max_high_intensity) + margin.top;
                break;
            case 3:
                console.log('HG', nD[i].max_speed)
                return hG - yScale(nD[i].max_speed) + margin.top;
                break;
            case 4:
                console.log('HG', nD[i].max_sprint)
                return hG - yScale(nD[i].max_sprint) + margin.top;
                break;
        } 
    }).y0(hG + margin.top).interpolate("basis");
    canvasGrafs.selectAll('lineasP').data(nD).enter().append('svg:path').attr('class', 'lineasP').style('fill', '#1D3457').attr('d', lineasP(nD));
    canvasGrafs.append('g').attr("class", "axisY").attr("transform", "translate(" + margin.left + "," + (hG + margin.top) + ")").call(xAxis);
    canvasGrafs.append('g').attr("class", "axisY").attr("transform", "translate(" + margin.left + "," + (0) + ")").call(yAxis);
    canvasGrafs.selectAll('.axisY').style({
        'stroke': 'none',
        'fill': 'none'
    })
    canvasGrafs.selectAll('.axisY text').style('fill', '#1D3457');
}
function drawGralStats(nD, idName) {
    var hG = $(idName).height();
    var wG = $(idName).width();
    hG = hG - margin.top - margin.bottom;
    wG = wG - margin.left - margin.right;
    //console.log(nD)
    barWidth = wG / nD.length;
    barWidth = barWidth / 3;
    xScaleAxis = d3.scale.ordinal().domain(["PJ", "G", "D", "DA", "F", "FC", "FR", "TA", "TR"]).rangeBands([margin.left, wG + margin.left]);
    var xAxis = d3.svg.axis().scale(xScaleAxis).orient("bottom");
    yScale = d3.scale.linear().domain([d3.max(nD, function(d) {
        return d[1, 1]
    }), d3.min(nD, function(d) {
        return d[1, 1] - margin.top / 12
    })]).range([hG - margin.bottom, margin.top]);
    //console.log('max', d3.max(costoS));
    yScaleAxis = d3.scale.linear().domain([50, 0]).range([hG]);
    yAxis = d3.svg.axis().scale(yScaleAxis).orient("left").ticks(5);
    /*
    var lineas = d3.svg.area().x(function(d, i) {
        switch (d[0]) {
            case "Partidos Jugados":
                return xScaleAxis("PJ") + margin.left ;
                break;
            case "Goles":
                return xScaleAxis("G") + margin.left;
                break;
            case "Disparos":
                return xScaleAxis("D") + margin.left ;
                break;
            case "Disparos Arco":
                return xScaleAxis("DA") + margin.left ;
                break;
            case "Faltas":
                return xScaleAxis("F") + margin.left ;
                break;
            case "Faltas Cometidas":
                return xScaleAxis("FC") + margin.left ;
                break;
            case "Faltas Recibidas":
                return xScaleAxis("FR") + margin.left ;
                break;
            case "Tarjetas Amarillas":
                return xScaleAxis("TA") + margin.left ;
                break;
            case "Tarjetas Rojas":
                return xScaleAxis("TR") + margin.left ;
                break;
        }
    }).y(function(d, i) {
        //console.log('HG', d)
        return hG - yScale(d[1, 1]) +margin.top;
    }).y0(hG +margin.top)
    .interpolate("cardinal");
;*/
    canvasGrafs = d3.select(idName);
    //console.log('bW', barWidth);
    /*
        canvasGrafs.selectAll('lineasP').data(nD).enter().append("svg:path")
        .attr('class', "lineasP")
        .style('fill','#f7fafa')
        .attr("d", lineas(nD));
    */
    canvasGrafs.append("rect").attr("class", "axis").attr('width', wG).attr('height', hG / 4).attr('x', margin.left).attr('y', margin.top + hG - hG / 4);
    canvasGrafs.append("rect").attr("class", "axis").attr('width', wG).attr('height', hG / 4).attr('x', margin.left).attr('y', margin.top + hG - hG / 2);
    canvasGrafs.append("rect").attr("class", "axis").attr('width', wG).attr('height', hG / 4).attr('x', margin.left).attr('y', margin.top + hG - hG / 4 - hG / 2);
    canvasGrafs.append("rect").attr("class", "axis").attr('width', wG).attr('height', hG / 4).attr('x', margin.left).attr('y', margin.top);
    canvasGrafs.selectAll('bars').data(nD).enter().append('rect').attr('class', 'bars').attr('width', barWidth).attr('height', function(d, i) {
        //console.log('sss',d,  typeof(d[1,1]))
        return yScale(d[1, 1]);
    }).attr('x', function(d, i) {
        //console.log('DDD', d, i)
        switch (d[0]) {
            case "Partidos Jugados":
                return xScaleAxis("PJ") + margin.left;
                break;
            case "Goles":
                return xScaleAxis("G") + margin.left;
                break;
            case "Disparos":
                return xScaleAxis("D") + margin.left;
                break;
            case "Disparos Arco":
                return xScaleAxis("DA") + margin.left;
                break;
            case "Faltas":
                return xScaleAxis("F") + margin.left;
                break;
            case "Faltas Cometidas":
                return xScaleAxis("FC") + margin.left;
                break;
            case "Faltas Recibidas":
                return xScaleAxis("FR") + margin.left;
                break;
            case "Tarjetas Amarillas":
                return xScaleAxis("TA") + margin.left;
                break;
            case "Tarjetas Rojas":
                return xScaleAxis("TR") + margin.left;
                break;
        }
    }).attr('y', function(d, i) {
        return hG - yScale(d[1, 1]) + margin.top;
    }).on("mouseover", function(d) {
        //Get this bar's x/y values, then augment for the tooltip
        var xPosition = parseFloat(d3.select(this).attr("x")) + barWidth / 8;
        var yPosition = parseFloat(d3.select(this).attr("y")) - 20;
        $('#tit-g').text(d[1, 0]);
        $('#info-g').text(d[1, 1]);
    }).on("mouseout", function() {
        //Remove the tooltip
        $("#tit-g").text();
        $('#info-g').text();
    });
    canvasGrafs.append('g').attr("class", "axis").attr("transform", "translate(0," + (hG + margin.top) + ")").call(xAxis);
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
        //console.log(grafGral)
        drawGralStats(grafGral, '#gral-stats');
        datosJugadores = data;
        //console.log('select', datosJugadores, 'data/perfil-jugadores/' + numeroJug + '.jpg')
        //Información General del Jugador
        var navJ = d3.select('#left-nav').style({
            'background-color': '#234A6E',
            'color': '#f7fafa'
        });
        var nomJ = d3.select('#info-jugador > p.nombre > strong').data(datosJugadores).text(nombreJug).enter();
        var imgJ = d3.select('#left-nav > div:nth-child(1) > img.imgs-jugador').data(datosJugadores).attr('src', 'data/perfil-jugadores/' + numeroJug + '.jpg').enter();
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
        $('#tit-g').text(grafGral[0][0]);
        $('#info-g').text(grafGral[0][1]);
        //console.log('DATOS JUGADOR SELECCIONADO: ' + typeof(imgJ))
    });
}

function cargarInfoGral(jugador) {
    //console.log('data', datos);
    var dataDraw;
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
        dataDraw = selectedItems;
    });
            //console.log('dataDraw', dataDraw, selectedItems)
            return dataDraw;
        /*//console.log('maximos', distancia[i])
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
*/
}