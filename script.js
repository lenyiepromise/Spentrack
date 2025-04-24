// Function to load content dynamically
function loadPage(page) {
    const container = document.querySelector('.container');
    fetch(page)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then((html) => {
            container.innerHTML = html;
        })
        .catch((error) => {
            console.error('Error loading page:', error);
            container.innerHTML = '<p>Failed to load content. Please try again later.</p>';
        });
}

// Event listener for navigation links
document.addEventListener('click', (event) => {
    if (event.target.tagName === 'A' && event.target.dataset.page) {
        event.preventDefault();
        const page = event.target.dataset.page;
        loadPage(page);
    }
});

// Preload pages for offline use
const pages = ['signup.html', 'signin.html', 'index.html'];
pages.forEach((page) => {
    fetch(page).catch((error) => console.error(`Failed to preload ${page}:`, error));
});

// Register the service worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('./service-worker.js')
        .then(() => console.log('Service Worker registered successfully.'))
        .catch((error) => console.error('Service Worker registration failed:', error));
}