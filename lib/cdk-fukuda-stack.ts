import * as cdk from '@aws-cdk/core';
import ec2 = require('@aws-cdk/aws-ec2')

export class CdkFukudaStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);


    const vpc = ec2.Vpc.fromLookup(this, 'Vpc', {
      vpcName: "vpc-system-ap-northeast-1"
    });

    const image = new ec2.AmazonLinuxImage()
    new ec2.Instance(this, 'CdkFukudaStack', {
      vpc: vpc,
      instanceType: ec2.InstanceType.of(ec2.InstanceClass.T2, ec2.InstanceSize.MICRO),
      machineImage: image
    })

  }
}
