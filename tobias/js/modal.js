document.addEventListener('DOMContentLoaded', () => {
    const modal = document.querySelector("[data-modal]");

    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        let isDragging = false;
        let startX, startY;

        card.addEventListener('mousedown', (e) => {
            isDragging = false;
            startX = e.pageX;
            startY = e.pageY;
        });

        card.addEventListener('mousemove', (e) => {
            if (Math.abs(e.pageX - startX) > 5 || Math.abs(e.pageY - startY) > 5) {
                isDragging = true;
            }
        });

        card.addEventListener('mouseup', () => {
            if (!isDragging && modal) {
                const htmlFile = card.getAttribute('html-content-file');
                const modalTitle = card.getAttribute('title');
                updateModalContent(htmlFile, modalTitle);
                modal.showModal();
            }
        });
    });

    async function updateModalContent(htmlFile, title) {
        try {
            const response = await fetch(htmlFile);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const content = await response.text();
            const scrollContent = modal.querySelector(".modal-scroll-content");
            const modalTitle = modal.querySelector(".modal-title");
            modalTitle.innerHTML = title;

            scrollContent.innerHTML = content;
            closeButton = modal.querySelector("[data-close-modal]");
            if (closeButton) {
                closeButton.addEventListener("click", () => {
                    modal.close();
                    observer.observe(document.body, config);
                });
            } else {
                console.log('Close button not found');
            }
        } catch (error) {
            console.error("Could not load the content file: ", error);
            modalContent.innerHTML = '<p>Failed to load content.</p>';
        }
    }
});

document.addEventListener('DOMContentLoaded', function () {
    window.addEventListener('resize', adjustWeatherApiHeight);
});

document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
        const modal = document.querySelector("[data-modal]");
        if (modal && modal.hasAttribute('open')) {
            observer.observe(document.body, config);
        }
    }
});



function adjustWeatherApiHeight() {
    var nasaApi = document.querySelector('.nasa-api');
    var weatherApi = document.querySelector('.weather-api');

    if (nasaApi && weatherApi) {
        var nasaApiHeight = nasaApi.offsetHeight;
        weatherApi.style.height = nasaApiHeight + 'px';
    }
}


// Function to be called when #mediaSection appears
function onMediaSectionAppear() {
    console.log("Media section appeared");
    nasarequested();
    adjustWeatherApiHeight();
    setTimeout(adjustWeatherApiHeight, 2000);
}

// Create a MutationObserver instance
const observer = new MutationObserver((mutationsList, observer) => {
    for (const mutation of mutationsList) {
        if (mutation.type === 'childList') {
            const mediaSection = document.querySelector('#media-section');
            if (mediaSection) {
                onMediaSectionAppear();
                observer.disconnect();
            }
        }
    }
});

// Configuration for the observer (specifically looking for added nodes)
const config = { childList: true, subtree: true };

// Start observing the body for changes in the child list
observer.observe(document.body, config);

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