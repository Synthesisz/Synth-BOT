const fetch = require('isomorphic-unfetch');

module.exports.getQuote = async endpoint => {
  const data = await fetch(`https://animechan.vercel.app/api/${endpoint}`);
  const response = await data.json();

  return `Anime: ${response.anime}
Character: ${response.character}
Quote: ${response.quote}`;
};
