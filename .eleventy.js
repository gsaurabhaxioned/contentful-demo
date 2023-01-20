require('dotenv').config();
const {documentToHtmlString} = require('@contentful/rich-text-html-renderer');
const fs = require("fs");
const filesize = require("file-size");

module.exports = (function(eleventyConfig) {

  eleventyConfig.addPassthroughCopy("./assets/css/");
  eleventyConfig.addWatchTarget("./assets/css/");
  eleventyConfig.addPassthroughCopy("./img");
  eleventyConfig.addWatchTarget("./img");
  eleventyConfig.addShortcode('documentToHtmlString', documentToHtmlString);
  eleventyConfig.addFilter("filesize", function(path) {
    let stat = fs.statSync(path);
    if( stat ) {
      return filesize(stat.size).human();
    }
    return "";
   });
  //  eleventyConfig.addShortcode("contentBlock", function(contentBlock) {
  //   return `
  //     <section id="${contentBlock.fields.sectionLink}">
  //       <div>
  //         <h3>${contentBlock.fields.sectionTitle}</h3>
  //         ${ documentToHtmlString(contentBlock.fields.content) }
  //       </div>
  //     </section>`;
  // });
  return {
    dir: {
      input: "src",
      output: "public"
    }
  }
});