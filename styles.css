// Function to load JSON data
async function loadAppData() {
    try {
        const response = await fetch('data.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error loading app data:', error);
        return null;
    }
}

// Function to create app cards
function createAppCard(app) {
    return `
        <div class="app-card">
            <div class="app-card-content">
                <img src="${app.icon}" alt="${app.name}">
                <div class="app-info-block">
                    <h3>${app.name}</h3>
                    <div class="developer">${app.developer}</div>
                    <div class="rating-row">
                        <span class="rating"><i class="fas fa-star"></i> ${app.rating}</span>
                    </div>
                </div>
            </div>
            <div class="download-options">
                <a href="${app.downloadUrl ? app.downloadUrl : '#'}" class="download-btn" download>
                    <i class="fas fa-download"></i>
                    Download
                </a>
                ${app.previewUrl ? `<a href="${app.previewUrl}" class="preview-btn" target="_blank"><i class="fas fa-eye"></i> Preview</a>` : ''}
            </div>
        </div>
    `;
}

// Function to create category cards
function createCategoryCard(category) {
    return `
        <div class="category-card">
            <i class="fas ${category.icon}"></i>
            <h3>${category.name}</h3>
            <p>${category.appCount} apps</p>
        </div>
    `;
}

// Function to create top chart items
function createTopChartItem(app, index) {
    return `
        <div class="app-item">
            <div class="app-item-content">
                <span class="rank">${index + 1}</span>
                <img src="${app.icon}" alt="${app.name}">
                <div class="app-info-block">
                    <h3>${app.name}</h3>
                    <div class="developer">${app.developer}</div>
                    <div class="rating-row">
                        <span class="rating"><i class="fas fa-star"></i> ${app.rating}</span>
                    </div>
                </div>
            </div>
            <div class="download-options">
                <a href="${app.downloadUrl ? app.downloadUrl : '#'}" class="download-btn" download>
                    <i class="fas fa-download"></i>
                    Download
                </a>
                ${app.previewUrl ? `<a href="${app.previewUrl}" class="preview-btn" target="_blank"><i class="fas fa-eye"></i> Preview</a>` : ''}
            </div>
        </div>
    `;
}

// Function to populate the page with data
async function populatePage() {
    const data = await loadAppData();
    if (!data) return;

    // Populate Featured Apps
    const featuredAppsContainer = document.querySelector('.featured-apps .app-grid');
    featuredAppsContainer.innerHTML = data.featuredApps.map(createAppCard).join('');

    // Populate Categories
    const categoriesContainer = document.querySelector('.categories .category-grid');
    categoriesContainer.innerHTML = data.categories.map(createCategoryCard).join('');

    // Populate Top Charts
    const topChartsContainer = document.querySelector('.top-charts .app-list');
    topChartsContainer.innerHTML = data.topCharts.map((app, index) => createTopChartItem(app, index)).join('');
}

// Initialize the page when DOM is loaded
document.addEventListener('DOMContentLoaded', populatePage);

// Search functionality
const searchInput = document.querySelector('.search-bar input');
searchInput.addEventListener('input', async (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const data = await loadAppData();
    if (!data) return;

    // Search in featured apps
    const filteredApps = data.featuredApps.filter(app => 
        app.name.toLowerCase().includes(searchTerm) || 
        app.developer.toLowerCase().includes(searchTerm) ||
        app.category.toLowerCase().includes(searchTerm)
    );

    const featuredAppsContainer = document.querySelector('.featured-apps .app-grid');
    featuredAppsContainer.innerHTML = filteredApps.map(createAppCard).join('');
});

// Theme Toggle Functionality
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle.querySelector('i');

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
}

// Theme toggle click handler
themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

// Update theme icon
function updateThemeIcon(theme) {
    themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
} 
