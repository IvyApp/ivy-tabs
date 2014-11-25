#!/bin/sh
echo "Building global/shim dist files..."
rm -rf ./dist
cd ./packaging
../node_modules/.bin/broccoli build ../dist
