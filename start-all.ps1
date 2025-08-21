# Navigate to backend
cd 'C:\Users\lenovo\Desktop\Job Matcher\backend'

# Activate virtual environment
.\venv\Scripts\activate

# Ensure python-multipart is installed
pip install python-multipart

# Start FastAPI backend in a new terminal
Start-Process powershell -ArgumentList 'uvicorn main:app --reload'

# Navigate to frontend
cd 'C:\Users\lenovo\Desktop\Job Matcher\resume-matcher'

# Install dependencies if needed
npm install

# Start frontend dev server
npm run dev
