module.exports = async function (page, resultsPage) {
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

  return links;
}
