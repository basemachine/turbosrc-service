const assert = require('assert');
const fsPromises = require('fs').promises;
const { postSetVote,
        postGetPRvoteStatus,
        postGetPRvoteTotals,
        postCreateRepo,
        postNewPullRequest
      } = require('../../../graphQLrequests')
const { Parser } = require('graphql/language/parser');

var snooze_ms = 1500;;

// We call this at the top of each test case, otherwise nodeosd could
// throw duplication errors (ie, data races).
const snooze = ms => new Promise(resolve => setTimeout(resolve, ms));

describe('Vote.', function () {
    this.timeout(snooze_ms*50);
    // Increase mocha(testing framework) time, otherwise tests fails
    describe('Many voters vote.', function () {
      it("Should increment vote and then close and merge on quorum.", async () => {
        async function getGithubUser() {
            const data = await fsPromises.readFile('.config.json')
                               .catch((err) => console.error('Failed to read file', err));

            let json = JSON.parse(data);
            let user = json.github.user
            if (user === undefined) {
              throw new Error("Failed to load Github user " + user);

            } else {
              console.log("Successfully read Github " + user);
            }

            return user

        }
        const user  = await getGithubUser();

        await snooze(snooze_ms);
        await snooze(snooze_ms);
        // am
        await postSetVote(
            /*owner:*/ user,
            /*repo:*/ "demo",
            /*pr_id:*/ "issue_5",
            /*contributor_id:*/ "0x571BD871120767344b4EE3Ec309c74a3D98aAf0B",
            /*side:*/ "no",
        );
        await snooze(snooze_ms);
        const amDbVoteCumm = await postGetPRvoteTotals(
            /*owner:*/ user,
            /*repo:*/ "demo",
            /*pr_id:*/ "issue_5",
            /*contributor_id:*/ "am",
            /*side:*/ "yes",
        );
        await snooze(snooze_ms);
        // jc
        await postSetVote(
            /*owner:*/ user,
            /*repo:*/ "demo",
            /*pr_id:*/ "issue_5",
            /*contributor_id:*/ "0x493D1c854301054e5D0b0bCFE3cfAe893d573dBa",
            /*side:*/ "yes",
        );
        await snooze(snooze_ms);
        const jcVoteCumm = await postGetPRvoteTotals(
            /*owner:*/ user,
            /*repo:*/ "demo",
            /*pr_id:*/ "issue_5",
            /*contributor_id:*/ "jc",
            /*side:*/ "yes",
        );
        await snooze(snooze_ms);
        //pc
        await postSetVote(
            /*owner:*/ user,
            /*repo:*/ "demo",
            /*pr_id:*/ "issue_5",
            /*contributor_id:*/ "0x5061EF86EFcF6Ad2fdcefF8FE9E014a1Ca6801c2",
            /*side:*/ "no",
        );
        await snooze(snooze_ms);
        const pcVoteCumm = await postGetPRvoteTotals(
            /*owner:*/ user,
            /*repo:*/ "demo",
            /*pr_id:*/ "issue_5",
            /*contributor_id:*/ "pc",
            /*side:*/ "yes",
        );
        await snooze(snooze_ms);
        // mb
        await postSetVote(
            /*owner:*/ user,
            /*repo:*/ "demo",
            /*pr_id:*/ "issue_5",
            /*contributor_id:*/ "0x232b9E710e897aEb18FEbe410526B987641BaE5f",
            /*side:*/ "yes",
        );
        await snooze(snooze_ms);
        const mbVoteCumm = await postGetPRvoteTotals(
            /*owner:*/ user,
            /*repo:*/ "demo",
            /*pr_id:*/ "issue_5",
            /*contributor_id:*/ "mb",
            /*side:*/ "yes",
        );
        await snooze(snooze_ms);
        // np
        await postSetVote(
            /*owner:*/ user,
            /*repo:*/ "demo",
            /*pr_id:*/ "issue_5",
            /*contributor_id:*/ "0x55f8B1594beB8eA1fD366c0C138B26e70C03a6ec",
            /*side:*/ "yes",
        );
        await snooze(snooze_ms);
        const npVoteCumm = await postGetPRvoteTotals(
            /*owner:*/ user,
            /*repo:*/ "demo",
            /*pr_id:*/ "issue_5",
            /*contributor_id:*/ "np",
            /*side:*/ "yes",
        );
        await snooze(snooze_ms);
        // nn
        await postSetVote(
            /*owner:*/ user,
            /*repo:*/ "demo",
            /*pr_id:*/ "issue_5",
            /*contributor_id:*/ "0x45dD192B318e2f1d242954E016492BDF9446381e",
            /*side:*/ "yes",
        );
        await snooze(snooze_ms);
        const nnVoteCumm = await postGetPRvoteTotals(
            /*owner:*/ user,
            /*repo:*/ "demo",
            /*pr_id:*/ "issue_5",
            /*contributor_id:*/ "nn",
            /*side:*/ "yes",
        );
        await snooze(snooze_ms);
        // jp
        await postSetVote(
            /*owner:*/ user,
            /*repo:*/ "demo",
            /*pr_id:*/ "issue_5",
            /*contributor_id:*/ "0x1d344C9A2Ee5c0a24336dd1A0c5c79ccD50D06C9",
            /*side:*/ "no",
        );
        await snooze(snooze_ms);
        const jpVoteCumm = await postGetPRvoteTotals(
            /*owner:*/ user,
            /*repo:*/ "demo",
            /*pr_id:*/ "issue_5",
            /*contributor_id:*/ "jp",
            /*side:*/ "yes",
        );
        await snooze(snooze_ms);
        // ts
        await postSetVote(
            /*owner:*/ user,
            /*repo:*/ "demo",
            /*pr_id:*/ "issue_5",
            /*contributor_id:*/ "0x9095B61290249584d9d0447657a03Cf23BF7a325",
            /*side:*/ "yes",
        );
        await snooze(snooze_ms);
        const tsVoteCumm = await postGetPRvoteTotals(
            /*owner:*/ user,
            /*repo:*/ "demo",
            /*pr_id:*/ "issue_5",
            /*contributor_id:*/ "ts",
            /*side:*/ "yes",
        );
        await snooze(snooze_ms);
        // af
        await postSetVote(
            /*owner:*/ user,
            /*repo:*/ "demo",
            /*pr_id:*/ "issue_5",
            /*contributor_id:*/ "0xd30Dcb56A4d3EC2dC8591588455A5Da4C3c84eCD",
            /*side:*/ "yes",
        );
        await snooze(snooze_ms);
        const afVoteCumm = await postGetPRvoteTotals(
            /*owner:*/ user,
            /*repo:*/ "demo",
            /*pr_id:*/ "issue_5",
            /*contributor_id:*/ "af",
            /*side:*/ "yes",
        );
        await snooze(snooze_ms);
        // ds
        await postSetVote(
            /*owner:*/ user,
            /*repo:*/ "demo",
            /*pr_id:*/ "issue_5",
            /*contributor_id:*/ "0x1d0798e209A07715765F1486CA64f3D2399aF719",
            /*side:*/ "no",
        );
        await snooze(snooze_ms);
        const dsVoteCumm = await postGetPRvoteTotals(
            /*owner:*/ user,
            /*repo:*/ "demo",
            /*pr_id:*/ "issue_5",
            /*contributor_id:*/ "ds",
            /*side:*/ "yes",
        );
        await snooze(snooze_ms);
        // ri
        await postSetVote(
            /*owner:*/ user,
            /*repo:*/ "demo",
            /*pr_id:*/ "issue_5",
            /*contributor_id:*/ "0xDB7A25D3B4C5506779bD9f9f1A5AA0DB525Fa6A8",
            /*side:*/ "yes",
        );
        await snooze(snooze_ms);
        const riVoteCumm = await postGetPRvoteTotals(
            /*owner:*/ user,
            /*repo:*/ "demo",
            /*pr_id:*/ "issue_5",
            /*contributor_id:*/ "ri",
            /*side:*/ "yes",
        );
        assert.equal(
            amDbVoteCumm,
            "0.015",
            "Fail to add votes."
        );
        //assert.equal(
        //    amVoteCumm =
        //    "0.snooze_ms0",
        //    "Fail to add votes."
        //);
        //assert.equal(
        //    jcVoteCumm =
        //    "0.10000",
        //    "Fail to add votes."
        //);
        //assert.equal(
        //    pcVoteCumm =
        //    "0.75000",
        //    "Fail to add votes."
        //);
        //assert.equal(
        //    mbVoteCumm =
        //    "0.5000",
        //    "Fail to add votes."
        //);
        //assert.equal(
        //    npVoteCumm =
        //    "0.499999",
        //    "Fail to add votes."
        //);
        //assert.equal(
        //    nnVoteCumm =
        //    "0.499999",
        //    "Fail to add votes."
        //);
        //assert.equal(
        //    jpVoteCumm =
        //    "0.499999",
        //    "Fail to add votes."
        //);
        //assert.equal(
        //    tsVoteCumm =
        //    "0.499999",
        //    "Fail to add votes."
        //);
        //assert.equal(
        //    afVoteCumm =
        //    "0.499999",
        //    "Fail to add votes."
        //);
        //assert.equal(
        //    dsVoteCumm =
        //    "0.499999",
        //    "Fail to add votes."
        //);
        const openStatus = await postGetPRvoteStatus(
            /*owner:*/ user,
            /*repo:*/ "demo",
            /*pr_id:*/ "issue_5",
            /*contributor_id:*/ "ri",
            /*side:*/ "yes",
        );
        assert.equal(
            riVoteCumm,
            "0.499999",
            "Fail to add votes."
        );
        assert.equal(
            openStatus,
            "open",
            "Fail to stay open even the votes are below the quorum"
        );
      });
    });
});