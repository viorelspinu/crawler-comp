# Stage 0, based on Node.js, to build and compile Angular
FROM node:10.4.0 as node
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY ./ /app/
RUN npm run build

# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:1.13
COPY --from=node /app/dist/crawler-comp /usr/share/nginx/html
COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf
