# Issue Branch action

> Github action that comment on an issue when a related branch is created

The action check for branch name pattern `/(\d+)-/`.

```js
`feat/1-issue` // 1
`4605-some-branch-name` // 4605
```

## Example usage

```yml
on:
  create
jobs:
  issue-branch:
    name: 'Issue Branch'
    runs-on: ubuntu-latest
    steps:
      - name: 'Issue Branch check'
        uses: strdr4605/issue-branch-action@v1.1
        env:
            GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```
