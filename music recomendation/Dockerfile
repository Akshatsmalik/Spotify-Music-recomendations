FROM node:18-alpine

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose the port Vite runs on
EXPOSE 5173

# Command to start the Vite development server
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
