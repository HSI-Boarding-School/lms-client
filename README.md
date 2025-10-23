# 🎓 Shiners LMS Client

**Shiners LMS** is the frontend project of a **Learning Management System** (LMS). Built with **React + Vite**, this project prioritizes a **modern, responsive, and intuitive** user experience for students, instructors, and administrators alike.

***

## 🚀 Tech Stack

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![TanStack Query](https://img.shields.io/badge/TanStack_Query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white)

```
lms-client/
│── public/            # Static assets (images, icons, etc.)
│── src/
│   │── assets/        # gambar, icon
│   │── components/    # komponen UI reusable
│   │── pages/         # halaman utama (Dashboard, Login, dll)
│   │── routes/        # konfigurasi routing
│   │── hooks/         # custom hooks
│   │── services/      # API call (axios/fetch)
|   │── store/         # store zustand
│   │── App.jsx        # root component
│   │── main.jsx       # entry point React
│── package.json
│── vite.config.js
│── tailwind.config.js
```

***

## ⚙️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/HSI-Boarding-School/lms-client.git
   cd lms-client
   ```

2. **Install dependencies**
   ```bash
   bun install
   ```

3. **Run the development server**
   ```bash
   bun dev
   ```

4. **Open your browser**  
   [http://localhost:5173](http://localhost:5173)

***

## 🌟 Key Features

- ✅ Multi-role dashboards for **Students**, **Instructors**, and **Admins**  
- ✅ Course Management (list, details, enrollment)  
- ✅ Quizzes & Assignments user interface  
- ✅ Modern responsive design for desktop and mobile devices  
- ✅ Integration-ready with HSI’s internal API services  

***

## 🏫 About the Project

Shiners LMS is designed to support digital learning and management activities within the **HSI Boarding School network** across Indonesia.  

It provides a centralized platform for educational materials, quizzes, and course progress tracking for both teachers and students.

***

## 📌 Notes

- This repository contains the **frontend only**.  
- The **backend/API service** should be implemented in a separate project (Go-lang).  
- Ensure the `.env` file is configured with the correct backend base URL.  