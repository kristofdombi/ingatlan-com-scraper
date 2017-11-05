const p = require('puppeteer');
const each = require('promise-each');
const notifier = require('node-notifier');

const { mainPage, resultsPage, propertyPage } = require('./page-elements') ;
const { searchedAreas } = require('./search-parameters');

const setSearchDetails = require('./phases/search-details');
const scrapeLinks = require('./phases/scraping-links');
const iterateOnLinks = require('./phases/result-iteration');

(async () => {

  let browser;
  let page;

  try {
    browser = await p.launch();
    page = await browser.newPage();

    console.log('Hello! 👋  I\'m starting right away.');
    notifier.notify({
      'title': '🏡 ingatlan.com 🤖',
      'message': 'Hello! 👋  I\'m starting right away.'
    });

    await page.goto('https://ingatlan.com')
      .then(console.log('✅ Found ingatlan.com'));

    console.log('➡️ Moving onto the search details.');

    await Promise.resolve(searchedAreas).then(each(async (area, currentAreaIndex) => {

      console.log(`   🔎 Setting search data for ${area}.`);

      await setSearchDetails(page, mainPage, area);

      /*
        Arriving to results page
      */

      const links = await scrapeLinks(page, resultsPage);

      console.log(`➡️ Moving onto iteration phase of ${area}.`);

      /*
        Iteration on results
      */

      await iterateOnLinks(page, propertyPage, links, area);

      if (currentAreaIndex !== searchedAreas.length - 1) {
        await page.goto('https://ingatlan.com')
          .then(console.log('⬅️ Going back to ingatlan.com'));
      }
    }));

    console.log(`🎉 I'm done. Bye. 👋`);
    notifier.notify({
      'title': '🏡 ingatlan.com 🤖',
      'message': '🎉 I\'m done. Bye. 👋`'
    });


  } catch (e) {
    console.error(`❌ ${e}`);
  }

  browser.close();

})();
