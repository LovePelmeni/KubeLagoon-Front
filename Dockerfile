FROM node:lts-alpine
LABEL "Author"="Kirill Klimushin"

# Initializing Project Directory
CMD mkdir /project/dir/
WORKDIR /project/dir/

# Copying Packages to the Main Directory
COPY package*.json ./

# Copying Source...
COPY . .

COPY ./ci_script.sh ./
RUN chmod +x ./ci_script.sh 

# Running Shell Script 
ENTRYPOINT ["sh", "./ci_script.sh"]


