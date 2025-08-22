# main.py (FastAPI backend for handling resume uploads)

from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

app = FastAPI()

# Add CORS middleware to allow requests from the frontend (React app on port 3000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Adjust if your frontend port is different
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/upload/")
async def upload_resume(file: UploadFile = File(...)):
    try:
        # Read the file contents (you can add parsing logic here, e.g., for PDF resumes)
        contents = await file.read()
        
        # For now, just simulate processing (e.g., save to disk or analyze)
        # Example: Save the file locally
        with open(f"uploads/{file.filename}", "wb") as f:
            f.write(contents)
        
        # Return a success message (matches frontend expectation)
        return {"message": "Upload successful! Resume processed."}
    except Exception as e:
        return {"message": f"Upload failed: {str(e)}"}

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)