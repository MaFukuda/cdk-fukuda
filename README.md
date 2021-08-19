# Welcome to your CDK TypeScript project!

This is a blank project for TypeScript development with CDK.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

 * `npm run build`   compile typescript to js
 * `npm run watch`   watch for changes and compile
 * `npm run test`    perform the jest unit tests
 * `cdk deploy`      deploy this stack to your default AWS account/region
 * `cdk diff`        compare deployed stack with current state
 * `cdk synth`       emits the synthesized CloudFormation template


## 
* https://docs.google.com/presentation/d/1K5KYcDq8VLgJPJoIzW72nByZUXcmCjLdLT5ZpDa4ieQ/edit#slide=id.p

* https://github.com/weathernews/WRAP-Server-docker/tree/master/clouds/aws
* https://wni.backlog.jp/git/NEWVM/InfraBuilding/tree/master/aws/poc



##

* `nvm use node`    make node.js latest version.
* `npm install`  
* `npm update`      update all modules.
* `aws configure`   ~/.aws/config,credentials
* `npx cdk bootstrap`   
* `npx cdk list`    
* `npx cdk deploy CdkFukudaVpcStack`
* `npx cdk deploy CdkFukudaEc2Stack`
* 

## 参考文献

* https://github.com/aws/aws-cdk
* https://github.com/aws-samples/aws-cdk-examples
* https://cdkworkshop.com/20-typescript.html

### SNS
* https://docs.aws.amazon.com/ja_jp/cli/latest/userguide/cli-services-sns.html

### Lambda + API Gateway
* https://github.com/aws-samples/aws-lambda-sample-applications/blob/master/nodejs10.x/serverless-api-backend/cdk/cdk/lib/cdk-stack.ts
* https://dev.classmethod.jp/articles/apig-and-lambda-best-stack-configuration-with-aws-cdk/
* https://cdkworkshop.com/20-typescript/30-hello-cdk/200-lambda.html
* https://cdkworkshop.com/30-python/30-hello-cdk/200-lambda.html
* https://docs.google.com/presentation/d/1MQo2r-Ud8wZTK2NZT_0wrEnhY1h-6fRupIrfAumpgTg/edit#slide=id.gd98dc08679_0_10
* 
### translate
* https://dev.classmethod.jp/articles/amazon-translate-line-bot/
* https://gitter.im/awslabs/aws-cdk?at=5d9f6f7d0e67130aae4be90e
  * Lambda + translateのRole追加のサンプル
### IAM と連携する AWS のサービス
* https://docs.aws.amazon.com/ja_jp/IAM/latest/UserGuide/reference_aws-services-that-work-with-iam.html

##
* `ssh -T git@github.com` check ssh connection.
* `git remote add origin git@github.com:MaFukuda/cdk-fukuda.git`
* `git push -u origin master`