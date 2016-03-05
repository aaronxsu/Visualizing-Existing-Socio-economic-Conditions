/* ================================
Week 6 Assignment: Slide Model
================================ */
$.ajax(censusTractPhiladelphia).done(function(data){
  dataPhiladelphia = JSON.parse(data);
  slideOne();
});

$.ajax(censusTractCenterCity).done(function(data) {
  dataDemographics = JSON.parse(data);
 });

$.ajax(crimeCenterCity).done(function(data) {
  dataCrime = JSON.parse(data);
});

$.ajax(schoolCenterCity).done(function(data) {
  dataSchool = JSON.parse(data);
});

$(document).ready(function() {
  $('.legend').hide();
  $('#slideTwo').hide();
  $('#slideThree').hide();
  $('#slideFour').hide();
  $("#next-button").click(function(){
    if(pageNumber === 1){
     map.removeLayer(layerOne);
     slideTwo();
   }
   else if(pageNumber === 2){
     map.removeLayer(layerTwo);
     slideThree();
   }
   else if(pageNumber === 3){
     map.removeLayer(layerThree);
     slideFour();
   }
   else if(pageNumber === 4){
     map.removeLayer(layerFour);
     slideFive();
   }
   else if(pageNumber === 5){
     map.removeLayer(layerFive);
     slideOne();
   }
  });

  $("#previous-button").click(function(e){
    if(pageNumber === 1){
     map.removeLayer(layerOne);
     slideFive();
   }
   else if(pageNumber === 2){
     map.removeLayer(layerTwo);
     slideOne();
   }
   else if(pageNumber === 3){
     map.removeLayer(layerThree);
     slideTwo();
   }
   else if(pageNumber === 4){
     map.removeLayer(layerFour);
     slideThree();
   }
   else if(pageNumber === 5){
     map.removeLayer(layerFive);
     slideFour();
   }
  });
});
