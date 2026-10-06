# uniHealthCare

University healthcare platform with role-based access for students, doctors, dispensary staff, and administrators.

## Tech stack

- **Frontend:** React + Tailwind CSS (`front-end/`)
- **Backend:** Java Spring Boot + MySQL (`backend/`)
- **AI helpers:** Python Flask services for Gemini-based advice (`GeminiAiApi/`) and a local NLTK/Torch chatbot (`zBOT/`)

## Configuration (required)

Secrets are **not** stored in the repository. Copy the example env file and set values locally:

```bash
cp .env.example .env
# edit .env with your database password, API keys, and JWT secret
```

Spring Boot reads sensitive settings from environment variables (see `backend/src/main/resources/application.properties`). Export the same variables before starting the backend, or use a tool that loads `.env` into the process environment.

For `GeminiAiApi`, set at least `GEMINI_API_KEY` and `HUGGINGFACE_API_TOKEN`.

Demo login accounts for local development should be created in your own database; do not commit real passwords to git.

## Setup

### Frontend

```bash
cd front-end
npm install
npm run dev
```

App: `http://localhost:5173`

### Backend

1. Create a MySQL database (default name `uni_health`).
2. Export `DB_*`, `OPENAI_API_KEY`, and `JWT_SECRET` (see `.env.example`).
3. Run:

```bash
cd backend
./mvnw clean install
./mvnw spring-boot:run
```

API: `http://localhost:8000`

### zBOT (optional)

```bash
cd zBOT
python3 -m venv venv
source venv/bin/activate
pip install Flask flask-cors numpy pyspellchecker nltk torch torchvision
python -c "import nltk; nltk.download('punkt')"
python train.py
python chat.py
```

### GeminiAiApi (optional)

```bash
cd GeminiAiApi
python3 -m venv venv
source venv/bin/activate
pip install flask requests pillow flask-cors google-generativeai python-dotenv
# ensure GEMINI_API_KEY and HUGGINGFACE_API_TOKEN are set
python app.py
```

## Design patterns

See `DesignPattern/README.md` for notes on patterns used in the frontend and backend.

## Contributors

1. Diptajoy Mistry
2. Rasel Hossen
