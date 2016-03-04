/* ================================
Week 6 Assignment: Midterm Function Signatures
================================ */

/*==============================================================================

Below are functions for the first slide
The second slide shows the introduction

==============================================================================*/

var slideOne = function (){
  pageNumber = 1;
  layerOne = L.geoJson(dataPhiladelphia).addTo(map);
};

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

var slideTwo = function(){
  pageNumber = 2;
  map.setView([39.9522, -75.1639],15);
  $('.legend').hide();
  $('#slideOne').hide();
  $('#slideTwo').show();
  setGraphVisibility(graphIds, '');
  var demoFeatureLayer = L.geoJson(dataDemographics, {style: defaultStyle}).addTo(map);
  $('.demographicDropDown').change(function(){
    switch ($('.demographicDropDown').val()) {
      case "pop": {
        demoFeatureLayer.setStyle(function(features){
          return setDemoStyle(features.properties.Demo.PopClass);
        });
        setLegend("Population","1,455 - 2,388","2,389 - 2,599","2,600 - 3,198","3,199 - 3,688","3,689 - 5,197");
        setGraphVisibility(graphIds, '#popGraph');
        createBarChart("popGraph",popChartData);
      }break;
      case "sex": {
        demoFeatureLayer.setStyle(function(features){
          return defaultStyle();
        });
        $('.legend').hide();
        setGraphVisibility(graphIds, '#sexGraph');
        createPieChart("sexGraph",sexPieData);
      }break;
      case "male": {
        demoFeatureLayer.setStyle(function(features){
          return setDemoStyle(features.properties.Demo.MaleClass);
        });
        setLegend("Male Residents","31% - 44%","45% - 49%","50% - 52%","53% - 54%","55% - 64%");
        setGraphVisibility(graphIds, '#maleGraph');
        createBarChart("maleGraph",maleChartData);
     }break;
      case "female": {
        demoFeatureLayer.setStyle(function(features){
          return setDemoStyle(features.properties.Demo.FemaleClass);
        });
        setLegend("Female Residents","36% - 46%","47% - 50%","51% - 53%","54% - 56%","57% - 69%");
        setGraphVisibility(graphIds, '#femaleGraph');
        createBarChart("femaleGraph",femaleChartData);
      }break;
      case "race": {
        demoFeatureLayer.setStyle(function(features){
          return defaultStyle();
        });
        $('.legend').hide();
        setGraphVisibility(graphIds, '#raceGraph');
        createPieChart("raceGraph",racePieData);
      }break;
      case "white": {
        demoFeatureLayer.setStyle(function(features){
          return setDemoStyle(features.properties.Demo.WhiteClass);
        });
        setLegend("White Residents","34% - 66%","67% - 77%","78% - 85%","86% - 89%","90% - 92%");
        setGraphVisibility(graphIds, '#whiteGraph');
        createBarChart("whiteGraph",whiteChartData);
     }break;
      case "afam": {
        demoFeatureLayer.setStyle(function(features){
          return setDemoStyle(features.properties.Demo.AfricanAmericanClass);
        });
        setLegend("African American Residents","1% - 2%","3% - 5%"," 6% - 9%","10% - 13%","14% - 32%");
        setGraphVisibility(graphIds, '#blackGraph');
        createBarChart("blackGraph",blackChartData);
      }break;
      case "asian": {
        demoFeatureLayer.setStyle(function(features){
        return setDemoStyle(features.properties.Demo.AsianClass);
        });
        setLegend("Asian Residents","3% - 7%","8% - 11%","12% - 16%","17% - 26%","27% - 56%");
        setGraphVisibility(graphIds, '#asianGraph');
        createBarChart("asianGraph",asianChartData);
      }break;
      default:
     }
   });
   layerTwo = demoFeatureLayer;
};
/*==============================================================================

Below are functions for the third slide
The third slide shows the crime distibution.It allows users to search for criminal
insidents based on location, and type of crime, crime details are in the pop up.

==============================================================================*/

var selectTractTypeMonth = function(crime, tract, type, month){
  var marker=[];
  _.map(crime.features, function(data){
    if(parseFloat(data.properties.Month) === month && data.properties.Tract === tract && parseFloat(data.properties.Type) === type){
      marker.push([data.geometry.coordinates[1], data.geometry.coordinates[0]]);
    }
  });
  return marker;
}

var slideThree = function (){
  $('.legend').hide();
  $('#slideTwo').hide();
  $('#slideThree').show();
  pageNumber = 3;
  map.setView([39.9522, -75.1639],15);
  var demoFeatureLayer = L.geoJson(dataDemographics).addTo(map);
  $('.crimeTractDropDown').change(function(){
    $('.crimeTypeDropDown').change(function(){
      $('.crimeMonthDropDown').change(function(){
        markerCrime = selectTractTypeMonth(dataCrime, parseFloat($('.crimeTractDropDown').val()), $('.crimeTypeDropDown').val(), parseFloat($('.crimeMonthDropDown').val()));
      })
    })
  })
};

/*==============================================================================

Below are functions for the fourth slide
The fourth slide shows different types of schools in the census tract level. Users
can click and see detailed information in the sidebar

==============================================================================*/

var slideFour = function (){

};

/*==============================================================================

Below are functions for the fifth slide
The fifth slide shows information about indego bike share program. It is also a
search-based slide.

==============================================================================*/

var slideFive = function (){

};
