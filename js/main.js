var map = L.map('map', {
  center: [39.9522, -75.1639],
  zoom: 11
});
var Stamen_TonerLite = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: 'abcd',
  minZoom: 0,
  maxZoom: 20,
  ext: 'png'
}).addTo(map);

var sidebarSlideIds = ['.legend','#slideOne','#slideOne-1','#slideOne-2','#slideTwo','#slideThree','#slideFour','#slideFive'];
var pageNumber = 0;


/*==============================================================================

Below are data for the first slide

==============================================================================*/

var censusTractPhiladelphia = "https://raw.githubusercontent.com/aronxoxo/CPLN690-Mid-term_Project/master/datasets/Philadelphia_Census_Tracts_2010.geojson";
var dataPhiladelphia;
var layerOne;

/*==============================================================================

Below are data for the second slide

==============================================================================*/

//geoJson data
var censusTractCenterCity = "https://raw.githubusercontent.com/aronxoxo/CPLN690-Mid-term_Project/master/datasets/CenterCityTracts_Demographic.geojson";
var dataDemographics;
var layerTwo;

//store sidebar graph ids
var graphIds = ['#popGraph','#sexGraph','#maleGraph','#femaleGraph','#raceGraph','#whiteGraph','#blackGraph','#asianGraph'];
//store sidebar legend ids
var sidebarLegendIds = ['#sidebar-legend-first','#sidebar-legend-second','#sidebar-legend-third','#sidebar-legend-label-first','#sidebar-legend-label-second','#sidebar-legend-label-third'];

//data for bar charts
var popChartData = {
  labels : ["1","2","3","4.01","4.02","5","6","7","8.01","8.03","8.04","9.01","9.02","10.01","10.02","11.01","11.02","12.01","12.02","125","367","376"],
  datasets : [
    {
      label:"Population",
      fillColor : "rgba(204, 235, 197,0.5)",
      strokeColor : "rgba(204, 235, 197,0.8)",
      highlightFill : "rgba(154,215,140,0.75)",
      highlightStroke : "rgba(154,215,140,1)",
      data : [3527,2285,3438,2566,3067,2388,1455,3097,1764,3688,3785,1853,2599,2400,3340,3198,2433,4012,5046,5197,2590,2666]
    }
  ]
};
var whiteChartData = {
  labels : ["1","2","3","4.01","4.02","5","6","7","8.01","8.03","8.04","9.01","9.02","10.01","10.02","11.01","11.02","12.01","12.02","125","367","376"],
  datasets : [
    {
      label:"White Resident %",
      fillColor : "rgba(179, 205, 227,0.5)",
      strokeColor : "rgba(179, 205, 227,0.8)",
      highlightFill : "rgba(123, 168, 206,0.75)",
      highlightStroke : "rgba(123, 168, 206,1)",
      data : [0.77, 0.34,0.82,0.6,0.9,0.44,0.74,0.66,0.75,0.91,0.84,0.68,0.73,0.87,0.92,0.89,0.89,0.89,0.85,0.84,0.77,0.48,]
    }
  ]
};
var blackChartData = {
  labels : ["1","2","3","4.01","4.02","5","6","7","8.01","8.03","8.04","9.01","9.02","10.01","10.02","11.01","11.02","12.01","12.02","125","367","376"],
  datasets : [
    {
      label:"Black or African American Resident %",
      fillColor : "rgba(251, 180, 174,0.5)",
      strokeColor : "rgba(251, 180, 174,0.8)",
      highlightFill : "rgba(247, 113, 101,0.75)",
      highlightStroke : "rgba(247, 113, 101,1)",
      data : [0.11,0.06,0.05,0.13,0.02,0.32,0.1,0.11,0.13,0.01,0.03,0.09,0.05,0.01,0.01,0.05,0.04,0.01,0.07,0.06,0.19,0.25,]
    }
  ]
};
var asianChartData = {
  labels : ["1","2","3","4.01","4.02","5","6","7","8.01","8.03","8.04","9.01","9.02","10.01","10.02","11.01","11.02","12.01","12.02","125","367","376"],
  datasets : [
    {
      label:"Asian Resident %",
      fillColor : "rgba(222, 203, 228,0.5)",
      strokeColor : "rgba(222, 203, 228,0.8)",
      highlightFill : "rgba(190,153,202,0.75)",
      highlightStroke : "rgba(190,153,202,1)",
      data : [0.09,0.56,0.1,0.26,0.08,0.16,0.14,0.22,0.07,0.05,0.11,0.21,0.2,0.06,0.06,0.05,0.03,0.05,0.06,0.06,0.03,0.2]
    }
  ]
};
var maleChartData = {
  labels : ["1","2","3","4.01","4.02","5","6","7","8.01","8.03","8.04","9.01","9.02","10.01","10.02","11.01","11.02","12.01","12.02","125","367","376"],
  datasets : [
    {
      label:"Male Resident %",
      fillColor : "rgba(179, 205, 227,0.5)",
      strokeColor : "rgba(179, 205, 227,0.8)",
      highlightFill : "rgba(123, 168, 206,0.75)",
      highlightStroke : "rgba(123, 168, 206,1)",
      data : [0.49,0.54,0.52,0.49,0.31,0.64,0.54,0.53,0.54,0.41,0.47,0.46,0.44,0.43,0.46,0.5,0.5,0.43,0.46,0.51,0.54,0.61]
    }
  ]
};
var femaleChartData = {
  labels : ["1","2","3","4.01","4.02","5","6","7","8.01","8.03","8.04","9.01","9.02","10.01","10.02","11.01","11.02","12.01","12.02","125","367","376"],
  datasets : [
    {
      label:"Female Resident %",
      fillColor : "rgba(251, 180, 174,0.5)",
      strokeColor : "rgba(251, 180, 174,0.8)",
      highlightFill : "rgba(247, 113, 101,0.75)",
      highlightStroke : "rgba(247, 113, 101,1)",
      data : [0.51,0.47,0.48,0.51,0.69,0.36,0.46,0.47,0.46,0.59,0.53,0.54,0.56,0.57,0.54,0.5,0.51,0.57,0.54,0.49,0.46,0.39]
    }
  ]
};

