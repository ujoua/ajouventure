let map;

async function initMap() {
    const myLatLng = { lat: 37.282391, lng: 127.043502 };

    const { Map } = await google.maps.importLibrary("maps");
    map = new Map(document.getElementById("map"), {
        center: myLatLng,
        zoom: 18,
    });

    new google.maps.Marker({
        map,
        position: myLatLng,
        title: "Hello World!",
        icon: {
            url: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
            scaledSize: new google.maps.Size(38, 31),
        },
    });
}

initMap();