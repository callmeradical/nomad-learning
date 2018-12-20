#!/usr/bin/env node
import cdk = require('@aws-cdk/cdk');
import { ConsulStack } from '../lib/consul-stack';

const app = new cdk.App();
new ConsulStack(app, 'ConsulStack');
app.run();
