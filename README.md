# 🎓 University CMS

A content management system built with **Next.js**, **shadcn-ui**, **NextAuth**, and **Tailwind CSS** to manage university data such as students, courses, grades, and more.

---

## ✅ Project Checklist

### ⚙️ Initial Setup

- [x] Create Next.js project with TypeScript
- [x] Setup Tailwind CSS
- [x] Setup shadcn-ui
- [x] Create `.env` with necessary secrets and DB connection

---

### 🔐 Authentication (NextAuth)

- [x] Install NextAuth
- [x] Setup API route `/api/auth/[...nextauth].ts`
- [x] Add providers (e.g., Credentials, Google)
- [x] Set-up next-auth config
- [x] Create custom login page
- [x] Create login for user/admin
- [ ] Create login for student
- [ ] Create login for teacher
- [x] Create recover password page
- [x] Protect routes using middlwere

---

### 🌐 Fetch Configuration

- [x] Create global fetch with base URL
- [x] Add token interceptor
- [x] Handle API errors globally

---

### 🧩 Layouts & Structure

### Admin pages

- [ ] Dashboard/root
- [ ] All studente pages
- [ ] All Teacher pages
- [ ] All departemant pages
- [ ] All curses pages
- [ ] All building pages
- [ ] All Payment pages
- [x] All users pages
- [ ] Events page

---

### ⚙️ Features & Function

- [x] Server action
- [x] Data revalidation
- [x] Dark mode
- [x] Assigne user to departament
- [x] Reusible table-table
- [x] Add data-table filteres
- [x] Create export button to export data as doc type /csv/excel
- [x] Users CRUD
- [x] Departement CRUD
- [ ] Update account info

---

### 🧑‍🎓 Student Module

- [ ] Student model in Prisma
- [ ] CRUD pages for students
- [ ] View student profile and history
- [ ] Associate students with courses

---

### 📚 Courses & Disciplines

- [ ] Course model and seed data
- [ ] Discipline model linked to courses
- [ ] Create UI to manage disciplines

---

### 🧾 Grades & Attendance

- [ ] Grade model with student/course relationship
- [ ] Form to add/update grades
- [ ] Record attendance and view reports

---

### 💳 Payment Management

- [ ] Payment model in Prisma
- [ ] Add payment entries with status
- [ ] Filter/search payments
- [ ] Export reports (CSV or PDF)

---

### ✉️ Email & Notifications

- [ ] Setup Resend or Nodemailer
- [ ] Send email on grade update or fee due
- [ ] Create reusable email templates

---

### 📁 File Uploads (Optional)

- [x] Setup file upload (e.g., FilePond, Dropzone)
- [ ] Store uploaded files securely
- [ ] Link documents to student profiles

---

### 🧠 Admin Features

- [ ] Role-based access control
- [ ] Dashboard with stats (students, revenue, attendance)
- [ ] Logs or recent activity tracker
- [ ] Assignd user to departament
- [x] Create user CRUD
- [x] Create departement CRUD
- [x] Create semester CRUD
- [x] Create buildind CRUD
- [x] Create events CRUD

---

### 🧪 Testing & Validation

- [ ] Add form validation with Zod/Yup
- [ ] Write unit tests for API routes and utilities
- [ ] Basic UI testing with Playwright or Cypress

---

### 🚀 Deployment

- [ ] Prepare for deployment (env, build)
- [ ] Deploy to Vercel / Railway / Render
- [ ] Seed production DB with safe dummy data

---

## 🗂 Folder Structure

/app
/components
/lib
/utils
/public
