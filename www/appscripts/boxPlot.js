var margin = {
    top: 10,
    right: 50,
    bottom: 20,
    left: 50,
}, 
width,  height;
var estatura = [];
var goles = [];
var balRec = [];
var tarAm = [];
var pasComp = [];
var posiciones = [];
var yScale, xScale, yAxis, xAxis;
var datosNuevos;
var maxD ,minD, media;

var csv = d3.csv('/data/jug.csv', function(error, data) {
    if (error) throw error;
    data.forEach(function(d, i) {
        estatura[i] = +d.ESTATURA;
        goles[i] = +d.GOLES;
        balRec[i] = d.BALRECUP;
        tarAm[i] = +d.TAMARILLAS;
        pasComp[i] = +d.PASESCOMP;
        posiciones[i] = d.POSICION;
    });
    datosNuevos = [{
        key: 'Estatura',
        value: [posiciones,estatura]
    }, {
        key: 'Goles',
        value: goles,
    }, {
        key: 'BalonesRec',
        value: balRec
    }, {
        key: 'TarjetasAma',
        value: tarAm
    }, {
        key: 'PasesComp',
        value: pasComp
    }]
    drawBP(datosNuevos,'#box',0);
});

function drawBP(nD, idDiv, cual) {
    var sumando = 0;
    console.log('LOG', nD[cual].value[1], idDiv, cual)
    width = $(idDiv).width() - margin.left  -margin.right;
    height = $(idDiv).height() - margin.top  -margin.bottom;
    var boxW = width/nD[cual].value[0].length ;
    var space = width/3;

    for (i in nD[cual].value[1]){
        sumando = sumando + nD[cual].value[1][i];
        //console.log('fori', sumando,nD[cual].value[1][i])
    } 
    media = sumando / nD[cual].value[1].length;
    maxD = d3.max(d3.values(nD[cual].value[1]));
    minD = d3.min(d3.values(nD[cual].value[1]));
    xScale = d3.scale.ordinal().domain(["def", "med","del"]).rangeBands([0, width-margin.right])
    yScale = d3.scale.linear().domain([maxD, minD]).range([margin.top,height]);
    //console.log('MAX',maxD, 'Min',minD, 'Sumando',sumando,'media',media)
    yAxis = d3.svg.axis()
        .scale(yScale)
        .ticks(10)
        .orient('left');
    xAxis = d3.svg.axis()
        .scale(xScale)
        .orient('bottom');
   
    canvas = d3.select(idDiv).attr('width',width).attr('height',height )
     canvas.append('g').attr('id','yAxisG').call(yAxis);
     canvas.append('g').attr('id','xAxisG').call(xAxis);

    d3.select('#xAxisG').attr('transform', 'translate(' + margin.left + ',' + height + ')')
    d3.select('#yAxisG').attr('transform', 'translate(' + margin.left + ',' + 0 + ')')
    
    canvas.selectAll('g.box')
        .data(nD[cual].value[0])
        .enter()
        .append('g')
        .attr('class','box')
        .attr(' ')
            'width':boxW,
            'height':function(d, i){return nD[cual].value[1][i]*.25},
            'x':function (d,i) {
                console.log('CX',xScale(d))
                return xScale(d)  +space/2 +boxW*2              
            },
            'y':function (d, i) {
                console.log('CY',yScale(media),d)
                return yScale(media)
            },
    }).style('fill','black');
}