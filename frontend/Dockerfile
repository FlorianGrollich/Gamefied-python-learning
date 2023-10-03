# Stage 1: Build the React application
FROM node:14 AS build
WORKDIR /usr/src/app
COPY ./frontend/package*.json ./
RUN npm install
COPY ./frontend/ ./
RUN npm run build

# Stage 2: Serve the React application from Nginx
FROM nginx:alpine
COPY --from=build /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
