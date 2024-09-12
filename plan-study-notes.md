# CONTENTS
1. Plan
2. PlayWright Study Notes

# PLAN
## 1. HackerNewsTests > index.js file
Write script using js to test first 100 articles are ordered from newest to oldest
- [x] **1.1 break down code already given**
- [x] **1.2 go through page and extract timestamp values**
    - [x] use `while()` loop 
    - [x] locate the table that holds the articles
    - [x] wait for table to be loaded
    - [x] locate element that hold timestamp value `<span class="age">`
    - [x] `page.evaluate()` to run js function in context of web page and bring results back to playwright environment
    - [x] `map()` function to store values
- [x] **1.3 need to store time values**
    - [x] create array outside of `while()` loop
    - [x] b/c only 30 values available on each page need to add timestamp arrays created by `.map` together using `concat` method
- [x]  **1.4 condition to stop `while()` loop**
    - [x] use `if()` statement to break loop once array has reached 100 values
    - [x] remove extra values added to array using `.slice`
- [x] **1.5 click 'more' button to load next set of articles**
    - [x] declare `url` variable outside of loop so it can be accessed by other functions
    - [x] create `nextLink` variable to locate 'more' button using `'a.morelink'` path
    - [x] `if()` statement to click 'more' button until 100 values in array 
    - [x] reasign url variable to wait for the `nextLink` to be loaded and then use `getAttribute` to find link using `'href'` 
    - [x] reassign url again to update with new link each time until 100 values in array
- [x] **1.6 function to check if articles are ordered from newest to oldest**
    - [x] use `for()` loop to iterate through array
    - [x] use `i < timestampsArray.length -1` to itterate through whole array excluding the last value of array because function is testing `[i] < [i + 1]` 
    - [x] create variables for `current` and `next` 
    - [x] test if `current` value is lesser than `next` value, if so `return false` 
    - [x] if `current` is greater than `next` then `return true`
- [x] **1.7 close browser context**
    - [x] use `await browser.close()`

## 2. HackerNewsTests > SortArticlesAPI > test.spec.js file
### Tests to be created:
- [x] **Test a**: check first 100 newest articles from Hacker News API are sorted from newest to oldest
- [x] **Test b**: first article from hacker news newest page should show the same timestamp as first timestamp recieved from hacker news api
### Test a
- [x] **2a.1 fetch a list of new article IDs from the Hacker News API**
    - [x] create variable `newArticlesUrl` that holds the url of hacker news api endpoint tuat returns IDs
    - [x] create `response` variable that makes`HTTP GET` request using `fetch` function
    - [x] create `newArticles` varibale that stores returned array of article IDs
- [x] **2a.2 only 100 articles wanted**
    - [x] create count variable 
    - [x] use `splice()` method so `newArticles` array only has 100 IDs 
- [x] **2a.3 fetch details of first 100 articles using article ID**
    - [x] create variable `articleId` that asynchronously  uses `map()` method on the `count` array 
    - [x] create `idUrl` variable that will contruct a url for fetching the details of articles by embedding the article ID into the api endpoint individualy
    - [x] create variable `idResponse` that makes a `fetch` request to `idUrl`
    - [x] return `idResponse` where the promise will be collected by the `map()` function
- [x] **2a.4 extract timestamps**
    - [x] create variable `timeArray` that uses `map()` on `articleId` array and creates new array with only the time values 
- [x] **2a.5 verify the articles are sorted in order from newest to oldest**
    - [x] use `for()` loop
    - [x] set length of array to be looped through to be `timeArray.length - 1` so that `i + 1` is always a valid index within the array bounds
    - [x] use assertion `toBeGreaterThanOrEqual` to check the current value `timeArray[i]` is greater than or equal to the next value in array `timeArray[i + 1]
### Test b
- [x] **2b.1 use `page` object from playwright as parameter**
- [x] **2b.2 navigate to Hacker News newest page**
    - [x] use `goto` method of `page` object to navigate to link and 
- [x] **2b.3 convert first API array value to ISO Date Time Format**
    - [x] create variable `apiTime`
    - [x] use `new Date()` to convert timestamp from Unix to ISO 8601 format
        - ISO date time format with timezone (UTC) is used on hacker news newest page and the hacker news api returns time in Unix format
        - both values need to be in the same format for comparison
    - [x] use `timeArray[0]` to isolate first value of array
    - [x] `timeArray[0] * 1000` convert Unix timestamp (seconds since 1st Jan 1970) to milliseconds so `Date` constructor can be used
    - [x] use `toISOString()` to convert the date to ISO format "yyyy-MM-dd'T'hh:mm:ss'Z'"
    - [x] use `split()` to remove fraction seconds part `'Z'` from new date
- [x] **2b.4 find time value of first article from Hacker News newest page**
    - [x] create variable `pageTime` to locate time value
    - [x] use `page.evaluate()` to be able to locate time value using javascript `document.querySelector` method
    - [x] use full `XPath` to select the HTML element containing the timestamp
    - [x] use `.title` attribute to access timestamp
- [x] **2b.5 compare values**
    - [x] use `expect` to assert that `pageTime` matches `apiTime`
    - [x] use `toBe` (generic playwright assertion) to check strict equality
- [x] **2b.6 get rid of error**
    - [x] use `//@ts-ignore` on `document.querySelector("#hnmain > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(2) > td:nth-child(2) > span > span.age").title;` to get rid of error: **object possibly 'null'**
