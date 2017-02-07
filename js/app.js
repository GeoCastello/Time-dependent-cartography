//Variables that stablish the size of the SVG element
var margin={top: 10, left: 10, bottom: 10, right: 10};
var width1=parseInt(d3.select('#map_container').style('width'));
var width=width1-margin.left-margin.right;
var mapRatio= .445;
var height=width*mapRatio;

//Color scale
var color=d3.scaleThreshold()
	.domain([0, 5, 12, 22, 33, 45, 60])
	.range(["#D7D7D7", "#C4F7CB", "#9AD9A3", "#75BC80", "#559F61", "#3A8247", "#246530", "#14481E"]);


//SVG Creation
var svg = d3.select( "#map_container" )
	.append( "svg" )
	.attr( "width", width )
	.attr( "height", height )
	.attr("class", "map");

//Projection
var AzEqualArea = d3.geoAzimuthalEqualArea()
	.scale( width/1.4 )
	.rotate( [0,0] )
	.center( [30, 51] )
	.translate( [width/2,height/2] );

//GeoPath that aplies the projection to all elements
var geoPath = d3.geoPath()
	.projection( AzEqualArea );

var inputValue="a"+document.getElementById("range").innerHTML;

var clicked=false;

//***************************************************BASEMAP***************************************************************
//g element containing europe polygons with renewable electricity values
var relectricity = svg.append( "g" ).attr("id", "relectricity");
var country;
var selected_country;
//Create path elements that will contain each polygon
d3.json("js/renewable_electricity.topojson", function(error, topology) {
	relectricity.selectAll("path")
	.data(topojson.object(topology, topology.objects.collection)
		.geometries)
	.enter()
	.append("path")
	.attr("class", "choropleth")
	.attr("fill", function(d) {
			return color(d.properties[inputValue])
			})
	.attr("stroke", "#FFF")
	.on("mouseover", function(d) {
		if(d.properties[inputValue]>=0){
			d3.select(this.parentNode.appendChild(this)).attr("stroke", "#000");
		}
		if (clicked==false) {
			country=d.properties.country;
			dataset_elect=getData(country, relectricity_json);
			activate_elec();
			country=d.properties.country;
			dataset_co2=getData(country, co2_json);
			activate_co2();
		}
		
	})
	.on("mouseout", function(d) {
		if(d.properties[inputValue]>=0){
			d3.select(this).attr("stroke", "#FFF");
		}
		if(clicked==false) {
			renewable_stats
				.selectAll("rect")
				.remove();
			renewable_stats
				.selectAll(".xaxis")
				.remove();
			renewable_stats
				.selectAll(".yaxis")
				.remove();
			co2_stats
				.selectAll("rect")
				.remove();
			co2_stats
				.selectAll(".xaxis")
				.remove();
			co2_stats
				.selectAll(".yaxis")
				.remove();
			co2_stats
				.selectAll("line")
				.remove();
		}
	})
	.on("click", function(d) {
		if (clicked==false) {
			clicked=true;
			selected_country=d.properties.country;
		}
		else {
			clicked=false;
			selected_country=d.properties.country;
			renewable_stats
				.selectAll("rect")
				.remove();
			renewable_stats
				.selectAll(".xaxis")
				.remove();
			renewable_stats
				.selectAll(".yaxis")
				.remove();
			co2_stats
				.selectAll("rect")
				.remove();
			co2_stats
				.selectAll(".xaxis")
				.remove();
			co2_stats
				.selectAll(".yaxis")
				.remove();
			co2_stats
				.selectAll("line")
				.remove();
		}
		country=d.properties.country;
		dataset_elect=getData(country, relectricity_json);
		activate_elec();
		country=d.properties.country;
		dataset_co2=getData(country, co2_json);
		activate_co2();
		d3.event.stopPropagation();
	})
	.attr("d", geoPath)
});

//*****************************************************SYMBOLS***************************************************************
//Circle elements containing symbols with CO2 values
var co2=svg.append("g").attr("id", "co2");

