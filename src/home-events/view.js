import React from "react";
import { createRoot } from "react-dom/client";
import LatestEvents from "./LatestEvents";


document.addEventListener("DOMContentLoaded", () => {
	document.querySelectorAll(".wp-block-create-block-home-events").forEach((block) => {
		const attrs = JSON.parse(block.getAttribute("data-attributes") || "{}");
		createRoot(block).render(<LatestEvents attributes={attrs} />);
	});
});
