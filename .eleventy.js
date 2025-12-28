module.exports = function(eleventyConfig){
  eleventyConfig.addPassthroughCopy("./src/bundle.css");
  eleventyConfig.addPassthroughCopy({ "favicon": "/" });

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