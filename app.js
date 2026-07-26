const globeContainer = document.getElementById("globe");

const world = Globe()(globeContainer)

.backgroundColor("#000000")

.globeImageUrl(
"https://unpkg.com/three-globe/example/img/earth-dark.jpg"
)

.showAtmosphere(true)

.atmosphereColor("#14e1a7")

.atmosphereAltitude(0.12);



// BASIRA viewpoint
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



// Cinematic feel
world.controls().enableZoom = false;
world.controls().enablePan = false;




