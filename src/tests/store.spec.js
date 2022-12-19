const { test } = require("@playwright/test");
const { Pages } = require("../pages/index");
const storesData = require("../data/stores");
const stores = storesData.stores;

for (const store of stores) {
  // Loops through store Data and creates individual tests for each store
  test.describe(`should verify ${store.name} page`, async () => {
    test.describe.configure({ mode: "serial" });
    let page; //declare page variable so use same instance is used for all tests inside the describe block
    let allStoresPage;
    let storePage;

    test.beforeAll(async ({ browser }) => {
      page = await browser.newPage();
      const pages = new Pages(page);
      allStoresPage = pages.getAllStoresPage();
      storePage = pages.getStorePage();
    });

    test(`should verify store Page load for ${store.name} store script`, async () => {
      await page.goto("https://www.awaytravel.com/stores", 100000);
      await allStoresPage.VerifyStoresTitle();
    });

    test(`should verify ${store.name} store modal on all store page`, async () => {
      await test.step("Verify Store Modal Component", async () => {
        await allStoresPage.VerifyStoreModal(store);
      });

      await test.step("Verify Navigation to Store Page", async () => {
        await allStoresPage.ClickStore(store.index);
        await storePage.VerifyStorePageLoaded();
      });
    });

    test.skip(`should verify stores cta animation ${store.name} store`, async () => {
      await allStoresPage.VerifyIconAnimation(store);
    });

    test(`should verify store Additional information on ${store.name} store page`, async () => {
      await test.step("Verify Store Information", async () => {
        await storePage.VerifyStoreInfo(store);
      });

      await test.step("Verify Additional Store Information section", async () => {
        await storePage.VerifyAdditionalStoreInfo();
      });
    });

    test(`should verify store Gallery slider on ${store.name} store page`, async () => {
      await test.step("Verify Gallery Slider Component", async () => {
        await storePage.VerifyGallery(store);
      });
    });

    test(`should verify store Map section on ${store.name} store page`, async () => {
      await test.step("Verify Map section", async () => {
        await storePage.VerifyMap(store);
      });
      await test.step("Verify Map Zoom functionality", async () => {
        await storePage.VerifyMapFunctionality();
      });
      await test.step("Verify Map Drap functionality", async () => {
        await storePage.VerifyMapFunctionality2(store);
      });
    });
  });
}
