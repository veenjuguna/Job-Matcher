from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import os

app = FastAPI()

# Allow frontend to talk to backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Vite default port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Ensure uploads folder exists
os.makedirs("uploads", exist_ok=True)

# Store users in memory (replace with DB later)
users = []

@app.post("/upload/")
async def upload_resume(file: UploadFile = File(...), name: str = ""):
    try:
        # Save file
        contents = await file.read()
        with open(f"uploads/{file.filename}", "wb") as f:
            f.write(contents)

        # Save user
        if name:
            users.append({"name": name, "file": file.filename})

        return {"message": f"Upload successful! Resume saved for {name}"}
    except Exception as e:
        return {"message": f"Upload failed: {str(e)}"}

@app.get("/users/")
def get_users():
    return {"users": users}

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=5000)