- [x] **2b.7 test flakiness**
    - sometimes test returns false because of timestamps are different
    - potential reasons for this are:
        - timing differences: delay between fetching timestamps from api and loading the page
        - network variability: network delays could cause discrepancies in timestamps because of time taken to fetch data and render the page 
    - [x] add 3 retries to help mitigate discrepancies
        - [x] create `playwright.config.ts` file in `tests-api-hackernews` folder 
        - [x] import `defineConfig` from `playright/tests`
        - [x] export default `defineConfig` function

## 3. HackerNewsTests > NavigatingArticles > test.spec.js
- create an end to end test for navigating Hacker News' newest page articles 
- tests:
- [x] 3.1 group tests using `test.describe`
- [x] 3.2 `test.beforeEach` function to `goto` hn newest page before each test
- [x] 3.3 test to check page title
- [x] 3.4 test to check correct number of articles
- [x] 3.5 test to ensure all articles have visible titles
- [x] 3.6 test to check first article link leads to an external site
- [x] 3.7 test to check you can click on user profiles
- [x] 3.8 test to check clicking the more button loads 30 more articles 

## 4. HackerNewsTests > LoginAutomation
- Login test that will consist of:
    1. open page
    2. locating username field and inputing username
    3. locating password field and inputing password
    4. locating login button and clicking to log in
    5. automatic navigation to logged in state and verifying new url is as expected
    6. verifying username displays in top right corner to indicate logged in state
    7. verifying logout button is displayed

- [x] **4.1 create file structure**
    - LoginAutomation (main folder)
        - pages (folder containing files related to web pages)
            - login-page.js (file containing methods)
        - Tests (folder will contain tests and dependencies)
            - test.spec.js (file containing test cases and assertions)
            - playwright.config.js (config file for test cases)
            - .env (contains username and password needed for test)
- [x] **4.2 create hacker news account**
    - [x] create dummy email using maildrop
        - qa-st-test@maildrop.cc
    - [x] create hacker news account 
        - username: st-test
        - password: QA-test-123!
- [x] **4.3 dotenv**
    - [x] install dotenv 
        - `npm install dotenv --save-dev`
    - [x] create `.env` file in 
    - [x] add login credentials to file 
        - `USERNAME=st-test`
        - `PASSWORD=QA-test-123!`
    - [x] add `.env` file to `gitignore`
- [x] **4.4 visibility tests**
- visibility tests to be created:
    - username input field
        - [x] open page
        - [x] verify username input field is visible
    - password input field 
        - [x] open page
        - [x] verify password input field is visible
    - login button
        - [x] open page
        - [x] verify login button is visible  
- [x] **4.5 LoginPage class and constructor (login-page.js)**
    - [x] define and export `LoginPage class` 
    - [x] use `constructor()` method with `page` as argument
        - constructor method will be called when a new instance is created using the keyword
    - [x] use codegen to find best locators
        - `npx playwright codegen https://news.ycombinator.com/login?goto=news`
        - use pick locator option 
- [x] **4.6 create methods to check if each element is visible (login-page.js)**
    - using `isVisible` function from playwright
        - [x] `isUsernameInputFieldVisible()`
        - [x] `isPasswordInputFieldVisible()`
        - [x] `isLoginButtonVisible()`
- [x] **4.7 writing visibility tests (test.spec.js)**
    - [x] import `test` and `expect` from playwright
    - [x] import `LoginPage` 
    - [x] `beforeEach` hook first to open page before each visibility test
    - [x] group visibility tests
        - `test.describe`
    - tests:
        - [x] verify username input field is visible
        - [x] verify password input field is visinle
        - [x] verify login button in visible
    - in each test:
        - [x] create new instance of `LoginPage` class using `page` object
        - [x] call visibility methods from login-page.js
        - [x] make `expect` assertions in each test to check if elements are visible
- [x] **4.8 create methods for filling in input fields (login-page.js)**
    - use `.fill()` function to execute typing action in input fields:
        - [x] `fillUsername()`
        - [x] `fillPassword()`
    - for more concise test create another method which call the `fillUsername` and `fillPassword` methods
        - [x] `logIn()`
