import * as AwsCdkVitest from '../lib/aws-cdk-vitest-stack.js';
import * as cdk from 'aws-cdk-lib/core';
import { Template } from 'aws-cdk-lib/assertions';
import { expect, test } from 'vitest';

// example test. To run these tests, uncomment this file along with the
// example resource in lib/aws-cdk-vitest-stack.ts
test('SQS Queue Created', () => {
  const app = new cdk.App();
  // WHEN
  const stack = new AwsCdkVitest.AwsCdkVitestStack(app, 'MyTest');
  // THEN
  const template = Template.fromStack(stack);

  expect(template).toBeTruthy();

});
