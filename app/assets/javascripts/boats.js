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




var dataset = [ 5, 10, 15, 20, 25 ];
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
          return d + "px";
      });
});
