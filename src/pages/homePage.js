const { expect } = require("@playwright/test");
const storesData = require("../data/stores");

class HomePage {
  constructor(page) {
    this.page = page;
    this.storesLink = page.getByRole("link", { name: "Stores" });
  }

  /**
   * Verifies Home Stores Page Title
   */
  async VerifyHomePageTitle() {
    await expect(this.page).toHaveTitle(storesData.homePageTitle);
  }

  /**
   * Verifies Stores link on Home Page
   */
  async VerifyStoresLink() {
    await expect(this.storesLink).toHaveAttribute("href", "/stores");
    await this.storesLink.click();
    await expect(this.page).toHaveURL(/.*stores/);
  }
}
module.exports = { HomePage };
