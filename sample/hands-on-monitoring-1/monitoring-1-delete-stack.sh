#/bin/sh

set -e -u -o pipefail

profile=default
region=ap-northeast-1

delete_stack () {
    echo "Delete stack"
    aws cloudformation delete-stack --stack-name monitoring-1 --region $region --profile $profile
    aws cloudformation wait stack-delete-complete --stack-name monitoring-1 --region $region --profile $profile
}

time delete_stack