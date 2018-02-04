# serverless-express-react

Minimal [ReactJS](https://github.com/facebook/create-react-app)
hosted with [Express](https://expressjs.com/) 
via [API Gateway](https://aws.amazon.com/api-gateway/)
deployed via [Serverless](https://serverless.com/).

The [aws-serverless-express project](https://github.com/awslabs/aws-serverless-express)
is used to plumb API Gateway through to the Express backend.

## Install

`yarn install` for `/browser-client` project

`yarn install` at root of project

## Local Development

To run in a local development environment, use
`npm run build:local`
to build the client applicatoin and then
`npm start`
to host the site locally at [http://localhost:3000](http://localhost:3000).

## Deploy

Ensure that appropriate
[AWS credentials](https://docs.aws.amazon.com/sdk-for-java/v1/developer-guide/setup-credentials.html) 
are available to deploy the API Gateway & Lambda.

To build and deploy your application to AWS as a 'dev' stage, use
`npm run build:dev`
to build the React client, followed by
`npm run deploy:dev`
to deploy your application using Serverless.

Your output should look like:
```
> npm run deploy:dev
Serverless: Packaging service...
Serverless: Excluding development dependencies...
Serverless: Uploading CloudFormation file to S3...
Serverless: Uploading artifacts...
Serverless: Uploading service .zip file to S3 (54.92 MB)...
Serverless: Validating template...
Serverless: Updating Stack...
Serverless: Checking Stack update progress...
....................
Serverless: Stack update finished...
Service Information
service: express-react
stage: dev
region: us-west-2
stack: express-react-dev
api keys:
  None
endpoints:
  ANY - https://xxxxxxxxxx.execute-api.us-west-2.amazonaws.com/dev
  ANY - https://xxxxxxxxxx.execute-api.us-west-2.amazonaws.com/dev/{proxy+}
functions:
  root: express-react-dev-root
  proxy: express-react-dev-proxy
```

Notice that the URL endpoints for your application are provided at the end of the output
under `endpoints`. Request the first URL in the list with your browser and your application
is served from AWS API Gateway.

To deploy to a `prod` environment, use `npm run build:prod` and `npm run deploy:prod`.

## Remove

Once you are ready to decommission the website, use the
`npm run remove:dev` or `npm remove:prod`
to remove the associated AWS API Gateway and related resources. 

## Deploy

Ensure that appropriate
[AWS credentials](https://docs.aws.amazon.com/sdk-for-java/v1/developer-guide/setup-credentials.html) 
are available to deploy the API Gateway & Lambda.

To build and deploy your application to AWS as a 'dev' stage, use
`npm run build:dev`
to build the React client, followed by
`npm run deploy:dev`
to deploy your application using Serverless.

## Customizing Stage Name or Deployment Region

By default the two environments supported by this project are `dev` & `prod`
and the AWS API Gateway is deployed to the `us-west-2` region. Update the root 
[package.json](./package.json)
file's `scripts` configuration to include a `build:anotherStage` command:

```
"build:anotherStage": "node ./build.js anotherStage",
```

as well as including a `deploy` and `remove` command for that stage,
where you can also adjust the deployment region:

```
"deploy:anotherStage": "sls deploy --stage anotherStage --region us-east-2",
"remove:anotherStage": "sls remove --stage anotherStage --region us-east-2",
```


