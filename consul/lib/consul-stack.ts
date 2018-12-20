import cdk = require('@aws-cdk/cdk');

export class ConsulStack extends cdk.Stack {
  constructor(parent: cdk.App, name: string, props?: cdk.StackProps) {
    super(parent, name, props);

    // The code that defines your stack goes here

    // LoadBalancer

    // Userdata

    // Ec2 Resources (Launch Config & Autoscaling Group)

  }
}