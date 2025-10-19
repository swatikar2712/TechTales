from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Allow your Flutter app to connect (CORS)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # for dev, allow all origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Query(BaseModel):
    prompt: str

@app.post("/get-response")
async def get_response(query: Query):
    prompt = query.prompt

    # Dummy response for now
    text_response = f"Echo from backend: {prompt}"

    return {"response": text_response}

# Run with: uvicorn main:app --reload
