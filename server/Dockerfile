FROM node:16-alpine

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 80

ENV MONGO_URI=secret

ENV PORT=80

ENV JWT_SECRET=secret

ENV JWT_LIFETIME=10d

ENV SENDGRID_API_KEY=secret

CMD ["node", "app"]