import React, { useRef } from "react";
import { DefaultSelector } from "../const";
import { Options } from "../types";

class OptionsReader extends FileReader {
  constructor() {
    super();
  }

  readAsOptions(blob: Blob): Promise<Partial<Options>> {
    return new Promise((resolve, reject) => {
      super.addEventListener("load", ({ target }) => {
        const result = target?.result as string;
        const options = JSON.parse(result) as Partial<Options>;

        resolve(options);
      });

      super.addEventListener("error", ({ target }) => {
        reject(target?.error);
      });

      super["readAsText"](blob);
    });
  }
}

interface Props {
  className: string;
}

const ImportButton = ({ className }: Props) => {
  const inputElement = useRef<HTMLInputElement>(null);
  const handleOnChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new OptionsReader();
    const file = e.target.files && e.target.files[0];
    if (!file) {
      return;
    }

    const { muteWords, excludeWords, targetSelector, targetSites } =
      await reader.readAsOptions(file);

    browser.storage.local.set({
      muteWords: muteWords || [],
      excludeWords: excludeWords || [],
      targetSelector: targetSelector || DefaultSelector,
      targetSites: targetSites || [],
    });
  };

  return (
    <div>
      <a
        className={className}
        href="#"
        onClick={() => inputElement.current?.click()}
      >
        &#x1F5CE; {browser.i18n.getMessage("import")}
      </a>
      <input
        ref={inputElement}
        type="file"
        onChange={handleOnChange}
        style={{ display: "none" }}
      />
    </div>
  );
};

export default ImportButton;
