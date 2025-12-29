module.exports = function(eleventyConfig){
  eleventyConfig.addPassthroughCopy("./src/bundle.css");
  eleventyConfig.addPassthroughCopy({ "favicon": "/" });
  eleventyConfig.addPassthroughCopy("./src/blog/images");
  eleventyConfig.addPassthroughCopy("./src/robots.txt");

  // Cache bust: timestamp at build time
  eleventyConfig.addGlobalData("cacheBust", Date.now());

  // Read time filter (~200 words per minute)
  eleventyConfig.addFilter("readTime", function(content) {
    const words = content.split(/\s+/).length;
    const minutes = Math.ceil(words / 200);
    return `${minutes} min read`;
  });

  // Blog posts collection
  eleventyConfig.addCollection("posts", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/blog/posts/*.md");
  });
    return {
      dir: {
        input: "src",
        // data: "_data",
        // includes: "_includes",
        // layouts: "_layouts",
        output: "docs"
      },
      passthroughFileCopy: true
    };
  }