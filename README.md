r# PostSpace — React Posts Application 🚀

A responsive React web application built as part of a React Developer Machine Test. The application includes a demo login page, an API-powered posts listing, and a dynamic post detail page.

## Deployment 
- Vercel
  # 🔗Link : https://react-developer-machine-test.vercel.app/login

  # ⌨Demo Login

Enter any valid email address and a password containing at least six characters. No authentication API is required.

## ✨Features

- **Login:** Client-side form validation, password visibility toggle, and demo session handling.
- **Posts List:** Fetches posts from JSONPlaceholder, with live search by title, content, or post ID.
- **Post Details:** Dynamic routing and API integration to display individual posts.
- **Responsive UI:** Modern layout optimized for desktop, tablet, and mobile screens.
- **User Experience:** Loading states, error messages, retry functionality, and empty search results.
- **Navigation:** React Router for page navigation and protected demo routes.

## </>Technologies

- React
- Vite
- React Router DOM
- Lucide React
- CSS3
- JavaScript ES6+
- Fetch API
- JSONPlaceholder REST API

## 📍API Endpoints

**Posts List**🚩
`https://jsonplaceholder.typicode.com/posts`

**Post Details**🚩
`https://jsonplaceholder.typicode.com/posts/1`

The detail endpoint is dynamically generated based on the selected post ID.

## 💡Getting Started

### 📋Prerequisites

- Node.js and npm
- Git
- Visual Studio Code (recommended)

### 🛠️Installation


npm install
npm run dev


## ↪️Application Routes

| Route | Description |
|---|---|
| `/login` | Demo login page |
| `/posts` | Posts listing and search |
| `/posts/:id` | Individual post details |

## 📂Project Structure


src/

├── components/

│   └── Navbar.jsx

├── pages/

│   ├── Login.jsx

│   ├── Posts.jsx

│   └── PostDetail.jsx

├── App.jsx

├── main.jsx

└── index.css



## 📌Important Note

This project uses demo-only client-side login. It is not production authentication and does not verify user credentials against a backend.

## ✍️Author
Aneej R Suku 👨🏻‍💻

© React Developer Machine Test Project

