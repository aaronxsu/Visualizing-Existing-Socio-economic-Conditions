/* ================================
Week 6 Assignment: Midterm Function Signatures
================================ */

/*==============================================================================

Below are functions for all slides

==============================================================================*/

//Show the sidebar slide marked by ID peremeter
//Return the array of IDs of sidebar slides that needs to be hidden
var slidesToHide= function (data, ID){
  $(ID).show();
  return _.filter(data, function(datum){
    return datum !== ID;
  });
}
//Hide the sidebar slides come from data parameter(an array of IDs)
var hideSlides = function(data){
  _.each(data, function(datum){
    $(datum).hide();
  });
};
//Set the zoom level and the current page number
var slideInitialize = function(zoom, page){
  map.setView([39.9522, -75.1639], zoom);
  pageNumber = page;
};
//Set the look of the default basemap layer with only fillColor to be changed
var slideDefaultStyle = function(colorToFill){
  return {
    weight: 2,
    opacity: 1,
    color: "white",
    dashArray: '3',
    fillOpacity: 0.7,
    fillColor: colorToFill
  };
}

/*==============================================================================

Below are functions for the first slide
The first slide shows the introduction

==============================================================================*/

//Update the name of the census tract and its population shown on the sidebar once this tract is clicked
var eachFeature = function(features, layer) {
  layer.on('click', function (e) {
    $('#tractName').text(features.properties.NAMELSAD10);
    $('#tractPop').text(features.properties.Demo.Population);
    map.fitBounds(layer.getBounds());
  });
};

var slideOne = function (){
  //Initialize the introduction page, and add the Philadelphia City layer onto the map
  slideInitialize(11, 1);
  hideSlides(slidesToHide(slidesToHide(sidebarSlideIds, '#slideOne'),'#slideOne-1'));
  layerOne = L.geoJson(dataPhiladelphia, {style: slideDefaultStyle('#edf8e9')}).addTo(map);
  clearBikeShareSearch();
  $('#tractName').text("");
  $('#tractPop').text("");
  //Once "Let's get started button" is clicked, show the new sidebar,
  //remove the previous layer, zoom in the map, and add the click function
  //to the layer
  $('#show-cc-btn').click(function(){
    $('#slideOne-1').hide();
    $('#slideOne-2').show();
    map.removeLayer(layerOne)
    map.setView([39.9522, -75.1639],15);
    layerOne = L.geoJson(dataDemographics,{
      onEachFeature: eachFeature,
      style: slideDefaultStyle('#edf8e9')
    }).addTo(map);
  });
};

/*==============================================================================

Below are functions for the second slide
The second slide shows the demographics information of Center City in 2014

==============================================================================*/

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
//set the label of legend on different thematic maps
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
  clearCrimeSearch();
  slideInitialize(15, 2);
  hideSlides(slidesToHide(sidebarSlideIds, '#slideTwo'));
  var demoFeatureLayer = L.geoJson(dataDemographics, {style: slideDefaultStyle('#fff2cb')}).addTo(map);
  $('#demographicDropDown').val("blank");
  setGraphVisibility(graphIds, '');
  setGraphVisibility(sidebarLegendIds, '');

  $('#demographicDropDown').change(function(){
    setGraphVisibility(sidebarLegendIds, '');
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
          return slideDefaultStyle('#fff2cb');
        });
        $('.legend').hide();
        setGraphVisibility(graphIds, '#sexGraph');
        createPieChart("sexGraph",sexPieData);
        hideSlides(slidesToHide(slidesToHide(slidesToHide(slidesToHide(sidebarLegendIds, "#sidebar-legend-first"),"#sidebar-legend-second"),"#sidebar-legend-label-first"),"#sidebar-legend-label-second"));
        $('#sidebar-legend-label-first').text('Male Residents');
        $('#sidebar-legend-label-second').text('Female Residents');
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
          return slideDefaultStyle('#fff2cb');
        });
        $('.legend').hide();
        setGraphVisibility(graphIds, '#raceGraph');
        createPieChart("raceGraph",racePieData);
        _.each(sidebarLegendIds, function(datum){
          $(datum).show();
        });
        $('#sidebar-legend-label-first').text('White Residents');
        $('#sidebar-legend-label-second').text('African American Residents');
        $('#sidebar-legend-label-third').text('Asian Residents');
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

