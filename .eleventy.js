// .eleventy.js
console.log("Loading .eleventy.js from", __filename);
const fs = require("fs");

module.exports = function (eleventyConfig) {
    console.log("Registering rawInclude shortcode/filter");

    // passthroughs (keep yours)
    eleventyConfig.addPassthroughCopy({ "node_modules/reveal.js/dist": "reveal.js/dist" });
    eleventyConfig.addPassthroughCopy({ "node_modules/reveal.js/plugin": "reveal.js/plugin" });
    eleventyConfig.addPassthroughCopy({ "node_modules/reveal.js-appearance/plugin/appearance": "reveal.js/plugin/appearance" });
    eleventyConfig.addPassthroughCopy("src/css");
    eleventyConfig.addPassthroughCopy("src/images");
    eleventyConfig.addPassthroughCopy("src/**/*.jpg");
    eleventyConfig.addPassthroughCopy("src/**/*.png");
    eleventyConfig.addPassthroughCopy("src/**/*.gif");
    eleventyConfig.addPassthroughCopy("src/**/*.svg");

    // core implementation (single place to change behavior)
    function _rawIncludeImpl(path) {
        let contents = fs.readFileSync(path, "utf8");
        // remove leading YAML frontmatter if present
        contents = contents.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, "");
        return contents;
    }

    // Standard Eleventy shortcode (works for Liquid / Nunjucks / etc. in many cases)
    eleventyConfig.addShortcode("rawInclude", function (path) {
        return _rawIncludeImpl(path);
    });

    // Register explicitly for Nunjucks (some Eleventy versions / setups require this)
    try {
        eleventyConfig.addNunjucksShortcode("rawInclude", function (path) {
            return _rawIncludeImpl(path);
        });

        // async variant if you ever want async reads
        eleventyConfig.addNunjucksAsyncShortcode?.("rawIncludeAsync", async function (path) {
            return _rawIncludeImpl(path);
        });
    } catch (e) {
        // ignore if the addNunjucksShortcode API doesn't exist in your Eleventy version
    }

    // Also register a Nunjucks filter (invoked with the filter pipe)
    eleventyConfig.addFilter("rawInclude", function (path) {
        return _rawIncludeImpl(path);
    });

    // optional collection example (keep or remove)
    eleventyConfig.addCollection("slides", function (collectionApi) {
        return collectionApi.getFilteredByGlob("src/slides/*.md");
    });

    return {
        pathPrefix: "/slides/",
        dir: {
            input: "src",
            includes: "_includes",
            output: "_site"
        },
        htmlTemplateEngine: "njk",
        markdownTemplateEngine: "njk"
    };
};
