#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { CdkFukudaVpcStack } from '../lib/cdk-fukuda-vpc-stack';
import { CdkFukudaEc2Stack } from '../lib/cdk-fukuda-ec2-stack';

const app = new cdk.App();




new CdkFukudaVpcStack(app, 'CdkFukudaVpcStack', {
//env: { account: "910003668865", region: "ap-northeast-1" }, // dev-wao-aedyn
env: { account: "964922594927", region: "ap-northeast-1" }, // awshandson1841

  /* If you don't specify 'env', this stack will be environment-agnostic.
   * Account/Region-dependent features and context lookups will not work,
   * but a single synthesized template can be deployed anywhere. */

  /* Uncomment the next line to specialize this stack for the AWS Account
   * and Region that are implied by the current CLI configuration. */
  // env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },

  /* Uncomment the next line if you know exactly what Account and Region you
   * want to deploy the stack to. */
  // env: { account: '123456789012', region: 'us-east-1' },

  /* For more information, see https://docs.aws.amazon.com/cdk/latest/guide/environments.html */
});


new CdkFukudaEc2Stack(app, 'CdkFukudaEc2Stack', {
  //env: { account: "910003668865", region: "ap-northeast-1" }, // dev-wao-aedyn
  env: { account: "964922594927", region: "ap-northeast-1" }, // awshandson1841

  });
