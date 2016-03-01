/* ================================
Week 6 Assignment: Midterm Function Signatures
================================ */

/*==============================================================================

Below are functions for the first slide
The second slide shows the introduction

==============================================================================*/

/*==============================================================================

Below are functions for the second slide
The second slide shows the demographics information of Center City in 2014
==============================================================================*/
//set the default style of the thematic map
var defaultStyle = function(){
  return {
    weight: 2,
    opacity: 1,
    color: "gainsboro",
    dashArray: '3',
    fillOpacity: 0.7,
    fillColor: "gainsboro"
  };
}
//set the style for thematic maps
var setDemoStyle = function(property){
  switch (property) {
    case 1: return {fillColor: '#ffffb2'}; break;
    case 2: return {fillColor: '#fed976'}; break;
    case 3: return {fillColor: '#feb24c'}; break;
    case 4: return {fillColor: '#fd8d3c'}; break;
    case 5: return {fillColor: '#fc4e2a'}; break;
    default:
  }
};
//set the legend for different thematic maps
var setLegend = function(title, labelOne, labelTwo, labelThree, labelFour, labelFive){
  $('.legend').show();
  $('#legend-title').text(title);
  $('#label-first').text(labelOne);
  $('#label-second').text(labelTwo);
  $('#label-third').text(labelThree);
  $('#label-fourth').text(labelFour);
  $('#label-fifth').text(labelFive);
};
//Create bar charts on the sidebar
var createBarChart = function(id, barChartData){
  var ctx = document.getElementById(id).getContext("2d");
  var myBarChart = new Chart(ctx).Bar(barChartData, {
    responsive : true
  });
  console.log(ctx,myBarChart);
};
//create pie charts on the sidebar
var createPieChart = function(id, pieChartData){
  var ctx = document.getElementById(id).getContext("2d");
  var myBarChart = new Chart(ctx).Pie(pieChartData, {
    responsive : true
  });
};
//change the graph visibilty based on the drop down selection
var setGraphVisibility = function (data, element){
  if(element === ""){
    _.each(data,function(datum){
      $(datum).hide();
    });
  }
  else{
    $(element).show();
    _.chain(data).filter(function(datum){
      return datum !== element;
    }).each(function(datum){
      $(datum).hide();
    }).value();
  }
};
/*==============================================================================

Below are functions for the third slide
The third slide shows the crime distibution.It allows users to search for criminal
insidents based on location, and type of crime, crime details are in the pop up.

==============================================================================*/

/*==============================================================================

Below are functions for the fourth slide
The fourth slide shows different types of schools in the census tract level. Users
can click and see detailed information in the sidebar

==============================================================================*/

/*==============================================================================

Below are functions for the fifth slide
The fifth slide shows information about indego bike share program. It is also a
search-based slide.

==============================================================================*/
