const globeContainer = document.getElementById("globe");


const world = Globe()(globeContainer)


.backgroundColor("#000000")


.globeImageUrl(
"https://unpkg.com/three-globe/example/img/earth-dark.jpg"
)



.showAtmosphere(true)

.atmosphereColor("#14e1a7")

.atmosphereAltitude(0.12);



// Middle East focus

world.pointOfView(
{
    lat:35,
    lng:35,
    altitude:1.4
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
