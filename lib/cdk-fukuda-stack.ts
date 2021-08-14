import * as cdk from '@aws-cdk/core';
import ec2 = require('@aws-cdk/aws-ec2');
import { CfnSubnet, Peer, Port, SecurityGroup } from "@aws-cdk/aws-ec2";

export class CdkFukudaStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

/*
    const vpc = ec2.Vpc.fromLookup(this, 'Vpc', {
      vpcName: "vpc-system-ap-northeast-1"
    });
    */

    const vpc = new ec2.Vpc(this, "VPC-Fukuda", {
      cidr: "192.168.0.0/16",
      subnetConfiguration: [
        {
          cidrMask: 24,
          name: "public-1",
          subnetType: ec2.SubnetType.PUBLIC,
        },
        {
          cidrMask: 24,
          name: "private",
          subnetType: ec2.SubnetType.PRIVATE,
        },
      ],
    });

    const securityGroup = new SecurityGroup(this, "SecurityGroup", {
      vpc: vpc,
    });

    vpc.selectSubnets({ subnetGroupName: "public-1" }).subnets.forEach((x) => {
      const cfnSubnet = x.node.defaultChild as CfnSubnet;
      securityGroup.addIngressRule(
        Peer.ipv4(cfnSubnet.cidrBlock),
        Port.tcp(5432)
      );
    });

    const image = new ec2.AmazonLinuxImage()
    new ec2.Instance(this, 'CdkFukudaStack', {
      vpc: vpc,
      instanceType: ec2.InstanceType.of(ec2.InstanceClass.T2, ec2.InstanceSize.MICRO),
      machineImage: image
    })

  }
}
