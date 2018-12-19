#!/usr/bin/env node
import cdk = require('@aws-cdk/cdk');
import { AmiFactoryStack } from '../lib/ami_factory-stack';

const app = new cdk.App();
new AmiFactoryStack(app, 'AmiFactoryStack');

app.run();
