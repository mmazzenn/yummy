import { Ui } from "./ui.module.js";

export class Ingredients {
  constructor() {
    this.ui = new Ui();
  }

  async getIngredients() {
    const api = `https://www.themealdb.com/api/json/v1/1/list.php?i=list`;
    $(".loading").fadeIn(300);
    const res = await fetch(api);
    const resData = await res.json();
    this.ui.displayIngredients(resData.meals);
    $(".loading").fadeOut(300);
  }

  async getIngredientsMeals(ingredient) {
    const api = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;
    $(".loading").fadeIn(300);
    const res = await fetch(api);
    const resData = await res.json();
    resData.meals ? this.ui.displayMeals(resData.meals) : this.ui.searchError();
    $(".loading").fadeOut(300);
  }
}
