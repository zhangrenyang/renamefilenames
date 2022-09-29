## description

- rename files names in current directory

## install

```js
npm install renamefilenames -g
```

## two usages

- change `some-before.txt` to `some-after.txt`

### Passing parameters through the command line

```js
renamefilenames  "before" "after"
```

- change `some-before.txt` to `some-.txt`

```js
renamefilenames  "before"
```

### Passing parameters through configuration files

1. Add a replace.json file in current directory

```json
{
  "before": "after"
}
```

2.Then execute command in current directory

```js
renamefilenames;
```
