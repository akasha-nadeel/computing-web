/**
 * Faculty of Computing Resource Library - SUSL
 * Main JavaScript - Home Page Functionality
 */

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', function () {
    initNavigation();

    initScrollEffects();
    loadStats();
    loadLatestResources();
    initHeroSearch();
    initDepartmentCounts();
    initScrollSpy();
    initContactForm();

    // Handle initial hash navigation (fix for back button)
    if (window.location.hash) {
        setTimeout(function () {
            const element = document.querySelector(window.location.hash);
            if (element) {
                const headerOffset = 80;
                const elementPosition = element.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        }, 100);
    }
});



// ===================================
// NAVIGATION
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
    // Header variable already declared at start of function
    let lastScroll = 0;

    window.addEventListener('scroll', function () {
        const currentScroll = window.pageYOffset;
        // Activate background immediately after start scrolling
        const threshold = 50;

        if (currentScroll > threshold) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    // Active State Handler
    const navLinks = document.querySelectorAll('.nav-link');

    // Set active class on click - only for same-page navigation (anchors)
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            // Only handle internal anchor links (same page navigation)
            if (href && href.startsWith('#')) {
                e.preventDefault();

                // Active state
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');

                // Smooth scroll with offset
                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId);

                if (targetSection) {
                    // Close mobile menu if open
                    const navMenu = document.getElementById('navMenu');
                    const navToggle = document.getElementById('navToggle');
                    if (navMenu && navMenu.classList.contains('open')) {
                        navMenu.classList.remove('open');
                        // Reset hamburger
                        if (navToggle) {
                            const spans = navToggle.querySelectorAll('span');
                            spans[0].style.transform = '';
                            spans[1].style.opacity = '';
                            spans[2].style.transform = '';
                        }
                    }

                    // Calculate accurate offset position
                    const headerHeight = 80;
                    const offset = 10; // Minimal space between header and section

                    // Get absolute position relative to document
                    const bodyRect = document.body.getBoundingClientRect().top;
                    const elementRect = targetSection.getBoundingClientRect().top;
                    const elementPosition = elementRect - bodyRect;
                    const offsetPosition = elementPosition - headerHeight - offset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth"
                    });
                }
            }
            // For external links (like upload.html), let browser handle navigation normally
        });
    });
}

// ===================================
// SCROLL SPY
// ===================================
function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    // Throttle scroll event for performance
    let lastKnownScrollPosition = 0;
    let ticking = false;

    window.addEventListener('scroll', function () {
        lastKnownScrollPosition = window.scrollY;

        if (!ticking) {
            window.requestAnimationFrame(function () {
                doScrollSpy(lastKnownScrollPosition);
                ticking = false;
            });

            ticking = true;
        }
    });

    function doScrollSpy(scrollPos) {
        let current = '';

        // Find the current section
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            // 120px offset to trigger active state slightly before section hits top
            if (scrollPos >= (sectionTop - 120)) {
                current = section.getAttribute('id');
            }
        });

        // Update nav links
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');

            // Only toggle internal links
            if (href && href.startsWith('#') && href.includes(current)) {
                link.classList.add('active');
            } else if (current === '' && href === '#home') {
                // Default to home if no section active
                link.classList.add('active');
            }
        });
    }
}

