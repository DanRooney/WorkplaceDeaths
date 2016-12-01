//Define Margin
    var margin = {left: 80, right: 80, top: 50, bottom: 50 }, 
        width = 1060 - margin.left -margin.right,
        height = 500 - margin.top - margin.bottom;
			
			//Create scale functions
			var xScale = d3.scale.linear()
								 .domain([1, 12])
								 .range([10, 900]);

			var yScale = d3.scale.linear()
								 .domain([0, 100])
								 .range([900, 20]);
        

			var rScale = d3.scale.linear()
								 .domain([0, 100])
								 .range([2, 5]);

//Define X axis
var xAxis = d3.svg.axis()
    .scale(xScale)
    .orient("bottom")
    .ticks(12);

//Define SVG
var svg = d3.select("body")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
			
//Create X axis
svg.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(0," + (height) + ")")
    .call(xAxis);

var div = d3.select("body").append("div")	
    .attr("class", "tooltip")				
    .style("opacity", 0);

var array = new Array(54);
for(i=1;i<=53;++i){
    array[i] = 0;
}

d3.csv("data.csv", function(data) {
    data.forEach(function(d) {//input from the csv
        d.week = +d.week;
        for(var i = 1; i<=53; ++i){
            if(i == +d.week){
                ++array[i];
            }
        }
        d.count = +d.count;
        d.date = d.date;
        d.description = d.description;
        d.industry = d.industry;
        d.cause = d.cause;
    });

     svg.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("class", function(d) { //not working
           var c = "";
           if(d.cause == "fell"){
             c = "fell"     
           }
           if(d.cause == "crush"){
               c = "crush"
           }
           return c;
        })  
        .attr("r", 7)
        .attr("cx", function(d){
           return (d.week * 16.8); //need to tweek this 
        })//x will be week # 
        .attr("cy", function(d){
           return (405 - (d.count * 14));
        })
        
        //Assigns colors to bubbles based on cause
        .style("fill", function(d){
           if(d.cause == 'fell'){
              return "#66c2a5";    
           }
           if(d.cause == 'crush'){
               return "#fc8d62";
           }
           if(d.cause == 'air'){
               return "#8da0cb";
           }
           if(d.cause == 'zap'){
               return "#e78ac3";
           }
           if(d.cause == 'vehicle'){
               return "#a6d854";
           }
        })
     
    
     
        /*adapted from bl.ocks.org/d3noob */
        .on("mouseover", function(d) {	
            div.transition()		//transition time of tooltop
                .duration(200)		
                .style("opacity", .9);		
            div	.html(d.date+ "<br/>" + d.description) //this is the content of the tooltip 
                .style("left", (d3.event.pageX) + "px")		//position of tooltip
                .style("top", (d3.event.pageY - 28) + "px");	
            })					
        .on("mouseout", function(d) {		
            div.transition()		//fade out
                .duration(500)		
                .style("opacity", 0);
        });
    
        var falling = d3.selectAll("fell")
        var circles = d3.selectAll("circle")
   
});
