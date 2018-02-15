const { priceMin, priceMax, squaremeterMin, roomCountMin } = require('../search-parameters');

module.exports = async function (page, mainPage, detailedSearchPage, searchedArea) {
  await page.click(mainPage.filterOptions)
    .then(console.log(`   ✅ Clicked on filter options.`));

  await page.click(mainPage.moreDetailedSearch)
    .then(console.log(`   ✅ Clicked on more detailed research. Navigating to it.`));

  await page.goto(('https://ingatlan.com/reszleteskereso') , { waitUntil: 'networkidle2' });

  await page.type(detailedSearchPage.priceMinInput, priceMin.toString())
    .then(console.log(`   ✅ Typed in: ${priceMin} MFt as min price.`));

  await page.type(detailedSearchPage.priceMaxInput, priceMax.toString())
    .then(console.log(`   ✅ Typed in: ${priceMax} MFt as max price.`));

  await page.type(detailedSearchPage.squaremeterMinInput, squaremeterMin.toString())
    .then(console.log(`   ✅ Typed in: ${squaremeterMin}m2 as min m2.`));

  await page.click(detailedSearchPage.capitalCityLabel)
    .then(console.log(`   ✅ Clicked on Budapest.`));

  await page.click(detailedSearchPage.XIIIDistrictLabel)
    .then(console.log(`   ✅ Clicked on XIII. kerulet.`));

  await page.type(detailedSearchPage.streetInput, searchedArea, {delay: 300})
    .then(console.log(`   ✅ Typed in: ${searchedArea}.`));

  await page.click(detailedSearchPage.autoSuggestStreetItem)
    .then(console.log(`   ✅ Clicked on first autosuggest item.`));

  await page.click(detailedSearchPage.floorRangeMin)
    .then(console.log(`   ✅ Clicked on minimum floor.`));

  await page.click(detailedSearchPage.firstFloor)
    .then(console.log(`   ✅ Clicked on first floor.`));

  await page.click(detailedSearchPage.elevator)
    .then(console.log(`   ✅ Clicked on elevator dropdown.`));

  await page.click(detailedSearchPage.elevatorOption)
    .then(console.log(`   ✅ Clicked on elevator option.`));

  await page.type(detailedSearchPage.roomCounter, roomCountMin.toString(), {delay: 300})
    .then(console.log(`   ✅ Typed in: ${roomCountMin} as a minimum room count.`));

  await page.click(detailedSearchPage.balconyLabel)
    .then(console.log(`   ✅ Clicked on balcony label.`));

  await page.click(detailedSearchPage.innerHeight)
    .then(console.log(`   ✅ Clicked on inner height of the property label.`));

  await page.click(detailedSearchPage.toiletLabel)
    .then(console.log(`   ✅ Clicked on toilet label.`));

  await page.click(detailedSearchPage.rooftop)
    .then(console.log(`   ✅ Clicked on rooftop label.`));

  await page.click(detailedSearchPage.heatingGas)
    .then(console.log(`   ✅ Clicked on heating label.`));

  await page.click(detailedSearchPage.districtHeating)
    .then(console.log(`   ✅ Clicked on district heating label.`));

  await page.click(detailedSearchPage.districtHeatingMeasured)
    .then(console.log(`   ✅ Clicked on district heating with measurement label.`));

  await page.screenshot({ path: 'screenshots/search-details.png', fullPage: true })
    .then(console.log('   📸 Saving search details as a screenshot.'));

  /*
    Hitting search
  */

  await page.click(detailedSearchPage.searchButton)
    .then(console.log('   ✅ Clicked on search button.'));

  console.log('➡️ Moving onto the results page.');
}
