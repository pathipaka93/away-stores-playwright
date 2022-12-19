const { test } = require("@playwright/test");
const { Pages } = require("../pages/index");
const urlsData = require("../data/urls");

test.describe(`should verify all Stores page`, async () => {
  test.describe.configure({ mode: "serial" });
  let page; //declare page variable so use same instance is used for all tests inside the describe block
  let homePage;
  let allStoresPage;
  let storePage;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    const pages = new Pages(page);
    homePage = pages.getHomePage();
    allStoresPage = pages.getAllStoresPage();
    storePage = pages.getStorePage();
  });

  test(`should verify Away Home Page load`, async () => {
    await page.goto(urlsData.homePage);
    await homePage.VerifyHomePageTitle();
  });

  test(`should verify navigation to all stores Page`, async () => {
    await test.step("Verify Stores link in global navigator", async () => {
      await homePage.VerifyStoresLink();
    });

    await test.step("Verify Navigation to all Stores Page", async () => {
      await allStoresPage.VerifyStoresTitle();
    });
  });

  test("should verify store Modal tiles count", async () => {
    await allStoresPage.VerifyStoreCount();
  });

  test("should verify stores cta animation on second store", async () => {
    await allStoresPage.VerifyIconAnimation(0);
  });
});
