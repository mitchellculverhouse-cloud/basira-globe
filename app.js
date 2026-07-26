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



    // Pulse rings for conflicts only

    world

    .ringsData(conflicts)

    .ringLat("lat")

    .ringLng("lng")

    .ringColor(() => "#ff1744")

    .ringMaxRadius(2)

    .ringPropagationSpeed(1)

    .ringRepeatPeriod(1200);



});
