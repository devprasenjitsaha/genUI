import os
import uvicorn
from dotenv import load_dotenv
from google.adk.cli.fast_api import get_fast_api_app

load_dotenv()

# Build the ADK FastAPI app (serves all agents in the current package)
app = get_fast_api_app()

if __name__ == "__main__":
    host = os.getenv("HOST", "0.0.0.0")
    port = int(os.getenv("PORT", "8000"))
    uvicorn.run(app, host=host, port=port)
