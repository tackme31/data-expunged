import { censor, getOptions } from "./libs";

(async () => {
  const options = await getOptions();
  censor(options);
})();

browser.storage.onChanged.addListener(async () => {
  const options = await getOptions();
  censor(options);
});
