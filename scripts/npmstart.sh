#!/bin/bash
sudo npm install npm@latest
sudo npm install --legacy-peer-deps
sudo npx prisma generate
pm2 save
pm2 restart all --update-env