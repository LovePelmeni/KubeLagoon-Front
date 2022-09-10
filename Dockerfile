FROM node:lts-alpine
LABEL "Author"="Kirill Klimushin"

CMD mkdir /project/dir/
WORKDIR /project/dir/

RUN npm install -g http-server

# Copying Packages to the Main Directory
COPY package*.json ./

# Copying Source...
COPY . .

# Installing Dependencies
RUN npm install

# Running Unittests 
RUN npm test

# Bulding App
RUN npm run build

# Running Http Server
ENTRYPOINT ["npm", "run", "serve"]


