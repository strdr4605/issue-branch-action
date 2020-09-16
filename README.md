# Issue Branch action

Github action that comment on an issue when a related branch is created


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
        uses: strdr4605/issue-branch-action@v1
        env:
            GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```
