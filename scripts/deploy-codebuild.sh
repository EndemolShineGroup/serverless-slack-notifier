#!/usr/bin/env bash

aws cloudformation deploy --template-file conf/template.yml --stack-name "serverless-stack-notifier-codebuild" --region us-east-1 --capabilities CAPABILITY_NAMED_IAM
sleep 5
aws codebuild update-webhook --project-name "serverless-slack-notifier" --region us-east-1 --branch-filter "^develop|master$"
