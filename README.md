# CODGuard AI

AI-assisted Cash-on-Delivery (COD) delivery-assurance platform for Sri Lankan social-commerce sellers.

CODGuard helps sellers confirm orders via WhatsApp/Telegram, detect high-risk delivery requests, send automated dispatch and delivery reminders, rescue failed deliveries with alternative arrangements, and analyze post-delivery outcomes to maximize order completion rates.

---

## 🏛️ Architectural Principle

CODGuard follows a strict separation of concerns across its core capabilities:

> **LLM understands and communicates.**  
> **Application code decides.**  
> **PostgreSQL remembers.**  
> **Integrations act.**

- **LLM understands and communicates**: Parses unstructured buyer responses across Sinhala, Tamil, and English; generates polite, context-aware notification messages.
- **Application code decides**: Enforces business logic, computes delivery-risk scores deterministically, governs state machine transitions, and makes operational decisions.
- **PostgreSQL remembers**: Persists orders, risk audits, buyer interaction histories, delivery attempts, and courier telemetry with strict ACID guarantees.
- **Integrations act**: Executes actions against external APIs including messaging channels (Telegram, WhatsApp) and courier partner webhooks.

---

## 🛠️ Technology Stack

### Backend
- **Python 3.12**
- **FastAPI**: Modern, high-performance web framework
- **SQLAlchemy 2.x**: Async ORM & database query builder
- **Pydantic v2**: Centralized settings (`pydantic-settings`) and validation schemas
- **Alembic**: Database schema migration framework
- **PostgreSQL 16**: Relational persistence
- **pytest**: Test suite with `pytest-asyncio` and `httpx`

### Frontend
- **React 18**: UI component library
- **Vite**: Ultra-fast build tool and dev server
- **TypeScript**: Type-safe frontend codebase
- **Tailwind CSS**: Utility-first responsive styling
- **Axios**: HTTP client for API communications
- **Vitest & React Testing Library**: Component and unit testing suite

### Infrastructure
- **Docker & Docker Compose**: Containerized multi-service orchestration

---

## 📁 Directory Structure

```text
codguard-ai/
├── README.md                 # Project documentation and developer guides
├── .gitignore                # Git ignore patterns for Python, Node, caches, env
├── .env.example              # Environment variables template
├── docker-compose.yml        # Multi-container orchestration (postgres, backend, frontend)
├── docs/                     # Architecture designs, specs, and API documentation
├── backend/
│   ├── app/
│   │   ├── __init__.py       # App package marker
│   │   ├── main.py           # FastAPI application factory and entry point
│   │   ├── core/             # Central settings (pydantic-settings) & security
│   │   ├── api/              # API routes and endpoints (health check)
│   │   ├── models/           # SQLAlchemy database models
│   │   ├── schemas/          # Pydantic request and response schemas
│   │   ├── services/         # Domain business logic and services
│   │   ├── workflows/        # Order and delivery workflow state machines
│   │   ├── agent/            # LLM prompts, parser, and conversational agent
│   │   ├── tools/            # Agent tool definitions
│   │   ├── integrations/     # Telegram, WhatsApp, and courier API clients
│   │   ├── scheduler/        # Background recurring tasks and reminder jobs
│   │   ├── risk/             # Deterministic delivery risk assessment
│   │   ├── database/         # Async engine, sessionmaker, and Base model
│   │   └── utils/            # Helper utilities and formatters
│   ├── tests/                # Backend unit and integration test suite
│   ├── alembic/              # Database migration scripts and environment
│   ├── alembic.ini           # Alembic configuration
│   ├── requirements.txt      # Production Python dependencies
│   ├── requirements-dev.txt  # Development and test dependencies
│   └── Dockerfile            # Container image for backend service
├── frontend/
│   ├── src/
│   │   ├── api/              # API clients and health services
│   │   ├── components/       # Reusable UI components
│   │   ├── App.tsx           # Main application view with connection status
│   │   ├── main.tsx          # React application root mount
│   │   ├── index.css         # Tailwind CSS directives and theme typography
│   │   └── setupTests.ts     # Vitest DOM test configuration
│   ├── package.json          # Node dependencies and scripts
│   ├── vite.config.ts        # Vite and Vitest configuration
│   ├── tailwind.config.js    # Tailwind design tokens
│   └── Dockerfile            # Container image for frontend service
├── simulator/                # Social commerce customer and courier simulator
├── scripts/                  # Development and operational utility scripts
└── data/                     # Seed data, sample delivery records, and fixtures
```

---

## 🚀 Development Setup (Local)

### Prerequisites
- Python 3.12+
- Node.js 20+ & npm 10+
- PostgreSQL 16 (or running via Docker)

### 1. Environment Configuration

Copy the example environment configuration:

```bash
# Windows PowerShell
Copy-Item .env.example .env

# Linux / macOS
cp .env.example .env
```

Review `.env` and adjust the `DATABASE_URL` if your local PostgreSQL settings differ.

---

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv .venv

# Activate virtual environment
# Windows (PowerShell):
.\.venv\Scripts\Activate.ps1
# Windows (cmd):
.\.venv\Scripts\activate.bat
# Linux / macOS:
source .venv/bin/activate

# Install dependencies
pip install -r requirements-dev.txt

# Run FastAPI development server
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at:
- **API Base**: [http://localhost:8000](http://localhost:8000)
- **Health Check**: [http://localhost:8000/health](http://localhost:8000/health)
- **Interactive OpenAPI Docs**: [http://localhost:8000/docs](http://localhost:8000/docs)

---

### 3. Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start Vite development server
npm run dev
```

The frontend will be available at:
- **Web App**: [http://localhost:5173](http://localhost:5173)

---

## 🐳 Docker Setup

To run the complete system (PostgreSQL 16, FastAPI backend, and React frontend) using Docker Compose:

```bash
# Start all services in detached mode
docker compose up -d --build

# View real-time logs
docker compose logs -f

# Stop all services
docker compose down
```

Services:
- **Frontend**: [http://localhost:5173](http://localhost:5173)
- **Backend API**: [http://localhost:8000](http://localhost:8000)
- **PostgreSQL**: `localhost:5432` (named volume: `codguard_postgres_data`)

---

## 🧪 Running Tests

### Backend Tests (pytest)

Run the backend test suite:

```bash
# From workspace root
.\backend\.venv\Scripts\pytest backend\tests -v

# Or from backend/ directory with activated venv:
cd backend
pytest -v
```

### Frontend Tests (Vitest)

Run the frontend test suite:

```bash
# From frontend/ directory
cd frontend
npm test

# Run tests in watch mode
npx vitest
```

---

## 📌 Implementation Status

- [x] **Prompt 1: Bootstrap & Dev Environment**
  - Clean monorepo structure
  - FastAPI with `/health` endpoint and CORS
  - Central `pydantic-settings` configuration
  - SQLAlchemy 2.x async engine & session infrastructure
  - Alembic migration environment initialized
  - React + Vite + TypeScript frontend with Tailwind CSS
  - Vitest & Pytest suites configured and verified
  - Docker Compose orchestration
- [ ] **Prompt 2**: User Authentication & Seller Management *(Upcoming)*
