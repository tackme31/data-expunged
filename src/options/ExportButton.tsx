import React from "react";
import { DefaultSelector } from "../const";
import { getOptions } from "../logic";

interface Props {
  className: string;
}

const downloadOptions = async () => {
  const options = await getOptions();
  const json = JSON.stringify({
    ...options,
    targetSelector: options.targetSelector || DefaultSelector,
  });
  const blob = new Blob([json]);
  browser.downloads.download({
    filename: "data-expunged-options.txt",
    url: URL.createObjectURL(blob),
    saveAs: true,
  });
};

const ExportButton = ({ className }: Props) => {
  return (
    <div>
      <a className={className} href="#" onClick={downloadOptions}>
        &#x1F5CE; {browser.i18n.getMessage("export")}
      </a>
    </div>
  );
};

export default ExportButton;
