# [DATA EXPUNGED]
## Special Installation Procedures
[DATA EXPUNGED] is not contained currently. Civilians can install by anyone through the Chrome Web Store.

- [[DATA EXPUNGED] - Chrome Web Store](https://chrome.google.com/webstore/detail/data-expunged/lmoeanpjjaliocmmbjloeiccpkoccado)

In order to use for research purposes, follow the steps below.

1. Clone this repository.
1. `pnpm install` & `pnpm build`.
1. Load `/extensions` folder as a unpacked extension.

## Description
[DATA EXPUNGED] is a Google Chrome extension to hide specific texts like SCP format. This extension masks passages that contain words the user does not want to see, as shown below.

![](./img/example.png)

## Options
In order to use this extension, you need to set some options. The option page can be accessed from the icon in the upper right corner of the browser.

![](./img/options.png)

### Words to hide
A list of keywords to be hidden. If the keywords specified here are included in an HTML tag, the tag will be masked. The following HTML tags will be replaced with `[DATA EXPUNGED]` instead of blacked out (&#9608;&#9608;&#9608;).

- `div`, `blockquote`, `p`, `td`, `li`

You can unmask the hidden area by clicking on it.

### Words to exclude
A list of keywords to exclude from the keywords to be hidden; even if the keywords specified in "Words to hide" are included, the HTML tags will not be masked if the keywords specified in this option are included.

### Target selector
A selector for HTML tags to be hidden. If the HTML tag that is the target of the selector contains a target word, that tag will be masked.

### Target Site
A list of site criteria that are covered by this extension. Criteria can be specified by whether the domain/URL of the site matches/not match. All sites are target by default.

## Other Features
- Import/Export options.
- Add a selected word to the hide words from context menu.
- Set a target site/page from extension icon in the upper right corner of the browser.

## Author
- Takumi Yamada (xirtardauq@gmail.com)

## License
MIT
