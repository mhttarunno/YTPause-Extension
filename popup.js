const status = document.getElementById("status");
const toggle = document.getElementById("toggle");

// Load current state from storage
chrome.storage.sync.get(["enabled"], (res) => {
    const enabled = res.enabled !== false;
    updateUI(enabled);
});

// Toggle button click
toggle.addEventListener("click", () => {
    chrome.storage.sync.get(["enabled"], (res) => {
        const newState = !(res.enabled !== false);
        chrome.storage.sync.set({ enabled: newState }, () => {
            updateUI(newState);
        });
    });
});

// Update the UI based on state
function updateUI(enabled) {
    status.textContent = enabled ? "Status: ON" : "Status: OFF";
    toggle.textContent = enabled ? "Disable" : "Enable";
    toggle.style.background = enabled ? "#ff0000" : "#555";
}
