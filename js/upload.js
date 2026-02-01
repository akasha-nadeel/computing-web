/**
 * Faculty of Computing Resource Library - SUSL
 * Upload Page Functionality
 */

document.addEventListener('DOMContentLoaded', function () {
    initNavigation();
    initFileUpload();
    initCourseDatalist();
    initFormHandling();
});


// ===================================
// NAVIGATION (Shared)
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
        const menuNavLinks = navMenu.querySelectorAll('.nav-link');
        menuNavLinks.forEach(link => {
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

    // Scroll Effect - Matches other pages
    window.addEventListener('scroll', function () {
        const currentScroll = window.pageYOffset;
        if (currentScroll > 100) {
            if (header) header.classList.add('scrolled');
        } else {
            if (header) header.classList.remove('scrolled');
        }
    });

    // active state handler
    const navLinks = document.querySelectorAll('.nav-link');
    const currentUrl = window.location.pathname.split("/").pop();

    // 1. Set initial active state based on current page
    navLinks.forEach(link => {
        const href = link.getAttribute('href');

        // Remove active initially to be clean
        link.classList.remove('active');

        // Logic for "Upload" page
        if (currentUrl.includes('upload') && href.includes('upload.html')) {
            link.classList.add('active');
        }
        // Logic for other links (if they match somehow, though mostly external from here)
        else if (href === currentUrl) {
            link.classList.add('active');
        }
    });

    // 2. Handle clicks
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

// ===================================
// FILE UPLOAD HANDLING
// ===================================
function initFileUpload() {
    const dropZone = document.getElementById('dropZone');
    const fileInput = document.getElementById('fileInput');
    const filePreview = document.getElementById('filePreview');
    const fileName = document.getElementById('fileName');
    const fileSize = document.getElementById('fileSize');
    const removeFileBtn = document.getElementById('removeFile');

    // Drag & Drop Events
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, preventDefaults, false);
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    // Highlight drop zone
    ['dragenter', 'dragover'].forEach(eventName => {
        dropZone.addEventListener(eventName, highlight, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, unhighlight, false);
    });

    function highlight(e) {
        dropZone.classList.add('drag-over');
    }

    function unhighlight(e) {
        dropZone.classList.remove('drag-over');
    }

    // Handle Drop
    dropZone.addEventListener('drop', handleDrop, false);

    function handleDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;
        handleFiles(files);
    }

    // Handle Input Change
    fileInput.addEventListener('change', function () {
        handleFiles(this.files);
    });

    function handleFiles(files) {
        // Only accept one file for now
        if (files.length > 0) {
            const file = files[0];
            showFilePreview(file);
        }
    }

    function showFilePreview(file) {
        // Update DOM with file details
        fileName.textContent = file.name;
        fileSize.textContent = formatBytes(file.size);

        // Hide default drop zone content
        const dropIcon = dropZone.querySelector('.drop-icon');
        const h3 = dropZone.querySelector('h3');
        const p = dropZone.querySelector('p');
        const fileTypes = dropZone.querySelector('.file-types');

        if (dropIcon) dropIcon.style.display = 'none';
        if (h3) h3.style.display = 'none';
        if (p) p.style.display = 'none';
        if (fileTypes) fileTypes.style.display = 'none';

        // Show preview card
        filePreview.style.display = 'block';
        dropZone.classList.add('has-file');

        // Ensure the preview content is visible
        const previewContent = document.getElementById('filePreview');
        if (previewContent) previewContent.style.opacity = '1';
    }

    // Remove File
    removeFileBtn.addEventListener('click', function () {
        fileInput.value = ''; // Clear input
        filePreview.style.display = 'none';

        // Reset Drop Zone
        dropZone.querySelector('h3').style.display = 'block';
        dropZone.querySelector('p').style.display = 'block';
        dropZone.querySelector('.file-types').style.display = 'block';
        dropZone.querySelector('.drop-icon').style.display = 'block';
        dropZone.classList.remove('has-file');
    });
}

function formatBytes(bytes, decimals = 2) {
    if (!+bytes) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}


