import { Ui } from "./ui.module.js";

export class Categories {
  constructor() {
    this.ui = new Ui();
  }

  async getCategories() {
    const api = `https://www.themealdb.com/api/json/v1/1/categories.php`;
    $(".loading").fadeIn(300);
    const res = await fetch(api);
    const resData = await res.json();
    this.ui.displayCategories(resData.categories);
    $(".loading").fadeOut(300);
  }

  async getCategoriesMeals(category) {
    const api = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
    $(".loading").fadeIn(300);
    const res = await fetch(api);
    const resData = await res.json();
    resData.meals ? this.ui.displayMeals(resData.meals) : this.ui.searchError();
    $(".loading").fadeOut(300);
  }
}
