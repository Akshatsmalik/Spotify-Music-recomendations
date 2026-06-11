FROM node:22-slim

WORKDIR /app

# Copy only package.json to avoid Windows lockfile conflicts
COPY package.json ./

# Install dependencies cleanly for Linux
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose the port Vite runs on
EXPOSE 5173

# Command to start the Vite development server
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
