#!/usr/bin/env node
import { AwsCdkStack } from '../lib/aws-cdk-stack.js';
import * as cdk from 'aws-cdk-lib/core';

const app = new cdk.App();
new AwsCdkStack(app, 'AwsCdk', {
});
