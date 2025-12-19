let wasPlaying = false;
let enabled = true;

chrome.storage.sync.get(["enabled"], (res) => {
    if (res.enabled !== undefined) enabled = res.enabled;
});

chrome.storage.onChanged.addListener((changes) => {
    if (changes.enabled) enabled = changes.enabled.newValue;
});

document.addEventListener("visibilitychange", () => {
    if (!enabled) return;

    const video = document.querySelector("video");
    if (!video) return;

    if (document.hidden) {
        if (!video.paused) {
            wasPlaying = true;
            video.pause();
        }
    } else {
        if (wasPlaying) {
            video.play();
            wasPlaying = false;
        }
    }
});
