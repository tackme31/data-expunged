**Item #:** SCP-&#9608;&#9608;&#9608;&#9608;  

**Object Class:** Safe  

**Special Installation Procedures:** [DATA EXPUNGED] is not currently contained by the Foundation, as it has been determined to pose no immediate threat to individuals or society. The extension is publicly available through the Chrome Web Store and can be installed by anyone.

- [[DATA EXPUNGED] - Chrome Web Store](https://chrome.google.com/webstore/detail/data-expunged/lmoeanpjjaliocmmbjloeiccpkoccado)

Further research into [DATA EXPUNGED] may be conducted by Foundation personnel for the purpose of improving our understanding of its effects and potential uses. To do so, please follow the steps below:

1. Clone this repository.
1. `pnpm install` & `pnpm build`.
1. Load `/extensions` folder as an unpacked extension.

**Description:** [DATA EXPUNGED] is a Chrome extension that enables users to mute specific words or phrases on their browser. When a muted word appears on the user's screen, it is automatically hidden from view.

The following is a comprehensive list of the identified characteristics of this object at present.

- Function 1: The extension has the ability to mute HTML tags that contain specific words or phrases that are undesirable to the user.
- Function 2: The extension provides a feature that allows users to uncover the original sentence by clicking on the masked area.
- Function 3: Users can specify which HTML tags to mute, allowing for greater customization and control over the extension's behavior.
- Function 4: Users can specify target sites to mute, enabling the extension to be used on specific websites as desired.
- Function 5: The extension includes the ability to export and import options, allowing users to transfer their preferences across multiple devices or browsers.
- Function 6: Users can select text and mute it from the context menu, providing a quick and easy way to mute specific words or phrases.
- Function 7: Users can also mute the current site from the extension icon, giving them a convenient way to mute content on a specific website without having to specify tags or keywords.

The following is a screenshot of the browser window with the object activated:

![](./img/example.png)

**Addendum 1:** Usage  
[DATA EXPUNGED] requires specific options to be set before use. These options can be accessed through the extension icon located at the top of the browser. Once opened, users can configure the desired options to customize the behavior of the extension to their preferences.

![](./img/options.png)

|Option|Description|
|:-|:-|
|Words to hide|A list of keywords to conceal. If any of these keywords appear within an HTML tag, that tag will be obfuscated. The hidden area can be revealed by clicking on it.|
|Words to exclude|A list of keywords to exclude from the "Words to hide" list; if any of these keywords appear within an HTML tag, it will not be obfuscated, even if it contains any of the keywords specified in the "Words to hide" option.|
|Target selector|A selector for HTML tags to be concealed. If an HTML tag that matches the selector contains a targeted keyword, it will be obfuscated[^1].|
|Target Site|A list of site criteria that are covered by this extension. Criteria can be specified based on whether the domain/URL of the site matches/does not match. By default, all sites are targeted.|

It is recommended that users exercise caution and discretion when using the object, as its ability to selectively hide content from view could have potential implications on social and psychological behavior. Any observed effects should be reported to Foundation personnel for further analysis.

**Addendum 2:** License  
This software is released under the MIT License, see [LICENSE.txt](./LICENSE.txt). 

[^1]: `div`, `blockquote`, `p`, `td`, `li`, `dd` will be replaced with `[DATA EXPUNGED]` and others are blacked out (&#9608;&#9608;&#9608;).
