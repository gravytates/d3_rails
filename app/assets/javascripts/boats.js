// ajax call to fetch json
var loadData = function(){
                $.ajax({
                  type: 'GET',
                  contentType: 'application/json; charset=utf-8',
                  url: '/boats',
                  dataType: 'json',
                  success: function(data){
                    drawBarPlot(data);
                  },
                  failure: function(result){
                    error();
                  }
                });
              };

function error() {
    console.log("Something went wrong!");
}

// draw bar plot
// set plot parameters
var barWidth = 20;
var colors = ['red', 'blue'];
var plotHeight = 500;

// draw bar plot
function drawBarPlot(data){
  console.log(data);

  // define linear y-axis scale
  var yScale = d3.scaleLinear()
                 .domain([0, d3.max(data)])
                 .range([0, (plotHeight - 100)]);

  d3.select("#plot")

    .selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("width", barWidth)
    .attr("height", function(d){ return yScale(d); })
    .attr("fill", function(d, i) {
        return colors[i];
    })
    .attr("x", function(d, i){
        return (i * 100) + 90; // horizontal location of bars
    })
    .attr("y", function(d){
        return plotHeight - yScale(d); // scale bars within plotting area
    });
}

var updateData = function(){
                  $.ajax({
                    type: 'GET',
                    contentType: 'application/json; charset=utf-8',
                    url: '/boats',
                    dataType: 'json',
                    success: function(data){
                      updatePage(data);
                    },
                    failure: function(result){
                      error();
                    }
                  });
                };

function updateBarPlot(data){

  var yScale = d3.scaleLinear()
                 .domain([0, d3.max(data)])
                 .range([0, (plotHeight - 50)]);

  d3.select("#plot")
    .selectAll("rect")
    .data(data)
    .transition()
    .attr("height", function(d){ return yScale(d); })
    .attr("y", function(d){
        return plotHeight - yScale(d);
    });
}

// update vote counters
function updateVoteCounters(data){
  $("#red-count").html(data[0]);
  $("#blue-count").html(data[1]);
}

// update page (plot and counters)
function updatePage(data){
  updateBarPlot(data);
  updateVoteCounters(data);
}

////NEW PRACTICING FROM THE BOOK (back end)/////
var w = 500;
var h = 50;
var w2 = 500;
var h2 = 100;
var barPadding = 1;

var dataset = [];                         //Initialize empty array
for (var i = 0; i < 25; i++) {            //Loop 25 times
    var newNumber = Math.random() * 30;   //New random number (0-30)
    dataset.push(newNumber);              //Add new number to array
}
// var dataset = [1,2,3,4,5];

// fetch data on page load
$(document).ready(function(){

  loadData();

  setInterval(function(){
    updateData();
  }, 3000);
  // call updateData every 3000 ms

  ////NEW PRACTICING FROM THE BOOK (front end)/////
  console.log(dataset);
  d3.select("body").selectAll("h2")
      .data(dataset)
      .enter()
      .append("div")
      .attr("class", "bar")
      .style("height", function(d) {
          var barheight = d * 5;
          return barheight + "px";
      });
  var svg = d3.select("body")
            .append("svg")
            .attr("width", w)   // <-- Here
            .attr("height", h);

  var circles = svg.selectAll("circle")
    .data(dataset)
    .enter()
    .append("circle");

  circles.attr("cx", function(d, i) {
          return (i * 50) + 25;
      })
     .attr("cy", h/2)
     .attr("r", function(d) {
          return d/1.5;
     })
     .attr("fill", "green")
    .attr("stroke", "red")
    .attr("stroke-width", function(d) {
        return d/2;
    });

    var svg = d3.select("body")
            .append("svg")
            .attr("width", w2)
            .attr("height", h2);

    svg.selectAll("rect")
     .data(dataset)
     .enter()
     .append("rect")
     .attr("x", function(d, i) {
          return i * (w / dataset.length + barPadding);
      })
     .attr("y", 0)
     .attr("width", 20)
     .attr("height", 100);

});
