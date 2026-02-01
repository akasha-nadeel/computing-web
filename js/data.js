/**
 * Faculty of Computing Resource Library - SUSL
 * Sample Resource Data
 */

// Department Information
const departments = {
    is: {
        id: 'is',
        name: 'Information Systems',
        shortName: 'IS',
        description: 'Study business processes, data management, and enterprise systems',
        icon: '💼',
        color: '#1d4ed8'
    },
    se: {
        id: 'se',
        name: 'Software Engineering',
        shortName: 'SE',
        description: 'Learn software development, architecture, and project management',
        icon: '💻',
        color: '#15803d'
    },
    ds: {
        id: 'ds',
        name: 'Data Science',
        shortName: 'DS',
        description: 'Master analytics, machine learning, and big data technologies',
        icon: '📊',
        color: '#7c3aed'
    }
};

// Course Information
const courses = {
    // Information Systems Courses
    'IS1101': { code: 'IS1101', name: 'Introduction to Information Systems', semester: '1.1', department: 'is' },
    'IS1102': { code: 'IS1102', name: 'Database Management Systems', semester: '1.2', department: 'is' },
    'IS2201': { code: 'IS2201', name: 'Enterprise Resource Planning', semester: '2.1', department: 'is' },
    'IS2202': { code: 'IS2202', name: 'Business Intelligence', semester: '2.2', department: 'is' },
    'IS3301': { code: 'IS3301', name: 'Systems Analysis and Design', semester: '3.1', department: 'is' },
    'IS3302': { code: 'IS3302', name: 'IT Project Management', semester: '3.2', department: 'is' },
    'IS4401': { code: 'IS4401', name: 'Information Security Management', semester: '4.1', department: 'is' },
    'IS4402': { code: 'IS4402', name: 'Digital Transformation', semester: '4.2', department: 'is' },

    // Software Engineering Courses
    'SE1101': { code: 'SE1101', name: 'Programming Fundamentals', semester: '1.1', department: 'se' },
    'SE1102': { code: 'SE1102', name: 'Object-Oriented Programming', semester: '1.2', department: 'se' },
    'SE2201': { code: 'SE2201', name: 'Data Structures and Algorithms', semester: '2.1', department: 'se' },
    'SE2202': { code: 'SE2202', name: 'Web Technologies', semester: '2.2', department: 'se' },
    'SE3301': { code: 'SE3301', name: 'Software Architecture', semester: '3.1', department: 'se' },
    'SE3302': { code: 'SE3302', name: 'Mobile Application Development', semester: '3.2', department: 'se' },
    'SE4401': { code: 'SE4401', name: 'DevOps and Cloud Computing', semester: '4.1', department: 'se' },
    'SE4402': { code: 'SE4402', name: 'Software Quality Assurance', semester: '4.2', department: 'se' },

    // Data Science Courses
    'DS1101': { code: 'DS1101', name: 'Introduction to Data Science', semester: '1.1', department: 'ds' },
    'DS1102': { code: 'DS1102', name: 'Statistics for Data Science', semester: '1.2', department: 'ds' },
    'DS2201': { code: 'DS2201', name: 'Machine Learning Fundamentals', semester: '2.1', department: 'ds' },
    'DS2202': { code: 'DS2202', name: 'Data Visualization', semester: '2.2', department: 'ds' },
    'DS3301': { code: 'DS3301', name: 'Deep Learning', semester: '3.1', department: 'ds' },
    'DS3302': { code: 'DS3302', name: 'Big Data Analytics', semester: '3.2', department: 'ds' },
    'DS4401': { code: 'DS4401', name: 'Natural Language Processing', semester: '4.1', department: 'ds' },
    'DS4402': { code: 'DS4402', name: 'Data Ethics and Privacy', semester: '4.2', department: 'ds' }
};

// Resource Types
const resourceTypes = {
    notes: { id: 'notes', name: 'Lecture Notes', icon: '📝', color: '#0369a1' },
    slides: { id: 'slides', name: 'Lecture Slides', icon: '📊', color: '#b45309' },
    papers: { id: 'papers', name: 'Past Papers', icon: '📄', color: '#be185d' },
    labs: { id: 'labs', name: 'Lab Sheets', icon: '🔬', color: '#15803d' }
};

