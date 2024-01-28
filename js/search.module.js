import { Ui } from "./ui.module.js";

export class Search {
  constructor() {
    this.ui = new Ui();
  }
  async searchByName(name) {
    const api = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`;
    $(".loading").fadeIn(300);
    const res = await fetch(api);
    const resData = await res.json();
    resData.meals ? this.ui.displayMeals(resData.meals) : this.ui.searchError();
    $(".loading").fadeOut(300);
  }

  async searchByLetter(letter) {
    const api = `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`;
    $(".loading").fadeIn(300);
    const res = await fetch(api);
    const resData = await res.json();
    resData.meals ? this.ui.displayMeals(resData.meals) : this.ui.searchError();
    $(".loading").fadeOut(300);
  }
}
