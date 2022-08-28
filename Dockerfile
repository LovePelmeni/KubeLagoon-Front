FROM node:lts-alpine

RUN npm install -g http-server
CMD mkdir /project/dir/
WORKDIR /project/dir/

# Copying Packages to the Main Directory
COPY package*.json ./

# Copying Source...
COPY . .

# Installing Dependencies
RUN npm install

# Bulding App
RUN npm run build

# Running Http Server
ENTRYPOINT ["http-server", "dist"]
