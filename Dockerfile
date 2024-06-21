# Use a lightweight Node.js image as base
FROM node:14-alpine AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Build Vue.js application for production
RUN npm run build

# Stage 2: Serve using Nginx
FROM nginx:alpine

# Copy built files from previous stage to nginx public directory
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 8080
EXPOSE 8080

# Start nginx
CMD ["nginx", "-g", "daemon off;"]