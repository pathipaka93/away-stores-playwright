const { expect } = require("@playwright/test");
const storesData = require("../data/stores");

class StorePage {
  constructor(page) {
    this.page = page;
    this.storeTitle = page.locator('[itemprop="name"]');
    this.storeDescription = page.locator('[itemprop="description"]');
    this.additionalInfoSection = page.locator(
      '[class*="store_location_messages_container"]'
    );
    this.additionInfoTitle = page.locator(
      'h2[class*="store_location_messages_title"]'
    );
    this.gallerySection = page.locator('[class*="component-gallery"]');
    this.galleryActiveSlide = this.page.locator(
      '[class*="swiper-slide-active"] img'
    );
    this.galleryNext = page.locator('button[class*="gallery_nextButton"]');
    this.galleryPrev = page.locator('button[class*="gallery_prevButton"]');
    this.map = page.locator('[class*="store_location_info_mapContainer"]');
    this.location = page.locator(
      '[class*="store_location_info_mapContainer"] [role="button"]'
    );
    this.zoomIn = page.locator('button[aria-label="Zoom in"]');
    this.zoomOut = page.locator('button[aria-label="Zoom out"]');
  }

  /**
   * @param {*} index n value
   * @returns locator for nth message Tile
   */
  getTileIcon(index) {
    return this.page
      .locator('[class*="store_location_messages_tileIcon"] svg')
      .locator(`nth=${index}`);
  }

  /**
   * @param {*} index n value
   * @returns locator for nth message Title
   */
  getTileTitle(index) {
    return this.page
      .locator('[class*="store_location_messages_tileTitle"]')
      .locator(`nth=${index}`);
  }

  /**
   * @param {*} index n value
   * @returns locator for nth message Description
   */
  getTileDescription(index) {
    return this.page
      .locator('[class*="store_location_messages_tileDescription"]')
      .locator(`nth=${index}`);
  }

  /**
   * Verifies if store page is loaded
   * by asserting additional Store Info Section visibility
   */
  async VerifyStorePageLoaded() {
    await expect(this.additionalInfoSection).toBeVisible();
    await expect(this.additionInfoTitle).toHaveText(
      "Additional store information"
    );
  }

  /**
   * Verifies store information specific to the input param store:
   * Asserts store title and description text which include store name, phone no and email
   * @param {*} store
   */
  async VerifyStoreInfo(store) {
    await expect(this.storeTitle).toHaveText(store.title);
    await expect(this.storeDescription).toHaveText(store.description);
  }

  /**
   * Verifies Additional Store Information section on all store pages
   * Asserts Icon, title and description for each section of Addtional Store Info
   */
  async VerifyAdditionalStoreInfo() {
    let storeMessages = storesData.storeMessages;
    for (const msg of storeMessages) {
      await expect(this.getTileIcon(msg.index)).toBeVisible();
      await expect(this.getTileTitle(msg.index)).toHaveText(msg.name);
      await expect(this.getTileDescription(msg.index)).toHaveText(
        msg.description
      );
    }
  }

  /**
   * @returns All Gallery Images locators
   */
  getGalleryImgs() {
    return this.page.locator('[class*="gallery_swiperSlide"] img').all();
  }

  /**
   * Verifies Gallery Component images and slide actions
   * @param {*} store
   */
  // Gallery asertion Images are flacky
  async VerifyGallery(store) {
    await expect(this.gallerySection).toBeVisible();
    let imgLocators = await this.getGalleryImgs();
    let count = await this.page
      .locator('[class*="gallery_swiperSlide"] img')
      .count();
    for (let i = 1; i < count - 1; i++) {
      // ignoring 1st and last selectors as they are duplicates of before and after slides
      let currentSlide = this.page.locator(
        '[class*="swiper-slide-active"] img'
      );
      await expect(currentSlide).toBeVisible();
      await expect(imgLocators[i]).toHaveAttribute("src", store.gallery[i - 1]);
      await this.galleryNext.click();
      await expect(this.gallerySection).toBeVisible();
    }
    // After clicking Gallery Next, first slide is expected to be active
    await expect(imgLocators[count - 1]).toHaveAttribute(
      "src",
      store.gallery[0]
    );
    await this.galleryPrev.click();
    // After clicking Gallery Prev, last slide is expected to be active
    await expect(imgLocators[0]).toHaveAttribute(
      "src",
      store.gallery[count - 3]
    );
  }

  /**
   * Verifies Map Section to be displayed with store location
   * Asserts store location coordinates
   * @param {*} store
   */
  async VerifyMap(store) {
    await expect(this.map).toBeVisible();
    await expect(this.location).toBeVisible();
    let coords = this.page.locator("area");
    await expect(coords).toHaveAttribute("coords", store.coords);
  }

  /**
   * Verifies Zoom in and Zoom out functionality of map
   */
  async VerifyMapFunctionality() {
    await this.zoomIn.click();
    await expect(this.map).toBeVisible();
    await this.zoomOut.click();
    await expect(this.map).toBeVisible();
  }

  /**
   * Verifies Drap functionality on Map
   */
  async VerifyMapFunctionality2() {
    await this.location.dragTo(this.zoomIn);
    await expect(this.map).toBeVisible();
  }
}
module.exports = { StorePage };
