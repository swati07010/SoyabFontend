# Step 1: Build the React app
FROM node:18 AS build
WORKDIR /ekosmart
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Step 2: Serve using nginx
FROM nginx:alpine
COPY --from=build /ekosmart/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
