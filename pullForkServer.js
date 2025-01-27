const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const cors = require('cors');
const { pullForkUtil } = require('./src/utils/pullForkUtil');
const { getPullRequest } = require('./src/utils/gitHUbUtil');
const { gitHeadUtil } = require('./src/utils/gitHeadUtil');

(async () => {

var schema = buildSchema(`
  type Query {
    getPRfork(owner: String, repo: String, pr_id: String, contributor_id: String): String,
  }
`);

var root = {
  getPRfork: async (args) => {
    const pr_id = args.pr_id
    // User should do this instead and pass it in request so we don't overuse our github api.
    console.log('owner ' + args.owner)
    console.log('repo ' + args.repo)
    console.log('pr_id ' + pr_id.split('_')[1])
    var baseRepoName = args.repo
    var baseRepoOwner = args.owner
    //console.log('contributor ' + resGetPR.contributor)
    console.log('baseRepoName ' + baseRepoName)
    //console.log('forkBranch ' + resGetPR.forkBranch)
    var resGetPR = await getPullRequest(baseRepoOwner, baseRepoName, pr_id.split('_')[1])
    var pullReqRepoHead = await gitHeadUtil(resGetPR.contributor, baseRepoName, resGetPR.forkBranch, 0)

    console.log('pullReqRepoHead ' + pullReqRepoHead);

    console.log(resGetPR.forkBranch)
    const repoHash = pullForkUtil(
      baseRepoName,
      pullReqRepoHead,
      `https://github.com/${resGetPR.contributor}/${baseRepoName}`,
      resGetPR.forkBranch
    )

    console.log("repoHash " + repoHash)
    return repoHash
  },
}

var app = express();
//app.use(loggingMiddleware);
app.use(cors());
app.use(function (req, res, next) {
    let originalSend = res.send;
    res.send = function (data) {
        console.log(data + "\n");
        originalSend.apply(res, Array.from(arguments));
    }
    next();
});
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

app.listen(8080);
console.log('Running a GraphQL API server at localhost:4000/graphql');
})();