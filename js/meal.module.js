import { Ui } from "./ui.module.js";

export class Meal {
  constructor(id) {
    this.ui = new Ui();
    this.getMeal(id);
  }

  async getMeal(id) {
    const api = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    $(".loading").fadeIn(300);
    const res = await fetch(api);
    const resData = await res.json();
    resData.meals
      ? this.ui.displayMealDetails(
          resData.meals[0],
          this.getRecipes(resData.meals[0]),
          this.getaTags(resData.meals[0])
        )
      : this.ui.searchError();
    $(".loading").fadeOut(300);
  }

  getRecipes(obj) {
    let measure = [];
    let ingredient = [];
    for (let key in obj) {
      if (key.startsWith(`strMeasure`) && obj[key] != null && obj[key].trim() !== "") {
        measure.push(obj[key].trim());
      }
    }
    for (let key in obj) {
      if (key.startsWith(`strIngredient`) && obj[key] != null && obj[key].trim() !== "") {
        ingredient.push(obj[key].trim());
      }
    }
    let recipes = [];
    for (let i = 0; i < measure.length; i++) {
      recipes.push(`${measure[i]} ${ingredient[i]}`);
    }
    return recipes;
  }

  getaTags(obj) {
    if (obj.strTags) {
      let tags = obj.strTags.split(",").map((el) => {
        return el.trim();
      });
      return tags;
    }
  }
}
