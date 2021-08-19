#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { CdkFukudaVpcStack } from '../lib/cdk-fukuda-vpc-stack';
import { CdkFukudaEc2Stack } from '../lib/cdk-fukuda-ec2-stack';
import { CdkFukudaSnsStack } from '../lib/cdk-fukuda-sns-stack';
import { CdkFukudaLambdaStack } from '../lib/cdk-fukuda-lambda-stack';

const app = new cdk.App();

//const myEnv = { account: "910003668865", region: "ap-northeast-1" }, // dev-wao-aedyn
const myEnv = { account: "964922594927", region: "ap-northeast-1" }; // awshandson1841


new CdkFukudaVpcStack(app, 'CdkFukudaVpcStack', {
  env: myEnv,
});


new CdkFukudaEc2Stack(app, 'CdkFukudaEc2Stack', {
  env: myEnv,
});

new CdkFukudaSnsStack(app, 'CdkFukudaSnsStack', {
  env: myEnv,
});

new CdkFukudaLambdaStack(app, 'CdkFukudaLambdaStack', {
  env: myEnv,
});
