## Install necessary software on an ec2 instance, providing
## Consul and Nomad.
variable "region" {
    default = "us-west-2"
}
provider "aws" {
    region = "${var.region}"
}

resource "aws_iam_role" "artifacts" {
    name = "artifacts"
    assume_role_policy = "${data.aws_iam_policy_document.artifacts}"
}