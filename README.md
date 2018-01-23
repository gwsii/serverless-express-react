# serverless-express-react

Minimal [ReactJS](https://github.com/facebook/create-react-app)
hosted with [Express](https://expressjs.com/) 
via [API Gateway](https://aws.amazon.com/api-gateway/)
deployed via [Serverless](https://serverless.com/).

The [aws-serverless-express project](https://github.com/awslabs/aws-serverless-express)
is used to plumb API Gateway through to the Express backend.

## Install

`yarn install` for browser-client project

`yarn install` at root of project

## Deploy

Ensure that appropriate
[AWS credentials](https://docs.aws.amazon.com/sdk-for-java/v1/developer-guide/setup-credentials.html) 
are available to deploy the API Gateway & Lambda.

To deploy a development environment, run:
`npm run build-and-deploy:dev`

Your output should look like:
```
/usr/local/bin/node /usr/local/lib/node_modules/npm/bin/npm-cli.js run build-and-deploy:dev --scripts-prepend-node-path=auto

> serverless-express-react@0.0.0 build-and-deploy:dev /Users/gregory/git/serverless-express-react
> node ./build.js dev

Building for STAGE "dev"...

> browser-client@0.1.0 build /Users/gregory/git/serverless-express-react/browser-client
> react-scripts build

Creating an optimized production build...
Compiled successfully.

File sizes after gzip:

  35.2 KB  build/static/js/main.8236bafd.js
  299 B    build/static/css/main.c17080f1.css

The project was built assuming it is hosted at /dev/.
You can control this with the homepage field in your package.json.

The build folder is ready to be deployed.

Deploying STAGE "dev"...
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
region: us-east-1
stack: express-react-dev
api keys:
  None
endpoints:
  ANY - https://y8ujphnj17.execute-api.us-east-1.amazonaws.com/dev
  ANY - https://y8ujphnj17.execute-api.us-east-1.amazonaws.com/dev/{proxy+}
functions:
  root: express-react-dev-root
  proxy: express-react-dev-proxy
Done.

Process finished with exit code 0
```