const { expect } = require("@playwright/test");
const storesData = require("../data/stores");

class AllStoresPage {
  constructor(page) {
    this.page = page;
    this.storesHeadline = page.locator('[class*="masthead_title"]');
    this.icon = page.locator('[class*="cta_animationEnter"]');
    this.iconAnimated = page.locator('[class*="cta_animationExit"]');
    this.gallery = page.locator('h2[class*="store_location_messages_title"]');
    this.galleryTitle = page.locator(
      'h2[class*="store_location_messages_title"]'
    );
    this.storeModal = page.locator('[class*="content-tile-medium-component"]');
  }

  /**
   * Verifies All Stores Page Title and Headline
   */
  async VerifyStoresTitle() {
    await expect(this.page).toHaveTitle(storesData.storesPageTitle);
    await expect(this.storesHeadline).toHaveText(storesData.storesHeadline);
  }

  /**
   * @param {*} index store order number
   * @returns locator for store Modal
   */
  getStoreModal(index) {
    return this.page
      .locator('[class*="content-tile-medium-component"]')
      .locator(`nth=${index}`);
  }

  /**
   * @param {*} index store order number
   * @returns locator for Store Image
   */
  getStoreImg(index) {
    return this.page
      .locator('[class*="mediaBox_"]>picture>img')
      .locator(`nth=${index}`);
  }

  /**
   * @param {*} index store order number
   * @returns locator for store Name
   */
  getStoreName(index) {
    return this.page
      .locator('[class*="content_tile"]>[class*="head"]')
      .locator(`nth=${index}`);
  }

  /**
   * @param {*} index store order number
   * @returns Locator for Store Address
   */
  getStoreAddress(index) {
    return this.page
      .locator('[class*="copyContainer"]>[class*="dek"]')
      .locator(`nth=${index}`);
  }

  /**
   * @param {*} index store order number
   * @returns Locator for Store CTA
   */
  getStoreCta(index) {
    return this.page
      .locator('[class*="copyContainer"]>[class*="cta"]')
      .locator(`nth=${index}`);
  }
  /**
   * @param {*} index store order number
   * @returns Locator for Store CTA Icon
   */
  getCtaIcon(index) {
    return this.page
      .locator('[class*="cta_animationEnter"]')
      .locator(`nth=${index}`);
  }

  getCtaIconAnimated(index) {
    return this.page
      .locator('[class*="cta_animationExit"]')
      .locator(`nth=${index}`);
  }

  /**
   * Verifies Store Modal
   * Asserts store name, store Address, Store Img and See Store Cta
   * @param {*} store
   */
  async VerifyStoreModal(store) {
    await expect(this.getStoreName(store.index)).toHaveText(store.name);
    await expect(this.getStoreAddress(store.index)).toHaveText(store.address);
    await expect(this.getStoreImg(store.index)).toHaveAttribute(
      "src",
      store.modalImg
    );
    await expect(this.getStoreCta(store.index)).toHaveText(storesData.seeStore);
  }

  //TODO
  /**
   * Verifies See store Animation
   * @param {*} store
   */
  async VerifyIconAnimation(store) {
    await this.storesHeadline.hover();
    await this.storesHeadline.scroll();
    // await expect(this.getCtaIcon(1)).toBeVisible();
    await this.getStoreModal(store.index).hover();
    // await (this.icon).hover();
    // await (this.getCtaIcon(1)).hover();

    await expect(this.getCtaIcon(store.index)).toBeHidden();
    // await expect(this.getCtaIcon(store.index)).toBeVisible();
    await expect(this.getCtaIconAnimated(store.index)).toBeVisible();
    await expect(this.getStoreCta(1)).toHaveText(storesData.seeStore);
  }

  /**
   * Click on Store Modal
   * @param {*} index
   */
  async ClickStore(index) {
    await this.getStoreModal(index).click();
  }

  /**
   * Verify store Modals count to be no of Stores(13) on page
   */
  async VerifyStoreCount() {
    await expect(this.storeModal).toHaveCount(13);
  }
}
module.exports = { AllStoresPage };
