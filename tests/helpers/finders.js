function findElementByText(selector, text) {
  return Array.from(document.querySelectorAll(selector)).find(element =>
    element.textContent.includes(text)
  );
}

export function findButtonByText(text) {
  return findElementByText('button', text);
}

export function findCheckboxFor(text) {
  const label = findElementByText('label', text);

  if (!label) {
    throw new Error(`Could not locate a Checkbox containing "${text}".`);
  }

  return label.control;
}

export function findTab(text) {
  const tab = findElementByText('.ivy-tabs [role="tab"]', text);

  if (!tab) {
    throw new Error(`Could not locate a Tab containing "${text}".`);
  }

  return tab;
}

export function findTabPanel(text) {
  const tab = findTab(text);
  const tabPanel = document.querySelector(
    `#${tab.getAttribute('aria-controls')}`
  );

  if (!tabPanel) {
    throw new Error(`Could not locate a TabPanel for "${text}".`);
  }

  return tabPanel;
}
