# SAP GenAI Assistant

Ce projet est un "Boilerplate" Monorepo combinant un backend SAP CAP (Java) et un moteur IA (Python) pour démontrer une architecture RAG (Retrieval-Augmented Generation) avec anonymisation des données sensibles.

## Structure du Projet

```
/sap-genai-assistant
  |-- /sap-backend-cap  # Service OData (Spring Boot + CDS)
  |-- /ai-engine-python # Service IA (FastAPI + LangChain + Gemini)
  |-- /sap-frontend-react # Service Front-end (React + MUI)
```

## Prérequis

- **Java Development Kit (JDK)** 17 ou supérieur.
- **Node.js** (pour les outils CDS).
- **Maven** 3.8+.
- **Python** 3.11+.
- **Docker** & **Docker Compose** (optionnel pour l'exécution conteneurisée).
- Une clé API Google Gemini (à configurer dans `.env`).

## Installation et Lancement

### 1. Configuration

Assurez-vous d'avoir votre clé API Google dans `ai-engine-python/.env` :
```env
GOOGLE_API_KEY=votre_clé_ici
```

### 2. Lancement avec Docker Compose (Recommandé)

A la racine du projet :
```bash
docker-compose up --build
```
- Backend SAP : `http://localhost:8080`
- AI Engine API : `http://localhost:8000`

### 3. Lancement Manuel

#### Service 1 : SAP CAP (Java)
```bash
cd sap-backend-cap
mvn clean spring-boot:run
```
Le service sera accessible sur `http://localhost:8080`.
L'OData service est sur `http://localhost:8080/odata/v4/CatalogService/`.

#### Service 2 : AI Engine (Python)
```bash
cd ai-engine-python
python -m venv venv
source venv/bin/activate  # ou venv\Scripts\activate sur Windows
pip install -r requirements.txt
uvicorn app.main:app --reload
```

## Utilisation

1. **Ingestion des données** :
   POST `http://localhost:8000/api/ingest`
   Cela va lire les données du service SAP, anonymiser les Emails et IBANs, et les indexer dans ChromaDB.

2. **Poser une question** :
   GET `http://localhost:8000/api/ask?q=Quelles sont les commandes de TechMa ?`
   L'assistant répondra en utilisant le contexte sécurisé.
