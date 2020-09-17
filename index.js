const github = require("@actions/github");
const got = require("got");

const client = got.extend({
  headers: {
    Authorization: `token ${process.env.GITHUB_TOKEN}`,
  },
});

const ISSUE_NUMBER_REGEXP = /(\d+)-/;

const payload = github.context.payload;
console.log(`The event payload: ${JSON.stringify(payload, undefined, 2)}`);

const {
  ref: branchName,
  ref_type,
  master_branch: base,
  repository,
  sender,
} = payload;

if (ref_type !== "branch") {
  process.exit(0);
}

const matchResult = branchName.match(ISSUE_NUMBER_REGEXP);

console.log({ matchResult });

if (matchResult === null) {
  process.exit(0);
}

const issueNumber = matchResult[1];

postComment(repository, base, branchName, issueNumber);

async function postComment(repo, base, head, issue) {
  const parrentRepo = getParentRepo(repo);
  const commentsUrl = await getIssueCommentUrl(issue, parrentRepo);
  if (!commentsUrl) {
    console.log(`Issue ${issue} doesn't exits!`);
    process.exit(0);
  }
  const repoUrl = parrentRepo.html_url;
  const compareUrl = `${repoUrl}/compare/${base}...${head}`;
  const issueComment = {
    body: `User @${sender.login} created a branch for this issue. [${base}...${head}](${compareUrl})`,
  };
  try {
    await client.post(commentsUrl, {
      json: issueComment,
    });
  } catch (e) {
    console.log(e);
  }
}

async function getIssueCommentUrl(issue, repo) {
  const issuesUrl = repo.issues_url;
  const currentIssueUrl = issuesUrl.replace("{/number}", `/${issue}`);
  console.log({ currentIssueUrl });
  try {
    const { comments_url: commentsUrl } = await client
      .get(currentIssueUrl)
      .json();

    return commentsUrl;
  } catch (e) {
    console.log(e);
  }
}

function getParentRepo(repo) {
  return repo.fork && repo.parrent ? repo.parrent : repo;
}
