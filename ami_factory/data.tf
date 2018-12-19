data "aws_iam_policy_document" "artifacts" {
    statement {
        principals {
            type = "Service"
            identifiers = ["codepipeline.amazonaws.com"]
        }

        actions = ["sts:AssumeRole"]

        effect = "Allow"
    }
}