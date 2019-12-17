## Fastly Public IP Security Group Sync

A small-ish lambda to make sure that a security group has the most up-to-date public IP addresses for Fastly.

After installing the lambda, a new security group will be created called `external-fastly-ips` that will have an up-to-date list of [public Fastly IPs](https://api.fastly.com/public-ip-list).

### Deploy

In order to run this in your account, you simply need to pull down the code and run the serverless CLI to deploy.

- `git clone git@github.com/chaseconey/sync-fastly-ips`
- `npm i`
- `npm install -g serverless`
- `cp serverless-inputs.example.yml serverless-inputs.yml`
- Fill out `serverless-inputs.yml` with personal values
- `serverless deploy`

### Resources Created

This serverless deployment will create a few AWS resources to be aware of.

- A CloudFormation Stack
- An AWS Role that has permissions to:
  - Create security groups
  - Update security groups
- A Lambda function
- A CloudWatch event that will kick off the lambda once per hour

### Running Locally

TBD

### Testing

```
npm test
```
