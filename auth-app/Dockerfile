ARG NODE_VERSION=20.2.0

FROM node:${NODE_VERSION}-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

# Copy the rest of the source files into the image.
COPY . .
COPY .env ./

# Expose the port that the application listens on.
EXPOSE 3000

# Run the application.
CMD npm run dev
