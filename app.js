const globeContainer = document.getElementById("globe");


const world = Globe()(globeContainer)

.backgroundColor("#000000")

// Remove Earth texture
.globeImageUrl(null)

.showAtmosphere(true)

.atmosphereColor("#14e1a7")

.atmosphereAltitude(0.12);



// Camera position - Middle East focus

world.pointOfView(
{
    lat:35,
    lng:35,
    altitude:1.4
},
1000
);



// Slow rotation

world.controls().autoRotate = true;

world.controls().autoRotateSpeed = 0.18;

world.controls().enableZoom = false;

world.controls().enablePan = false;




// COUNTRY OUTLINES

fetch("data/countries.geojson")

.then(response => response.json())

.then(countries => {


    world

    .polygonsData(countries.features)

    .polygonCapColor(() => "rgba(0,0,0,0)")

    .polygonSideColor(() => "rgba(20,225,167,0.15)")

    .polygonStrokeColor(() => "#14e1a7")

    .polygonAltitude(0.002);


});





// CAPITAL NODES

fetch("data/capitals.json")

.then(response => response.json())

.then(capitals => {


    world

    .pointsData(capitals)

    .pointLat("lat")

    .pointLng("lng")

    .pointColor(() => "#14e1a7")

    .pointAltitude(0)

    .pointRadius(0.25);



    // Capital glow pulses

    world

    .ringsData(capitals)

    .ringLat("lat")

    .ringLng("lng")

    .ringColor(() => "rgba(20,225,167,0.8)")

    .ringMaxRadius(0.7)

    .ringPropagationSpeed(0.4)

    .ringRepeatPeriod(2000);


});





// CONFLICT BEACONS

fetch("data/conflicts.json")

.then(response => response.json())

.then(conflicts => {


   // Conflict cores

world

.pointsData(conflicts)

.pointLat("lat")

.pointLng("lng")

.pointColor(() => "#ff1744")

.pointAltitude(0)

.pointRadius(0.45);



// Conflict pulse rings

world

.ringsData(conflicts)

.ringLat("lat")

.ringLng("lng")

.ringColor(() => "rgba(255,23,68,0.8)")

.ringMaxRadius(3)

.ringPropagationSpeed(0.5)

.ringRepeatPeriod(1600);
