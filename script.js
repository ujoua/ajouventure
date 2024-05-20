function geoFindMe() {
    function success(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        console.log(latitude, longitude);
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

let db;
const dbRequest = indexedDB.open("MyTestDatabase");
dbRequest.addEventListener("success", (event) => {
    db = event.target.result;
    const transaction = db.transaction(["landmark"], "readwrite");
    const landmarks = transaction.objectStore("landmark");
    landmarks.add({ latitude: 37.0001, longitude: 127.0001, name: "어딘가" });
});
dbRequest.addEventListener("upgradeneeded", (event) => {
    db = event.target.result;
    db.createObjectStore("landmark", { keyPath: "id", autoIncrement: true });
});