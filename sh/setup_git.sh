#!/bin/bash
echo "Remove default Origin";
git remote remove origin
echo "Set default Origin to Gitlab";
git remote add origin git@gitlab.com:LKDevelopment/hetzner-cloud-mobile-app.git
echo "Gitlab Mirror";
git remote set-url --add --push origin git@gitlab.com:LKDevelopment/hetzner-cloud-mobile-app.git
echo "GitHub Mirror";
git remote set-url --add --push origin git@github.com:LKDevelopment/hetzner-cloud-mobile-app.git
echo "Ionic JS Mirror";
git remote set-url --add --push origin git@git.ionicjs.com:lkdev/hetzner-cloud-app.git
echo "Setup done now fetch everything from gitlab";
git fetch
git push --
