const p = require('puppeteer');
const each = require('promise-each');
const { mainPage, resultsPage, propertyPage } = require('./elements') ;

const searchedArea = 'Budapest XIII. kerület';
const prices = [26, 32];
const areas = [45];

(async () => {

  let browser;
  let page;

  try {
    browser = await p.launch();
    page = await browser.newPage();

    console.log('Hello! 👋  I\'m starting right away.');

    await page.goto('https://ingatlan.com')
      .then(console.log('✅ Found ingatlan.com'));

    console.log('➡️ Moving onto the search details.');

    /*
      Setting the search details
    */

    await page.type(mainPage.searchLocationInput, searchedArea, {delay: 300})
      .then(console.log(`   ✅ Typed in: ${searchedArea}`));

    await page.click(mainPage.autoSuggestLocationItem)
      .then(console.log('   ✅ Clicked on first autosuggestion.'));

    await page.click(mainPage.priceRanges)
      .then(async () => {
        console.log('   ✅ Clicked on price ranges.');
        await page.focus(mainPage.priceRangeMin)
          .then(console.log('   ✅ Focused on min price range.'));
      });

    const priceMin = 25;
    const { priceRangeMin } = mainPage;
    await page.evaluate((mainPage, priceMin) => {
      const inputElement = document.querySelector(mainPage.priceRangeMin);
      inputElement.value = priceMin;
    }, mainPage, priceMin).then(console.log('   ✅ Typed in min price.'));

    await page.keyboard.press('Tab');

    const priceMax = 32;
    await page.evaluate((mainPage, priceMax) => {
      const inputElement = document.querySelector(mainPage.priceRangeMax);
      inputElement.value = priceMax;
    }, mainPage, priceMax).then(console.log('   ✅ Typed in max price.'));

    await page.click(mainPage.squaremeterRanges)
      .then(async () => {
        console.log('   ✅ Clicked on size ranges.');
        await page.focus(mainPage.squaremeterRangeMin)
          .then(console.log('   ✅ Focused on min size range.'));
      });

    const squaremeterMin = 45;
    await page.evaluate((mainPage ,squaremeterMin) => {
      const inputElement = document.querySelector(mainPage.squaremeterRangeMin);
      inputElement.value = squaremeterMin;
    }, mainPage, squaremeterMin).then(console.log('   ✅ Typed in min area.'));

    await page.click(mainPage.roomCounter)
      .then(console.log('   ✅ Clicked on room counter.'));

    await page.click(mainPage.twoPlusRoomsOption);

    await page.screenshot({ path: 'screenshots/search-details.png' })
      .then(console.log('   📸 Saving search details as a screenshot.'));

    /*
      Hitting search
    */

    await page.click(mainPage.searchButton)
      .then(console.log('   ✅ Clicked on search button.'));

    console.log('➡️ Moving onto the results page.');

    /*
      Arriving to results page
    */

    await page.waitFor(resultsPage.listWrapper)
      .then(console.log('   ✅ Result page loaded.'));

    const links = await page.evaluate((resultsPage) => {
      const anchors = document.querySelectorAll(resultsPage.resultThumbnailAnchor);
      const hrefs = Object.entries(anchors).reduce((array, anchor) => {
        return array.concat(anchor[1].href);
      }, []);
      return hrefs;
    }, resultsPage);

    console.log(`   ✅ ${links.length} result page link(s) acquired.`);

    console.log('➡️ Moving onto iteration phase.');

    /*
      Iteration on results
    */

    await Promise.resolve(links).then(each(async (link, i) => {
      await page.goto(link);
      await page.waitFor(propertyPage.propertyPrice)
        .then(console.log('   🔎 Page loaded, now scraping.'));
      await page.screenshot({ path: `screenshots/page-${i + 1}.png`, fullPage: true })
        .then(console.log(`   📸 Saving result of page ${i + 1} as a screenshot.`));
    }));

    console.log(`🎉 I'm done. Bye. 👋`);

  } catch (e) {
    console.error(`❌ ${e}`);
  }

  browser.close();

})();