d3.json("js/co2.topojson", function(error, topology) {
	co2.selectAll("circle")
		.data(topojson.object(topology, topology.objects.collection)
			.geometries)
		.enter()
		.append("circle")
		.attr("class", "co2_symbols")
		.attr("cx", function(d) {
				return AzEqualArea(d.coordinates)[0];
			})
		.attr("cy", function(d) {
				return AzEqualArea(d.coordinates)[1];
			})
		.attr("r", function(d) {
				if (d.properties[inputValue]<17) {
					this.parentNode.appendChild(this);
				};
				return (width/1000)*d.properties[inputValue];
			})
		.attr("fill", "#81BEF7")
		.attr("stroke", "#000")
		.on("mouseover", function(d) {
			if(d.properties[inputValue]>=0){
				d3.select(this.parentNode.appendChild(this)).attr("stroke", "#FFF");
			}
			if (clicked==false) {
				country=d.properties.country;
				dataset_elect=getData(country, relectricity_json);
				activate_elec();
				country=d.properties.country;
				dataset_co2=getData(country, co2_json);
				activate_co2();
			}
		})
		.on("mouseout", function(d) {
			if(d.properties[inputValue]>=0){
				d3.select(this).attr("stroke", "#000");
			}
			if (clicked==false) {
				renewable_stats
					.selectAll("rect")
					.remove();
				renewable_stats
					.selectAll(".xaxis")
					.remove();
				renewable_stats
					.selectAll(".yaxis")
					.remove();
				co2_stats
					.selectAll("rect")
					.remove();
				co2_stats
					.selectAll(".xaxis")
					.remove();
				co2_stats
					.selectAll(".yaxis")
					.remove();
				co2_stats
					.selectAll("line")
					.remove();
			}
		})
		.on("click", function(d) {
		if (clicked==false) {
			clicked=true;
			selected_country=d.properties.country;
		}
		else {
			clicked=false;
			selected_country=d.properties.country;
			renewable_stats
				.selectAll("rect")
				.remove();
			renewable_stats
				.selectAll(".xaxis")
				.remove();
			renewable_stats
				.selectAll(".yaxis")
				.remove();
			co2_stats
				.selectAll("rect")
				.remove();
			co2_stats
				.selectAll(".xaxis")
				.remove();
			co2_stats
				.selectAll(".yaxis")
				.remove();
			co2_stats
				.selectAll("line")
				.remove();
		}
		country=d.properties.country;
		dataset_elect=getData(country, relectricity_json);
		activate_elec();
		country=d.properties.country;
		dataset_co2=getData(country, co2_json);
		activate_co2();
		d3.event.stopPropagation();
	});
});

/*d3.select(window).on('resize', resize);*/

//***************************************STATISTICS************************************//
var margin_rstat={top: 10, left: 10, bottom: 10, right: 10}
var width_rstat1=parseInt(d3.select('#relectricity_chart').style('width'))
var width_rstat=width1-margin.left-margin.right
var mapRatio= .1
var height_rstat=width_rstat*mapRatio;

var barPadding=1;

var renewable_stats=d3.select("#relectricity_chart")
	.append( "svg" )
	.attr( "width", width_rstat )
	.attr( "height", height_rstat )
	.attr("class", "stats");

var co2_stats=d3.select("#co2_chart")
	.append( "svg" )
	.attr( "width", width_rstat )
	.attr( "height", height_rstat )
	.attr("id", "co2")
	.attr("class", "stats");



//**********************************AXIS*************************************//
var years=["1990", "1991", "1992", "1993", "1994", "1995", "1996", "1997", "1998", "1999", "2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010", "2011", "2012"];
var formatPercent=d3.format(".0%");
var formatNumber=d3.format(".2")




