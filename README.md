# Branch versions(Part 1)

This article introduces a software development paradigm, which has been implemented and used on Verizon Media Group&#39;s Video syndication teams for the past 3 years.

The &#39;Branch versions&#39; concept allows stakeholders to test and verify different code variants without affecting production.

On our teams, every code change, creates a branch version which allows product managers, QA teams and different customers to test and verify changes, without merging it to master.

The impact is huge, just consider some of the following scenarios:

1. A product manager has a preliminary idea, but to assess its value and refine requirements, more data is required.
Serving a branch version to a group of users with a POC can contribute ideas for a better design and better product planning.

2. A bug is reported - use branch versions to inspect, and before deploying the fix, assign the branch version to a user/PM/QA to verify the fix.
Only then, you update your tests, submit a PR and merge to master.

3. Easy rollback - A critical bug was deployed, requiring a fast rollback. Now, thanks to branch versions, we&#39;re storing every version created by every branch, including master branch, which allows you to easily transition all of your users to a specific version in a matter of seconds.

(TBH - Scenario 3 never happened. avg. 90% unit tests coverage and branch versions)

So, what defines a branch version?

1. Isolation - The modified code is not part of master branch.
2. Debug - Branch versions contain sourcemaps, debug info developers can inspect the code on multiple environments(extremely useful for cross-browser issues)
3. Protected - A branch version can be used only by specific people. (recommended)

The core concept is that a branch version simply represents a different deployment path.

Let&#39;s dig deeper and see what it means...

Webpack

Let&#39;s examine [this simple React application](https://github.com/eranshapira/webpack-branch-versions).

The key concepts we use in webpack are the following features:

1. [dynamic imports](https://webpack.js.org/guides/code-splitting/#dynamic-imports) - each webpack entry point dynamically imports the rest of the bundle. ([js](https://github.com/eranshapira/webpack-branch-versions/blob/master/src/index.js) dynamically loads [js](https://github.com/eranshapira/webpack-branch-versions/blob/master/src/app.js))
2. [output.publicPath](https://webpack.js.org/configuration/output/#outputpublicpath) - define an absolute path for bundles, which instructs webpack to load any asset without any relative path issues.

CI/CD

There is only one concept that we need to maintain in our CI/CD process - Deployment must be performed to the same path specified in webpack&#39;s config.output.publicPath.

Server endpoint

Now that we have an infrastructure to deploy different branch versions, we need to provide a way to use these versions.

Examine [this very-basic-never-to-be-used server](https://github.com/eranshapira/webpack-branch-versions/blob/master/server/index.js), In our code, the html served in the response is changing the folder from which it loads main.js.