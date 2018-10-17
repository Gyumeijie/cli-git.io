# cli-git.io [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

shorten and unshorten GitHub.com URL.

# Installation

`npm install -g cli-git.io`  or `npm install --save cli-git.io`.

# Usage

### Globally installed (**CLI**)

`gitio [ [-v|--version] | [-h|--help] |  [ shorten [--check|-c]|unshorten  <url> ]`

#### Examples

##### Help information           
```bash
$ gitio -h 
Usage: gitio [ [-v|--version] | [-h|--help] |  [ shorten [--check|-c]|unshorten  <url> ] ]
```
##### Version        
```bash
$ gitio --version
1.0.0
```

##### Shorten a github URL

1. Ignore the validity of the URL
```bash
$ gitio shorten "https://github.com/Gyumeijie/cli-git.io"
https://git.io/fx2Bg

$ gitio shorten "https://github.com/Gyumeijie/non-existent-repo"
https://git.io/fx2B9
```

2. Check the validity of the URL
```bash
$ gitio shorten -c "https://github.com/Gyumeijie/non-existent-repo"
Warning: https://github.com/Gyumeijie/non-existent-repo is not reachable!
https://git.io/fx2B9

$ gitio shorten "https://github.com/Gyumeijie/non-existent-repo" -c
Warning: https://github.com/Gyumeijie/non-existent-repo is not reachable!
https://git.io/fx2B9
```

##### Unshorten a short URL

```bash
$ gitio unshorten https://git.io/fx2B9
https://github.com/Gyumeijie/non-existent-repo

$ gitio unshorten https://git.io/bad-path

Notice: Woops! We can't seem to unshorten that URL, this could be for a few reasons:

1. it may not be a short URL in the first place;
2. it may not be a real URL or could no longer be active;
3. it may not be a short URL compatible with git.io!
```

### Locally installed (**APIs**)

```javascript
const githubURL = require('cli-git.io');
```

#### Examples

##### Shorten a github URL
```javascript
shorten(rawURL, callback, check);
```

1. Outputs result to **stdout**:
```javascript
githubURL.shorten('https://github.com/Gyumeijie/cli-git.io');
```

2. Pass the result to a **callback**:
```javascript
githubURL.shorten('https://github.com/Gyumeijie/cli-git.io', function(shortURL) {
  // do some thing with the shorten URL here
});
```
3. Check the **validity** of rawURL
```javascript
githubURL.shorten('https://github.com/Gyumeijie/cli-git.io',undefined, true);
```

##### Unshorten a short URL

1. Outputs result to **stdout**:
```javascript
githubURL.unshorten('unshorten https://git.io/fx2B9');
```

2. Pass the result to a **callback**:
```javascript
githubURL.unshorten('unshorten https://git.io/fx2B9', function(rawURL) {
  // do some thing with the unshorten URL here
});
```

### The GitHub.com URLs
The following are part of URLs which can be shorten or unshorten by `cli-git.io`:

- `https://help.github.com`
- `https://guides.github.com` 
- `https://gist.github.com`
- `https://raw.githubusercontent.com`
- `https://page.github.com` 
- `https://developer.github.com`
- `https://user.github.io`

### Links

- [Git.io: GitHub URL Shortener](https://blog.github.com/2011-11-10-git-io-github-url-shortener/)
