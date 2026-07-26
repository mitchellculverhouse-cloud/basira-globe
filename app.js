const globeContainer = document.getElementById("globe");


const world = Globe()(globeContainer)

.backgroundColor("#000000")

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


    // Red conflict cores using HTML overlay

    world

    .htmlElementsData(conflicts)

    .htmlLat("lat")

    .htmlLng("lng")

    .htmlElement(() => {


        const beacon = document.createElement("div");


        beacon.style.width = "8px";

        beacon.style.height = "8px";

        beacon.style.borderRadius = "50%";

        beacon.style.background = "#ff1744";

        beacon.style.boxShadow =
        "0 0 15px #ff1744, 0 0 35px #ff1744";


        return beacon;


    });



    // Pulsing rings

    world

    .ringsData(conflicts)

    .ringLat("lat")

    .ringLng("lng")

    .ringColor(() => "#ff1744")

    .ringMaxRadius(3)

    .ringPropagationSpeed(0.5)

    .ringRepeatPeriod(1600);


});

// TERRAIN OVERLAY TEST

const terrainTexture = new THREE.TextureLoader().load(
"assets/terrain/terrain-dark.jpg"
);


const terrainMaterial = new THREE.MeshBasicMaterial({

    map: terrainTexture,

    transparent: true,

    opacity: 0.25

});


const terrainGeometry = new THREE.SphereGeometry(
100.8,
64,
64
);


const terrainSphere = new THREE.Mesh(
terrainGeometry,
terrainMaterial
);


world.scene().add(terrainSphere);
