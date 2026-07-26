console.log(landZones);

window.terrainZones = terrainZones;


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

    .polygonCapColor(() => "rgba(12,25,22,0.95)")

    .polygonSideColor(() => "rgba(20,225,167,0.15)")

    .polygonStrokeColor(() => "#14e1a7")

    .polygonAltitude(0.002);


});



// LOAD CAPITALS AND CONFLICTS TOGETHER

Promise.all([

    fetch("data/capitals.json").then(r => r.json()),

    fetch("data/conflicts.json").then(r => r.json())

])


.then(([capitals, conflicts]) => {


// CAPITAL DOTS

world

.pointsData(capitals)

.pointLat("lat")

.pointLng("lng")

.pointColor(() => "#14e1a7")

.pointAltitude(0)

.pointRadius(0.25);




    // CONFLICT BEACON CORES

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







    // COMBINED RINGS

    const intelligenceRings = [

        ...capitals.map(city => ({

            ...city,

            type:"capital"

        })),



        ...conflicts.map(zone => ({

            ...zone,

            type:"conflict"

        }))


    ];





    world

    .ringsData(intelligenceRings)

    .ringLat("lat")

    .ringLng("lng")

    .ringColor(d => {


        if(d.type === "conflict"){

            return "#ff1744";

        }


        return "rgba(20,225,167,0.8)";


    })


    .ringMaxRadius(d => {


        if(d.type === "conflict"){

            return 3;

        }


        return 0.7;


    })


    .ringPropagationSpeed(d => {


        if(d.type === "conflict"){

            return 0.5;

        }


        return 0.4;


    })


    .ringRepeatPeriod(d => {


        if(d.type === "conflict"){

            return 1600;

        }


        return 2000;


    });



});
// INTELLIGENCE + SHIPPING ROUTES

Promise.all([

    fetch("data/arcs.json").then(response => response.json()),

    fetch("data/routes.json").then(response => response.json())

])


.then(([intelligenceArcs, shippingRoutes]) => {


    const allRoutes = [

        ...intelligenceArcs.map(route => ({

            ...route,

            type:"intelligence"

        })),


        ...shippingRoutes.map(route => ({

            ...route,

            type:"shipping"

        }))

    ];



    world

    .arcsData(allRoutes)

    .arcStartLat("startLat")

    .arcStartLng("startLng")

    .arcEndLat("endLat")

    .arcEndLng("endLng")


    .arcColor(d => {

        if(d.type === "shipping"){

            return "#d4af37";

        }

        return "#14e1a7";

    })


    .arcAltitude(d => {

        if(d.type === "shipping"){

            return 0.08;

        }

        return 0.15;

    })


    .arcStroke(d => {

        if(d.type === "shipping"){

            return 0.8;

        }

        return 0.6;

    })


    .arcDashLength(d => {

        if(d.type === "shipping"){

            return 0.12;

        }

        return 0.4;

    })


    .arcDashGap(d => {

        if(d.type === "shipping"){

            return 0.5;

        }

        return 1;

    })


    .arcDashAnimateTime(d => {

        if(d.type === "shipping"){

            return 5000;

        }

        return 2500;

    });


});


