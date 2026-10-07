# 📝 QuickNotes — Smart Student Notes

QuickNotes is a full-stack web application designed for students to create, organize, search, and manage study notes with reminders and focus sessions.

The application combines a **Next.js frontend** with a **Node.js + Express REST API backend** and stores notes in a local JSON file.

---

## 🚀 Features

### 📝 Smart Notes
- Create study notes with:
  - Title
  - Content
  - Subject
  - Priority
  - Study duration

### 🔎 Search & Filters
- Search notes by:
  - Title
  - Content
  - Subject
- Filter notes by subject
- Filter notes by priority

### ⏰ Smart Reminders
- Set a date and time for reminders
- Choose reminder ring duration:
  - 1 minute
  - 2 minutes
  - 5 minutes
  - 10 minutes
- Displays upcoming reminders
- Reminder sound notification
- Browser notification support
- Stop an active reminder with the **Stop Reminder** button

### 🔔 Sound Alerts
- Enable browser audio alerts
- Reminder beep plays repeatedly during the selected reminder duration
- Sound can be stopped manually

### 🎯 Focus Mode
- Start a study countdown timer
- Pause the focus timer
- Study duration can be customized for each note

### ✅ Note Management
- Mark notes as completed
- Mark completed notes as active again
- Delete notes

### 📊 Student Dashboard
Displays:
- Total notes
- Today's reminders
- High-priority notes
- Completed notes

### 📱 Responsive UI
- Clean student-focused interface
- Works on desktop and mobile screens
- Blue and white modern dashboard design

---

## 🛠️ Technologies Used

### Frontend
- Next.js
- React
- TypeScript
- CSS
- Next.js App Router

### Backend
- Node.js
- Express.js
- REST API
- CORS

### Data Storage
- JSON file (`notes.json`)

### Development Tools
- Visual Studio Code
- Git
- GitHub
- Chrome Developer Tools

---

## 📂 Project Structure

```text
quick-notes/
│
├── backend/
│   ├── index.js
│   ├── notes.json
│   ├── package.json
│   └── node_modules/
│
├── frontend/
│   ├── app/
│   │   ├── page.tsx
│   │   ├── layout.tsx
│   │   └── globals.css
│   │
│   ├── components/
│   │   ├── CreateNoteForm.tsx
│   │   ├── NoteCard.tsx
│   │   ├── NotesList.tsx
│   │   └── types.ts
│   │
│   ├── public/
│   └── package.json
│
├── .gitignore
└── README.md
