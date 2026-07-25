# Contributing to MediPulse AI 🏥

Thank you for your interest in contributing to **MediPulse AI**! This document provides guidelines and best practices for submitting issues, feature requests, and code contributions.

---

## 🚀 Quick Start & Development Setup

1. **Fork & Clone the Repository**
   ```bash
   git clone https://github.com/Sumit12312299/MediPluse-AI.git
   cd MediPluse-AI
   ```

2. **Backend Setup (Django REST Framework)**
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   python manage.py migrate
   python manage.py runserver
   ```

3. **Frontend Setup (React + Vite + Tailwind CSS)**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

---

## 🌿 Git Branching Strategy

- `main` — Production-ready stable branch.
- `feature/<feature-name>` — For new feature developments.
- `fix/<bug-name>` — For bug fixes.
- `docs/<doc-title>` — For documentation improvements.

---

## 📝 Commit Convention

We follow conventional commit formatting:

- `feat:` A new feature for the user or system.
- `fix:` A bug fix.
- `docs:` Documentation only changes.
- `style:` Formatting, missing semi-colons, white spaces, etc.
- `refactor:` Code refactoring without changing functionality.
- `test:` Adding missing tests or refactoring existing tests.
- `chore:` Maintenance tasks, build configuration, or dependency updates.

---

## 📐 Code Style & Best Practices

### Frontend (React & Tailwind CSS)
- Use functional React components with hooks.
- Keep components modular and reusable under `src/components/`.
- Maintain glassmorphism design consistency with predefined CSS utility classes in `index.css`.
- Ensure responsive layouts across mobile, tablet, and desktop viewports.

### Backend (Django & DRF)
- Follow PEP 8 guidelines for Python code.
- Write clear docstrings for views, models, and serializers.
- Ensure all API endpoints handle errors gracefully with standard HTTP status codes.

---

## 📬 Reporting Issues & Requesting Features

When opening an issue:
1. Provide a clear and descriptive title.
2. Include step-by-step reproduction steps for bugs.
3. Attach screenshots or error logs where applicable.

Thank you for helping make **MediPulse AI** better!
