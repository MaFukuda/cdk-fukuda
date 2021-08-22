#/bin/sh

set -e -u -o pipefail

profile=default
region=ap-northeast-1

create_stack () {
    echo "Create stack"
    aws cloudformation create-stack --stack-name monitoring-1 --capabilities CAPABILITY_NAMED_IAM --template-body file://monitoring-1.yaml --region $region --profile $profile
    aws cloudformation wait stack-create-complete --stack-name monitoring-1 --region $region --profile $profile
}

time create_stack