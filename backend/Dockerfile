FROM python:3.10-slim

WORKDIR /app

# Copy the requirements file into the container
COPY requirements.txt .

# Install the Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the backend files into the container
COPY . .

# Expose the port the app runs on
EXPOSE 8000

# Command to run the FastAPI application
CMD ["uvicorn", "test:app", "--host", "0.0.0.0", "--port", "8000"]
