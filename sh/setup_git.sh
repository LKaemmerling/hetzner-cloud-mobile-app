#!/bin/bash
echo "Remove default Origin";
git remote remove origin
echo "Set default Origin to Gitlab";
git remote add origin git@gitlab.com:LKDevelopment/hetzner-cloud-mobile-app.git
echo "Setup done now fetch everything from gitlab";
git fetch
git push --set-upstream origin master