// ===================================
// SCROLL EFFECTS
// ===================================
function initScrollEffects() {
    const scrollTopBtn = document.getElementById('scrollTop');

    if (scrollTopBtn) {
        // Show/hide scroll to top button
        window.addEventListener('scroll', function () {
            if (window.pageYOffset > 500) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        });

        // Scroll to top functionality
        scrollTopBtn.addEventListener('click', function () {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe animated elements
    document.querySelectorAll('.animate-fade-in-up, .animate-scale-in').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        observer.observe(el);
    });
}

// ===================================
// STATISTICS
// ===================================
// ===================================
// STATISTICS
// ===================================
// ===================================
// STATISTICS
// ===================================
function loadStats() {
    if (typeof getResourceStats === 'undefined') {
        console.error("getResourceStats is undefined");
        return;
    }

    const stats = getResourceStats();

    // Log stats for debugging
    console.log("Resource Stats:", stats);

    const updateStat = (id, value) => {
        const el = document.getElementById(id);
        if (el) {
            // Set final value first as fallback
            el.textContent = value;
            // Then animate
            animateCounter(id, value);
        }
    };

    updateStat('statTotal', stats.totalResources);
    updateStat('statNotes', stats.notes);
    updateStat('statSlides', stats.slides);
    updateStat('statPapers', stats.papers);
    updateStat('statLabs', stats.labs);
}

function animateCounter(elementId, targetValue) {
    const element = document.getElementById(elementId);
    if (!element) return;

    const target = parseInt(targetValue) || 0;
    if (target === 0) {
        element.textContent = "0";
        return;
    }

    const duration = 2000;
    const steps = 60;
    const stepValue = target / steps;
    const stepDuration = duration / steps;
    let currentValue = 0;

    element.textContent = "0"; // Start at 0

    const timer = setInterval(function () {
        currentValue += stepValue;
        if (currentValue >= target) {
            element.textContent = target.toLocaleString();
            clearInterval(timer);
        } else {
            element.textContent = Math.ceil(currentValue).toLocaleString();
        }
    }, stepDuration);
}

// ===================================
// DEPARTMENT RESOURCE COUNTS
// ===================================
function initDepartmentCounts() {
    const isCount = getResourcesByDepartment('is').length;
    const seCount = getResourcesByDepartment('se').length;
    const dsCount = getResourcesByDepartment('ds').length;

    document.getElementById('isResourceCount').textContent = isCount;
    document.getElementById('seResourceCount').textContent = seCount;
    document.getElementById('dsResourceCount').textContent = dsCount;
}

// ===================================
// LATEST RESOURCES
// ===================================
function loadLatestResources() {
    const latestResources = getLatestResources(6);
    const grid = document.getElementById('latestResourcesGrid');

    if (!grid) return;

    grid.innerHTML = latestResources.map((resource, index) =>
        createResourceCard(resource, index)
    ).join('');
}

function createResourceCard(resource, index = 0) {
    const course = courses[resource.courseCode] || { name: 'Unknown Course', semester: 'N/A' };
    const type = resourceTypes[resource.type] || { icon: '📄', name: resource.type };
    const delay = (index % 6) * 0.1;

    return `
        <div class="resource-card animate-fade-in-up" style="animation-delay: ${delay}s;">
            <div class="resource-card-header">
                <div class="resource-type-icon ${resource.type}">
                    ${type.icon}
                </div>
                <div class="resource-card-info">
                    <h4>${resource.title}</h4>
                    <p class="resource-card-course">${resource.courseCode} - ${course.name}</p>
                </div>
            </div>
            <div class="resource-card-body">
                <div class="resource-card-meta">
                    <span class="badge badge-${resource.type}">${type.name}</span>
                    <span class="badge badge-primary">Semester ${course.semester}</span>
                </div>
            </div>
            <div class="resource-card-footer">
                <span class="resource-card-date">📅 ${formatDate(resource.uploadDate)}</span>
                <div class="card-actions">
                    <button class="btn-card-action btn-view" onclick="handleView(event, '${resource.id}')">
                        👁️
                    </button>
                    <button class="btn-card-action btn-download" onclick="handleDownload(event, '${resource.id}')">
                        ⬇️
                    </button>
                </div>
            </div>
        </div>
    `;
}

// ===================================
// VIEW PREVIEW MODAL LOGIC
// ===================================
let currentViewId = null;

function handleView(event, id) {
    event.preventDefault();
    event.stopPropagation();

    // Find resource safely
    let resource;
    if (typeof getAllResources === 'function') {
        resource = getAllResources().find(r => r.id == id);
    } else {
        resource = resources.find(r => r.id == id);
    }

    if (resource) {
        currentViewId = id;

        // Populate Modal
        const titleEl = document.getElementById('viewModalTitle');
        if (titleEl) titleEl.textContent = `Preview: ${resource.title}`;

        const filenameEl = document.getElementById('viewModalFilename');
        if (filenameEl) {
            filenameEl.textContent = resource.fileName || `${resource.courseCode || 'DOC'}_${resource.type}.pdf`;
        }

        // Show Modal
        const modal = document.getElementById('viewModal');
        if (modal) modal.classList.add('active');
    }
}

function closeViewModal() {
    const modal = document.getElementById('viewModal');
    if (modal) {
        modal.classList.remove('active');
    }
    currentViewId = null;
}

// Initialize View Modal Download Button
document.addEventListener('DOMContentLoaded', function () {
    const viewDownloadBtn = document.getElementById('viewModalDownloadBtn');
    if (viewDownloadBtn) {
        viewDownloadBtn.addEventListener('click', function () {
            if (currentViewId) {
                closeViewModal();
                // Trigger download flow
                // We access the global handleDownload if available
                if (window.handleDownload) {
                    window.handleDownload(new Event('click'), currentViewId);
                } else {
                    handleDownload(new Event('click'), currentViewId);
                }
            }
        });
    }
});

// ===================================
// DOWNLOAD MODAL LOGIC
// ===================================
let currentDownloadId = null;

function handleDownload(event, id) {
    event.preventDefault();
    event.stopPropagation();

    // Find resource
    let resource;
    if (typeof getAllResources === 'function') {
        resource = getAllResources().find(r => r.id == id);
    } else {
        resource = resources.find(r => r.id == id);
    }

    if (resource) {
        currentDownloadId = id;

        // Populate Modal
        document.getElementById('downloadFileName').textContent = resource.title;

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
                <span>Type:</span>
                <span style="text-transform: capitalize">${resource.type}</span>
            </div>
        `;
        document.getElementById('downloadFileDetails').innerHTML = detailsHtml;

        // Show Modal
        document.getElementById('downloadModal').classList.add('active');
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
                // Perform Download
                let resource;
                if (typeof getAllResources === 'function') {
                    resource = getAllResources().find(r => r.id == currentDownloadId);
                } else {
                    resource = resources.find(r => r.id == currentDownloadId);
                }

                if (resource) {
                    alert(`⬇️ Starting download...\n\nResource: ${resource.title}\nSize: ${resource.fileSize}`);

                    if (typeof resource.downloads === 'number') {
                        resource.downloads++;
                        console.log(`New download count for ${resource.id}: ${resource.downloads}`);
                    }
                }

                closeDownloadModal();
            }
        });
    }
});

// ===================================
// HERO SEARCH
// ===================================
function initHeroSearch() {
    const searchInput = document.getElementById('heroSearch');
    const suggestionsDiv = document.getElementById('searchSuggestions');
    let searchTimeout;

    if (!searchInput) return;

    searchInput.addEventListener('input', function (e) {
        clearTimeout(searchTimeout);
        const query = e.target.value.trim();

        if (query.length < 2) {
            suggestionsDiv.style.display = 'none';
            return;
        }

        searchTimeout = setTimeout(function () {
            showSearchSuggestions(query, suggestionsDiv);
        }, 300);
    });

    // Close suggestions when clicking outside
    document.addEventListener('click', function (e) {
        if (!searchInput.contains(e.target) && !suggestionsDiv.contains(e.target)) {
            suggestionsDiv.style.display = 'none';
        }
    });

    // Handle Enter key
    searchInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
            const query = e.target.value.trim();
            if (query) {
                performSearch(query);
            }
        }
    });
}

function showSearchSuggestions(query, container) {
    const results = searchResources(query);

    if (results.length === 0) {
        container.innerHTML = `
            <div class="search-suggestion-item" style="padding: var(--space-4); text-align: center; color: var(--neutral-400);">
                No results found for "${query}"
            </div>
        `;
        container.style.display = 'block';
        return;
    }

    const suggestions = results.slice(0, 5).map(resource => {
        const course = courses[resource.courseCode];
        const type = resourceTypes[resource.type];

        return `
            <div class="search-suggestion-item" onclick="viewResource(${resource.id})">
                <div style="display: flex; align-items: center; gap: var(--space-3);">
                    <div class="resource-type-icon ${resource.type}" style="width: 36px; height: 36px; font-size: 1rem;">
                        ${type.icon}
                    </div>
                    <div style="flex: 1;">
                        <div style="font-weight: var(--font-semibold); color: var(--neutral-900); margin-bottom: 2px;">
                            ${highlightMatch(resource.title, query)}
                        </div>
                        <div style="font-size: var(--text-xs); color: var(--neutral-500);">
                            ${resource.courseCode} - ${course.name}
                        </div>
                    </div>
                    <span class="badge badge-${resource.type}">${type.name}</span>
                </div>
            </div>
        `;
    }).join('');

    container.innerHTML = suggestions + `
        <div style="padding: var(--space-3); text-align: center; border-top: 1px solid var(--neutral-100);">
            <button class="btn btn-ghost btn-sm" onclick="performSearch('${query}')">
                View all ${results.length} results →
            </button>
        </div>
    `;

    container.style.display = 'block';
}

function highlightMatch(text, query) {
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<mark style="background: var(--accent-200); padding: 2px 4px; border-radius: 3px;">$1</mark>');
}

function performSearch(query) {
    // Store search query and redirect to a department page or show results
    sessionStorage.setItem('searchQuery', query);
    alert(`Searching for: "${query}"\n\nIn a full implementation, this would show filtered results across all departments.`);
}

function viewResource(resourceId) {
    const resource = getResourceById(resourceId);
    if (resource) {
        alert(`Viewing: ${resource.title}\n\nIn a full implementation, this would open the resource details or download.`);
    }
}

// ===================================
// SEARCH SUGGESTIONS STYLING
// ===================================
// Add dynamic styles for search suggestions
const style = document.createElement('style');
style.textContent = `
    .search-suggestions {
        position: absolute;
        top: calc(100% + var(--space-2));
        left: 0;
        right: 0;
        background: var(--white);
        border-radius: var(--radius-xl);
        box-shadow: var(--shadow-2xl);
        max-height: 400px;
        overflow-y: auto;
        z-index: var(--z-dropdown);
    }

    .search-suggestion-item {
        padding: var(--space-4);
        cursor: pointer;
        transition: background var(--transition-fast);
        border-bottom: 1px solid var(--neutral-100);
    }

    .search-suggestion-item:last-child {
        border-bottom: none;
    }

    .search-suggestion-item:hover {
        background: var(--primary-50);
    }

    .hero-search {
        position: relative;
    }
`;
document.head.appendChild(style);

// ===================================
// SCROLL SPY
// ===================================
function initScrollSpy() {
    const navLinks = document.querySelectorAll('.nav-link');
    // Get all sections that actually have a matching nav link
    const linkedSections = Array.from(document.querySelectorAll('section')).filter(section => {
        return document.querySelector(`.nav-link[href="#${section.id}"]`);
    });

    // Header offset
    const headerHeight = 100;

    function activeLink() {
        let current = '';

        let scrollPosition = window.scrollY + headerHeight + 50;

        // Iterate all sections to flow correctly
        const allSections = document.querySelectorAll('section');

        allSections.forEach(section => {
            if (scrollPosition >= section.offsetTop) {
                const id = section.getAttribute('id');
                // Check if this specific section ID has a matching nav link
                const hasLink = document.querySelector(`.nav-link[href="#${id}"]`);

                if (hasLink) {
                    current = id;
                }
                // If it doesn't have a link (e.g. departments), we do nothing to 'current'
                // effectively keeping the previous valid section (Home) active.
            }
        });

        // Special check: If at bottom of page, active Contact
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50) {
            const contactSection = document.getElementById('contact');
            if (contactSection) current = 'contact';
        }

        navLinks.forEach(link => {
            const href = link.getAttribute('href');

            // Only manipulate hash links to avoid breaking Upload button
            if (href.startsWith('#')) {
                link.classList.remove('active');
                if (current && href.includes('#' + current)) {
                    link.classList.add('active');
                }
            }
        });
    }

    window.addEventListener('scroll', activeLink);
    // Trigger initial check
    activeLink();
}

// Make functions globally available
window.handleView = handleView;
window.handleDownload = handleDownload;
window.closeDownloadModal = closeDownloadModal;
window.closeViewModal = closeViewModal;
window.closeContactModal = closeContactModal;

// ===================================
// CONTACT FORM
// ===================================
function initContactForm() {
    const form = document.querySelector('form[action*="formspree"]');
    if (!form) return;

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const submitBtn = form.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerText;

        // Show loading state
        submitBtn.innerText = 'Sending...';
        submitBtn.disabled = true;

        const formData = new FormData(form);

        fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                // Success
                document.getElementById('contactSuccessModal').classList.add('active');
                form.reset();
            } else {
                // Error
                response.json().then(data => {
                    if (Object.hasOwn(data, 'errors')) {
                        alert(data["errors"].map(error => error["message"]).join(", "));
                    } else {
                        alert("Oops! There was a problem submitting your form");
                    }
                });
            }
        }).catch(error => {
            alert("Oops! There was a problem submitting your form");
        }).finally(() => {
            // Reset button
            submitBtn.innerText = originalBtnText;
            submitBtn.disabled = false;
        });
    });
}

function closeContactModal() {
    document.getElementById('contactSuccessModal').classList.remove('active');
}
