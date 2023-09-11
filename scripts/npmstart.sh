#!/bin/bash
sudo npm install npm@latest
pm2 save
pm2 restart all --update-env