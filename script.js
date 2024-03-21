let map;

async function initMap() {
    const { Map } = await google.maps.importLibrary("maps");

    map = new Map(document.getElementById("map"), {
        center: { lat: 37.282391, lng: 127.043502 },
        zoom: 18,
    });
}

initMap();