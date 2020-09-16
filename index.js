const github = require('@actions/github');

const payload = github.context.payload;
console.log(`The event payload: ${JSON.stringify(payload, undefined, 2)}`);
