FROM node:14-alpine

WORKDIR /app

ENV STAGE="dev"

COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent

COPY . ./

# start app in development
CMD ["npm", "start"]

# figure out staging envirments
#how we want to host frontend in staging and prod. If using AWS/GCP we can using nginx, if he use heroku (bundles hosting)
# we can either push directly from docker or travis. 