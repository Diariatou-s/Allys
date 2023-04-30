FROM node:16.15.1
WORKDIR /app
COPY package*.json ./
COPY . .
RUN npm install
EXPOSE 3000
ENV MONGO_URI mongodb://localhost:27017/allys
ENV MONGO_INITDB_DATABASE allys
CMD ["node", "index.js"]
