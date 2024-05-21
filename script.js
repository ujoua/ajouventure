let db;
const dbRequest = indexedDB.open("ajouventure");
dbRequest.addEventListener("success", (event) => {
    db = event.target.result;
    const transaction = db.transaction(["mark"], "readwrite");
    const mark = transaction.objectStore("mark");
    mark.add({ lat: 37.000000, long: 127.000000, name: "어딘가0" });
    mark.add({ lat: 37.000001, long: 127.000001, name: "어딘가1" });
    mark.add({ lat: 37.000002, long: 127.000002, name: "어딘가2" });
});
dbRequest.addEventListener("upgradeneeded", (event) => {
    db = event.target.result;
    db.createObjectStore("mark", { keyPath: ['lat', 'long'] });
});


function getNeighborhood(lat, long) {
    const transaction = db.transaction(["mark"]);
    const mark = transaction.objectStore("mark");

    const lat_range = IDBKeyRange.bound(lat - 5.0001, lat + 5.0001);
    const lat_key_cursor = mark.openCursor(lat_range);
    lat_key_cursor.onsuccess = (event) => {
        const cursor = event.target.result;
        if (cursor) {
            const windowList = document.getElementsByClassName("window")[0];
            const listItem = document.createElement("li");
            listItem.textContent = `${cursor.value.name}, ${cursor.value.long}`;
            windowList.appendChild(listItem);

            console.log(cursor.value);
            cursor.continue();
        }
    }
}


function geoFindMe() {
    function success(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        console.log(latitude, longitude);

        getNeighborhood(latitude, longitude);
    }

    function error() {
        console.log("Unable to retrieve your location");
    }

    const options = {
        enableHighAccuracy: true,
        maximumAge: 30000,
        timeout: 27000,
    };

    if (!navigator.geolocation) {
        console.log("Geolocation is not supported by your browser");
    } else {
        console.log("Locating…");
        navigator.geolocation.watchPosition(success, error, options);
    }
}

window.onload = geoFindMe;