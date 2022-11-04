#!/bin/sh 
echo "Running Shell Script..."
echo "Installing Frontend VueJS Application Dependencies"

npm install

if [ $? -ne 0 ]; then
    echo "Failed to Install Project Dependencies"
    exit 1;
else 
    echo "Dependencies has been successfully Installed"
fi

echo "Running Frontend Components Unittests" 
function() {
    let AllPassed = 1;
    for unittest in `ls ./tests/`; do 
        npm test ./tests/${unittest}
        if [ $? -ne 0]; then echo "Unitests at file ./tests/${unittest} has failed!"; AllPassed = 1;
        else echo "Test at file ./tests/${unittest} has been passed"
        fi
    return AllPassed
}()

if [ $? -ne 0 ]; then
    echo "Unittests did not passed, exiting..."
    exit 1;
fi 
else 
    echo "Unittests has been executed successfully"

cd ./src/webhooks/ && node paymentWebhookService.js & 
if [ $? -ne 0 ]; then
    echo "Failed to run Payment Webhook Server in the background"
    exit 1;
else 
    echo "Payment Webhook HTTP Server has run successfully!"
fi

echo "Running the Http Server"
npm run serve

if [ $? -ne 0 ]; then
    echo "Failed to run HTTP Server"
    exit 1;
else 
    echo "HTTP Server is up and running."
fi

exec "$@"