import os
from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from starlette.middleware.cors import CORSMiddleware
import uvicorn

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {"message": "Python backend running with CORS & error handler ✅"}


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 3300))  # default 3300 if not set
    uvicorn.run(
        "main:app",
        host="localhost",
        port=port,
        reload=True
    )
