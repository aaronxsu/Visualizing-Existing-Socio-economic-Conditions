/* ================================
Week 6 Assignment: Midterm Function Signatures
================================ */

/*==============================================================================

Below are functions for the first slide
The second slide shows the introduction

==============================================================================*/

var slideOneDefaultStyle = function(){
  return {
    weight: 2,
    opacity: 1,
    color: "white",
    dashArray: '3',
    fillOpacity: 0.7,
    fillColor: '#edf8e9'
  };
}

var eachFeature = function(features, layer) {
  layer.on('click', function (e) {
    $('#tractName').text(features.properties.NAMELSAD10);
    $('#tractPop').text(features.properties.Demo.Population);
    map.fitBounds(layer.getBounds());
  });
};

var slideOne = function (){
  clearIndegoMarker(indegoMarkers);
  $('.legend').hide();
  $('#slideOne').show();
  $('#slideOne-1').show();
  $('#slideOne-2').hide();
  $('#slideTwo').hide();
  $('#slideThree').hide();
  $('#slideFour').hide();
  $('#slideFive').hide();
  pageNumber = 1;
  map.setView([39.9522, -75.1639],11);
  layerOne = L.geoJson(dataPhiladelphia, {style: slideOneDefaultStyle}).addTo(map);

  $('#show-cc-btn').click(function(){
    $('#slideOne-1').hide();
    $('#slideOne-2').show();
    map.removeLayer(layerOne)
    map.setView([39.9522, -75.1639],15);
    layerOne = L.geoJson(dataDemographics,{
      onEachFeature: eachFeature,
      style: slideOneDefaultStyle
    }).addTo(map);
  });
};

