# Faculty of Computing - Resource Library (SUSL)

A modern, responsive academic resource platform for the Faculty of Computing at Sabaragamuwa University of Sri Lanka (SUSL).

## 🎯 Overview

This website serves as a central hub for students across Information Systems, Software Engineering, and Data Science departments to access lecture notes, slides, past papers, lab sheets, and tutorials.

## ✨ Features

### Premium UI/UX Design
- **Glassmorphism Effects**: Frosted glass cards and navigation with backdrop blur
- **Micro-animations**: Smooth hover effects, fade-ins, slide-ins, and floating elements
- **Fluid Typography**: Responsive text sizing using clamp() for perfect scaling
- **Gradient Overlays**: Dynamic color transitions and depth layering
- **Multi-layered Shadows**: Realistic depth perception with glow effects

### Core Functionality
- **Advanced Search**: Real-time search with auto-suggestions and highlighting
- **Smart Filtering**: Filter by department, semester, resource type
- **Sorting Options**: Sort by date, downloads, or title
- **Responsive Design**: Mobile-first approach, works on all devices
- **Animated Counters**: Dynamic statistics with smooth animations
- **Loading States**: Skeleton screens with shimmer animations

### Pages
1. **Home Page** - Hero section, department cards, latest resources
2. **Department Pages** (IS, SE, DS) - Filtered resources with advanced search
3. **Upload Page** - Resource contribution form with validation

## 🚀 Quick Start

### Option 1: Open Directly
Simply open `index.html` in any modern web browser.

### Option 2: Use Live Server (Recommended)
1. Install [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

### Option 3: Use Node.js Server
```bash
# Install serve globally
npm install -g serve

# Run server in project directory
serve .

# Open browser to http://localhost:3000
```

### Option 4: Python HTTP Server
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Open browser to http://localhost:8000
```

## 📁 Project Structure

```
New Uni web/
├── index.html                    # Home page
├── pages/
│   ├── information-systems.html  # IS department resources
│   ├── software-engineering.html # SE department resources
│   ├── data-science.html         # DS department resources
│   └── upload.html               # Resource upload form
├── css/
│   └── styles.css                # Premium design system with glassmorphism
├── js/
│   ├── data.js                   # Sample resource data (30+ entries)
│   ├── main.js                   # Home page functionality
│   ├── department.js             # Department page logic
│   └── upload.js                 # Upload form handling
└── README.md                     # This file
```

## 🎨 Design System

### Color Palette
- **Primary**: Deep university blue (#0a1628 → #f0f5fc, 10 shades)
- **Accent**: Golden amber (#b8860b → #fdf6e3)
- **Semantic**: Success, warning, error, info variants

### Typography
- **Display**: Outfit (headings, bold statements)
- **Body**: Inter (paragraphs, UI text)
- **Code**: JetBrains Mono (code snippets)

### Components
- Glassmorphic cards with hover effects
- Gradient buttons with micro-interactions
- Advanced form elements with focus states
- Animated badges and tags
- Loading skeletons and empty states

## 📊 Sample Data

The website includes 30+ sample resources:
- **Information Systems**: 10 resources across 8 courses
- **Software Engineering**: 10 resources across 8 courses
- **Data Science**: 10 resources across 8 courses

Resource types include:
- 📝 Lecture Notes
- 📊 Lecture Slides
- 📄 Past Papers
- 🔬 Lab Sheets
- 📚 Tutorials

## 🌐 Deployment

### GitHub Pages
1. Create a new repository on GitHub
2. Push your code:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/your-repo.git
   git push -u origin main
   ```
3. Go to repository Settings → Pages
4. Select "main" branch as source
5. Your site will be live at `https://yourusername.github.io/your-repo/`

### Netlify
1. Visit [Netlify](https://www.netlify.com/)
2. Drag and drop your project folder
3. Your site will be live instantly with a custom URL

### Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in your project directory
3. Follow the prompts

## 🔧 Customization

### Adding New Resources
Edit `js/data.js` and add entries to the `resources` array:

```javascript
{
    id: 31,
    title: 'Your Resource Title',
    courseCode: 'IS1101',
    type: 'notes', // notes, slides, papers, labs, tutorials
    uploadDate: '2024-02-20',
    fileSize: '2.5 MB',
    downloads: 0,
    url: 'path/to/file.pdf'
}
```

### Adding New Courses
Edit `js/data.js` and add entries to the `courses` object:

```javascript
'IS1103': {
    code: 'IS1103',
    name: 'Your Course Name',
    semester: '1.1', // Format: Year.Semester
    department: 'is' // is, se, or ds
}
```

### Changing Colors
Edit CSS custom properties in `css/styles.css`:

```css
:root {
    --primary-500: #your-color;
    --accent-500: #your-color;
    /* ... */
}
```

## 🎯 Features Roadmap

### Current Features ✅
- Responsive design
- Search and filter
- Animated UI
- Sample data

### Future Enhancements 🚀
- Backend integration (Node.js/PHP)
- User authentication
- Real file uploads
- Database storage (MongoDB/MySQL)
- Admin dashboard
- User profiles
- Resource ratings and reviews
- Download analytics
- Email notifications
- Advanced search with tags

## 🛠️ Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Custom properties, Grid, Flexbox, Animations
- **JavaScript (ES6+)**: Vanilla JS, no frameworks
- **Google Fonts**: Inter, Outfit
- **Design**: Glassmorphism, Micro-animations

## 📱 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📄 License

This project is created for educational purposes for the Faculty of Computing, SUSL.

## 🤝 Contributing

To contribute resources or improvements:
1. Use the Upload page on the website
2. Or contact the Faculty of Computing administration

## 📞 Contact

Faculty of Computing  
Sabaragamuwa University of Sri Lanka  
Belihuloya, Sri Lanka

---

**⚠️ For Educational Use Only**

© 2024 Faculty of Computing, SUSL. All rights reserved.
