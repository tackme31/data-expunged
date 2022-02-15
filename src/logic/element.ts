export const getNodeText = (node: Element) =>
  Array.from(node.childNodes)
    .filter((n) => n.nodeType === Node.TEXT_NODE)
    .reduce((acc, n) => (acc += n.nodeValue), "")
    .toLowerCase();