/*==============================================================================

Below are functions for the second slide
The second slide shows the demographics information of Center City in 2014
==============================================================================*/
//set the default style of the thematic map
var slideTwodefaultStyle = function(){
  return {
    weight: 2,
    opacity: 1,
    color: "white",
    dashArray: '3',
    fillOpacity: 0.7,
    fillColor: "#fff2cb"
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
  clearCrimeMarker(markersCrime);
  $('#demographicDropDown').val("blank");
  pageNumber = 2;
  map.setView([39.9522, -75.1639],15);
  $('.legend').hide();
  $('#slideOne-1').hide();
  $('#slideOne-2').hide();
  $('#slideOne').hide();
  $('#slideTwo').show();
  $('#slideThree').hide();
  $('#slideFour').hide();
  $('#slideFive').hide();
  setGraphVisibility(graphIds, '');
  var demoFeatureLayer = L.geoJson(dataDemographics, {style: slideTwodefaultStyle}).addTo(map);
  $('#demographicDropDown').change(function(){
    switch ($('#demographicDropDown').val()) {
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
          return slideTwodefaultStyle();
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
          return slideTwodefaultStyle();
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

var slideThreedefaultStyle = function(){
  return {
    weight: 2,
    opacity: 1,
    color: "white",
    dashArray: '3',
    fillOpacity: 0.7,
    fillColor: "#c6dbef"
  };
}

var selectTractTypeMonth = function(tract, type, month){
  return _.filter(dataCrime.features, function(data){
    return parseFloat(data.properties.Month) === parseFloat(month)
    && parseFloat(data.properties.Tract) === parseFloat(tract)
    && data.properties.Type === type;
  });
};

var createCrimeMarkers = function(data, customIcon) {
  return _.map(data, function(datum){
    return L.marker([datum.geometry.coordinates[1], datum.geometry.coordinates[0]], {icon: customIcon});
  });
};

var plotCrimeMarkers = function(data){
  _.each(data, function(datum){
    datum.addTo(map);
  });
};

var clearCrimeMarker = function(data){
  _.each(data, function(datum){
    map.removeLayer(datum);
  });
  markersCrime=[];
  selectedCrime = [];
  console.log(markersCrime);
  console.log(selectedCrime);
  $('#crimeTractDropDown').val("blank");
  $('#crimeTypeDropDown').val("blank");
  $('#crimeMonthDropDown').val("blank");
};

var slideThree = function (){
  $('.legend').hide();
  $('#slideOne-1').hide();
  $('#slideOne-2').hide();
  $('#slideOne').hide();
  $('#slideTwo').hide();
  $('#slideThree').show();
  $('#slideFour').hide();
  $('#slideFive').hide();
  pageNumber = 3;
  map.setView([39.9522, -75.1639],15);
  layerThree = L.geoJson(dataDemographics, {style: slideThreedefaultStyle}).addTo(map);

  var tract;
  var month;
  var type;

  $('#crimeTractDropDown').change(function(){
    tract = $('#crimeTractDropDown').val();
  });

  $('#crimeTypeDropDown').change(function(){
    type = $('#crimeTypeDropDown').val();
  });

  $('#crimeMonthDropDown').change(function(){
    month = $('#crimeMonthDropDown').val();
  });

  $('#crimeSearchButton').click(function(){
    selectedCrime = selectTractTypeMonth(tract, type, month);
    if (selectedCrime.length === 0){
      alert("Good! No criminal incidents in your selection!");
    }
    else{
      markersCrime = createCrimeMarkers(selectedCrime, L.divIcon({className: 'crime-icon'}));
      plotCrimeMarkers(markersCrime);
      console.log(markersCrime);
      console.log(selectedCrime);
    }
  });

  $('#clearCrimeSearchButton').click(function(){
    clearCrimeMarker(markersCrime);
  });
};

/*==============================================================================

Below are functions for the fourth slide
The fourth slide shows different types of schools in the census tract level. Users
can click and see detailed information in the sidebar

==============================================================================*/

var slideFourdefaultStyle = function(){
  return {
    weight: 2,
    opacity: 1,
    color: "white",
    dashArray: '3',
    fillOpacity: 0.7,
    fillColor: "#bcbddc"
  };
}

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
  $('#ck-Kindergarten').prop("checked", false);
  $('#ck-Pre-school').prop("checked", false);
  $('#ck-Elementary-School').prop("checked", false);
  $('#ck-High-School').prop("checked", false);
  $('#ck-Elem-Middle').prop("checked", false);
  $('#ck-Middle-High').prop("checked", false);
  $('#ck-Elem-Mid-High').prop("checked", false);
  $('#ck-ck-Tutoring').prop("checked", false);
};

var schoolMarker=[];

var slideFour = function (){
  clearCrimeMarker(markersCrime);
  $('.legend').hide();
  $('#slideOne-1').hide();
  $('#slideOne-2').hide();
  $('#slideOne').hide();
  $('#slideTwo').hide();
  $('#slideThree').hide();
  $('#slideFour').show();
  $('#slideFive').hide();
  pageNumber = 4;
  map.setView([39.9522, -75.1639],15);
  layerFour = L.geoJson(dataDemographics, {style: slideFourdefaultStyle}).addTo(map);
  var levelK = schoolLevel("Kindergarten");
  var levelP = schoolLevel("Pre-school");
  var levelE = schoolLevel("Elementary School");
  var levelH = schoolLevel("High School");
  var levelEM = schoolLevel("Elem/Middle");
  var levelMH = schoolLevel("Middle/High");
  var levelEMH = schoolLevel("Elem/Mid/High");
  var levelT = schoolLevel("Tutoring");

  $('#ck-Kindergarten').change(function(){
    if($('#ck-Kindergarten').prop("checked") === true){
      schoolMarker.push(markerK = createSchoolMarker(levelK, L.divIcon({className: 'Kindergarten'})));
    }
    else{
      clearSchoolMarker(markerK);
    }
  });
  $('#ck-Pre-school').change(function(){
    if($('#ck-Pre-school').prop("checked") === true){
      schoolMarker.push(markerP = createSchoolMarker(levelP, L.divIcon({className: 'Pre-school'})));
    }
    else{
      clearSchoolMarker(markerP);
    }
  });
  $('#ck-Elementary-School').change(function(){
    if($('#ck-Elementary-School').prop("checked") === true){
      schoolMarker.push(markerE = createSchoolMarker(levelE, L.divIcon({className: 'Elementary-School '})));
    }
    else{
      clearSchoolMarker(markerE);
    }
  });
  $('#ck-High-School').change(function(){
    if($('#ck-High-School').prop("checked") === true){
      schoolMarker.push(markerH = createSchoolMarker(levelH, L.divIcon({className: 'High-School'})));
    }
    else{
      clearSchoolMarker(markerH);
    }
  });
  $('#ck-Elem-Middle').change(function(){
    if($('#ck-Elem-Middle').prop("checked") === true){
      schoolMarker.push(markerEM = createSchoolMarker(levelEM, L.divIcon({className: 'Elem-Middle'})));
    }
    else{
      clearSchoolMarker(markerEM);
    }
  });
  $('#ck-Middle-High').change(function(){
    if($('#ck-Middle-High').prop("checked") === true){
      schoolMarker.push(markerMH = createSchoolMarker(levelMH, L.divIcon({className: 'Middle-High'})));
    }
    else{
      clearSchoolMarker(markerMH);
    }
  });
  $('#ck-Elem-Mid-High').change(function(){
    if($('#ck-Elem-Mid-High').prop("checked") === true){
      schoolMarker.push(markerEMH = createSchoolMarker(levelEMH, L.divIcon({className: 'Elem-Mid-High'})));
    }
    else{
      clearSchoolMarker(markerEMH);
    }
  });
  $('#ck-Tutoring').change(function(){
    if($('#ck-Tutoring').prop("checked") === true){
      schoolMarker.push(markerT = createSchoolMarker(levelT, L.divIcon({className: 'Tutoring'})));
    }
    else{
      clearSchoolMarker(markerT);
    }
  });
  $('#clearSchoolMarker').click(function(){
    console.log(schoolMarker);
    clearAllMarker(schoolMarker);
  });
};

/*==============================================================================

Below are functions for the fifth slide
The fifth slide shows information about indego bike share program. It is also a
search-based slide.

==============================================================================*/

var slideFivedefaultStyle = function(){
  return {
    weight: 2,
    opacity: 1,
    color: "white",
    dashArray: '3',
    fillOpacity: 0.7,
    fillColor: "#fee4da"
  };
}

var bikeFilter = function(data, num){
  return _.filter(data, function(datum){
    return datum.properties.bikesAvailable >= num;
  });
};

var dockFilter = function(data, num){
  return _.filter(data, function(datum){
    return datum.properties.docksAvailable >= num;
  });
};

var filterBikeDock= function (data, bikeNum, docNum){
  return _.filter(data, function(datum){
    return datum.properties.bikesAvailable >= bikeNum && datum.properties.docksAvailable >= docNum;
  });
};

var indegoCreatePlotMarker = function(data, customIcon){
  return _.map(data, function(datum){
    var marker = L.marker([datum.geometry.coordinates[1],datum.geometry.coordinates[0]], {icon: customIcon});
    var popup = "<b>"+datum.properties.name+"</b><br>";
    popup += "<i>"+datum.properties.addressStreet+", ";
    popup += datum.properties.addressCity+", ";
    popup += datum.properties.addressState+" ";
    popup += datum.properties.addressZipCode+"</i><br>";
    popup += "<b>Avaiblable Bikes: </b>"+"<u>"+datum.properties.bikesAvailable+"</u><br>";
    popup += "<b>Avaiblable Docks: </b>"+"<u>"+datum.properties.docksAvailable+"</u><br>";
    marker.addTo(map).bindPopup(popup).openPopup();
    return marker;
  });
};

var clearIndegoMarker = function(data){
  _.each(data, function(datum){
    map.removeLayer(datum);
  });
  data=[];
  $('#bike-num-input').val("");
  $('#ck-bike').prop("checked", false);
  $('#dock-num-input').val("");
  $('#ck-dock').prop("checked", false);
};

var slideFive = function (){
  clearIndegoMarker(indegoMarkers);
  clearAllMarker(schoolMarker);
  $('.legend').hide();
  $('#slideOne-1').hide();
  $('#slideOne-2').hide();
  $('#slideOne').hide();
  $('#slideTwo').hide();
  $('#slideThree').hide();
  $('#slideFour').hide();
  $('#slideFive').show();
  pageNumber = 5;
  map.setView([39.9522, -75.1639],15);
  layerFive = L.geoJson(dataDemographics, {style:slideFivedefaultStyle}).addTo(map);


  var filteredIndego = [];
  var bikeNumber;
  var dockNumber;
  var bikeCondition = false;
  var dockCondition = false;

  $('#bike-num-input').change(function(){
    filteredIndego = [];
    bikeNumber = $('#bike-num-input').val();
  });

  $('#ck-bike').change(function(){
    bikeCondition = $('#ck-bike').prop("checked");
  });

  $('#dock-num-input').change(function(){
    dockNumber = $('#dock-num-input').val();
  });

  $('#ck-dock').change(function(){
    dockCondition = $('#ck-dock').prop("checked");
  });

  $('#searchBikeShare-btn').click(function(){
    if(bikeCondition === true && dockCondition === false){
      filteredIndego = dockFilter(dataBikeShare.features, dockNumber);
    }
    else if(bikeCondition === false && dockCondition === true){
      filteredIndego = bikeFilter(dataBikeShare.features, bikeNumber);
    }
    else if(bikeCondition === false && dockCondition === false){
      filteredIndego = filterBikeDock(dataBikeShare.features, bikeNumber, dockNumber);
    }
    else if(bikeCondition === true && dockCondition === true){
      filteredIndego = dataBikeShare.features;
    }
    else{
      alert("Input Error! Please Double Check!");
    }
    indegoMarkers = indegoCreatePlotMarker(filteredIndego, L.divIcon({className: 'bike-icon'}));
  });

  $('#clearBikeShare-btn').click(function(e){
    console.log(indegoMarkers);
    console.log(indegoMarkers[0]);
    console.log(typeof(indegoMarkers[0]));
    clearIndegoMarker(indegoMarkers);
  });
};
