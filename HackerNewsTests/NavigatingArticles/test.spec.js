//@ts-check
import { test, expect } from '@playwright/test'

// group tests together
test.describe('navigating Hacker News newest articles', () => {

    // go to hackernews newest page before each test
    test.beforeEach(async ({ page }) => {
        await page.goto('https://news.ycombinator.com/newest');
    });

    test('page title', async ({ page }) => {
        expect(await page.title()).toBe('New Links | Hacker News');
    });

    test('there should be 30 new articles', async ({page}) => {
        const articles =  page.locator('.athing');
        await expect(articles).toHaveCount(30)
    });

    test('articles should all have titles', async ({ page }) => {
        const articleTitles = page.locator('.titleline');
       
        const articleTitlesArray = await articleTitles.allInnerTexts()
        //iterate through each article title to check it's not null
        articleTitlesArray.forEach(title => {
            expect(title).toEqual(expect.any(String));
        })
    });
    
    test('first article link should lead to external site', async ({ page }) => {
        // wait for page title to load and store in variable
        const hackerNewsTitle =  await page.title();

        // locate first article
        const articleTitle = page.locator('.titleline > span > a').first();

        // get link for first article 
        const articleHref = await articleTitle.getAttribute('href');
        // console.log(articleHref)]

        // create usable link
        // @ts-ignore
        const link = articleHref.replace("from?site=", "https://www.")
        // console.log(link);        

        // wait for page to load external link
        await page.goto(link)

        // store new page title in variable
        const newLinkTitle = await page.title();
        // console.log(newLinkTitle)

        // compare page title names to ensure that user has navigated to new link
        expect(newLinkTitle).not.toBe(hackerNewsTitle);
    });
    
    test('click on first articles user profile', async ({ page }) => {
        const username = page.locator('.hnuser').first();

        // store username in variable
        const userId = await username.innerText();
        // console.log(userId)

        // click on username to navigate to user profile
        await username.click();

        // store new page title in variable
        const userPage = await page.title();
        // console.log(userPage);

        // inset username using template literals 
        expect(userPage).toBe(`Profile: ${userId} | Hacker News`);
    });

    test('clicking more button should load next 30 articles', async ({ page }) => {
        let count = 0;
        const firstPageCount = await page.locator('.athing').count();
        count = count + firstPageCount

        await page.click('a.morelink');

        const secondPageCount = await page.locator('.athing').count();
        count = count + secondPageCount;
        expect(count).toEqual(60);
    });

});
