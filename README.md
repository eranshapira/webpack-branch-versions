## UI Branch versions(Part 1)

This article introduces a software development paradigm, which has been implemented and used on Verizon Media Group's Video syndication teams for the past 3 years.

_Branch versions_ allows stakeholders to test and verify different code variants without affecting production.

In our teams, every code change, creates a branch version which allows product managers, QA teams and different stakeholders to test and verify changes, without merging it to master.

The impact is huge, just consider some of the following scenarios:

1. A product manager has a preliminary idea, but to assess its value and refine requirements, more data is required.
Serving a branch version to a group of users with a POC can contribute ideas for a better design and better product planning.

2. A bug is reported - use branch versions to inspect, and before deploying the fix, assign the branch version to a user/PM/QA to verify the fix.
Only then, you update your tests, submit a PR and merge to master.

3. Rollback - A critical bug was deployed, requiring a fast rollback. Now, thanks to branch versions, every version is stored and created per branch, including master branch. this enables us to switch all of the traffic to a specific version instantly.

## So, what defines a branch version?

1. Isolation - The modified code is not part of master branch.
2. Debug - Branch versions contain sourcemaps, developers can inspect code on external environments(extremely useful for cross-browsers)
3. Protected - A branch version can be used only by specific people. (recommended)

The core concept is that a branch version simply represents a different deployment path.

## Implementation

Let's examine the key ingredients for implementing _Branch Versions_.

### Webpack

I've created an [example React application](https://github.com/eranshapira/webpack-branch-versions), which has a webpack usage with the two basic elements necessary for _branch versions_:

1. [dynamic imports](https://webpack.js.org/guides/code-splitting/#dynamic-imports) - each webpack entry point dynamically imports the rest of the bundle. ([index.js](https://github.com/eranshapira/webpack-branch-versions/blob/master/src/index.js) dynamically loads [app.js](https://github.com/eranshapira/webpack-branch-versions/blob/master/src/app.js))
2. [output.publicPath](https://webpack.js.org/configuration/output/#outputpublicpath) - defines an absolute path for bundles, which instructs webpack to load any asset without any relative path issues.

### Deployment

There is only one concept that we need to maintain in our deployment process - Deploying the webpack build result must be uploaded to the same path that was specified in webpack's `config.output.publicPath` configuration value.

### Backend

Now that we have an infrastructure to deploy each branch version to a different path, we need to provide a way to use these versions.

Take a look at the [express.js server](https://github.com/eranshapira/webpack-branch-versions/blob/master/server/index.js), which serves a rather static `index.html` response.

The only dynamic part here is the url prefix for the script tag which loads `main.js`, which should point to the same `publicPath` value assigned to the webpack config.

So for instance, in the example, after `npm install`, follow these steps:
1. `npm run serve` - this will run our example express.js server.
2. open an additional terminal session and use `PUBLIC_PATH=http://localhost:8080/ npm start` - this will run our webpack dev server, serving a small React app from an absolute path of http://localhost:8080.
3. Open http://localhost:3000/ - it shouldn't work, let's verify this.
4. Open http://localhost:3000/setVersion?branchVersion=http://localhost:8080/ - this will change the current expressjs instance's branch version to http://localhost:8080/.
5. Now let's open http://localhost:3000/ again - Voila! We should see the same app as we saw in http://localhost:8080/.

This is a very basic demonstration of the concept.

In the next part, I'll demonstrate how you can leverage _Branch Versions_ to route traffic to different versions and make an efficient A/B testing for your features against real users.