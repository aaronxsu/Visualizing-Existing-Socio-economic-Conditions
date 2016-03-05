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

var selectTractTypeMonth = function(tract, type, month){
  _.each(dataCrime.features, function(data){
    if(parseFloat(data.properties.Month) === parseFloat(month) && parseFloat(data.properties.Tract) === parseFloat(tract) && data.properties.Type === type){
      markerCrime.push([data.geometry.coordinates[1], data.geometry.coordinates[0]]);
    }
  });
};

var createCrimeMarkers = function() {
  return _.map(data, function(datum){
    return L.marker(datum);
  });
};

var plotCrimeMarkers = function(markers){
  _.each(markers, function(array){
    array.addTo(map);
  });
};

var clearCrimeMarker = function(markers){
  _.each(markers, function(obj){
    map.removeLayer(obj);
  });
  markers=[];
  markerCrime = [];
};


var slideThree = function (){
  $('.legend').hide();
  $('#slideTwo').hide();
  $('#slideThree').show();
  pageNumber = 3;
  map.setView([39.9522, -75.1639],15);
  layerThree = L.geoJson(dataDemographics).addTo(map);
  var markers = [];
  $('.crimeTractDropDown').change(function(){
    // markerCrime = [];
    // _.each(dataDemographics.features, function(data){
    //   if(parseFloat(data.properties.NAME10) === parseFloat($('.crimeTractDropDown').val())){
    //     southWest = [L.latLngBounds(data.geometry.coordinates).getSouthWest().lng, L.latLngBounds(data.geometry.coordinates).getSouthWest().lat];
    //     northEast = [L.latLngBounds(data.geometry.coordinates).getNorthEast().lng, L.latLngBounds(data.geometry.coordinates).getNorthEast().lat];
    //     bounds = L.latLngBounds(southWest, northEast);
    //     map.fitBounds(bounds);
    //   }
    // });
    $('.crimeTypeDropDown').change(function(){
      $('.crimeMonthDropDown').change(function(){
        $('#crimeSearchButton').click(function(){
          selectTractTypeMonth($('.crimeTractDropDown').val(), $('.crimeTypeDropDown').val(), $('.crimeMonthDropDown').val());
          console.log(markerCrime)
          if (markerCrime.length === 0){
            alert("Good! No criminal incidents in your selection!");
          }
          else{
            plotCrimeMarkers(markers = createCrimeMarkers(markerCrime));
          }
        })
      })
    })
  })

  $('#clearCrimeSearchButton').click(function(){
    clearCrimeMarker(markers);
    $('.crimeTractDropDown').val("blank");
    $('.crimeTypeDropDown').val("blank");
    $('.crimeMonthDropDown').val("blank");
  });
};

/*==============================================================================

Below are functions for the fourth slide
The fourth slide shows different types of schools in the census tract level. Users
can click and see detailed information in the sidebar

==============================================================================*/
function school (name, address, zipcode, phone, type, lat, lng){
  this.name = name;
  this.address = address + ", Philadelphia, PA " + zipcode;
  this.phone = phone;
  this.type = type;
  this.lat = lat;
  this.lng = lng;
};

var schoolLevel =  function(level){
  var thisSchool=[];
  _.map(dataSchool.features, function(datum){
    if(datum.properties.GRADE_LEVE === level){
      var eachSchool = new school(datum.properties.FACIL_NAME,datum.properties.FACIL_ADDR,
        datum.properties.ZIPCODE, datum.properties.FACIL_TELE, datum.properties.TYPE,
        datum.geometry.coordinates[1], datum.geometry.coordinates[0]);
      thisSchool.push(eachSchool);
    }
  });
  return thisSchool;
};

var createSchoolMarker = function (school, customIcon){
  return _.map(school, function(datum){
    var marker = L.marker([datum.lat, datum.lng], {icon: customIcon});
    var popup = "<b>"+datum.name+"</b><br>";
    popup += "<i>"+datum.address+"</i><br>";
    popup += "<u>"+datum.phone+"</u><br>";
    popup += datum.type + " School";
    marker.addTo(map).bindPopup(popup).openPopup();
    return marker;
  });
};

