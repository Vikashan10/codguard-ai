# Node.js 22 alpine base image
FROM node:22-alpine

WORKDIR /app

# Install dependencies first for efficient layer caching
COPY package.json package-lock.json* ./
RUN npm install

# Copy application code
COPY . .

# Expose Vite dev server port
EXPOSE 5173

# Start Vite dev server accessible externally
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
