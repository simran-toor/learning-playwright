// EDIT THIS FILE TO COMPLETE ASSIGNMENT QUESTION 1
const { chromium } = require("playwright");

async function sortHackerNewsArticles() {
  // launch browser
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  // Hacker News URL 
  let url = 'https://news.ycombinator.com/newest';

  // new array to store extracted timestamps
  let timestampsArray = [];

  // loop to extract timestamps from 100 most recent articles posted 
  while(timestampsArray.length < 100) {
    // go to Hacker News
    await page.goto(url);

    // wait for page to load table that contains articles
    const articleTable = page.locator('#hnmain > tbody > tr:nth-child(3) > td > table > tbody');
    await articleTable.waitFor();

    // locator to find elements in table that contain timestamps
    const locator = page.locator('td.subtext > span > span.age');

    // find elements that contain timestamps and execute js function to extract 
    const newTimestampsArray = await locator.evaluateAll((spans) => {
      return spans.map(span => span.title);
    });

    // add extracted timestamps to timestampsArray 
    timestampsArray = timestampsArray.concat(newTimestampsArray);

    // check atleast 100 timestamps have been added to array, if true return first 100 instances and end loop
    if(timestampsArray.length >= 100) {
      timestampsArray = timestampsArray.slice(0, 100);
      break;
    }

    // locator to find element that contains link to load more articles
    const nextLink = page.locator('a.morelink');

    // if there are not enough timestamps 
    if (nextLink) {
      // use nextLink locator to find url for next page
      url = await nextLink.getAttribute('href');

      // update url with new address to navigate to next page and continue extracting timestamps
      url = `https://news.ycombinator.com/${url}`;

    } else {
      break;
    }
  }
  // print array of 100 timestamps
  console.log(timestampsArray);

  // function to check articles are ordered from newest to oldest
  function ArticlesOrder(timestampsArray) {

    // loop through timestamps array
    for (let i = 0; i < timestampsArray.length -1; i++){

      // variables to compare timestamps
      const current = timestampsArray[i];
      const next = timestampsArray[i + 1];

      // if current timestamp is less than next, the order is not correct 
      // (js auto converts ISO Date Time format into milliseconds since midnight Jan 1st 1970 UTC)
      if (current < next) {
        return false;
      }
    }
    // if articles are in correct order function will return `true`
    return true;
  }
  console.log("The first 100 articles from Hacker News' new page are in descending order from newest to oldest; validation:", ArticlesOrder(timestampsArray));

  await browser.close();
};

(async () => {
  await sortHackerNewsArticles();
})();
