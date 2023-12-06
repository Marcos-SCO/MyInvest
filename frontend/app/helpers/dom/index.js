function attributesToString(attributes) {
  return Object.entries(attributes)
    .map(([key, value]) => `${key}="${value}"`)
    .join(' ');
}

function limitString(inputString, maxLength, stringEnd = '...') {

  const stringHaveMoreCharacterThanMaxLength =
    inputString?.length > maxLength;

  if (stringHaveMoreCharacterThanMaxLength) {
    return inputString.substring(0, maxLength) + stringEnd;
  }

  return inputString;
}

function replacePreFetchLinks(linkContainer) {
  const isLinkContainer =
    linkContainer.tagName.toLowerCase() === 'a';

  if (!isLinkContainer) return;

  const newLink = document.createElement('a');

  const linkContainerHasId = linkContainer?.id;
  if (linkContainerHasId) newLink.id = linkContainer.id;

  const linkContainerHasClass = linkContainer?.classList;
  if (linkContainerHasClass) newLink.classList = linkContainer.classList;

  newLink.href = linkContainer.href;
  newLink.innerHTML = linkContainer.innerHTML;

  // Replace the existing 'Link' element with the new 'a' element
  linkContainer.replaceWith(newLink);
}

function removePreFetchFromLinks() {
  const preFetchItens = document.querySelectorAll(`[rel="prefetch"]`);
  if (!preFetchItens) return;

  preFetchItens.forEach((e) => {
    replacePreFetchLinks(e);
  });
}

export { attributesToString, limitString, removePreFetchFromLinks, replacePreFetchLinks };