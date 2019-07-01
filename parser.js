const lodash = require("lodash");
const ruArt = require("./data-json/russian.json");
const itArt = require("./data-json/italian.json");
const spArt = require("./data-json/spanish.json");
const americanArt = require("./data-json/american.json");

const pampidouParser = file =>
  file.results
    .filter(
      elem =>
        elem._source.ua.artwork.medias.length &&
        elem._source.ua.artwork.medias[0].max_width > 300 &&
        elem._source.ua.artwork.medias[0].max_height > 300
    )
    .map(elem =>
      elem._source.ua.artwork.medias[0].url_template
        .replace("{size}", 300)
        .replace("{file_name}", elem._source.ua.artwork.medias[0].file_name)
    );

const printerestParser = file =>
  lodash.uniq(
    file.reduce(
      (res, elem) => [
        ...res,
        ...elem.resource_response.data
          .filter(data => data.type === "pin")
          .map(data => data.images["474x"].url)
      ],
      []
    )
  );

const ruArtUrls = pampidouParser(ruArt);
const itArtUrls = pampidouParser(itArt);
const spArtUrls = pampidouParser(spArt);
const americanArtUrls = pampidouParser(americanArt);

console.log(
  JSON.stringify(
    {
      russian: ruArtUrls,
      spanish: spArtUrls,
      italian: itArtUrls,
      american: americanArtUrls
    },
    null,
    2
  )
);
console.error({
  russian: ruArtUrls.length,
  spanish: spArtUrls.length,
  italian: itArtUrls.length,
  american: americanArtUrls.length
});
