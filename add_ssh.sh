#!/bin/bash
set -e # Exit with nonzero exit code if anything fails

openssl aes-256-cbc -K $encrypted_5ce7885c22c1_key -iv $encrypted_5ce7885c22c1_iv -in travis_vue_news_rsa.enc -out travis_vue_news_rsa -d
chmod 600 travis_vue_news_rsa
eval `ssh-agent -s`
ssh-add travis_vue_news_rsa