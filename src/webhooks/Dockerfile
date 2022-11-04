FROM --platform=arm64 node:lts 
LABEL Author="Kirill Klimushin"

WORKDIR /project/dir/
COPY . .

RUN npm install 
RUN chmod +x ./paymentWebhookService.js
ENTRYPOINT ["node", "./paymentWebhookService.js"]