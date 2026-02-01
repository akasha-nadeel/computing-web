/**
 * Faculty of Computing Resource Library - SUSL
 * Department Page JavaScript
 */

// Get department from URL or page title
let currentDepartment = window.currentDepartment || 'is'; // Default to window var or 'is'
let allResources = [];
let filteredResources = [];
let currentTypeFilter = 'all'; // Track current type filter

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', function () {
    detectDepartment();
    initNavigation();
    initThemeToggle();
    initScrollEffects();
    loadDepartmentResources();
    initFilters();
    initTypeTabs();
    loadStats();
});

// ===================================
// THEME TOGGLE
// ===================================
function initThemeToggle() {
    const toggleBtn = document.getElementById('themeToggle');
    if (!toggleBtn) return;

    // Check saved theme
    const savedTheme = localStorage.getItem('theme');

    // Apply saved theme
    if (savedTheme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
    }

    toggleBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        if (currentTheme === 'light') {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        }
    });
}

// ===================================
// DEPARTMENT DETECTION
// ===================================
function detectDepartment() {
    // Prioritize window.currentDepartment set in HTML
    if (window.currentDepartment) {
        currentDepartment = window.currentDepartment;
        console.log('Department set from window:', currentDepartment);
        return;
    }

    // Fallback: detect from URL path
    const path = window.location.pathname.toLowerCase();
    if (path.includes('information-systems')) {
        currentDepartment = 'is';
    } else if (path.includes('software-engineering')) {
        currentDepartment = 'se';
    } else if (path.includes('data-science')) {
        currentDepartment = 'ds';
    }
    console.log('Department detected from path:', currentDepartment);
}

// ===================================
// LOAD RESOURCES
// ===================================
function loadDepartmentResources() {
    const loadingState = document.getElementById('loadingState');
    const resourcesGrid = document.getElementById('resourcesGrid');

    // Show loading
    if (loadingState) loadingState.style.display = 'block';
    if (resourcesGrid) resourcesGrid.innerHTML = '';

    // Simulate loading delay for smooth UX
    setTimeout(function () {
        try {
            // Re-verify department to be absolutely safe
            if (window.currentDepartment) {
                currentDepartment = window.currentDepartment;
            }

            allResources = getResourcesByDepartment(currentDepartment);
            filteredResources = [...allResources];

            if (loadingState) loadingState.style.display = 'none';

            applyFiltersAndSort();
        } catch (error) {
            console.error('Error loading resources:', error);
            if (loadingState) loadingState.style.display = 'none';
            if (resourcesGrid) {
                resourcesGrid.innerHTML = `
                    <div style="grid-column: 1/-1; text-align: center; color: #ff6b6b; padding: 20px; background: rgba(255,0,0,0.1); border-radius: 8px;">
                        <h3>Error Loading Resources</h3>
                        <p>${error.message}</p>
                        <p>Please try refreshing the page.</p>
                    </div>
                `;
            }
        }
    }, 500);
}

// ===================================
// FILTERS
// ===================================
function initFilters() {
    const semesterFilter = document.getElementById('semesterFilter');
    const typeFilter = document.getElementById('typeFilter');
    const searchInput = document.getElementById('searchInput');
    const clearFiltersBtn = document.getElementById('clearFilters');
    const yearFilter = document.getElementById('yearFilter');

    let searchTimeout;

    if (semesterFilter) {
        semesterFilter.addEventListener('change', applyFiltersAndSort);
    }

    if (typeFilter) {
        typeFilter.addEventListener('change', function () {
            applyFiltersAndSort();
            syncTypeTabs(this.value);
        });
    }

    if (searchInput) {
        searchInput.addEventListener('input', function () {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(applyFiltersAndSort, 300);
        });
    }

    if (clearFiltersBtn) {
        clearFiltersBtn.addEventListener('click', clearAllFilters);
    }

    if (yearFilter) {
        yearFilter.addEventListener('change', applyFiltersAndSort);
    }
}

