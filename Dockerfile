# Use the full Node.js image
FROM node:18 AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app's source code
COPY . .

# Build the production version of the app
RUN npm run build

# Use Nginx to serve the app in production
FROM nginx:alpine

# Copy the production build from the previous stage
COPY --from=build /app/dist /usr/share/nginx/html

# Expose the port that Nginx uses
EXPOSE 80

# Command to run the Nginx server
CMD ["nginx", "-g", "daemon off;"]
