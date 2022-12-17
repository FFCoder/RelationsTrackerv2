FROM node:latest

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json .

RUN npm install --production

# Bundle app source
COPY . .

# Compile Typescript
RUN npm run build

# Expose port 3000
EXPOSE 3000

# Run the app
CMD [ "npm", "start" ]