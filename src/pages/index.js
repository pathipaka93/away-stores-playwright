const { HomePage } = require("./homePage");
const { StorePage } = require("./storePage");
const { AllStoresPage } = require("./allStoresPage");

class Pages {
  constructor(page) {
    this.page = page;
    this.storePage = new StorePage(this.page);
    this.allStoresPage = new AllStoresPage(this.page);
    this.homePage = new HomePage(this.page);
  }

  getStorePage() {
    return this.storePage;
  }

  getAllStoresPage() {
    return this.allStoresPage;
  }

  getHomePage() {
    return this.homePage;
  }
}
module.exports = { Pages };