//data for pie charts
var sexPieData = [
    {
      value: 32256,
      color:"#b3cde3",
      highlight: "#7ba8ce",
      label: "Male Residents"
    },
    {
      value: 34138,
      color: "#fbb4ae",
      highlight: "#f77165",
      label: "Female Residents"
    }
  ];
  var racePieData = [
      {
        value: 51438,
        color:"#b3cde3",
        highlight: "#7ba8ce",
        label: "Whie Residents"
      },
      {
        value: 5105,
        color: "#fbb4ae",
        highlight: "#f77165",
        label: "African American Residents"
      },
      {
        value: 7723,
        color: "#decbe4",
        highlight: "#be99ca",
        label: "Asian Residents"
      }
    ];
/*==============================================================================

    Below are data for the third slide

==============================================================================*/

var crimeCenterCity = "https://raw.githubusercontent.com/aronxoxo/CPLN690-Mid-term_Project/master/datasets/Crime2014CC.geojson";
var dataCrime;
var markersCrime = [];
var layerThree;


/*==============================================================================

    Below are data for the fourth slide

==============================================================================*/

var schoolCenterCity = "https://raw.githubusercontent.com/aronxoxo/CPLN690-Mid-term_Project/master/datasets/SchoolsInCenterCity.geojson";
var dataSchool;
var schoolMarker=[];
var layerFour;

/*==============================================================================

    Below are data for the fifth slide

==============================================================================*/

var indegoBikeShareCenterCity = "https://raw.githubusercontent.com/aronxoxo/CPLN690-Mid-term_Project/master/datasets/BikeShareInCenterCity.geojson";
var dataBikeShare;
var markersIndego = [];
var layerFive;
