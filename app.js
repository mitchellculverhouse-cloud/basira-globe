const globeContainer = document.getElementById("globe");


const world = Globe()(globeContainer)

.backgroundColor("#000000")

.globeImageUrl(
"https://unpkg.com/three-globe/example/img/earth-dark.jpg"
)

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



// Country borders

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




// Capitals

fetch("data/capitals.json")

.then(response => response.json())

.then(capitals => {


    world

    .htmlElementsData(capitals)

    .htmlLat("lat")

    .htmlLng("lng")

    .htmlElement(() => {


        const node = document.createElement("div");


        node.style.width = "8px";

        node.style.height = "8px";

        node.style.borderRadius = "50%";

        node.style.background = "#14e1a7";

        node.style.boxShadow =
        "0 0 12px #14e1a7, 0 0 25px rgba(20,225,167,0.5)";


        return node;


    });


});




// Conflict beacons

fetch("data/conflicts.json")

.then(response => response.json())

.then(conflicts => {


    // Red beacon centres

    world

    .htmlElementsData(conflicts)

    .htmlLat("lat")

    .htmlLng("lng")

    .htmlElement(() => {


        const marker = document.createElement("div");


        marker.style.width = "14px";

        marker.style.height = "14px";

        marker.style.background = "#ff1744";

        marker.style.borderRadius = "50%";

        marker.style.boxShadow =
        "0 0 20px #ff1744";


        return marker;


    });



    // Pulse rings

    world

    .ringsData(conflicts)

    .ringLat("lat")

    .ringLng("lng")

    .ringColor(() => "#ff1744")

    .ringMaxRadius(2.5)

    .ringPropagationSpeed(0.6)

    .ringRepeatPeriod(1500);


});
