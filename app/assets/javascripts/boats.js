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
var h = 200;
var w2 = 750;
var h2 = 200;
var w3 = 600;
var h3 = 300;
var barPadding = 1;

var dataset = [];                         //Initialize empty array
for (var i = 0; i < 25; i++) {            //Loop 25 times
    var newNumber = Math.random() * 30;   //New random number (0-30)
    dataset.push(newNumber);              //Add new number to array
}


var scatter = [];
var numDataPoints = 20;
var xRange = Math.random() * 1000;
var yRange = Math.random() * 1000;
for (var i = 0; i < numDataPoints; i++) {
    var newNumber1 = Math.floor(Math.random() * xRange);
    var newNumber2 = Math.floor(Math.random() * yRange);
    scatter.push([newNumber1, newNumber2]);
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
  // d3.select("body").selectAll("h2")
  //     .data(dataset)
  //     .enter()
  //     .append("div")
  //     .attr("class", "bar")
  //     .style("height", function(d) {
  //         var barheight = d * 5;
  //         return barheight + "px";
  //     });
  var svg = d3.select("body")
            .append("svg")
            .attr("width", w)   // <-- Here
            .attr("height", h);


  // circles?

  // var circles = svg.selectAll("circle")
  //   .data(dataset)
  //   .enter()
  //   .append("circle");
  //
  // circles.attr("cx", function(d, i) {
  //         return (i * 50) + 25;
  //     })
  //    .attr("cy", h/2)
  //    .attr("r", function(d) {
  //         return d/1.5;
  //    })
  //    .attr("fill", "green")
  //   .attr("stroke", "red")
  //   .attr("stroke-width", function(d) {
  //       return d/2;
  //   });

  var xscalez = d3.scaleBand()
              .domain(d3.range(dataset.length))
              .rangeRound([0, w2], 0.1)
              .paddingInner(0.05);


	var yscalez = d3.scaleLinear()
    					.domain([0, d3.max(dataset)])
    					.range([0, h]);

    var svg = d3.select("body")
            .append("svg")
            .attr("width", w2)
            .attr("height", h2);


        svg.selectAll("rect")
           .data(dataset)
           .enter()
           .append("rect")
           .attr("x", function(d, i) {
              return xscalez(i);         // <-- Set x values
           })
           .attr("y", function(d) {
   			   		return h - yscalez(d);
   			   })
   			   .attr("width", xscalez.bandwidth())
   			   .attr("height", function(d) {
   			   		return yscalez(d);
   			   })
   			   .attr("fill", function(d) {
   					return "rgb(0, 0, " + Math.round(d * 10) + ")";
   			   });


        // Text Stuff
        // svg.selectAll("text")
        //  .data(dataset)
        //  .enter()
        //  .append("text")
        //  .text(function(d) {
        //        return d.toFixed();
        //   })
        //   .attr("x", function(d, i) {
        //        return i * (w2 / dataset.length) + 5;
        //   })
        //   .attr("y", function(d) {
        //        return h2 - (d * 5) + 15;
        //   })
        //   .attr("text-anchor", "middle");


          // SCATTERPLOT PRACTICE
          // scaling the scatterplot
        //   var padding = 50;
         //
        //   var xScale = d3.scaleLinear()
        //   .domain([0, d3.max(scatter, function(d) { return d[0]; })])
        //   .range([padding, w3 - padding])
        //   .nice();
         //
        //   var yScale = d3.scaleLinear()
        //   .domain([0, d3.max(scatter, function(d) { return d[1]; })])
        //   .range([h3 - padding, padding])
        //   .nice();
         //
         //
        //   // scaling radii of data
        //   var rScale = d3.scaleLinear()
        //              .domain([0, d3.max(scatter, function(d) { return d[1]; })])
        //              .range([2, 5])
        //              .nice();
         //
         //
        //  var xAxis = d3.axisBottom()
        //    .scale(xScale)
        //    .ticks(5);
         //
        //  var yAxis = d3.axisLeft()
        //   .scale(yScale);

          //Create SVG element
        // var svg = d3.select("body")
        //             .append("svg")
        //             .attr("width", w3)
        //             .attr("height", h3);
        // svg.selectAll("circle")  // <-- No longer "rect"
        //  .data(scatter)
        //  .enter()
        //  .append("circle")
        //  .attr("cx", function(d) {
        //        return xScale(d[0]);
        //   })
        //   .attr("cy", function(d) {
        //        return yScale(d[1]);
        //   })
        //   .attr("r", function(d) {
        //       return rScale(d[1]);
        //   });

        // svg.selectAll("text")  // <-- Note "text", not "circle" or "rect"
        //  .data(scatter)
        //  .enter()
        //  .append("text")
        //  .text(function(d) {
        //        return d[0] + "," + d[1];
        //   })
        //   .attr("x", function(d) {
        //        return xScale(d[0]);
        //   })
        //   .attr("y", function(d) {
        //        return yScale(d[1]);
        //   })
        //   .attr("font-family", "sans-serif")
        //   .attr("font-size", "12px")
        //   .attr("fill", "red");

          //  Axes are different between d3 v 3 and d3 v. 4

        // svg.append("g")
        //   .attr("class", "axis") //Assign "axis" class
        //   .attr("transform", "translate(0," + (h3 - padding) + ")")
        //   .call(xAxis);
        //
        // svg.append("g")
        //   .attr("class", "axis")
        //   .attr("transform", "translate(" + padding + ",0)")
        //   .call(yAxis);

        d3.select("p")
          .on("click", function() {
            dataset = [ 11, 12, 15, 20, 18, 17, 16, 18, 23, 25,
                        5, 10, 13, 19, 21, 25, 22, 18, 15, 13 ];
            var numValues = dataset.length;               //Count original length of dataset
            dataset = [];                                       //Initialize empty array
            for (var i = 0; i < numValues; i++) {               //Loop numValues times
                var newNumber = Math.floor(Math.random() * 25); //New random integer (0-24)
                dataset.push(newNumber);
              }

            //Update all rects
            svg.selectAll("rect")
            					   .data(dataset)
                          .transition()
                          .delay(function(d, i) {
                              return i * 100;
                          })
                          .duration(1000)
            					   .attr("y", function(d) {
            					   		return h2 - yscalez(d);
            					   })
            					   .attr("height", function(d) {
            					   		return yscalez(d);
            					   })
            					   .attr("fill", function(d) {
            							return "rgb(0, 0, " + Math.round(d * 10) + ")";
            					   });


             });





});
