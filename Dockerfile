FROM node:18-alpine as builder
WORKDIR /app/
COPY ./package.json ./
RUN npm install
COPY . .

FROM builder as builder-prod
RUN npm run build:prod

FROM builder as builder-local
RUN npm run build:local

FROM node:18.0-slim as local
COPY --from=builder-local /app/build ./build
RUN npm install -g serve
EXPOSE 3000
CMD ["serve", "-s", "build"]

FROM node:18.0-slim as prod
COPY --from=builder-prod /app/build ./build
RUN npm install -g serve
EXPOSE 3000
CMD ["serve", "-s", "build"]