function activate_elec() {
	//**********************************AXIS*************************************//
	//**********************************X AXIS*************************************//
	xScale=d3.scaleBand()
		.rangeRound([0, (width_rstat-(width_rstat/1.35))])
		.padding(0);
	xScale.domain(years);

	xAxis=d3.axisBottom()
		.scale(xScale);

	renewable_stats.append("g")
		.attr("class", "xaxis")
		.attr("transform", "translate("+(margin_rstat.left*4)+","+(height_rstat-(margin_rstat.bottom*3))+")")
		.call(xAxis)

	renewable_stats.selectAll(".xaxis text")  // select all the text elements for the xaxis
        .attr("transform", "translate(-15,10) rotate(-45)");


    //**********************************Y AXIS*************************************//
	yScale=d3.scaleLinear()
		.range([(height_rstat-margin_rstat.top*3), 0]);
	yScale.domain([0, d3.max(dataset_elect)/100]);

	yAxis=d3.axisLeft()
		.scale(yScale)
		.tickFormat(formatPercent);

	renewable_stats.append("g")
		.attr("class", "yaxis")
		.attr("transform", "translate("+(margin_rstat.left*4)+",0)")
		.call(yAxis)

	//**********************************GRAPH************************************//
	max_value = Math.max.apply(Math, dataset_elect);
	renewable_stats
	.selectAll("rect")
	.data(dataset_elect)
	.enter()
	.append("rect")
	.on("mouseover", function(d) {
				d3.select(this).attr("stroke", "#FFF");
				d3.select("#value_renewable")
					.style("display", "block");
				document.getElementById("value_renewable").innerHTML=selected_country+", Value: "+d.toPrecision(4)+" %";
			})
	.on("mouseout", function(d) {
				d3.select(this).attr("stroke", "#000");
				d3.select("#value_renewable")
					.style("display", "none");
			})
	.attr("class", "rect_elect")
	.attr("transform", "translate("+(margin.left*4)+","+(-margin.bottom-margin.top)+")")
	.attr("x", function(d, i) {
		return i*((width_rstat-(width_rstat/1.35))/dataset_elect.length);
	})
	.attr("y", function(d) {
		return (height_rstat-10)-(d*(height_rstat-(margin.bottom*4))/max_value);
	})
	.transition().duration(500)
	.attr("width", ((width_rstat-(width_rstat/1.35))/dataset_elect.length)-barPadding)
	.attr("height", function(d) {
		return (d*(height_rstat-(margin.bottom*4))/max_value);
	})
	.attr("fill", function(d) {
			return color(d)
			})
	.attr("stroke", "#000");
}

function activate_co2() {
	//**********************************AXIS*************************************//
	//**********************************X AXIS*************************************//
	xScale=d3.scaleBand()
		.rangeRound([0, (width_rstat-(width_rstat/1.35))])
		.padding(0);
	xScale.domain(years);

	xAxis=d3.axisBottom()
		.scale(xScale);

	co2_stats.append("g")
		.attr("class", "xaxis")
		.attr("transform", "translate("+(margin_rstat.left*4)+","+(height_rstat-(margin_rstat.bottom*3))+")")
		.call(xAxis)

	co2_stats.selectAll(".xaxis text")  // select all the text elements for the xaxis
        .attr("transform", "translate(-15,10) rotate(-45)");


    //**********************************Y AXIS*************************************//
	yScale=d3.scaleLinear()
		.range([(height_rstat-margin_rstat.top*3), 0]);
	yScale.domain([0, d3.max(dataset_co2)]);

	yAxis=d3.axisLeft()
		.scale(yScale)
		.tickFormat(formatNumber);

	co2_stats.append("g")
		.attr("class", "yaxis")
		.attr("transform", "translate("+(margin_rstat.left*4)+",0)")
		.call(yAxis)

	//**********************************GRAPH************************************//
	co2_limit=2.59;
	max_value = Math.max.apply(Math, dataset_co2);
	co2_stats
		.selectAll("rect")
		.data(dataset_co2)
		.enter()
		.append("rect")
		.on("mouseover", function(d) {
					d3.select(this).attr("stroke", "#FFF");
					d3.select("#value_co2")
						.style("display", "block");
					document.getElementById("value_co2").innerHTML=selected_country+", Value: "+d.toPrecision(4)+" mt per Capita";
				})
		.on("mouseout", function(d) {
					d3.select(this).attr("stroke", "#000");
					d3.select("#value_co2")
						.style("display", "none");
				})
		.attr("class", "rect_elect")
		.attr("transform", "translate("+(margin.left*4)+","+(-margin.bottom-margin.top)+")")
		.attr("x", function(d, i) {
			return i*((width_rstat-(width_rstat/1.35))/dataset_elect.length);
		})
		.attr("y", function(d) {
			return (height_rstat-10)-(d*(height_rstat-(margin.bottom*4))/max_value);
		})
		.transition().duration(500)
		.attr("width", ((width_rstat-(width_rstat/1.35))/dataset_elect.length)-barPadding)
		.attr("height", function(d) {
			return (d*(height_rstat-(margin.bottom*4))/max_value);
		})
		.attr("fill", "#81BEF7")
		.attr("stroke", "#000");

	co2_stats
		.append("line")
		.attr("x1", function(d) {
				return (margin_rstat.left*4)
			})
		.attr("y1", function(d) {
				return (height_rstat-35)-(co2_limit*(height_rstat-(margin.bottom*4))/max_value);
			})
		.attr("x2", function(d) {
				return width_rstat/3.5;
			})
		.attr("y2", function(d) {
				return (height_rstat-35)-(co2_limit*(height_rstat-(margin.bottom*4))/max_value);
			})
		.style("stroke", "#DB001A");

}

