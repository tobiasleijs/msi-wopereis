const track = document.getElementById("image-track");

function isModalVisible() {
    const modal = document.querySelector("[data-modal]");
    return modal && modal.hasAttribute('open');
}

window.onmousedown = e => {
    if (isModalVisible()) return;
    track.dataset.mouseDownAt = e.clientX;
}

window.onmousemove = e => {
    if (isModalVisible()) return;
    if (track.dataset.mouseDownAt === "0") return;
    const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
        maxDelta = window.innerWidth / 2;
    const percentage = (mouseDelta / maxDelta) * -100,
        nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage,
        nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);

    track.dataset.percentage = nextPercentage;

    track.animate({
        transform: `translate(${nextPercentage}%, -50%)`
    }, { duration: 1200, fill: "forwards" });

    for (const image of track.getElementsByClassName("image")) {
        image.animate({ objectPosition: `${100 + nextPercentage}% center` }, { duration: 1200, fill: "forwards" });
    }
    for (const image of track.getElementsByClassName("cardimage")) {
        image.animate({ objectPosition: `${100 + nextPercentage}% center` }, { duration: 1200, fill: "forwards" });
    }
}

window.onmouseup = () => {
    track.dataset.mouseDownAt = 0;
    track.dataset.prevPercentage = track.dataset.percentage;
}

window.onwheel = e => {
    if (isModalVisible()) return;
    const scrollDelta = e.deltaY,
        maxDelta = window.innerHeight;
    const percentage = (scrollDelta / maxDelta) * -100,
        nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage,
        nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);

    track.dataset.percentage = nextPercentage;

    track.animate({
        transform: `translate(${nextPercentage}%, -50%)`
    }, { duration: 1200, fill: "forwards" });

    for (const image of track.getElementsByClassName("image")) {
        image.animate({ objectPosition: `${100 + nextPercentage}% center` }, { duration: 1200, fill: "forwards" });
    }
    for (const image of track.getElementsByClassName("cardimage")) {
        image.animate({ objectPosition: `${100 + nextPercentage}% center` }, { duration: 1200, fill: "forwards" });
    }

    track.dataset.prevPercentage = nextPercentage;
}