FROM node:18-alpine
workdir /app
copy package*.json ./
run npm install
COPY . .
expose 4000
cmd ["npm","start"]
