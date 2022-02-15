**Item #:** SCP-&#9608;&#9608;&#9608;&#9608;  

**Object Class:** Safe  

**Special Installation Procedures:** [DATA EXPUNGED] is not contained currently. Civilians can install by anyone through the Chrome Web Store.  

- [[DATA EXPUNGED] - Chrome Web Store](https://chrome.google.com/webstore/detail/data-expunged/lmoeanpjjaliocmmbjloeiccpkoccado)

In order to use for research purposes, follow the steps below.

1. Clone this repository.
1. `pnpm install` & `pnpm build`.
1. Load `/extensions` folder as an unpacked extension.

**Description:** [DATA EXPUNGED] is a Google Chrome extension to hide specific texts like SCP format. The following is a list of features that are currently known.  

- Mute HTML tags that contain words you don't want to see.
- See the original sentence by clicking the masked area.
- Specify target HTML tags to mute.
- Specify target sites to mute.
- Exporting and importing options.
- Set the selected text to be muted from context menu.
- Set the current site to mute from extension icon.

And the following is a sample of what happens when this extension is used.

![](./img/example.png)

**Addendum 1:** Usage  
In order to use this extension, you need to set some options. The option page can be accessed from the icon in the upper right corner of the browser.

![](./img/options.png)

|Option|Description|
|:-|:-|
|Words to hide|A list of keywords to be hidden. If the keywords specified here are included in an HTML tag, the tag will be masked. You can unmask the hidden area by clicking on it.|
|Words to exclude|A list of keywords to exclude from the keywords to be hidden; even if the keywords specified in "Words to hide" are included, the HTML tags will not be masked if the keywords specified in this option are included.|
|Target selector|A selector for HTML tags to be hidden. If the HTML tag that is the target of the selector contains a target word, that tag will be masked[^1].|
|Target Site|A list of site criteria that are covered by this extension. Criteria can be specified by whether the domain/URL of the site matches/not match. All sites are target by default.|

**Addendum 2:** License  
This software is released under the MIT License, see [LICENSE.txt](./LICENSE.txt). 

[^1]: `div`, `blockquote`, `p`, `td`, `li` will be replaced with `[DATA EXPUNGED]` and others are blacked out (&#9608;&#9608;&#9608;).
