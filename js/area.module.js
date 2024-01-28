import { Ui } from "./ui.module.js";

export class Area {
  constructor() {
    this.ui = new Ui();
  }

  async getArea() {
    const api = `https://www.themealdb.com/api/json/v1/1/list.php?a=list`;
    $(".loading").fadeIn(300);
    const res = await fetch(api);
    const resData = await res.json();
    this.ui.displayArea(resData.meals);
    $(".loading").fadeOut(300);
  }

  async getAreaMeals(area) {
    const api = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`;
    $(".loading").fadeIn(300);
    const res = await fetch(api);
    const resData = await res.json();
    resData.meals ? this.ui.displayMeals(resData.meals) : this.ui.searchError();
    $(".loading").fadeOut(300);
  }
}
