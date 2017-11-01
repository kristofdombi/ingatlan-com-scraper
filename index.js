const p = require('puppeteer');

const searchedArea = 'Budapest XIII. kerület';
const prices = [26, 32];
const areas = [45];

(async () => {

  let browser;
  let page;

  try {
    browser = await p.launch();
    page = await browser.newPage();

    await page.goto('https://ingatlan.com')
      .then(console.log('✅ Found ingatlan.com'));

    console.log('➡️ Moving onto the search details.');

    /*
      Setting the search details
    */

    await page.type('input#sf_query', searchedArea, {delay: 300})
      .then(console.log(`✅ Typed in: ${searchedArea}`));

    await page.click('.ui-menu-item')
      .then(console.log('✅ Clicked on first autosuggestion.'));

    await page.click('#filter_slidedown_price_type_sale_and_price_type_rent')
      .then(async () => {
        console.log('✅ Clicked on price ranges.');
        await page.focus('#sf_price_sale_min')
          .then(console.log('✅ Focused on min price range.'));
      });

    await page.evaluate(() => {
      const inputElement = document.getElementById('sf_price_sale_min');
      inputElement.value = 25;
    }).then(console.log('✅ Typed in min price.'));

    await page.screenshot({ path: 'search-details.png' })
      .then(console.log('✅ Saving search details as a screenshot.'));

    await page.keyboard.press('Tab');

    await page.evaluate(() => {
      const inputElement = document.getElementById('sf_price_sale_max');
      inputElement.value = 32;
    }).then(console.log('✅ Typed in max price.'));

    await page.click('#filter_slidedown_area_size')
      .then(async () => {
        console.log('✅ Clicked on size ranges.');
        await page.focus('#sf_area_size_min')
          .then(console.log('✅ Focused on min size range.'));
      });

    await page.evaluate(() => {
      const inputElement = document.getElementById('sf_area_size_min');
      inputElement.value = 45;
    }).then(console.log('✅ Typed in min area.'));

    await page.click('#filter_slidedown_room_count')
      .then(console.log('✅ Clicked on room counter.'));

    // Check the source code of ignatlan.com for this.
    await page.click('#filter_slidedown_room_count .dropdown ul li:nth-child(3)');

    await page.screenshot({ path: 'search-details.png' })
      .then(console.log('✅ Saving search details as a screenshot.'));

    /*
      Hitting search
    */

    await page.click('.search-button')
      .then(console.log('✅ Clicked on search button.'));

    console.log('➡️ Moving onto the results page.');

    /*
      Arriving to results page
    */

    await page.waitFor('.listing__card')
      .then(console.log('✅ Result page loaded.'));

    await page.screenshot({
      path: 'screenshot.png',
      fullPage: true
    })
      .then(console.log('✅ Saving as a screenshot.'));
  } catch (e) {
    console.error(`❌ ${e}`);
  }

  browser.close();

})();
