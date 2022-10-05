FROM node:lts-alpine
LABEL "Author"="Kirill Klimushin"

# Initializing Project Directory
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
ENTRYPOINT ["npm", "run", "serve"]
