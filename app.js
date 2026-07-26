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

// Load capitals and conflicts together

Promise.all([

    fetch("data/capitals.json").then(res => res.json()),

    fetch("data/conflicts.json").then(res => res.json())

])

.then(([capitals, conflicts]) => {


    // Add type identifiers

    capitals.forEach(city => {

        city.type = "capital";

    });


    conflicts.forEach(event => {

        event.type = "conflict";

    });



    const intelligencePoints = [

        ...capitals,

        ...conflicts

    ];



    // Points layer

    world

    .pointsData(intelligencePoints)

    .pointLat("lat")

    .pointLng("lng")

    .pointColor(point => {

        return point.type === "conflict"

        ? "#ff1744"

        : "#14e1a7";

    })

    .pointAltitude(0.005)

    .pointRadius(point => {

        return point.type === "conflict"

        ? 0.6

        : 0.35;

    });


// Premium conflict beacon pulses

world

.ringsData(conflicts)

.ringLat("lat")

.ringLng("lng")

.ringColor(() => "#ff1744")

.ringMaxRadius(3)

.ringPropagationSpeed(0.45)

.ringRepeatPeriod(1800)

.ringAltitude(0.015);



// Stronger beacon points

world

.pointsData(conflicts)

.pointLat("lat")

.pointLng("lng")

.pointColor(() => "#ff1744")

.pointAltitude(0.02)

.pointRadius(0.8);

    // Inner glow pulse

world

.ringsData(conflicts)

.ringLat("lat")

.ringLng("lng")

.ringColor(() => "rgba(255,23,68,0.6)")

.ringMaxRadius(1)

.ringPropagationSpeed(0.2)

.ringRepeatPeriod(900)

