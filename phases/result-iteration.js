const each = require('promise-each');
const slug = require('slug');
const { existsSync, mkdirSync } = require('fs');

var dir = './tmp';

if (!existsSync(dir)){
    mkdirSync(dir);
}

module.exports = async function (page, propertyPage, links, area) {
  await Promise.resolve(links).then(each(async (link, i) => {
    await page.goto(link);
    await page.waitFor(propertyPage.propertyPrice)
      .then(console.log('   🔎 Page loaded, now scraping.'));
    let dir = `screenshots/${slug(area)}`;
    if (!existsSync(dir)) {
      mkdirSync(dir);
      console.log(`   🗂 Created folder: screenshots/${slug(area)}`);
    }
    await page.click(propertyPage.revealPhoneNumberButton);
    await page.screenshot({ path: `screenshots/${slug(area)}/page-${i + 1}.png`, fullPage: true })
      .then(console.log(`   📸 Saving result of page ${i + 1} as a screenshot.`));
  }));
}
