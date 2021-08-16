import * as cdk from '@aws-cdk/core';
import * as sqs from '@aws-cdk/aws-sqs';
import * as sns from '@aws-cdk/aws-sns';
import * as subs from '@aws-cdk/aws-sns-subscriptions';
import { Duration } from '@aws-cdk/aws-iam/node_modules/@aws-cdk/core';

export class CdkFukudaSnsStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

   
    
    const queue = new sqs.Queue(this, 'HelloCdkQueue', {
      //visibilityTimeout: cdk.Duration.seconds(300)
      visibilityTimeout: Duration.seconds(300)
    });
    
    const topic = new sns.Topic(this, 'HelloCdkTopic');
    
    topic.addSubscription(new subs.SqsSubscription(queue));

  }
}
