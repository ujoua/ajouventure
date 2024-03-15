const map = document.getElementById("map");

const markers = document.getElementsByClassName("marker");

for (let marker of markers) {
    marker.addEventListener("click", () => {
        var viewportHeight = window.innerHeight;
        var viewportWidth = window.innerWidth;
        var modalHeight = document.getElementById('modal').offsetHeight;
        var modalWidth = document.getElementById('modal').offsetWidth;
        document.getElementById('modal').style.top = (viewportHeight - modalHeight) / 2 + 'px';
        document.getElementById('modal').style.left = (viewportWidth - modalWidth) / 2 + 'px';
        document.getElementById('modal-container').style.display = 'block';

        marker.previousElementSibling.style.visibility = "visible";

        localStorage.setItem(marker.id, "true");
    });
}
document.getElementById('modal-close').addEventListener("click", () => {
    document.getElementById('modal-container').style.display = 'none';
});
document.getElementById('modal-container').addEventListener('click', () => {
    document.getElementById('modal-container').style.display = 'none';
});

const geoFindMe = () => {
    const success = (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        console.log(latitude, longitude);

        const me = document.getElementById("me");
        me.setAttribute("cy", 160 + (37.281260 - latitude) / ((37.284874 - 37.281260) / 90));
        me.setAttribute("cx", 85 + (longitude - 127.043600) / ((127.046936 - 127.043600) / 70));

        for (var i = 0; i < markers.length; ++i) {
            var marker = markers[i];
            var distance = Math.sqrt((marker.getAttribute("x") - me.getAttribute("cx")) * (marker.getAttribute("x") - me.getAttribute("cx")) + (marker.getAttribute("y") - me.getAttribute("cy")) * (marker.getAttribute("y") - me.getAttribute("cy")));

            if (distance < 100) {
                marker.style.visibility = "visible";
                if (localStorage.getItem(marker.id) == "true") {
                    marker.previousElementSibling.style.visibility = "visible";
                }
            }
        }
    }

    const error = () => {
        alert("Unable to retrieve your location");
    }

    const options = {
        enableHighAccuracy: true,
        timeout: 3000,
        maximumAge: 0,
    };

    if (!navigator.geolocation) {
        alert("Geolocation is not supported by your browser");
    } else {
        const watchID = navigator.geolocation.watchPosition(success, error, options);
    }
}

document.querySelector("#find-me").addEventListener("click", geoFindMe);
