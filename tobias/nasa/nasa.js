function nasarequested() {
    const baseUrl = 'https://api.nasa.gov/planetary/apod?api_key=';
    const apiKey = "OuM92MR4Cm0ZQ48XKhyEUJEiGCk1yu8zJlOYanfa";
    const mediaSection = document.querySelector("#media-section");

    const currentDate = new Date().toISOString().slice(0, 10);

    let dateQuery = "&date=" + currentDate + "&";



    async function fetchData() {
        try {
            const response = await fetch(baseUrl + apiKey + dateQuery);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const json = await response.json();
            console.log(json);
            displaydata(json);
        } catch (error) {
            console.error("Fetch error: ", error);
        }
    }

    function displaydata(data) {
        console.log("displaying data");
        if (mediaSection) {
            mediaSection.innerHTML = '';

            if (data.media_type === "video") {
                const videoDiv = document.createElement('div');
                videoDiv.className = 'video-div';
                const iframe = document.createElement('iframe');
                iframe.id = 'videoLink';
                iframe.src = data.url;
                videoDiv.appendChild(iframe);
                mediaSection.appendChild(videoDiv);
                adjustWeatherApiHeight();
                console.log("Video added");
            } else if (data.media_type === "image" && data.url) {
                const imageDiv = document.createElement('div');
                imageDiv.className = 'image-div';
                const img = document.createElement('img');
                img.id = 'image_of_the_day';
                img.src = data.url;
                img.alt = 'image-by-nasa';
                imageDiv.appendChild(img);
                mediaSection.appendChild(imageDiv);
                adjustWeatherApiHeight();
                console.log("Image added");
            } else {
                console.log("Unsupported media type or missing URL");
            }
        } else {
            console.error("mediaSection is not defined");
            nasarequested();
        }
    }
    fetchData();
}

nasarequested();

function adjustWeatherApiHeight() {
    var nasaApi = document.querySelector('.nasa-api');
    var weatherApi = document.querySelector('.weather-api');

    if (nasaApi && weatherApi) {
        var nasaApiHeight = nasaApi.offsetHeight;
        weatherApi.style.height = nasaApiHeight + 'px';
    }
}