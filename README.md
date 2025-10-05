# Real-Time Cryptocurrency Trading Analytics System

This project implements a real-time cryptocurrency trading analytics system using **Redpanda**, **Node.js**, **SQL**, and **NextJS/React with TypeScript**. It processes trade data, calculates technical indicators (RSI), and displays them on an interactive dashboard.

---

## Table of Contents

- [Technologies](#technologies)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
  - [Prerequisites](#prerequisites)
  - [Phase 1: Infrastructure Setup (Docker + Redpanda)](#phase-1-infrastructure-setup-docker--redpanda)
  - [Phase 2: Data Ingestion (CSV → Redpanda)](#phase-2-data-ingestion-csv--redpanda)
  - [Phase 3: Backend Processing (RSI Calculation)](#phase-3-backend-processing-rsi-calculation)
  - [Phase 4: Frontend Dashboard](#phase-4-frontend-dashboard)
- [Usage](#usage)
- [AI Tools Used](#ai-tools-used)
- [Notes & Assumptions](#notes--assumptions)

---

## Technologies

- **Backend:** Node.js, Express.js, SQL (MySQL/PostgreSQL)
- **Frontend:** NextJS (React) + TypeScript, Chart.js/Recharts
- **Streaming:** Redpanda (Kafka API compatible)
- **Containerization:** Docker & Docker Compose
- **Other:** CSV parsing, dotenv

---

## Project Structure