- [x] **4.9 create method for clicking login button (login-page.js)**
    - using `click()`
        - [x] clickLoginButton
- [x] **4.10 create new test group for testing login functionality (test.spec.js)**
    - [x] `test.describe`
    - [x] create variable that holds successfully logged in url 
- [x] **4.11 create playwright.config.ts file**
    - [x] to access login credentials need to import dotenv and path into config file
    - [x] `export default defineConfig`
- [x] **4.12 write login test (test.spec.js)** 
    - [x] `new LoginPage(page)`
    - import login credentials:
        - [x] `process.env.HN_USERNAME`
        - [x] `process.env.HN_PASSWORD`
    - [x] `toHaveUrl` to test logged into new page 
- [x] **4.12 login success username and logout visibility**
    - when sucessfully logged in, username is displayed in top right 
        - [x] create new locator
        - [x] create visibility method
        - [x] wait for it to be loaded
        - [x] `expect` result `toBe(true)`
    - when successfully logged in logout should be displayed
        - [x] create new locator
        - [x] create visibility method
        - [x] wait for it to be loaded
        - [x] `expect` result `toBe(true)`




    
  

### 1. HackerNewsTests > index.js file > 1.1 code breakdown

#### `const { chromium } = require("playwright");`

- extracting `chromium` property from imported `playwright` module and assinging it to a constant named `chromium`

#### `async function sortHackerNewsArticles() {`

- asynchronous function that needs to return a `promise` and contains `await` expressions to pause the execution of the function until the `promise` is resolved
- descriptive function name indicates the function is related to sorting articles from Hacker News

#### `const browser = await chromium.launch({ headless: false });`

- `browser` - constant variable declared
- `await` - pause function until promise returned (browser launched)
- `chromium` - object representing Chromium browser provided by Playwright
- `launch` - Playwright method to launch new browser instance 
- `{ Headless: false }` - options object thats passed to the `launch` method, false indicates browser will be launched in headful mode (with visible UI), boolean that defaults to true unless the devtools option is true
- resolved value (launched browser) assigned to `browser variable`

#### `const context = await browser.newContext();`

- `context` - constant variable declared
- `await` - wait for promise to be resolved from `browser.newContext()`
- `browser.newContext()` - calls method on `browser` object that was created earlier and creates a new browser context that won't share cookies/cache with other browser contexts

#### `const page = await context.newPage();`

- `page` - consant varibale declared 
- `await` - wait for promise resolve from `context.newPage()`
- `context.newPage()` - creates new page inside browser context thats assigned to `page` variable

#### `await page.goto("https://news.ycombinator.com/newest"); }`

- `await` - wait for promise to resolve
- `page.goto("https://news.ycombinator.com/newest")` - calls `goto`  method on `page` object that navigates the page to URL provided
- URL links to the Hacker News page that shows the newest articles 
- test can now interact with page elements

#### `(async () => { await sortHackerNewsArticles(); })();`

- `async () => {...}` - anonymous async arrow function
- `()()` - immediately invokes function as soon as it's defined
- `await sortHackerNewsArticles()` - calls another async function and waits for it to complete

# PLAYWRIGHT STUDY NOTES 

## Writing tests
### Actions
#### Navigation
- most tests start with navigating page to URL
- `await page.goto('https://playwright.dev/');`
- playwright waits for page to reach load state before moving forward 

#### Ineractions
- performing actions starts with locating elements
- `Locators API` used for this
- Locators represent a way to find elements on page 
- playwright waits for the elements to be actionable before performing so don't need to wait for it to become available

#### Locators 
##### Locate by CSS or XPath
- If you absolutely must use CSS or XPath locators, you can use page.locator() to create a locator that takes a selector describing how to find an element in the page. Playwright supports CSS and XPath selectors, and auto-detects them if you omit css= or xpath= prefix.
- XPath and CSS selectors can be tied to the DOM structure or implementation. These selectors can break when the DOM structure changes.
- CSS and XPath are not recommended as the DOM can often change leading to non resilient tests. Instead, try to come up with a locator that is close to how the user perceives the page such as role locators or define an explicit testing contract using test ids.

##### Text locators
- recommneded to find non interactive elemets like div, `span`, p, etc.

### Assertions
- assertions refers to statements or conditions that the QA engineers expect from the test to be true during the test execution, these statements help detect issues and verify whether it behaves as expected
- playwright inclues test assertions in the form of `expect` function
- to make assertion, call `expect(value)` and chose mathcer that reflects expectation 
- many generic matchers like:
    - `toEqual`
    - `toContain`
    - `toBeTruthy`
    - e.g. `expect(success).toBeTruthy();`
