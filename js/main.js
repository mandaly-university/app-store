// Initialize empty apps array
let apps = JSON.parse(localStorage.getItem('tobiAppStore')) || [];

// Save apps to local storage
function saveApps() {
    localStorage.setItem('tobiAppStore', JSON.stringify(apps));
}

// DOM Elements
const searchInput = document.querySelector('.search-input');
const searchButton = document.querySelector('.search-button');
const featuredGrid = document.querySelector('.featured-grid');
const allAppsGrid = document.querySelector('.all-apps-grid');
const uploadForm = document.querySelector('.upload-form');
const loadingIndicator = document.createElement('div');
loadingIndicator.className = 'loading';

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    loadApps();
    setupEventListeners();
    animateOnScroll();

    // Load app details if on app page
    if (window.location.pathname.includes('app.html')) {
        loadAppDetails();
    }
});

// Setup event listeners
function setupEventListeners() {
    if (searchInput && searchButton) {
        searchButton.addEventListener('click', handleSearch);
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleSearch();
        });
    }

    if (uploadForm) {
        uploadForm.addEventListener('submit', handleUpload);
    }

    // Add scroll animation
    window.addEventListener('scroll', animateOnScroll);
}

// Load apps with animation
function loadApps() {
    if (featuredGrid) {
        featuredGrid.innerHTML = '';
        const featuredApps = apps.slice(0, 3);
        featuredApps.forEach((app, index) => {
            const card = createAppCard(app);
            card.style.animationDelay = `${index * 0.2}s`;
            featuredGrid.appendChild(card);
        });
    }

    if (allAppsGrid) {
        allAppsGrid.innerHTML = '';
        apps.forEach((app, index) => {
            const card = createAppCard(app);
            card.style.animationDelay = `${index * 0.1}s`;
            allAppsGrid.appendChild(card);
        });
    }
}

// Create app card with enhanced styling
function createAppCard(app) {
    const card = document.createElement('div');
    card.className = 'app-card fade-in';
    card.innerHTML = `
        <img src="${app.icon}" alt="${app.name}" loading="lazy">
        <h3>${app.name}</h3>
        <p>${app.description}</p>
        <div class="app-meta">
            <span>⭐ ${app.rating}</span>
            <span>📥 ${app.downloads}</span>
            <span>📱 ${app.size}</span>
        </div>
        <a href="app.html?id=${app.id}" class="btn download-btn">View Details</a>
    `;
    return card;
}

// Handle search with animation
function handleSearch() {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredApps = apps.filter(app => 
        app.name.toLowerCase().includes(searchTerm) ||
        app.description.toLowerCase().includes(searchTerm)
    );

    if (allAppsGrid) {
        allAppsGrid.innerHTML = '';
        if (filteredApps.length === 0) {
            allAppsGrid.innerHTML = '<p class="no-results">No apps found</p>';
        } else {
            filteredApps.forEach((app, index) => {
                const card = createAppCard(app);
                card.style.animationDelay = `${index * 0.1}s`;
                allAppsGrid.appendChild(card);
            });
        }
    }
}

// Handle upload with loading animation
async function handleUpload(e) {
    e.preventDefault();
    
    const formData = new FormData(uploadForm);
    const newApp = {
        id: apps.length + 1,
        name: formData.get('name'),
        description: formData.get('description'),
        category: formData.get('category'),
        rating: parseFloat(formData.get('rating')),
        downloads: "0",
        size: formData.get('size'),
        version: formData.get('version'),
        icon: await convertToBase64(formData.get('icon')),
        screenshots: []
    };

    // Show loading animation
    uploadForm.appendChild(loadingIndicator);

    try {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Convert screenshots to base64
        const screenshotFiles = formData.getAll('screenshots');
        for (const file of screenshotFiles) {
            if (file.size > 0) {
                const base64 = await convertToBase64(file);
                newApp.screenshots.push(base64);
            }
        }

        // Add new app
        apps.push(newApp);
        saveApps();
        
        // Show success message
        showNotification('App uploaded successfully!', 'success');
        
        // Reset form
        uploadForm.reset();
    } catch (error) {
        showNotification('Error uploading app', 'error');
    } finally {
        loadingIndicator.remove();
    }
}

// Convert file to base64
function convertToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

// Show notification with animation
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type} slide-in`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Remove notification after animation
    setTimeout(() => {
        notification.classList.add('fade-out');
        setTimeout(() => notification.remove(), 500);
    }, 3000);
}

// Animate elements on scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.app-card, .app-header, .screenshot-gallery');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        
        if (elementTop < window.innerHeight && elementBottom > 0) {
            element.classList.add('fade-in');
        }
    });
}

// Load app details with animation
if (window.location.pathname.includes('app.html')) {
    const urlParams = new URLSearchParams(window.location.search);
    const appId = parseInt(urlParams.get('id'));
    const app = apps.find(a => a.id === appId);

    if (app) {
        document.querySelector('.app-icon').src = app.icon;
        document.querySelector('.app-info h1').textContent = app.name;
        document.querySelector('.app-info p').textContent = app.description;
        
        const metaContainer = document.querySelector('.app-meta');
        metaContainer.innerHTML = `
            <span>⭐ ${app.rating}</span>
            <span>📥 ${app.downloads}</span>
            <span>📱 ${app.size}</span>
            <span>📦 ${app.version}</span>
        `;

        const gallery = document.querySelector('.screenshot-gallery');
        app.screenshots.forEach((screenshot, index) => {
            const img = document.createElement('img');
            img.src = screenshot;
            img.alt = `${app.name} screenshot ${index + 1}`;
            img.style.animationDelay = `${index * 0.2}s`;
            gallery.appendChild(img);
        });
    }
} 
