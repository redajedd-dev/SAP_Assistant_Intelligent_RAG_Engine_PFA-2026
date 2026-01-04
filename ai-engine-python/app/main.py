from fastapi import FastAPI
from app.services.rag_service import RagService

app = FastAPI(title="SAP GenAI Assistant Engine")

# Initialize Service
# In production, might want 'lifecycle' management or dependency injection
rag_service = RagService()

from pydantic import BaseModel

class ChatRequest(BaseModel):
    prompt: str

@app.get("/")
def read_root():
    return {"message": "SAP GenAI Assistant Python Engine Ready"}

@app.post("/api/ingest")
def ingest_data():
    """Trigger data ingestion from SAP OData"""
    return rag_service.ingest_data()

@app.get("/api/ask")
def ask_question(q: str):
    """Ask a question to the GenAI assistant (GET param)"""
    return {"answer": rag_service.ask_sap(q)}

@app.post("/api/chat")
def chat_endpoint(request: ChatRequest):
    """Ask a question to the GenAI assistant (POST JSON)"""
    return {"answer": rag_service.ask_sap(request.prompt)}