function applyFiltersAndSort() {
    const semesterFilter = document.getElementById('semesterFilter');
    const typeFilter = document.getElementById('typeFilter');
    const searchInput = document.getElementById('searchInput');
    const yearFilter = document.getElementById('yearFilter');

    // Start with all resources
    filteredResources = [...allResources];

    // Apply semester filter
    if (semesterFilter && semesterFilter.value !== 'all') {
        filteredResources = filteredResources.filter(r => {
            const course = courses[r.courseCode] || {};
            // Check course semester first
            if (course.semester) {
                return course.semester === semesterFilter.value;
            }
            // Fallback: Check resource properties (yearOfStudy and semester)
            if (r.yearOfStudy && r.semester) {
                const parts = semesterFilter.value.split('.');
                if (parts.length === 2) {
                    return r.yearOfStudy == parts[0] && r.semester == parts[1];
                }
            }
            return false;
        });
    }

    // Apply type filter - use currentTypeFilter variable
    if (currentTypeFilter !== 'all') {
        filteredResources = filteredResources.filter(r => r.type === currentTypeFilter);
    }

    // Apply search filter
    if (searchInput && searchInput.value.trim()) {
        const query = searchInput.value.toLowerCase();
        filteredResources = filteredResources.filter(r => {
            const course = courses[r.courseCode] || { name: '' };
            return (
                r.title.toLowerCase().includes(query) ||
                r.courseCode.toLowerCase().includes(query) ||
                (course.name && course.name.toLowerCase().includes(query))
            );
        });
    }

    // Apply year filter
    if (yearFilter && yearFilter.value !== 'all') {
        filteredResources = filteredResources.filter(r => {
            const resourceYear = (r.year || new Date(r.uploadDate).getFullYear()).toString();
            return resourceYear === yearFilter.value;
        });
    }

    displayResources();
}

function displayResources() {
    const resourcesGrid = document.getElementById('resourcesGrid');
    const emptyState = document.getElementById('emptyState');
    const resultCount = document.getElementById('resultCount');

    if (!resourcesGrid) return;

    // Update result count
    if (resultCount) {
        resultCount.textContent = filteredResources.length;
    }

    // Show empty state if no results
    if (filteredResources.length === 0) {
        resourcesGrid.innerHTML = '';
        if (emptyState) emptyState.style.display = 'block';
        return;
    }

    if (emptyState) emptyState.style.display = 'none';

    // Render resources
    resourcesGrid.innerHTML = filteredResources.map((resource, index) =>
        createResourceCard(resource, index)
    ).join('');

    // Animate cards
    const cards = resourcesGrid.querySelectorAll('.resource-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
            card.style.transition = 'all 0.4s ease-out';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';

            // Clear inline styles after animation to allow CSS hover effects
            setTimeout(() => {
                card.style.transform = '';
                card.style.transition = '';
            }, 450);
        }, index * 50);
    });
}

