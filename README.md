# Best XI Predictor - Cricket Application

## Overview
This project is a complete end-to-end "Best XI Predictor" cricket application that predicts the best playing eleven from a given set of players based on various performance factors. It includes data processing, backend API, frontend UI, model serving, deployment, testing, and monitoring.

## Architecture
- Frontend: React + Tailwind CSS with React Context for state management
- Backend: FastAPI REST API serving prediction endpoint
- Model: Random Forest Classifier pipeline with scikit-learn
- Data Storage: PostgreSQL for aggregates, MongoDB for caching
- Feature Store: S3 or object store with Airflow/Prefect pipelines (stubbed)
- Deployment: Docker Compose for local, Kubernetes with Helm charts for production
- CI/CD: GitHub Actions for build, test, and deployment
- Monitoring: Prometheus + Grafana, ELK stack, Sentry (placeholders)

## Project Structure
```
best-xi-predictor/
├── backend/
│   ├── app/
│   │   ├── api/
│   │   │   └── predict_xi.py
│   │   ├── data_processing/
│   │   │   ├── data_ingestion.py
│   │   │   └── feature_engineering.py
│   │   ├── db/
│   │   │   ├── mongo_cache.py
│   │   │   └── postgres.py
│   │   ├── models/
│   │   │   └── rf_model.py
│   │   ├── config.py
│   │   ├── main.py
│   │   └── utils.py
│   ├── Dockerfile
│   └── requirements.txt
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── FactorSelector.jsx
│   │   │   ├── PlayerInput.jsx
│   │   │   └── ResultsPanel.jsx
│   │   ├── context/
│   │   │   └── AppContext.jsx
│   │   ├── App.jsx
│   │   └── index.jsx
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── package.json
│   └── Dockerfile
├── infra/
│   ├── docker-compose.yml
│   └── helm/
│       └── charts/
│           └── best-xi-predictor/
│               ├── Chart.yaml
│               ├── values.yaml
│               └── templates/
│                   ├── deployment.yaml
│                   ├── ingress.yaml
│                   └── service.yaml
├── tests/
│   ├── backend/
│   │   ├── test_api.py
│   │   └── test_feature_engineering.py
│   ├── e2e/
│   │   └── cypress/
│   │       └── integration/
│   │           └── full_flow_spec.js
│   └── frontend/
│       ├── FactorSelector.test.jsx
│       ├── PlayerInput.test.jsx
│       └── ResultsPanel.test.jsx
├── .github/
│   └── workflows/
│       └── ci-cd.yml
├── .eslintrc.js
├── .gitignore
└── .prettierrc
```

## Local Development Setup

### Backend
```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Docker Compose
```bash
docker-compose up --build
```

## API Endpoint
- POST `/api/predict-xi`
- Request body:
```json
{
  "players": ["Player A", "Player B", ..., "Player V"],
  "factors": ["recentForm", "headToHeadAvg", "deathOverEconomy"]
}
```
- Response:
```json
{
  "selectedXI": [
    { "name": "Player X", "role": "Batsman", "score": 0.87, "keyStats": { "avg": 42.1, "sr": 135.2 } },
    ...
  ]
}
```

## Testing
- Backend: PyTest
- Frontend: Jest + React Testing Library
- E2E: Cypress

## CI/CD
GitHub Actions pipeline builds, tests, and pushes Docker images.

## Monitoring & Logging
Placeholders for Prometheus, Grafana, ELK, and Sentry integration.

## Next Steps
- Implement feature store pipelines
- Model training and hyperparameter tuning
- Full deployment on Kubernetes with Helm
