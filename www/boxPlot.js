var margin = {
    top: 10,
    right: 50,
    bottom: 20,
    left: 50,
};
var estatura = [];
var goles = [];
var balRec = [];
var tarAm = [];
var pasComp = [];

var csv = d3.csv('/data/jug.csv', function(error, data) {
    if (error) throw error;
    csv.forEach(function(d, i) {
        estatura[i] = +d.ESTATURA;
        goles[i] = +d.GOLES;
        balRec[i] = d.BALRECUP;
        tarAm[i] = +d.TAMARILLAS;
        pasComp[i] = +d.PASESCOMP;
    });
});