var clearCrimeSearch = function(){
  slideInitialize(15, 3);
  _.each(markersCrime, function(marker){
    map.removeLayer(marker);
  });
  markersCrime=[];
  $('#crimeTractDropDown').val("blank");
  $('#crimeTypeDropDown').val("blank");
  $('#crimeMonthDropDown').val("blank");
  $('#ck-Crime-Census-Tract').prop("checked", false);
  $('#ck-Crime-Type').prop("checked", false);
  $('#ck-Crime-Month').prop("checked", false);
};

var slideThree = function (){
  clearAllSchoolMarker();
  $('#crimeSearchButton').off();
  //Define some variables that will be used only in this function
  var tract;
  var type;
  var month;
  var cCon = false;
  var tCon = false;
  var mCon = false;
  //Some initializations of this slide
  hideSlides(slidesToHide(sidebarSlideIds, '#slideThree'));
  slideInitialize(15, 3);
  layerThree = L.geoJson(dataDemographics, {style: slideDefaultStyle('#c6dbef')}).addTo(map);
  //store the changes in dropdowns and checkboxes
  $('#crimeTractDropDown').change(function(){
    tract = $('#crimeTractDropDown').val();
  });
  $('#crimeTypeDropDown').change(function(){
    type = $('#crimeTypeDropDown').val();
  });
  $('#crimeMonthDropDown').change(function(){
    month = $('#crimeMonthDropDown').val();
  });
  $('#ck-Crime-Census-Tract').change(function(){
    cCon = $('#ck-Crime-Census-Tract').prop("checked");
  });
  $('#ck-Crime-Type').change(function(){
    tCon = $('#ck-Crime-Type').prop("checked");
  });
  $('#ck-Crime-Month').change(function(){
    mCon = $('#ck-Crime-Month').prop("checked");
  });
  //Click the search button, crimes are plotted based on the filter(dropdowns/checkboxes)
  $('#crimeSearchButton').click(function(){
    markersCrime = _.chain(dataCrime.features)
      .filter(function(datum){
        if(cCon === true && tCon === true && mCon === true){ return datum.length !== 0;}
        if(cCon === true && tCon === false && mCon === false){ return datum.properties.Type === type && parseFloat(datum.properties.Month) === parseFloat(month);}
        if(cCon === false && tCon === true && mCon === false){ return parseFloat(datum.properties.Tract) === parseFloat(tract) && parseFloat(datum.properties.Month) === parseFloat(month);}
        if(cCon === false && tCon === false && mCon === true){ return parseFloat(datum.properties.Tract) === parseFloat(tract) && datum.properties.Type === type;}
        if(cCon === true && tCon === true && mCon === false){ return parseFloat(datum.properties.Month) === parseFloat(month);}
        if(cCon === true && tCon === false && mCon === true){ return datum.properties.Type === type;}
        if(cCon === false && tCon === true && mCon === true){ return parseFloat(datum.properties.Tract) === parseFloat(tract);}
        if(cCon === false && tCon === false && mCon === false){ return parseFloat(datum.properties.Tract) === parseFloat(tract) && datum.properties.Type === type && parseFloat(datum.properties.Month) === parseFloat(month);}
      })
      .map(function(datum) {
        var popup = "<b>"+datum.properties.Type+"</b><br>";
        popup += "<i>"+datum.properties.Location+"</i><br>";
        popup += "Month: "+"<u>"+datum.properties.Month+"</u><br>";
        popup += "Census Tract: "+"<u>"+datum.properties.Tract+"</u>";
        return L.marker([datum.geometry.coordinates[1], datum.geometry.coordinates[0]], {icon: L.divIcon({className: 'crime-icon'})}).addTo(map).bindPopup(popup).openPopup();
      }).value();

    if(markersCrime.length === 0){
      alert("Good! No criminal incidents in your selection!");
    }
  });
  //Click the clear search button, the markers are removed
  $('#clearCrimeSearchButton').click(function(){
    clearCrimeSearch();
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
  console.log("clear one");
  _.each(markers, function(data){
    map.removeLayer(data);
  });
  markers=[];
};

var clearAllSchoolMarker = function(){
  _.each(schoolMarker, function(data){
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
  $('#ck-Tutoring').prop("checked", false);
};

var slideFour = function (){
  clearCrimeSearch();
  clearBikeShareSearch();
  hideSlides(slidesToHide(sidebarSlideIds, '#slideFour'));
  slideInitialize(15, 4);
  layerFour = L.geoJson(dataDemographics, {style: slideDefaultStyle('#bcbddc')}).addTo(map);

  var levelK = schoolLevel("Kindergarten");
  var levelP = schoolLevel("Pre-school");
  var levelE = schoolLevel("Elementary School");
  var levelH = schoolLevel("High School");
  var levelEM = schoolLevel("Elem/Middle");
  var levelMH = schoolLevel("Middle/High");
  var levelEMH = schoolLevel("Elem/Mid/High");
  var levelT = schoolLevel("Tutoring");
  var markerK = [];
  var markerP = [];
  var markerE = [];
  var markerH = [];
  var markerEM = [];
  var markerMH = [];
  var markerEMH = [];
  var markerT = [];


  $('#ck-Kindergarten').change(function(){
    if($('#ck-Kindergarten').prop("checked") === true){
      schoolMarker.push(markerK = createSchoolMarker(levelK, L.divIcon({className: 'Kindergarten'})));
    }
    else{
      console.log("unchecked");
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
    clearAllSchoolMarker();
  });
};

/*==============================================================================

Below are functions for the fifth slide
The fifth slide shows information about indego bike share program. It is also a
search-based slide.

==============================================================================*/

var clearBikeShareSearch = function (){
  _.each(markersIndego, function(marker){
    map.removeLayer(marker);
  });
  markersIndego=[];
  $('#bike-num-input').val("");
  $('#ck-bike').prop("checked", false);
  $('#dock-num-input').val("");
  $('#ck-dock').prop("checked", false);
};


var slideFive = function (){
  clearAllSchoolMarker();
  $('#searchBikeShare-btn').off();
  hideSlides(slidesToHide(sidebarSlideIds, '#slideFive'));
  slideInitialize(15, 5);
  layerFive = L.geoJson(dataDemographics, {style: slideDefaultStyle('#fee4da')}).addTo(map);

  var bikeNumber;
  var dockNumber;
  var bikeCondition = false;
  var dockCondition = false;

  $('#bike-num-input').change(function(){
    bikeNumber = parseFloat($('#bike-num-input').val());
  });

  $('#ck-bike').change(function(){
    bikeCondition = $('#ck-bike').prop("checked");
  });

  $('#dock-num-input').change(function(){
    dockNumber = parseFloat($('#dock-num-input').val());
  });

  $('#ck-dock').change(function(){
    dockCondition = $('#ck-dock').prop("checked");
  });

  $('#searchBikeShare-btn').click(function(){
    markersIndego = _.chain(dataBikeShare.features)
      .filter(function(datum){
        if(bikeCondition === true && dockCondition === false){ return datum.properties.docksAvailable >= dockNumber;}
        if(bikeCondition === false && dockCondition === true){ return datum.properties.bikesAvailable >= bikeNumber;}
        if(bikeCondition === false && dockCondition === false){console.log("both false"); return datum.properties.docksAvailable >= dockNumber && datum.properties.bikesAvailable >= bikeNumber; }
        if(bikeCondition === true && dockCondition === true){ return datum.length !== 0;}
      })
      .map(function(datum) {
        var popup = "<b>"+datum.properties.name+"</b><br>";
        popup += "<i>"+datum.properties.addressStreet+", ";
        popup += datum.properties.addressCity+", ";
        popup += datum.properties.addressState+" ";
        popup += datum.properties.addressZipCode+"</i><br>";
        popup += "<b>Avaiblable Bikes: </b>"+"<u>"+datum.properties.bikesAvailable+"</u><br>";
        popup += "<b>Avaiblable Docks: </b>"+"<u>"+datum.properties.docksAvailable+"</u><br>";
        return L.marker([datum.geometry.coordinates[1], datum.geometry.coordinates[0]], {icon: L.divIcon({className: 'bike-icon'})}).addTo(map).bindPopup(popup).openPopup()
      }).value();
    if(markersIndego.length === 0){
      alert("No current stations satisfy your conditions. Please clear the search and try again.");
    }
  });
  $('#clearBikeShare-btn').click(function(){
    clearBikeShareSearch();
  });
};
