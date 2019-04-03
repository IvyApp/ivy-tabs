function findElementByText<E extends Element = Element>(
  selector: string,
  text: string
) {
  return Array.from(document.querySelectorAll<E>(selector)).find(
    element =>
      element.textContent !== null && element.textContent.includes(text)
  );
}

export function findButtonByText(text: string) {
  const button = findElementByText<HTMLButtonElement>('button', text);

  if (!button) {
    throw new Error(`Could not locate a Button containing "${text}".`);
  }

  return button;
}

export function findCheckboxFor(text: string) {
  const label = findElementByText<HTMLLabelElement>('label', text);

  if (!label || !label.control) {
    throw new Error(`Could not locate a Checkbox containing "${text}".`);
  }

  return label.control;
}

export function findTab(text: string) {
  const tab = findElementByText('.ivy-tabs [role="tab"]', text);

  if (!tab) {
    throw new Error(`Could not locate a Tab containing "${text}".`);
  }

  return tab;
}

export function findTabPanel(text: string) {
  const tab = findTab(text);
  const tabPanel = document.querySelector(
    `#${tab.getAttribute('aria-controls')}`
  );

  if (!tabPanel) {
    throw new Error(`Could not locate a TabPanel for "${text}".`);
  }

  return tabPanel;
}
