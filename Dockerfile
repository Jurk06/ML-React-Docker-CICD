# -----------------
# Backend (FastAPI)
# -----------------
FROM python:3.10-slim AS backend

WORKDIR /app

# Install Python dependencies
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend code
COPY backend/ ./backend/

# -----------------
# Frontend (React + Vite)
# -----------------
FROM node:18 AS frontend

WORKDIR /frontend

COPY frontend/package*.json ./
RUN npm install

COPY frontend/ ./
RUN npm run build

# -----------------
# Final Stage
# -----------------
FROM python:3.10-slim

WORKDIR /app

# Copy backend again
COPY backend/ ./backend/
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r backend/requirements.txt

# Copy built frontend
COPY --from=frontend /frontend/dist ./frontend/dist

# Expose port
EXPOSE 7860

# Run FastAPI with uvicorn
CMD ["uvicorn", "backend.app:app", "--host", "0.0.0.0", "--port", "7860"]
