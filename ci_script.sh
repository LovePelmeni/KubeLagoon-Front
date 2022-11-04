#!/bin/sh 
echo "Running Shell Script..."
echo "Installing Frontend VueJS Application Dependencies"

MODULES_INSTALLED = sh "npm install"

if [ $MODULES_INSTALLED -ne 0 ]; then
    echo "Failed to Install Project Dependencies"
    exit 1;
fi 
else 
    echo "Dependencies has been successfully Installed"

echo "Running Frontend Components Unittests" 
UNITTESTS_RUN = function() {
    AllPassed = 1;
    for unittest in `ls ./tests/`; do 
        executed = sh "npm test ./tests/${unittest}" 
        if executed != true {AllPassed = 0;}
        echo "Unitests at file ./tests/${unittest} has failed!"
    return AllPassed
}()

if [ $UNITTESTS_RUN -ne 0 ]; then
    echo "Unittests did not passed, exiting..."
    exit 1;
fi 
else 
    echo "Unittests has been executed successfully"

echo "Running the Http Server"
SERVER_RUNNING = sh "npm run serve" 

if [ $SERVER_RUNNING -ne 0 ]; then
    echo "Failed to run HTTP Server"
    exit 1;
fi 
else 
    echo "HTTP Server is up and running."
exec "$@"