#!/bin/bash

BUILD_VERSION=$1

NEW_VERSION="\"0.1.$BUILD_VERSION\""

sed -i "s/\"version\": \"0.1.1\"/\"version\": $NEW_VERSION/g" package.json