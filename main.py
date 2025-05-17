from fastapi import FastAPI, Query
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware

from qdrant_client import QdrantClient

import os
from dotenv import load_dotenv
import psycopg2
import uvicorn
import datetime

# Load environment variables from .env
load_dotenv()

PGDATABASE = os.getenv("POSTGRES_DB")
PGUSER = os.getenv("POSTGRES_USER")
PGPASSWORD = os.getenv("POSTGRES_PASSWORD")
PGPORT = os.getenv("PGPORT", 5432)

app = FastAPI()

# Allow CORS for http://localhost:3000
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



def get_db_connection():
    return psycopg2.connect(
        host="localhost",
        database=PGDATABASE,
        user=PGUSER,
        password=PGPASSWORD,
        port=PGPORT,
    )


def serialize_row(row):
    """Convert datetime objects in a dict to ISO strings."""
    for k, v in row.items():
        if isinstance(v, (datetime.datetime, datetime.date)):
            row[k] = v.isoformat()
    return row


@app.get("/search_votum")
def search_votum(keyword: str = Query(..., min_length=1)):
    conn = get_db_connection()
    cur = conn.cursor()
    query = """
        SELECT * FROM votums
        WHERE votum_text ILIKE %s
        LIMIT 50;
    """
    cur.execute(query, (f"%{keyword}%",))
    columns = [desc[0] for desc in cur.description]
    results = []
    for row in cur.fetchall():
        row_dict = serialize_row(dict(zip(columns, row)))
        row_dict["type"] = "speech"
        results.append(row_dict)
    cur.close()
    conn.close()
    return JSONResponse(content=results)



def main():
    print("Hello from datahackdasbern25!")
    conn = psycopg2.connect(
        host="localhost",
        database=PGDATABASE,
        user=PGUSER,
        password=PGPASSWORD,
        port=PGPORT,
    )

    print("Connected to PostgreSQL!")



# Serve static files from ./frontend/out at the root path
app.mount("/", StaticFiles(directory="./frontend/out", html=True), name="static")

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
