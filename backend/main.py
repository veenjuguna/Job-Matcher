from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import os

app = FastAPI()

# Allow frontend to communicate
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Root route to check backend
@app.get("/")
async def root():
    return {"message": "Backend is running!"}

# Upload route
@app.post("/upload/")
async def upload_resume(file: UploadFile = File(...)):
    os.makedirs("uploads", exist_ok=True)
    content = await file.read()
    with open(f"uploads/{file.filename}", "wb") as f:
        f.write(content)
    return {"message": f"{file.filename} uploaded successfully!"}
