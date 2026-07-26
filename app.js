const globeContainer = document.getElementById("globe");


const world = Globe()
(globeContainer)


// Background

.backgroundColor("#000000")


// Dark globe

.globeImageUrl(
"https://unpkg.com/three-globe/example/img/earth-dark.jpg"
)


// Atmosphere

.showAtmosphere(true)

.atmosphereColor("#14e1a7")

.atmosphereAltitude(0.15);



// Position

world.pointOfView(
{
    lat:25,
    lng:30,
    altitude:1.8
}
);



// Slow intelligence-style rotation

world.controls().autoRotate = true;

world.controls().autoRotateSpeed = 0.25;



// Disable zoom for cinematic view

world.controls().enableZoom = false;
