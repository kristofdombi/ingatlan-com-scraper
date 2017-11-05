const { priceMin, priceMax, squaremeterMin } = require('../search-parameters');

module.exports = async function (page, mainPage, searchedArea) {
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

  await page.evaluate((mainPage, priceMin) => {
    const inputElement = document.querySelector(mainPage.priceRangeMin);
    inputElement.value = priceMin;
  }, mainPage, priceMin).then(console.log('   ✅ Typed in min price.'));

  await page.keyboard.press('Tab');

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
}