var clearSchoolMarker = function(markers){
  _.each(markers, function(data){
    map.removeLayer(data);
  });
  markers=[];
};

var clearAllMarker = function(markers){
  _.each(markers, function(data){
    _.each(data, function(datum){
      map.removeLayer(datum);
    });
  });
  markers=[];
};

var slideFour = function (){
  clearCrimeMarker();
  $('.legend').hide();
  $('#slideTwo').hide();
  $('#slideThree').hide();
  $('#slideFour').show();
  pageNumber = 4;
  map.setView([39.9522, -75.1639],15);
  layerFour = L.geoJson(dataDemographics, {style: defaultStyle}).addTo(map);
  var levelK = schoolLevel("Kindergarten");
  var levelP = schoolLevel("Pre-school");
  var levelE = schoolLevel("Elementary School");
  var levelH = schoolLevel("High School");
  var levelEM = schoolLevel("Elem/Middle");
  var levelMH = schoolLevel("Middle/High");
  var levelEMH = schoolLevel("Elem/Mid/High");
  var levelT = schoolLevel("Tutoring");
  var marker = [];

  $('#ck-Kindergarten').change(function(){
    if($('#ck-Kindergarten').prop("checked") === true){
      marker.push(markerK = createSchoolMarker(levelK, L.divIcon({className: 'Kindergarten'})));
    }
    else{
      clearSchoolMarker(markerK);
    }
  });
  $('#ck-Pre-school').change(function(){
    if($('#ck-Pre-school').prop("checked") === true){
      marker.push(markerP = createSchoolMarker(levelP, L.divIcon({className: 'Pre-school'})));
    }
    else{
      clearSchoolMarker(markerP);
    }
  });
  $('#ck-Elementary-School').change(function(){
    if($('#ck-Elementary-School').prop("checked") === true){
      marker.push(markerE = createSchoolMarker(levelE, L.divIcon({className: 'Elementary-School '})));
    }
    else{
      clearSchoolMarker(markerE);
    }
  });
  $('#ck-High-School').change(function(){
    if($('#ck-High-School').prop("checked") === true){
      marker.push(markerH = createSchoolMarker(levelH, L.divIcon({className: 'High-School'})));
    }
    else{
      clearSchoolMarker(markerH);
    }
  });
  $('#ck-Elem-Middle').change(function(){
    if($('#ck-Elem-Middle').prop("checked") === true){
      marker.push(markerEM = createSchoolMarker(levelEM, L.divIcon({className: 'Elem-Middle'})));
    }
    else{
      clearSchoolMarker(markerEM);
    }
  });
  $('#ck-Middle-High').change(function(){
    if($('#ck-Middle-High').prop("checked") === true){
      marker.push(markerMH = createSchoolMarker(levelMH, L.divIcon({className: 'Middle-High'})));
    }
    else{
      clearSchoolMarker(markerMH);
    }
  });
  $('#ck-Elem-Mid-High').change(function(){
    if($('#ck-Elem-Mid-High').prop("checked") === true){
      marker.push(markerEMH = createSchoolMarker(levelEMH, L.divIcon({className: 'Elem-Mid-High'})));
    }
    else{
      clearSchoolMarker(markerEMH);
    }
  });
  $('#ck-Tutoring').change(function(){
    if($('#ck-Tutoring').prop("checked") === true){
      marker.push(markerT = createSchoolMarker(levelT, L.divIcon({className: 'Tutoring'})));
    }
    else{
      clearSchoolMarker(markerT);
    }
  });
  $('#clearSchoolMarker').click(function(){
    clearAllMarker(marker);
  });
};

/*==============================================================================

Below are functions for the fifth slide
The fifth slide shows information about indego bike share program. It is also a
search-based slide.

==============================================================================*/

var slideFive = function (){

};