function getData(find_country, input_data) {
	var dataset=[];
	for (i=0; i<Object.keys(input_data.features).length; i++) {
		check_country=input_data.features[i].properties.country;
		if (find_country==check_country) {
			for (var propName in input_data.features[i].properties) {
				if (input_data.features[i].properties.hasOwnProperty(propName)) {
					if (propName.charAt(0)=="a") {
						dataset.push(input_data.features[i].properties[propName]);
					}
				}
			};
		}
	};
	return dataset;
};


//TimeSlider
//When the input range changes update the value
d3.select("#timeslide")
	.on("change", function() {
		update(+this.value);
	});

function update(value) {
	document.getElementById("range").innerHTML=years[value];
	if (years[value]==1990) {
		document.getElementById("pre").innerHTML="No data";
		document.getElementById("after").innerHTML=years[value+1];
	}
	else if (years[value]==2012) {
		document.getElementById("pre").innerHTML=years[value-1];
		document.getElementById("after").innerHTML="No data"
	}
	else {
		document.getElementById("pre").innerHTML=years[value-1];
		document.getElementById("after").innerHTML=years[value+1];
	}
	
	inputValue="a"+years[value];
	d3.selectAll(".choropleth")
		.transition().duration(500)
		.attr("fill", function(d) {
			return color(d.properties[inputValue])
			})
	d3.selectAll(".co2_symbols")
		.transition().duration(500)
		.attr("r", function(d) {
				if (d.properties[inputValue]<17) {
					this.parentNode.appendChild(this);
				};
				return (width/1000)*d.properties[inputValue];
			});
}

var myTimer;
d3.select("#start").on("click", function() {
 clearInterval (myTimer);
	myTimer = setInterval (function() {
    	var b= d3.select("#timeslide");
      var t = (+b.property("value") + 1) % (+b.property("max") + 1);
      if (t == 0) { t = +b.property("min"); }
      b.property("value", t);
      update (t);
    }, 1000);
});

d3.select("#stop").on("click", function() {
	clearInterval (myTimer);
});


/************************************************************************** LEGEND **********************************************************************************/
//Choropleth legend
//title renewable
d3.select('#legend')
	.append("h2")
	.attr("id", "legend_renewable_title");
document.getElementById("legend_renewable_title").innerHTML="RENEWABLE ENERGY (% of total electicity output)";

var chorop_legend = d3.select('#legend')
  	.append('ul')
    .attr('class', 'list-inline');

var keys = chorop_legend.selectAll('li')
    .data(color.range());

var chorop = ["ND", "0%", "5%", "12%", "22%", "33%", "45%", "60%"];

keys.enter()
	.append('li')
    .attr('class', 'key')
    .style('border-top-color', String)
    .text(function(d, i){
    	return chorop[i];
    });

//co2 legend
//title co2
var max_co2=27.4314341085271;
var min_co2=2.68262296466812;
d3.select('#legend')
	.append("h2")
	.attr("id", "legend_co2_title");
document.getElementById("legend_co2_title").innerHTML="Co<sub>2</sub> (Metric Tons per Capita)";
var co2_legend=d3.select("#legend")
	.append("svg")
	.attr( "width", width_rstat )
	.attr( "height", height_rstat/1.1 )
	.attr("id", "co2")
	.attr("class", "stats");