function createResourceCard(resource, index = 0) {
    const course = courses[resource.courseCode] || { name: 'Unknown Course', semester: '?.?' };
    const type = resourceTypes[resource.type] || { name: resource.type };

    // Extract year - use resource.year if exists, otherwise extract from uploadDate
    const resourceYear = resource.year || new Date(resource.uploadDate).getFullYear();

    // Safely handle semester display
    let semString = course.semester;
    if (!semString && resource.yearOfStudy && resource.semester) {
        semString = `${resource.yearOfStudy}.${resource.semester}`;
    }
    semString = semString || '?.?';

    const semParts = semString.split('.');
    const yearPart = semParts[0] || '?';
    const semPart = semParts[1] || '?';

    // SVG Icons for different resource types
    const icons = {
        notes: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>`,
        slides: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>`,
        papers: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="12" y1="18" x2="12" y2="12"></line><line x1="9" y1="15" x2="15" y2="15"></line></svg>`,
        labs: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 2v7.31"></path><path d="M14 2v7.31"></path><path d="M8.5 2h7"></path><path d="M14 9.3a6.5 6.5 0 1 1-4 0"></path></svg>`
    };

    return `
        <div class="resource-card">
            <div class="resource-header">
                <div class="resource-icon">
                    ${icons[resource.type] || icons.notes}
                </div>
                <div class="resource-meta-badge">
                    ${type.name}
                </div>
            </div>
            <div class="resource-body">
                <div class="resource-year">
                    ${resourceYear}
                </div>
                <h4 class="resource-title">${resource.title}</h4>
                <p class="resource-course">${resource.courseCode} - ${course.name}</p>
                <div class="resource-meta">
                    <span>
                        <span class="meta-highlight">Year ${yearPart}</span>
                        <span class="meta-separator">|</span>
                        <span>Semester ${semPart}</span>
                    </span>
                    <span>${resource.fileSize}</span>
                </div>
            </div>
            <div class="resource-footer" style="display: flex; gap: 10px; padding-top: 15px; border-top: 1px solid rgba(255,255,255,0.05);">
                <a href="${resource.url}" class="btn-view" style="flex: 1; display: flex; align-items: center; justify-content: center; gap: 6px; padding: 8px 12px; border-radius: 6px; background: rgba(255, 255, 255, 0.05); color: var(--text-white); text-decoration: none; font-size: 0.9rem; transition: all 0.2s; border: 1px solid rgba(255,255,255,0.1);" onmouseover="this.style.background='rgba(255, 255, 255, 0.1)'" onmouseout="this.style.background='rgba(255, 255, 255, 0.05)'">
                    View <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                </a>
                <a href="${resource.url}" class="btn-download" style="flex: 1; display: flex; align-items: center; justify-content: center; gap: 6px; padding: 8px 12px; border-radius: 6px; background: rgba(17, 17, 17, 0.5); color: var(--text-white); text-decoration: none; font-size: 0.9rem; transition: all 0.2s; border: 1px solid #000;" onmouseover="this.style.background='rgba(17, 17, 17, 0.7)'" onmouseout="this.style.background='rgba(17, 17, 17, 0.5)'" onclick="handleDownload(event, ${resource.id})">
                    Download <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                </a>
            </div>
        </div>
    `;
}

function clearAllFilters() {
    const semesterFilter = document.getElementById('semesterFilter');
    const typeFilter = document.getElementById('typeFilter');
    const searchInput = document.getElementById('searchInput');
    const yearFilter = document.getElementById('yearFilter');

    if (semesterFilter) semesterFilter.value = 'all';
    if (typeFilter) typeFilter.value = 'all';
    if (searchInput) searchInput.value = '';
    if (yearFilter) yearFilter.value = 'all';

    // Reset current type filter
    currentTypeFilter = 'all';

    // Reset type tabs
    document.querySelectorAll('.type-tab').forEach(tab => {
        tab.classList.remove('active');
        if (tab.dataset.type === 'all') {
            tab.classList.add('active');
        }
    });

    applyFiltersAndSort();
}

// ===================================
// TYPE TABS
// ===================================
function initTypeTabs() {
    const typeTabs = document.querySelectorAll('.type-tab');

    typeTabs.forEach(tab => {
        tab.addEventListener('click', function () {
            const type = this.dataset.type;

            // Update active state
            typeTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');

            // Set current type filter
            currentTypeFilter = type;

            // Update type filter dropdown if it exists
            const typeFilter = document.getElementById('typeFilter');
            if (typeFilter) {
                typeFilter.value = type;
            }

            applyFiltersAndSort();
        });
    });
}

function syncTypeTabs(type) {
    document.querySelectorAll('.type-tab').forEach(tab => {
        tab.classList.remove('active');
        if (tab.dataset.type === type) {
            tab.classList.add('active');
        }
    });
}

