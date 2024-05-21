# The first stage
# Build React static files
FROM node:18-alpine as build

WORKDIR /app/frontend
COPY ./frontend/ ./


RUN yarn install 
# --frozen-lockfile 

RUN yarn build


# The second stage
# Copy React static files and start nginx
FROM nginx

COPY --from=build /app/frontend/dist /usr/share/nginx/html
COPY ./docker/nginx/development /etc/nginx/conf.d


CMD ["nginx", "-g", "daemon off;"]