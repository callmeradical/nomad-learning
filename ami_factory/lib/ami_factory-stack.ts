import cdk = require('@aws-cdk/cdk');
import codepipeline = require('@aws-cdk/aws-codepipeline')

import { GitHubSourceAction, ManualApprovalAction } from '@aws-cdk/aws-codepipeline';
import { SecretParameter } from '@aws-cdk/cdk';
import { PipelineProject, PipelineBuildAction } from '@aws-cdk/aws-codebuild';


export class AmiFactoryStack extends cdk.Stack {
  constructor(parent: cdk.App, name: string, props?: cdk.StackProps) {
    super(parent, name, props);

    // The code that defines your stack goes here
    const pipeline = new codepipeline.Pipeline(this, 'AmiFactory', {
      pipelineName: 'AmiFactory',
    });

    pipeline.addInfo("Building codepipeline project...")

   // Source Stage, kicks off entire build 
    const sourceStage = pipeline.addStage('Source', {
      placement: {
        atIndex: 0, // This should be the first stage in the pipeline
      }
    });

    const oauth = new SecretParameter(this, 'GitHubOAuthToken', { 
      ssmParameter: 'my-github-token' 
    }); 

    new GitHubSourceAction(this, 'GitHub_Source',{
      stage: sourceStage,
      owner: 'callmeradical',
      repo: 'nomad-learning',
      branch: 'master', // default: `master`
      oauthToken: oauth.value,
      outputArtifactName: "sourcecode"
    });
    
    // Adding in CodeBuild for Build Action
    const project = new PipelineProject(this, 'CDKTestProject');

    const buildStage = pipeline.addStage('Build');
    new PipelineBuildAction(this, 'CodeBuild', {
      stage: buildStage,
      project,
    });

    // Approval stage
    const approvalStage = pipeline.addStage('ApprovalStage', {
      placement: {
        atIndex: 2, // This is a test and not real life.
      }
    })

    new ManualApprovalAction(this, 'ManualApproval', {
      stage: approvalStage
    });
  }
}