// ===================================
// STATISTICS
// ===================================
function loadStats() {
    const deptResources = getResourcesByDepartment(currentDepartment);

    // Update total count
    const totalResources = document.getElementById('totalResources');
    if (totalResources) {
        animateCounter('totalResources', deptResources.length);
    }

    // Count by type
    const typeCounts = {
        notes: 0,
        slides: 0,
        papers: 0,
        labs: 0,
        tutorials: 0
    };

    deptResources.forEach(r => {
        if (typeCounts.hasOwnProperty(r.type)) {
            typeCounts[r.type]++;
        }
    });

    // Update type counts
    animateCounter('notesCount', typeCounts.notes);
    animateCounter('slidesCount', typeCounts.slides);
    animateCounter('papersCount', typeCounts.papers);
    animateCounter('labsCount', typeCounts.labs);
}

function animateCounter(elementId, targetValue) {
    const element = document.getElementById(elementId);
    if (!element) return;

    const duration = 1500;
    const steps = 40;
    const stepValue = targetValue / steps;
    const stepDuration = duration / steps;
    let currentValue = 0;

    const timer = setInterval(function () {
        currentValue += stepValue;
        if (currentValue >= targetValue) {
            element.textContent = targetValue;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(currentValue);
        }
    }, stepDuration);
}

// ===================================
// DOWNLOAD MODAL LOGIC
// ===================================
let currentDownloadId = null;

function handleDownload(event, resourceId) {
    event.preventDefault();
    const resource = getResourceById(resourceId);

    if (resource) {
        currentDownloadId = resourceId;

        // Populate Modal
        const fileNameEl = document.getElementById('downloadFileName');
        if (fileNameEl) fileNameEl.textContent = resource.title;

        const course = courses[resource.courseCode] || { code: resource.courseCode, name: 'Unknown' };
        const detailsHtml = `
            <div class="file-summary-item">
                <span>File Name:</span>
                <span>${resource.fileName || resource.courseCode + '.pdf'}</span>
            </div>
            <div class="file-summary-item">
                <span>Size:</span>
                <span>${resource.fileSize}</span>
            </div>
            <div class="file-summary-item">
                <span>Course:</span>
                <span>${course.code} - ${course.name}</span>
            </div>
        `;
        const detailsEl = document.getElementById('downloadFileDetails');
        if (detailsEl) detailsEl.innerHTML = detailsHtml;

        // Show Modal
        const modal = document.getElementById('downloadModal');
        if (modal) modal.classList.add('active');
    }
}

function closeDownloadModal() {
    const modal = document.getElementById('downloadModal');
    if (modal) {
        modal.classList.remove('active');
    }
    currentDownloadId = null;
}

// Initialize Download Confirmation
document.addEventListener('DOMContentLoaded', function () {
    const confirmBtn = document.getElementById('confirmDownloadBtn');
    if (confirmBtn) {
        confirmBtn.addEventListener('click', function () {
            if (currentDownloadId) {
                const resource = getResourceById(currentDownloadId);
                if (resource) {
                    alert(`⬇️ Starting download...\n\nResource: ${resource.title}\nSize: ${resource.fileSize}`);
                }
                closeDownloadModal();
            }
        });
    }
});

// Make functions globally available
window.handleDownload = handleDownload;
window.closeDownloadModal = closeDownloadModal;

// ===================================
// NAVIGATION & SCROLL
// ===================================
function initNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const header = document.querySelector('.header');

    // Mobile menu toggle
    if (hamburger) {
        hamburger.addEventListener('click', function () {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Keyboard accessibility
        hamburger.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                hamburger.click();
            }
        });

        // Close menu when clicking a link
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function () {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function (e) {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }

    // Header scroll effect
    let lastScroll = 0;
    window.addEventListener('scroll', function () {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            if (header) header.classList.add('scrolled');
        } else {
            if (header) header.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });
}

function initScrollEffects() {
    const scrollTopBtn = document.getElementById('scrollTop');
    if (!scrollTopBtn) return; // Safety check

    window.addEventListener('scroll', function () {
        if (window.pageYOffset > 500) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });

    scrollTopBtn.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

