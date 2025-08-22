from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn, os

app = FastAPI()

# Allow frontend (Vite=5173, CRA=3000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:5177"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

users = []  # in-memory "db"

class User(BaseModel):
    name: str

@app.get("/api/users")
async def get_users():
    return users

@app.post("/api/users")
async def create_user(user: User):
    new_user = {"id": len(users) + 1, "name": user.name}
    users.append(new_user)
    return new_user

@app.post("/upload/")
async def upload_resume(file: UploadFile = File(...)):
    try:
        os.makedirs("uploads", exist_ok=True)
        contents = await file.read()
        with open(f"uploads/{file.filename}", "wb") as f:
            f.write(contents)
        return {"message": "Upload successful! Resume processed."}
    except Exception as e:
        return {"message": f"Upload failed: {str(e)}"}

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)
