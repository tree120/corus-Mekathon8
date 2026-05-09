# AI-Based Food Safety & Product Verification System

## 📌 Overview

This project is a full-stack web application designed to improve food safety and product transparency using AI-powered ingredient analysis and QR code verification.

Companies can register, upload product details, and manage food information through a dashboard. The system analyzes ingredients and classifies them as safe, hazardous, or allergens.

⚠️ **Current Status:**
QR codes are successfully generated for products, but the complete consumer-side QR scanning workflow and deployment are still under development.

This project is open for further improvements and extension.

---

# 🚀 Features Implemented

## 👤 Company Features

* Company Registration & Login
* Profile Management
* Product Upload & Management
* Product Edit/Delete
* Product List Dashboard
* Company Image Upload
* Certification Upload

---

## 🤖 AI Features

* Ingredient analysis system
* Classification into:

  * Safe ingredients
  * Hazardous ingredients
  * Allergens
* AI explanation generation

---

## 📱 QR Code Features

* QR code generation for every product
* QR code linked with product ID

⚠️ **Pending Work**

* Public product page after QR scan
* Deployment
* Live QR scan workflow
* Mobile optimization

---

# 🛠️ Tech Stack

## Frontend

* React.js
* React Router
* CSS

## Backend

* FastAPI
* Python
* SQLAlchemy

## Database

* PostgreSQL / SQLite

## Libraries & Tools

* QRCode
* hashlib
* FormData
* Uvicorn

---

# 📂 Project Structure

```text
project/
│
├── backend/
│   ├── app.py
│   ├── models.py
│   ├── database.py
│   ├── schemas.py
│   ├── ai/
│   │   └── ingredient_analyzer.py
│   └── uploads/
│
├── frontend/
│   ├── src/
│   ├── components/
│   └── App.jsx
│
└── README.md
```

---

# ⚙️ Installation

## 1️⃣ Clone Repository

```bash
git clone <your-repository-link>
```

---

# 🗄️ Database Setup (PostgreSQL)

1. Open **pgAdmin**
2. Create a new PostgreSQL database
3. Open `database.py`
4. Add your PostgreSQL username, password, and database name

Example:

```python
DATABASE_URL = "postgresql://postgres:your_password@localhost/your_database_name"
```

⚠️ Replace:

* `your_password`
* `your_database_name`

with your own PostgreSQL credentials.

---

## 2️⃣ Backend Setup

```bash
cd backend
pip install -r requirements.txt
uvicorn app:app --reload
```

Backend runs on:

```text
http://127.0.0.1:8000
```

---

## 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

# 🔐 Environment Variables

Create a `.env` file inside the backend folder.

Example:

```env
OPENROUTER_API_KEY=your_api_key_here
```

⚠️ Important:

* Do NOT push your real API key to GitHub
* Add `.env` inside `.gitignore`

---

# 🔑 OpenRouter API Key

This project uses AI analysis through OpenRouter/OpenAI-compatible APIs.

Anyone continuing this project should:

1. Create their own OpenRouter API key
2. Add the key inside `.env`
3. Configure the AI request logic

OpenRouter:
[https://openrouter.ai/](https://openrouter.ai/)

---

# 🧠 AI Workflow

```text
Ingredients → AI Analysis → Classification → Store in Database
```

---

# 📱 QR Code Workflow (Planned)

```text
QR Code → Scan → Product Page → Fetch Product Details
```

---

# 🏆 Certifications Supported

* FSSAI
* ISO
* NPOP

---

# 🔮 Future Improvements

* Complete QR scan verification flow
* Cloud deployment
* JWT Authentication
* Real-time AI improvements
* Consumer review system
* Mobile application
* Public product verification page

---

# 🤝 Contribution

This project is still under development.

Anyone interested can continue and improve this project by:

* Enhancing AI analysis
* Completing deployment
* Improving UI/UX
* Adding cloud database support
* Implementing authentication/security improvements

---

# 👩‍💻 Author

**Sweta**

---

# 📜 Note

This project is developed for educational and learning purposes.