co2_legend
	.append("circle")
	.attr("cx", function(d) {
			return width_rstat/20+((width/1000)*max_co2);
		})
	.attr("cy", function(d) {
			return height_rstat/15+((width/1000)*max_co2);
		})
	.attr("r", function(d) {
			return (width/1000)*max_co2;
		})
	.attr("fill", "#81BEF7")
	.attr("stroke", "#000");

co2_legend
	.append("circle")
	.attr("cx", function(d) {
			return width_rstat/17.4+((width/1000)*20);
		})
	.attr("cy", function(d) {
			return height_rstat/4.6+((width/1000)*20);
		})
	.attr("r", function(d) {
			return (width/1000)*20;
		})
	.attr("fill", "#81BEF7")
	.attr("stroke", "#000");

co2_legend
	.append("circle")
	.attr("cx", function(d) {
			return width_rstat/14.8+((width/1000)*10);
		})
	.attr("cy", function(d) {
			return height_rstat/2.4+((width/1000)*10);
		})
	.attr("r", function(d) {
			return (width/1000)*10;
		})
	.attr("fill", "#81BEF7")
	.attr("stroke", "#000");

co2_legend
	.append("circle")
	.attr("cx", function(d) {
			return width_rstat/13.3+((width/1000)*min_co2);
		})
	.attr("cy", function(d) {
			return height_rstat/1.78+((width/1000)*min_co2);
		})
	.attr("r", function(d) {
			return (width/1000)*min_co2;
		})
	.attr("fill", "#81BEF7")
	.attr("stroke", "#000");

co2_legend
	.append("line")
	.attr("x1", function(d) {
			return width_rstat/20+((width/1000)*max_co2);
		})
	.attr("y1", function(d) {
			return height_rstat-3.405*((width/1000)*max_co2);
		})
	.attr("x2", function(d) {
			return width_rstat/20+((width/1000)*max_co2)+width_rstat/20;
		})
	.attr("y2", function(d) {
			return height_rstat-3.405*((width/1000)*max_co2);
		})
	.style("stroke", "#000");

co2_legend
	.append("text")
	.attr("x", function(d) {
			return width_rstat/20+((width/1000)*max_co2)+width_rstat/20;
		})
	.attr("y", function(d) {
			return height_rstat-3.29*((width/1000)*max_co2);
		})
	.text(max_co2.toPrecision(5)+" mt per Capita")
	.attr("font-size", "1vw");

co2_legend
	.append("line")
	.attr("x1", function(d) {
			return width_rstat/17.47+((width/1000)*20);
		})
	.attr("y1", function(d) {
			return height_rstat-2.85*((width/1000)*max_co2);
		})
	.attr("x2", function(d) {
			return width_rstat/17.47+((width/1000)*20)+width_rstat/20;
		})
	.attr("y2", function(d) {
			return height_rstat-2.85*((width/1000)*max_co2);
		})
	.style("stroke", "#000");

co2_legend
	.append("text")
	.attr("x", function(d) {
			return width_rstat/17.47+((width/1000)*20)+width_rstat/20;
		})
	.attr("y", function(d) {
			return height_rstat-2.75*((width/1000)*max_co2);
		})
	.text("20.000 mt per Capita")
	.attr("font-size", "1vw");

co2_legend
	.append("line")
	.attr("x1", function(d) {
			return width_rstat/14.8+((width/1000)*10);
		})
	.attr("y1", function(d) {
			return height_rstat-2.13*((width/1000)*max_co2);
		})
	.attr("x2", function(d) {
			return width_rstat/14.8+((width/1000)*10)+width_rstat/20;
		})
	.attr("y2", function(d) {
			return height_rstat-2.13*((width/1000)*max_co2);
		})
	.style("stroke", "#000");

co2_legend
	.append("text")
	.attr("x", function(d) {
			return width_rstat/14.8+((width/1000)*10)+width_rstat/20;
		})
	.attr("y", function(d) {
			return height_rstat-2.03*((width/1000)*max_co2);
		})
	.text("10.000 mt per Capita")
	.attr("font-size", "1vw");

