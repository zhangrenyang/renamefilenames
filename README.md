## description
- rename filesnames in current directory

## install

```js
npm install renamefilenames -g
```

## usage

1. Add a replace.json file in current directory

```json
{
 "before": "after"
}
```

2.Then execute command in current directory
```js
renamefilenames
```

3. `some-before.txt` will change to `some-after.txt`