/* ================================
Week 6 Assignment: Slide Model
================================ */
$(document).ready(function() {
/*==============================================================================

        Below are for the first slide: introduction

==============================================================================*/

/*==============================================================================

      Below are for the second slide: demographics

==============================================================================*/
  $.ajax(censusTractCenterCity).done(function(data) {
     //Set visibilities
     $('.legend').hide();
     setGraphVisibility(graphIds, '');
     //Prepare data. Prepare thematic map layer
     var dataDemographics = JSON.parse(data);
     var demoFeatureLayer = L.geoJson(dataDemographics, {style: defaultStyle}).addTo(map);
     //Change map and sidebar display based on drop down selection
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
  });
});
/*==============================================================================

        Below are for the third slide: crime

==============================================================================*/
/*==============================================================================

        Below are for the fourth slide: schools

==============================================================================*/
/*==============================================================================

        Below are for the fifth slide: indego bike share

==============================================================================*/