// ===================================
// COURSE DATALIST POPULATION
// ===================================
function initCourseDatalist() {
    const courseList = document.getElementById('courseList');
    const deptSelect = document.getElementById('deptSelect');
    const courseInput = document.getElementById('courseCode');

    if (!courseList || typeof courses === 'undefined') return;

    // Initially disable course input
    if (courseInput) {
        courseInput.disabled = true;
        courseInput.dataset.placeholder = courseInput.placeholder; // Save original placeholder
        courseInput.placeholder = "Select Department first";
        courseInput.title = "Please select a department first";
        courseInput.parentNode.classList.add('disabled-input'); // Optional: for styling if needed
    }

    // Filter when department changes
    deptSelect.addEventListener('change', function () {
        const dept = this.value;
        const filteredCourses = {};

        // Enable input if department is selected
        if (courseInput && dept) {
            courseInput.disabled = false;
            courseInput.placeholder = courseInput.dataset.placeholder; // Restore original placeholder
            courseInput.value = ''; // Clear previous value
            courseInput.title = "";
            courseInput.focus(); // Helper focus
            courseInput.parentNode.classList.remove('disabled-input');
        } else if (courseInput) {
            courseInput.disabled = true;
            courseInput.placeholder = "Select Department first";
            courseInput.parentNode.classList.add('disabled-input');
        }

        for (const [key, course] of Object.entries(courses)) {
            if (course.department === dept) {
                filteredCourses[key] = course;
            }
        }

        // Clear and repopulate
        courseList.innerHTML = '';
        populateCourses(filteredCourses);
    });

    function populateCourses(courseObj) {
        for (const key in courseObj) {
            const course = courseObj[key];
            const option = document.createElement('option');
            option.value = course.code;
            option.textContent = `${course.name} - ${course.code}`;
            courseList.appendChild(option);
        }
    }
}


// ===================================
// FORM SUBMISSION & SIMULATION
// ===================================
function initFormHandling() {
    const form = document.getElementById('uploadForm');
    const submitBtn = document.getElementById('submitBtn');
    const progressContainer = document.getElementById('progressContainer');
    const progressFill = document.getElementById('progressFill');
    const progressPercent = document.getElementById('progressPercent');
    const successModal = document.getElementById('successModal');
    const closeModal = document.getElementById('closeModal');

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        // Check if file is selected
        const fileInput = document.getElementById('fileInput');
        if (fileInput.files.length === 0) {
            alert("Please select a file to upload.");
            return;
        }

        // Collect form data
        const formData = {
            title: document.getElementById('resourceTitle').value,
            department: document.getElementById('deptSelect').value,
            type: document.getElementById('typeSelect').value,
            courseCode: document.getElementById('courseCode').value.toUpperCase(),
            academicYear: document.getElementById('academicYearSelect').value,
            yearOfStudy: document.getElementById('yearSelect').value,
            semester: document.getElementById('semSelect').value,
            fileName: fileInput.files[0].name,
            fileSize: formatBytes(fileInput.files[0].size)
        };

        // Start Upload Simulation
        submitBtn.disabled = true;
        submitBtn.textContent = "Uploading...";
        progressContainer.style.display = 'block';

        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 5; // Random increment
            if (progress > 100) progress = 100;

            progressFill.style.width = `${progress}%`;
            progressPercent.textContent = `${Math.round(progress)}%`;

            if (progress === 100) {
                clearInterval(interval);

                // Save the resource
                saveResource(formData);

                // Show Success after short delay
                setTimeout(() => {
                    successModal.classList.add('active');
                    submitBtn.textContent = "Uploaded";
                }, 500);
            }
        }, 100);
    });

    // Reset Form on Close Modal
    closeModal.addEventListener('click', function () {
        successModal.classList.remove('active');
        form.reset();

        // Reset File Input
        document.getElementById('removeFile').click();

        // Reset Button
        submitBtn.disabled = false;
        submitBtn.textContent = "Upload Resource";
        progressContainer.style.display = 'none';
        progressFill.style.width = '0%';
    });
}

// ===================================
// SAVE RESOURCE TO LOCALSTORAGE
// ===================================
function saveResource(formData) {
    // Get existing resources from localStorage or use the default array
    let savedResources = JSON.parse(localStorage.getItem('uploadedResources')) || [];

    // Create new resource object
    const newResource = {
        id: Date.now(), // Use timestamp as unique ID
        title: formData.title,
        courseCode: formData.courseCode,
        type: formData.type,
        year: parseInt(formData.academicYear),
        uploadDate: new Date().toISOString().split('T')[0], // Format: YYYY-MM-DD
        fileSize: formData.fileSize,
        downloads: 0,
        url: '#', // In a real app, this would be the file URL
        fileName: formData.fileName,
        department: formData.department,
        yearOfStudy: formData.yearOfStudy,
        semester: formData.semester
    };

    // Add to saved resources
    savedResources.unshift(newResource); // Add to beginning of array

    // Save back to localStorage
    localStorage.setItem('uploadedResources', JSON.stringify(savedResources));

    // Also add to the global resources array if it exists
    if (typeof resources !== 'undefined') {
        resources.unshift(newResource);
    }
}

