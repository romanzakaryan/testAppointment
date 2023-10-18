# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the app source code to the container
COPY . .

# Build the React app
RUN npm run build

# Expose a port if necessary
# EXPOSE 80

# Define the command to start your app
CMD ["npm", "start"]