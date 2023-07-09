FROM node:19

# Create app directory
WORKDIR /loto-server

# Install app dependencies
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

RUN npm run build

EXPOSE 9000

CMD [ "npm", "run", "start" ]