// Sample Resources
const resources = [
    // Information Systems Resources
    {
        id: 1,
        title: 'Introduction to IS - Complete Notes',
        courseCode: 'IS1101',
        type: 'notes',
        year: 2023,
        uploadDate: '2024-01-15',
        fileSize: '2.4 MB',
        downloads: 245,
        url: '#'
    },
    {
        id: 2,
        title: 'Database Design Lecture Slides',
        courseCode: 'IS1102',
        type: 'slides',
        year: 2024,
        uploadDate: '2024-01-18',
        fileSize: '5.1 MB',
        downloads: 189,
        url: '#'
    },
    {
        id: 3,
        title: 'DBMS Past Paper 2023',
        courseCode: 'IS1102',
        type: 'papers',
        year: 2023,
        uploadDate: '2024-01-20',
        fileSize: '856 KB',
        downloads: 312,
        url: '#'
    },
    {
        id: 4,
        title: 'ERP System Configuration Lab',
        courseCode: 'IS2201',
        type: 'labs',
        year: 2022,
        uploadDate: '2024-01-22',
        fileSize: '1.8 MB',
        downloads: 156,
        url: '#'
    },

    {
        id: 6,
        title: 'Systems Analysis Complete Guide',
        courseCode: 'IS3301',
        type: 'notes',
        year: 2024,
        uploadDate: '2024-01-28',
        fileSize: '4.5 MB',
        downloads: 167,
        url: '#'
    },
    {
        id: 7,
        title: 'IT Project Management Slides',
        courseCode: 'IS3302',
        type: 'slides',
        year: 2024,
        uploadDate: '2024-02-01',
        fileSize: '6.3 MB',
        downloads: 143,
        url: '#'
    },
    {
        id: 8,
        title: 'Information Security Past Paper',
        courseCode: 'IS4401',
        type: 'papers',
        year: 2024,
        uploadDate: '2024-02-05',
        fileSize: '1.1 MB',
        downloads: 221,
        url: '#'
    },

    // Software Engineering Resources
    {
        id: 9,
        title: 'Python Programming Basics',
        courseCode: 'SE1101',
        type: 'notes',
        year: 2024,
        uploadDate: '2024-01-12',
        fileSize: '3.1 MB',
        downloads: 387,
        url: '#'
    },
    {
        id: 10,
        title: 'OOP Concepts and Examples',
        courseCode: 'SE1102',
        type: 'slides',
        year: 2024,
        uploadDate: '2024-01-16',
        fileSize: '4.7 MB',
        downloads: 298,
        url: '#'
    },
    {
        id: 11,
        title: 'Data Structures Lab Exercises',
        courseCode: 'SE2201',
        type: 'labs',
        year: 2024,
        uploadDate: '2024-01-19',
        fileSize: '2.9 MB',
        downloads: 267,
        url: '#'
    },

    {
        id: 13,
        title: 'Software Architecture Patterns',
        courseCode: 'SE3301',
        type: 'notes',
        uploadDate: '2024-01-26',
        fileSize: '3.6 MB',
        downloads: 203,
        url: '#'
    },
    {
        id: 14,
        title: 'Mobile App Development - React Native',
        courseCode: 'SE3302',
        type: 'slides',
        uploadDate: '2024-01-30',
        fileSize: '7.2 MB',
        downloads: 234,
        url: '#'
    },
    {
        id: 15,
        title: 'DevOps Past Paper 2023',
        courseCode: 'SE4401',
        type: 'papers',
        uploadDate: '2024-02-03',
        fileSize: '945 KB',
        downloads: 178,
        url: '#'
    },
    {
        id: 16,
        title: 'Software Testing Lab Manual',
        courseCode: 'SE4402',
        type: 'labs',
        uploadDate: '2024-02-07',
        fileSize: '2.3 MB',
        downloads: 156,
        url: '#'
    },

    // Data Science Resources
    {
        id: 17,
        title: 'Introduction to Data Science',
        courseCode: 'DS1101',
        type: 'notes',
        uploadDate: '2024-01-14',
        fileSize: '3.8 MB',
        downloads: 289,
        url: '#'
    },
    {
        id: 18,
        title: 'Statistical Analysis Slides',
        courseCode: 'DS1102',
        type: 'slides',
        uploadDate: '2024-01-17',
        fileSize: '5.4 MB',
        downloads: 245,
        url: '#'
    },
    {
        id: 19,
        title: 'Machine Learning Algorithms Guide',
        courseCode: 'DS2201',
        type: 'notes',
        uploadDate: '2024-01-21',
        fileSize: '6.7 MB',
        downloads: 412,
        url: '#'
    },

    {
        id: 21,
        title: 'Deep Learning Lab - Neural Networks',
        courseCode: 'DS3301',
        type: 'labs',
        uploadDate: '2024-01-27',
        fileSize: '3.9 MB',
        downloads: 267,
        url: '#'
    },
    {
        id: 22,
        title: 'Big Data Technologies Slides',
        courseCode: 'DS3302',
        type: 'slides',
        uploadDate: '2024-01-31',
        fileSize: '8.1 MB',
        downloads: 223,
        url: '#'
    },
    {
        id: 23,
        title: 'NLP Past Paper 2023',
        courseCode: 'DS4401',
        type: 'papers',
        uploadDate: '2024-02-04',
        fileSize: '1.3 MB',
        downloads: 189,
        url: '#'
    },


    // Additional Resources

    {
        id: 26,
        title: 'Algorithms and Complexity Notes',
        courseCode: 'SE2201',
        type: 'notes',
        uploadDate: '2024-02-11',
        fileSize: '4.1 MB',
        downloads: 198,
        url: '#'
    },

    {
        id: 28,
        title: 'Cloud Computing Lab Exercises',
        courseCode: 'SE4401',
        type: 'labs',
        uploadDate: '2024-02-13',
        fileSize: '3.4 MB',
        downloads: 167,
        url: '#'
    },
    {
        id: 29,
        title: 'Business Process Modeling',
        courseCode: 'IS2201',
        type: 'slides',
        uploadDate: '2024-02-14',
        fileSize: '4.8 MB',
        downloads: 143,
        url: '#'
    },
    {
        id: 30,
        title: 'Pandas and NumPy Cheat Sheet',
        courseCode: 'DS2202',
        type: 'notes',
        uploadDate: '2024-02-15',
        fileSize: '1.2 MB',
        downloads: 312,
        url: '#'
    }
];

