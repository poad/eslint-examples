import * as cdk from 'aws-cdk-lib/core';
import { Construct } from 'constructs';

interface AwsCdkVitestStackProps extends cdk.StackProps {
  readonly test?: string;
}

export class AwsCdkVitestStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: AwsCdkVitestStackProps) {
    super(scope, id, props);

    cdk.RemovalPolicies.of(this).destroy();
  }
}