co2_legend
	.append("line")
	.attr("x1", function(d) {
			return width_rstat/13.3+((width/1000)*min_co2);
		})
	.attr("y1", function(d) {
			return height_rstat-1.6*((width/1000)*max_co2);
		})
	.attr("x2", function(d) {
			return width_rstat/14.8+((width/1000)*10)+width_rstat/20;
		})
	.attr("y2", function(d) {
			return height_rstat-1.6*((width/1000)*max_co2);
		})
	.style("stroke", "#000");

co2_legend
	.append("text")
	.attr("x", function(d) {
			return width_rstat/14.8+((width/1000)*10)+width_rstat/20;
		})
	.attr("y", function(d) {
			return height_rstat-1.5*((width/1000)*max_co2);
		})
	.text(min_co2.toPrecision(5)+" mt per Capita")
	.attr("font-size", "1vw");

co2_legend
	.append("line")
	.attr("x1", function(d) {
			return width_rstat/13.3+((width/1000)*min_co2);
		})
	.attr("y1", function(d) {
			return height_rstat-0.8*((width/1000)*max_co2);
		})
	.attr("x2", function(d) {
			return width_rstat/14.8+((width/1000)*10)+width_rstat/20;
		})
	.attr("y2", function(d) {
			return height_rstat-0.8*((width/1000)*max_co2);
		})
	.style("stroke", "#DB001A");

co2_legend
	.append("text")
	.attr("x", function(d) {
			return width_rstat/14.8+((width/1000)*10)+width_rstat/20;
		})
	.attr("y", function(d) {
			return height_rstat-0.7*((width/1000)*max_co2);
		})
	.text("Worldwide Kyoto 2030")
	.attr("font-size", "1vw");


//************************************************GRAPHIC SCALE*************************************************************************//
var scale_svg = svg.append( "g" ).attr("id", "scale");

scale_svg
	.append("rect")
	.attr("class", "rect_elect")
	.attr("transform", "translate("+(margin.left)+","+(-margin.bottom-margin.top)+")")
	.attr("x", width/100)
	.attr("y", height)
	.transition().duration(500)
	.attr("width", AzEqualArea([0,0])[1]-AzEqualArea([0, 9.259259259259259])[1])
	.attr("height", height/100)
	.attr("fill", "#FFF")
	.attr("stroke", "#FFF");

scale_svg
	.append("text")
	.attr("class", "scale_txt")
	.attr("transform", "translate("+(margin.left)+","+(-margin.bottom-margin.top*2)+")")
	.transition().duration(500)
	.attr("x", width/100+(AzEqualArea([0,0])[1]-AzEqualArea([0, 9.259259259259259])[1])-margin.right)
	.attr("y", height)
	.text("1.000")
	.attr("font-size", "1vw")
	.style("fill", "#FFF");

scale_svg
	.append("text")
	.attr("class", "scale_txt")
	.attr("transform", "translate("+(margin.left)+","+(-margin.top)+")")
	.transition().duration(500)
	.attr("x", width/100+(AzEqualArea([0,0])[1]-AzEqualArea([0, 9.259259259259259])[1])+margin.right)
	.attr("y", height)
	.text("Km")
	.attr("font-size", "1vw")
	.style("fill", "#FFF");

scale_svg
	.append("rect")
	.attr("class", "rect_elect")
	.attr("transform", "translate("+(margin.left)+","+(-margin.bottom-margin.top)+")")
	.attr("x", width/100)
	.attr("y", height)
	.transition().duration(500)
	.attr("width", AzEqualArea([0,0])[1]-AzEqualArea([0, 6.944444444444444])[1])
	.attr("height", height/100)
	.attr("fill", "#000")
	.attr("stroke", "#FFF");

scale_svg
	.append("text")
	.attr("class", "scale_txt")
	.attr("transform", "translate("+(margin.left)+","+(-margin.bottom-margin.top*2)+")")
	.transition().duration(500)
	.attr("x", width/100+(AzEqualArea([0,0])[1]-AzEqualArea([0, 6.944444444444444])[1])-margin.right)
	.attr("y", height)
	.text("750")
	.attr("font-size", "1vw")
	.style("fill", "#FFF");

