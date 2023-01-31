//read excel 

let excelFile
let causes 
let volume 

    var input = document.getElementById("file-input");
    input.addEventListener("change", function(event) {
        var file = event.target.files[0];
        var reader = new FileReader();
        reader.onload = function(event) {
            var data = new Uint8Array(event.target.result);
            var workbook = XLSX.read(data, {type: "array"});
            var firstSheetName = workbook.SheetNames[0];
            var worksheet = workbook.Sheets[firstSheetName];
            var json = XLSX.utils.sheet_to_json(worksheet);
            excelFile = json;
            causes = json['SecondaryFailureCause ']
                
        };
        reader.readAsArrayBuffer(file);
    });

//Histogram plot
function plotHistogram(){

let secondaryCauses = [];
let rowNumbers = Object.keys(excelFile).length;

for (let i = 0; i < rowNumbers; i++) {

secondaryCauses.push(excelFile[i]['SecondaryFailureCause']);


  
};

secondaryCauses = secondaryCauses.sort(function(a, b) {
    return b - a;
});
  
console.log(secondaryCauses);
  

var data = secondaryCauses;
var layout = {title: "Histogram"};
Plotly.newPlot('graph',[{x:data,type:"histogram"}],layout);
 
};

//Pie plot

function plotPieChart(){

let secondaryCauses = [];
let rowNumbers = Object.keys(excelFile).length;

for (let i = 0; i < rowNumbers; i++) {

secondaryCauses.push(excelFile[i]['SecondaryFailureCause']);

 
};

const getCounts = iterable => {
    const counts = new Map();

    for (const x of iterable) {
        counts.set(x, (counts.get(x) ?? 0) + 1);  // use || for ES6 compat
    }

    return counts;
};

var dic = Array.from(
    getCounts(secondaryCauses),
    ([x, y]) => ({x, y})
)

var valuesData = []
var labelsData =[]
var dicRows = Object.keys(dic).length

for (let i = 0; i < dicRows; i++) {

if (dic[i].x== undefined){

  labelsData.push('NOT DEFINED')
  
} else{

   labelsData.push(dic[i].x);
};
 


  valuesData.push(dic[i].y);

  
};
  
console.log(dic[10].x)

var data = [{
  values: valuesData,
  labels: labelsData,
  type: 'pie'
}];

var layout = {
  height: 0.5,
  width: 1,
  autosize: true,
  title:'% LOC by Cause',
  
};
  
Plotly.newPlot('graph',data,layout);
 
};


//Show excel file 

function consoleLog(){

  console.log(excelFile);
};

//Plot bar chart by Cause
function plotBar(){

let secondaryCauses = [];
let rowNumbers = Object.keys(excelFile).length;

for (let i = 0; i < rowNumbers; i++) {

secondaryCauses.push(excelFile[i]['SecondaryFailureCause']);

 
};


const getCounts = iterable => {
    const counts = new Map();

    for (const x of iterable) {
        counts.set(x, (counts.get(x) ?? 0) + 1);  // use || for ES6 compat
    }

    return counts;
};

var dic = Array.from(
    getCounts(secondaryCauses),
    ([x, y]) => ({x, y})
)

var valuesData = []
var labelsData =[]
var dicRows = Object.keys(dic).length

for (let i = 0; i < dicRows; i++) {

if (dic[i].x== undefined){

  labelsData.push('NOT DEFINED')
  
} else{

   labelsData.push(dic[i].x);
};
 


  valuesData.push(dic[i].y);

  
};
  
  var layout = {
  height: 0.75,
  width: 1,
  autosize: true,
  title: 'LOC Events by Failure Cause',
  xaxis:{tickfont:{size:8},
        categoryorder:'total descending',
        title:'Causes'},
  yaxis:{title:'No of Events'},
}; 
  
  
  var data = [
  {
    x: labelsData,
    y: valuesData,
    type: 'bar'
  }
];

Plotly.newPlot('graph', data,layout);


  
}

//Plot bar chart by spill type
function plotBar2(){

let spillType = [];
let rowNumbers = Object.keys(excelFile).length;

for (let i = 0; i < rowNumbers; i++) {

spillType.push(excelFile[i]['SpillType']);

 
};


const getCounts = iterable => {
    const counts = new Map();

    for (const x of iterable) {
        counts.set(x, (counts.get(x) ?? 0) + 1);  // use || for ES6 compat
    }

    return counts;
};

var dic = Array.from(
    getCounts(spillType),
    ([x, y]) => ({x, y})
)

var valuesData = []
var labelsData =[]
var dicRows = Object.keys(dic).length

for (let i = 0; i < dicRows; i++) {

if (dic[i].x== undefined){

  labelsData.push('NOT DEFINED')
  
} else{

   labelsData.push(dic[i].x);
};
 


  valuesData.push(dic[i].y);
  
  
};

console.log(dic);
  
  var layout = {
  height: 0.75,
  width: 1,
  autosize: true,
  title: 'LOC Events by Spill Type',
  xaxis:{tickfont:{size:8},
        categoryorder:'total descending',
        title:'Causes'},
  yaxis:{title:'No of Events'},
}; 
  
  
  var data = [
  {
    x: labelsData,
    y: valuesData,
    type: 'bar'
  }
];

Plotly.newPlot('graph', data,layout);


  
}

