const globeContainer = document.getElementById("globe");


const world = Globe()(globeContainer)


.backgroundColor("#000000")






.showAtmosphere(true)

.atmosphereColor("#14e1a7")

.atmosphereAltitude(0.12);



// Middle East focus

world.pointOfView(
{
    lat:35,
    lng:35,
    altitude:1.6
},
1000
);



// Rotation

world.controls().autoRotate = true;

world.controls().autoRotateSpeed = 0.18;

world.controls().enableZoom = false;

world.controls().enablePan = false;



// Country outlines

fetch(
"data/countries.geojson"
)

.then(response => response.json())

.then(countries => {


world
.polygonsData(countries.features)

.polygonCapColor(() => "rgba(0,0,0,0)")

.polygonSideColor(() => "rgba(20,225,167,0.15)")

.polygonStrokeColor(() => "#14e1a7")

.polygonAltitude(0.002);


});

// Capital nodes

fetch(
"data/capitals.json"
)

.then(response => response.json())

.then(capitals => {


world

.pointsData(capitals)

.pointLat("lat")

.pointLng("lng")

.pointColor(() => "#14e1a7")

.pointAltitude(0.005)

.pointRadius(0.35);



world

.ringsData(capitals)

.ringLat("lat")

.ringLng("lng")

.ringColor(() => "#14e1a7")

.ringMaxRadius(0.8)

.ringPropagationSpeed(0.8)

.ringRepeatPeriod(1800);


});