scale_svg
	.append("rect")
	.attr("class", "rect_elect")
	.attr("transform", "translate("+(margin.left)+","+(-margin.bottom-margin.top)+")")
	.attr("x", width/100)
	.attr("y", height)
	.transition().duration(500)
	.attr("width", AzEqualArea([0,0])[1]-AzEqualArea([0, 4.62962962962963])[1])
	.attr("height", height/100)
	.attr("fill", "#FFF")
	.attr("stroke", "#FFF");

scale_svg
	.append("text")
	.attr("class", "scale_txt")
	.attr("transform", "translate("+(margin.left)+","+(-margin.bottom-margin.top*2)+")")
	.transition().duration(500)
	.attr("x", width/100+(AzEqualArea([0,0])[1]-AzEqualArea([0, 4.62962962962963])[1])-margin.right)
	.attr("y", height)
	.text("500")
	.attr("font-size", "1vw")
	.style("fill", "#FFF");

scale_svg
	.append("rect")
	.attr("class", "rect_elect")
	.attr("transform", "translate("+(margin.left)+","+(-margin.bottom-margin.top)+")")
	.attr("x", width/100)
	.attr("y", height)
	.transition().duration(500)
	.attr("width", AzEqualArea([0,0])[1]-AzEqualArea([0, 2.314814814814815])[1])
	.attr("height", height/100)
	.attr("fill", "#000")
	.attr("stroke", "#FFF");

scale_svg
	.append("text")
	.attr("class", "scale_txt")
	.attr("transform", "translate("+(margin.left)+","+(-margin.bottom-margin.top*2)+")")
	.transition().duration(500)
	.attr("x", width/100+(AzEqualArea([0,0])[1]-AzEqualArea([0, 2.314814814814815])[1])-margin.right)
	.attr("y", height)
	.text("250")
	.attr("font-size", "1vw")
	.style("fill", "#FFF");

scale_svg
	.append("rect")
	.attr("class", "rect_elect")
	.attr("transform", "translate("+(margin.left)+","+(-margin.bottom-margin.top)+")")
	.attr("x", width/100)
	.attr("y", height)
	.transition().duration(500)
	.attr("width", AzEqualArea([0,0])[1]-AzEqualArea([0, 1.157407407407407])[1])
	.attr("height", height/100)
	.attr("fill", "#FFF")
	.attr("stroke", "#FFF");

scale_svg
	.append("text")
	.attr("class", "scale_txt")
	.attr("transform", "translate("+(margin.left)+","+(-margin.bottom-margin.top*2)+")")
	.transition().duration(500)
	.attr("x", width/100-margin.right/2)
	.attr("y", height)
	.text("0")
	.attr("font-size", "1vw")
	.style("fill", "#FFF");


	


//************************************************SELECT VARIABLE CO2 VISIBLE OR NOT*****************************************************//
d3.select("#select_co2").on("change",update_co2_visibility);
			update_co2_visibility();
			
			
function update_co2_visibility(){
	if(d3.select("#select_co2").property("checked")){
		d3.selectAll("#co2").style("display", "block");
		d3.selectAll("#legend_co2_title").style("display", "block");
		if(d3.select("#select_diagrams").property("checked")){
			d3.selectAll("#co2_chart").style("display", "block");
		}
	}
	else{
		d3.selectAll("#co2").style("display", "none");
		d3.selectAll("#legend_co2_title").style("display", "none");
		d3.selectAll("#co2_chart").style("display", "none");
	}
}

//************************************************SELECT BAR CHARTS VISIBLE OR NOT*****************************************************//
document.getElementById("select_diagrams").checked=false;
d3.selectAll("#co2_chart").style("display", "none");
d3.select("#select_diagrams").on("change",update_charts_visibility);
			update_co2_visibility();
			
function update_charts_visibility(){
	if(d3.select("#select_diagrams").property("checked")){
		alert("Click on the map for locking the bar chart and hover the bars for see the value of each year. Click again on the map for unlocking the bar chart");
		d3.selectAll("#relectricity_chart").style("display", "block");
		d3.selectAll("#co2_chart").style("display", "block");
	}
	else{
		d3.selectAll("#relectricity_chart").style("display", "none");
		d3.selectAll("#co2_chart").style("display", "none");
	}
}