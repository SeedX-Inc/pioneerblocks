import React from "react";
import { createRoot } from "react-dom/client";
import LatestNews from "./LatestNews.js";

document.addEventListener("DOMContentLoaded", () => {
    console.log(document.querySelectorAll(".wp-block-create-block-latest-news"));
    document.querySelectorAll(".wp-block-create-block-latest-news").forEach((block) => {
        const attrs = JSON.parse(block.getAttribute("data-attributes") || "{}");
        createRoot(block).render(<LatestNews attributes={attrs} />);
    });
});
