# [DATA EXPUNGED]
## Special Installation Procedures
This extension is not yet available on Chrome Web Store. To installation, build this project and load as a unpacked extension.

1. Clone this repository
1. `pnpm install` & `pnpm build`
1. Load `/extensions` folder as a unpacked extension.

## Description
[DATA EXPUNGED] is a Google Chrome extension to hide text like SCP format. With this extension, you can mask passages that contain words you do not want to see, as shown below.

![](./img/example.png)

## Options
In order to use this extension, you need to set some options. The option page can be accessed from the icon in the upper right corner of the browser.

![](./img/options.png)

### Words to hide
A list of keywords to be hidden. If the keywords specified here are included in a HTML tag, the tag will be masked. The following HTML tags will be replaced with `[DATA EXPUNGED]` instead of blacked out (&#9608;&#9608;&#9608;).

- `div`, `blockquote`, `p`, `td`, `li`

You can unmask the hidden area by clicking on it.

### Words to exclude
A list of keywords to exclude from the keywords to be hidden; even if the keywords specified in "Words to hide" are included, the HTML tags will not be masked if the keywords specified in this option are included.

### Target selector
A selector for HTML tags to be hidden. If the HTML tag that is the target of the selector contains a target word, that tag will be masked.

### Target Site
A list of site criteria that are covered by this extension. A criteria can be specified by whether the domain/URL of the site matches/not match.  
By default, all sites are included.

## Other Features
- Import/Export options.
- Add a selected word to the hide words from context menu.
- Set a target site/page from extension icon in the upper right corner of the browser.

## Author
- Takumi Yamada (xirtardauq@gmail.com)

## License
MIT
