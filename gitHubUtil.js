const { Octokit, App } = require("octokit");
const fsPromises = require('fs').promises;
const fs = require('fs').promises;

async function getGithubToken() {
    const data = await fsPromises.readFile('.github-token')
                       .catch((err) => console.error('Failed to read file', err));

    return data;
}

const gitHubUtil = {
  getPullRequest: async function(owner, repo, pull) {
    let tokenBuffer = await getGithubToken();
    let token = tokenBuffer.toString();

    const octokit = new Octokit({ auth: token });

    console.log('gh 19')
    console.log(owner)
    console.log(repo)
    console.log(pull)
    const res = await octokit.request(`GET /repos/${owner}/${repo}/pulls/${pull}`)//, {
    console.log('gh 21')
    //await octokit.request('GET /repos/{owner}/{repo}/pulls/{pull_number}', {
    //  owner: 'octocat',
    //  repo: 'hello-world',
    //  pull_number: 42
    //})
    //console.log(res)

    const data = res.data
    const head = data.head
    const oid = head.sha
    const label = head.label.split(':')
    const contributor = label[0]
    const forkBranch = label[1]
    console.log(label)

    return { oid, contributor, forkBranch }
  }
}

module.exports = gitHubUtil