//@ts-check
import { test, expect } from '@playwright/test';

// variable that can be accessed by all tests
let timeArray;

test('first 100 articles fetched from api should be ordered from newest to oldest', async () => {
    // get new articles from Hacker News api
    const newArticlesUrl = 'https://hacker-news.firebaseio.com/v0/newstories.json';
    const response = await fetch(newArticlesUrl);
    const newArticles = await response.json();

    // number of articles wanted
    const count = newArticles.slice(0,100);

    // get details using the article ID from first 100 new articles
    const articleId = await Promise.all(count.map(async (id) => {
        const idUrl = `https://hacker-news.firebaseio.com/v0/item/${id}.json`;
        const idResponse = await fetch(idUrl);
        return idResponse.json();
    }));

    // extract time values into array
    timeArray = articleId.map(newArray => (newArray.time));

    // loop through time array and determine if first value is bigger than second being tested
    for(let i = 0; i < timeArray.length -1; i++) {
        expect(timeArray[i]).toBeGreaterThanOrEqual(timeArray[i + 1]);
    }; 
});

// flaky test
test('first time value from api should be the same as shown on hacker news newest page', async ({ page }) => {
    await page.goto('https://news.ycombinator.com/newest');

    //convert timestamp into ISO Date Time format 
    const apiTime = new Date(timeArray[0] * 1000).toISOString().split('.')[0];

    // find first timestamp on hackernews newest page
    // @ts-ignore
    const pageTime = await page.evaluate(() => document
        .querySelector
        ("#hnmain > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(2) > td:nth-child(2) > span > span.age")
        // @ts-ignore
        .title);

    // determine if values are the same
    expect(pageTime).toBe(apiTime);
});
