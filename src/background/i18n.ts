import en from "../../extension/_locales/en/messages.json";
import ja from "../../extension/_locales/ja/messages.json";

const messages = { en, ja };
type language = keyof typeof messages;
type messageKey = keyof typeof en & keyof typeof ja;

const i18n = (key: messageKey) => {
  const lang = navigator.language.slice(0, 2) as language;
  return messages[lang || 'en'][key].message;
};

export default i18n;