- playwright includes async matchers that wait until expected condition is met
    - makes tests non-flaky and resillient
    - e.g. await expect(page).toHaveTitle(/Playwright/);
        - this code waits until the page gets the title containing "PlayWright"

### Test Isolation 
- playwright test based on the concept of **test fixtures** like **built in page fixture**, which is passed into your test
- **test fixtures** are used to establish the environment for each test, giving it everything it needs and nothing else
    - isolated between tests
    - group tests based on meaning instead of common setup 
- **built-in fixtures** are pre-defined fixtures used most of the time:
        - `page` isolated page for this test run 
        - `context` (BrowserContext) isolated context for this test run. The `page` fixture belongs to this context as well 
        - `browserName` (string) name of browser currently running test (`chromium`)        
- example:        
    ```js
    import { test } from '@playwright/test';

    test('example test', async ({ page }) => {
    // "page" belongs to an isolated BrowserContext, created for this specific test.
    });

    test('another test', async ({ page }) => {
    // "page" in this second test is completely isolated from the first test.
    });
    ```
## Using Test Hooks
- can use various test hooks:
    - `test.describe` declares a group of tests
    - `test.beforeEach` and `test.afterEach` are executed before/after each test
    - `test.beforeAll` and `test.afterAll` are executed once per worker before/after all tests
- example:
    ```js
    import { test, expect } from '@playwright/test';

    test.describe('navigation', () => {
    test.beforeEach(async ({ page }) => {
        // Go to the starting url before each test.
        await page.goto('https://playwright.dev/');
    });

    test('main navigation', async ({ page }) => {
        // Assertions use the expect API.
        await expect(page).toHaveURL('https://playwright.dev/');
    });
    });
    ```
## Generating tests
- playwright comes with ability to generate tests out of the box
- opens 2 windows:
    1. **browser window** where you interact with the website you want to test 
    2. **Playwright Inspector window** where you can do the following to the tests:
        - record 
        - copy
        - clear
        - change lanuage 
- generate html report `npx playwright test --reporter=html`

### Running Codegen
- use `codegen` command to run the test generator followed by URL of website (optional can enter url after)
- `npx playwright codegen URL`

#### Recording a test
- run `codegen` and perform actions in browser
    - code generated for user interactions 
    - looks at rendered page and figures out:
        - recommended locator 
        - prioritising role
        - text and test id locators
- if generator identifies multiple elements matching the locator, it self-improves locator to make it resilient and uniquely identifies the target element (eliminates/reduces test failures/flaky tests)
- can record:
    - actions like click/fill 
    - assertions by clicking on icons in toolbar and then clicking an element on page 
    - assertions include:
        - `assert visibility` to assert an element is visible
        - `assert text` to assert an element contains specific text
        - `assert value` to assert element contains specific value
- press `record` button to stop recording and `copy` button to copy the generated code to your editor
- use `clear` button to clear the code to start recording again 
- when finished close inspector window or stop the terminal command 

#### Generating locators
- press `Record` button to stop recording and the `Pick Locator` button appears
- click button and hover over elemnts to see the locator highlighter underneath each element
- to chose locator click on element and code will appear in locator playground next to the Pick Locator button 
- can edit locator in playground and see the matching element highlighted in browser window 

## BrowserContext
- seperate browser session with its own cookies, storage, and settings. 
- isolated testing environments
- multiple browser contexts can run within a single browser instance
- parallel testing
- playwright allows creating "incognito" broswer contexts with `browser.newContext()` method, it doesn't write any browsing data to disk
- If directly using this method to create BrowserContexts, it is best practice to explicitly close the returned context via browserContext.close() when your code is done with the BrowserContext, and before calling browser.close(). This will ensure the context is closed gracefully and any artifacts—like HARs and videos—are fully flushed and saved

## Headless
- headless browsers are a great tool for automated testing and server environments where visible UI isn't needed, examples: 
    - run tests against a webpage and create PDF doc
    - inspect how browser renders a URL

## Evaluating JavaScript
- Playwright scripts run in playwright environment and page scripts run in the browser page environment.
    - environments don't intersect
    - running in different virtual machines
    - different processes
- `page.evaluate()` API can runa js function in context of webpage and bring results back to playwright environment
- browser globals can be used in evaluate:
    - window
    - document
- example:
```js
const data = { text: 'some data', value: 1 };
// Pass |data| as a parameter.
const result = await page.evaluate(data => {
  window.myApp.use(data);
}, data);
```

## OTHER NOTES

#### //@ts-check 
- catches common programming mistakes and includes quick fixes like **add missing import** and **add missing property**

#### what is chromium? 
- open source browser created by google that most browsers other than safari and firefox are built on

#### dateTime
- js automatically converts dateTime to timestamps (milliseconds since January 1, 1970)









