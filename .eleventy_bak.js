module.exports = function (eleventyConfig) {
    // Copy reveal.js files from node_modules to output
    eleventyConfig.addPassthroughCopy({ "node_modules/reveal.js/dist": "reveal.js/dist" });
    eleventyConfig.addPassthroughCopy({ "node_modules/reveal.js/plugin": "reveal.js/plugin" });

    // Copy Appearance plugin
    eleventyConfig.addPassthroughCopy({ "node_modules/reveal.js-appearance/plugin/appearance": "reveal.js/plugin/appearance" });

    // Copy custom CSS and images
    eleventyConfig.addPassthroughCopy("src/css");
    eleventyConfig.addPassthroughCopy("src/images");

    // Copy any additional assets
    eleventyConfig.addPassthroughCopy("src/**/*.jpg");
    eleventyConfig.addPassthroughCopy("src/**/*.png");
    eleventyConfig.addPassthroughCopy("src/**/*.gif");
    eleventyConfig.addPassthroughCopy("src/**/*.svg");

    return {
        dir: {
            input: "src",
            output: "_site"
        },
        htmlTemplateEngine: "njk",
        markdownTemplateEngine: "njk"
    };
};
