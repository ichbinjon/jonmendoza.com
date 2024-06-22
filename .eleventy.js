module.exports = function(eleventyConfig){
  eleventyConfig.addPassthroughCopy("./src/bundle.css");
  eleventyConfig.addPassthroughCopy({ "favicon": "/" });
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