// Helper Functions
function getResourceById(id) {
    return getAllResources().find(r => r.id == id);
}

function getResourcesByCourse(courseCode) {
    return getAllResources().filter(r => r.courseCode === courseCode);
}

function getResourcesByDepartment(departmentId) {
    // Get department courses
    const deptCourses = Object.values(courses)
        .filter(c => c.department === departmentId)
        .map(c => c.code);

    // Get all resources (static + uploaded from localStorage)
    const allRes = getAllResources();

    // Filter resources
    return allRes.filter(r => {
        // Check 1: Course code matches a course in this department
        const matchesCourse = deptCourses.includes(r.courseCode);

        // Check 2: Resource's department field matches (use == for type coercion)
        const matchesDept = r.department == departmentId;

        return matchesCourse || matchesDept;
    });
}

function getResourcesByType(type) {
    return getAllResources().filter(r => r.type === type);
}

function getResourcesBySemester(semester) {
    const semesterCourses = Object.values(courses)
        .filter(c => c.semester === semester)
        .map(c => c.code);
    return getAllResources().filter(r => semesterCourses.includes(r.courseCode));
}

// Helper function to get all resources including uploaded ones
function getAllResources() {
    const uploadedResources = JSON.parse(localStorage.getItem('uploadedResources')) || [];
    return [...uploadedResources, ...resources];
}

function getLatestResources(count = 6) {
    return getAllResources()
        .sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate))
        .slice(0, count);
}

function searchResources(query) {
    const lowerQuery = query.toLowerCase();
    return getAllResources().filter(r => {
        const course = courses[r.courseCode];
        if (!course) return false; // Skip if course not found
        return (
            r.title.toLowerCase().includes(lowerQuery) ||
            r.courseCode.toLowerCase().includes(lowerQuery) ||
            course.name.toLowerCase().includes(lowerQuery) ||
            resourceTypes[r.type].name.toLowerCase().includes(lowerQuery)
        );
    });
}

function getResourceStats() {
    const allResources = getAllResources();
    return {
        totalResources: allResources.length,
        totalDownloads: allResources.reduce((sum, r) => sum + r.downloads, 0),
        totalCourses: Object.keys(courses).length,
        departments: Object.keys(departments).length,
        notes: allResources.filter(r => r.type === 'notes').length,
        slides: allResources.filter(r => r.type === 'slides').length,
        papers: allResources.filter(r => r.type === 'papers').length,
        labs: allResources.filter(r => r.type === 'labs').length
    };
}

// Format date helper
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

// Format file size helper
function formatFileSize(size) {
    return size;
}
