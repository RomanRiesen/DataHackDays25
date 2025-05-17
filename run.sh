#! /usr/bin/sh
uv sync
docker compose up psql -d &
uv run ./main.py &
pushd .
cd frontend
npm run dev
popd
