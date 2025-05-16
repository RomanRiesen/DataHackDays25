# Use an official Python runtime as a parent image
FROM python:3.12-slim AS base

# Prevent Python from writing pyc files to disc
ENV PYTHONDONTWRITEBYTECODE=1
# Prevent Python from buffering stdout and stderr
ENV PYTHONUNBUFFERED=1

# Install uv globally in the base image
# This makes uv available in subsequent stages
RUN pip install uv

# --- Development Stage ---
# Use the base image with uv installed
FROM base AS dev

# Set the working directory in the container
WORKDIR /app

# Copy the requirements file into the container at /app
# Assuming you have a requirements.txt file in the same directory as your Dockerfile
COPY pyproject.toml uv.lock ./


# Install the dependencies using uv
# uv sync reads requirements.txt and installs dependencies
RUN uv sync

# Expose the port that JupyterLab runs on
EXPOSE 8888

# Command to run JupyterLab
# This command runs JupyterLab as the main process in the foreground.
# Running a process truly in the background within a Docker CMD/ENTRYPOINT
# is generally not recommended as the container's lifecycle is tied to
# the main process.
# --ip=0.0.0.0 makes JupyterLab accessible from outside the container
# --allow-root is often needed when running as root inside the container (common in Docker)
# --no-browser prevents it from trying to open a browser window (which won't work in a container)
CMD ["jupyter", "lab", "--ip=0.0.0.0", "--allow-root", "--no-browser"]

# To build this Dockerfile:
# docker build -t my-jupyter-app:dev --target dev .

# To run the container:
# docker run -p 8888:8888 my-jupyter-app:dev
# Then access JupyterLab via http://localhost:8888 in your browser

