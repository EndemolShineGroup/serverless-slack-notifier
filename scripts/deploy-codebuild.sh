#!/usr/bin/env bash

aws cloudformation deploy --template-file conf/template.yml --stack-name serverless-stack-notifier-codebuild --region eu-west-1 --capabilities CAPABILITY_NAMED_IAM
