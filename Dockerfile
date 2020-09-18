# imports node
FROM node:14 as build-deps

# enviroment variables
ENV STAGE="dev"

# sets working directory
WORKDIR /usr/src/app

# copies package.json and installs
COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent

# copies all files to working directory
COPY . ./

# build app
RUN npm build

# imports nginx
FROM nginx:1.18-alpine

# copies built app from build folder
COPY --from=build-deps /usr/src/app/build /usr/share/nginx/html


# Runs server
CMD ["nginx", "-g", "daemon off;"]