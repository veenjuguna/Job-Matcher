from fastapi import FastAPI, UploadFile, File # type: ignore
from fastapi.middleware.cors import CORSMiddleware # type: ignore
import uvicorn # type: ignore

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Add this root route anywhere after `app = FastAPI()`
@app.get("/")
def root():
    return {"message": "Backend is running!"}

# Existing routes
@app.post("/upload/")
async def upload_resume(file: UploadFile = File(...)):
    contents = await file.read()
    with open(f"uploads/{file.filename}", "wb") as f:
        f.write(contents)
    return {"message": "Upload successful! Resume processed."}

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=5000)
