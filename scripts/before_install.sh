#!/bin/bash
# Clean the target directory
echo ">> Cleaning target directory..." | logger -t codedeploy
rm -rf /var/www/html/ccp/*
echo "Directory cleaned."