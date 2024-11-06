# Use Node.js image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app's source code
COPY . .

# Expose the port that the development server uses
EXPOSE 5173

# Command to start the development server
CMD ["npm", "run", "dev", "--", "--host"]