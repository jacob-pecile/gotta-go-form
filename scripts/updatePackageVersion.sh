#!/bin/bash

BUILD_VERSION=$1

NEW_VERSION="\"1.0.$BUILD_VERSION\""

sed -i "s/\"version\": \"1.0.0\"/\"version\": $NEW_VERSION/g" package.json