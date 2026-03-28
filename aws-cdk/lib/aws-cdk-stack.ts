import * as cdk from 'aws-cdk-lib/core';
import { Construct } from 'constructs';

interface AwsCdkStackProps extends cdk.StackProps {
  readonly test?: string;
}

export class AwsCdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: AwsCdkStackProps) {
    super(scope, id, props);

    cdk.RemovalPolicies.of(this).destroy();
  }
}
