/**
 * External dependencies
 */
import { render } from "@wordpress/element";

/**
 * Internal dependencies
 */
import App from "./App";

// Import the stylesheet for the plugin.
import "./style/main.scss";

// Render the App component into the DOM
const initiatElement = document.getElementById("ams-fm");

if (initiatElement) {
    render(<App />, initiatElement);
}
