import React from "react";
import ReactDom from "react-dom/client";
import { Widget } from "./components/Widget";

// Function to normalize attributes from kebab-case to camelCase
export const normalizeAttribute = (attribute) => {
  return attribute.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
};

class WidgetWebComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  // Corrected spelling of connectedCallback
  connectedCallback() {
    const props = this.getPropsFromAttribute();
    const root = ReactDom.createRoot(this.shadowRoot);
    root.render(<Widget {...props} />);
  }

  getPropsFromAttribute() {
    const props = {};
    // Loop through all attributes and normalize them
    for (const { name, value } of this.attributes) {
      props[normalizeAttribute(name)] = value;
    }
    return props;
  }
}

// Register the Web Component
export default WidgetWebComponent;
