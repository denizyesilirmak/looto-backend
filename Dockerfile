FROM node:19

# Create app directory
WORKDIR /loto-server

# Install app dependencies
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

ENV MONGO_URI = ${MONGO_URI} 
ENV PORT = ${PORT} 
ENV API_VERSION = ${API_VERSION} 
ENV JWT_SECRET = ${JWT_SECRET} 
ENV RESEND_API_KEY = ${RESEND_API_KEY} 
ENV GMAIL_CLIENT_ID = ${GMAIL_CLIENT_ID} 
ENV GMAIL_CLIENT_SECRET = ${GMAIL_CLIENT_SECRET} 
ENV GMAIL_REDIRECT_URI = ${GMAIL_REDIRECT_URI} 
ENV GMAIL_ACCESS_TOKEN = ${GMAIL_ACCESS_TOKEN} 
ENV GMAIL_REFRESH_TOKEN = ${GMAIL_REFRESH_TOKEN} 
ENV GMAIL_TYPE_TOKEN = ${GMAIL_TYPE_TOKEN} 
ENV GMAIL_SCOPE_TOKEN = ${GMAIL_SCOPE_TOKEN} 
ENV GMAIL_EXPIRE_TOKEN = ${GMAIL_EXPIRE_TOKEN} 

RUN npm run build

EXPOSE 9000

CMD [ "npm", "run", "start" ]