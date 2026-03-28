#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib/core';
import { AwsCdkStack } from '../lib/aws-cdk-stack.js';

const app = new cdk.App();
new AwsCdkStack(app, 'AwsCdk', {
});
