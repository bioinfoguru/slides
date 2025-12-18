import fs from "fs";
import path from 'path';
import cssnano from 'cssnano';
import postcss from 'postcss';
import tailwindcss from '@tailwindcss/postcss';
import pluginWebc from "@11ty/eleventy-plugin-webc";

export default function(eleventyConfig) {
    console.log("Registering rawInclude shortcode/filter");

    eleventyConfig.addPlugin(pluginWebc);

  const processor = postcss([
    //compile tailwind
    tailwindcss(),

    //minify tailwind css
    cssnano({
      preset: 'default',
    }),
  ]);

      eleventyConfig.on('eleventy.before', async () => {
    const tailwindInputPath = path.resolve('./assets/css/style.css');

    const tailwindOutputPath = './assets/css/output.css';

    const cssContent = fs.readFileSync(tailwindInputPath, 'utf8');

    const outputDir = path.dirname(tailwindOutputPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const result = await processor.process(cssContent, {
      from: tailwindInputPath,
      to: tailwindOutputPath,
    });

    fs.writeFileSync(tailwindOutputPath, result.css);
  });

    // passthroughs (keep yours)
    eleventyConfig.addPassthroughCopy({ "node_modules/reveal.js/dist": "reveal.js/dist" });
    eleventyConfig.addPassthroughCopy({ "node_modules/reveal.js/plugin": "reveal.js/plugin" });
    eleventyConfig.addPassthroughCopy({ "node_modules/reveal.js-appearance/plugin/appearance": "reveal.js/plugin/appearance" });

    
    eleventyConfig.addPassthroughCopy("src/css");
    eleventyConfig.addPassthroughCopy("src/images");
    eleventyConfig.addPassthroughCopy("assets");
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
        dir: {
            input: "src",
            includes: "_includes",
            output: "_site"
        },
        htmlTemplateEngine: "njk",
        markdownTemplateEngine: "njk"
    };
};
