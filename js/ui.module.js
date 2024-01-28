import { Area } from "./area.module.js";
import { Categories } from "./categories.module.js";
import { Contact } from "./contact.module.js";
import { Ingredients } from "./ingredients.module.js";
import { Meal } from "./meal.module.js";
import { Regex } from "./regex.module.js";
import { Search } from "./search.module.js";

export class Ui {
  clearData() {
    $("#rowData").html("");
  }

  hideSearch() {
    $("#searchData").html("");
  }

  displaySearch() {
    this.clearData();
    $("#searchData").html(`<div class="row py-5 gy-4" >
    <div class="col-md-6">
    <input id="searchByName" type="text" class="form-control bg-transparent text-white"
      placeholder="Search By Name" autocomplete="off"/>
  </div>
  <div class="col-md-6">
    <input id="searchByLetter" type="text" maxlength="1" class="form-control bg-transparent text-white"
      placeholder="Search By First Letter" autocomplete="off"/>
      </div>
  </div>`);
    this.getSearchVal();
  }

  getSearchVal() {
    this.search = new Search();
    this.regex = new Regex();
    $("#searchByName").on("input", (e) => {
      if (this.regex.validateSearchName($(e.target).val())) {
        this.search.searchByName($(e.target).val());
      } else if ($.trim($("#searchByName").val()) === "") {
        $(".loading").fadeIn(300, () => {
          this.clearData();
          $(".loading").fadeOut(300);
        });
      } else {
        $(".loading").fadeIn(300, () => {
          this.searchError();
          $(".loading").fadeOut(300);
        });
      }
    });

    $("#searchByLetter").on("input", (e) => {
      if (this.regex.validateSearchLetter($(e.target).val())) {
        this.search.searchByLetter($(e.target).val());
      } else if ($.trim($("#searchByLetter").val()) === "") {
        $(".loading").fadeIn(300, () => {
          this.clearData();
          $(".loading").fadeOut(300);
        });
      } else {
        $(".loading").fadeIn(300, () => {
          this.searchError();
          $(".loading").fadeOut(300);
        });
      }
    });
  }

  searchError() {
    this.clearData();
    $("#rowData").html(`
    <div class="not-found py-4 px-4">
    <p>Can't find what you're looking for?</p>
    <p class="mb-0">Check for typos or use a more generic search term</p>
    </div>`);
  }

  displayMeals(list) {
    this.clearData;
    let mealsLength = list.length > 20 ? 20 : list.length;
    let box = "";
    for (let i = 0; i < mealsLength; i++) {
      box += `<div class="col-xl-3 col-lg-4 col-md-6">
      <div class="meal rounded-2 overflow-hidden position-relative" role="button" id="meal" data-id="${list[i].idMeal}">
        <img class="w-100" src="${list[i].strMealThumb}" alt="${list[i].strMeal}">
        <div class="layer position-absolute text-black d-flex align-items-center">
          <h3 class="mx-3">${list[i].strMeal}</h3>
        </div>
      </div>
    </div>`;
    }
    $("#rowData").html(`<div class="row py-5 g-4">
    ${box}
    </div>`);
    this.getMealId();
  }

  getMealId() {
    $(".meal").on("click", (e) => {
      new Meal($(e.currentTarget).attr("data-id"));
    });
  }

  displayMealDetails(obj, recipes, tags) {
    this.clearData;
    this.hideSearch();
    let recipesBox = "";
    let recipesData = "";
    if (recipes.length > 0) {
      for (let i = 0; i < recipes.length; i++) {
        recipesData += `<li class="alert alert-info p-2 d-flex justify-content-center align-items-center me-3 mb-3 rounded-2">${recipes[i]}</li>`;
      }
      recipesBox += `<h3 class="text-info fw-bold">Recipes :</h3>
      <ul class="list-unstyled d-flex flex-wrap mt-3 mb-0">
        ${recipesData}
      </ul>`;
    }
    let tagsBox = "";
    let tagsData = "";
    if (tags) {
      for (let i = 0; i < tags.length; i++) {
        tagsData += `<li class="alert alert-danger p-2 d-flex justify-content-center align-items-center me-3 mb-3 rounded-2">${tags[i]}</li>`;
      }
      tagsBox += `<h3 class="text-info fw-bold">Tags :</h3>
      <ul class="list-unstyled d-flex flex-wrap mt-3 mb-0">
        ${tagsData}
      </ul>`;
    }
    $("#rowData").html(`<div class="row py-5 g-4">
    <div class="col-lg-4">
    <img class="w-100 rounded-2" src="${obj.strMealThumb}" alt="${obj.strMeal}">
    <h2 class="text-center p-3 text-info fw-bold">${obj.strMeal}</h2>
  </div>
  <div class="col-lg-8">
    <h2 class="text-info fw-bold">Instructions</h2>
    <p class="lh-lg">${obj.strInstructions}</p>
    <h3 class="mb-3 meal-desc"><span class="text-info fw-bold">Area :</span><span class="ms-1">${obj.strArea}</span></h3>
    <h3 class="mb-3 meal-desc"><span class="text-info fw-bold">Category :</span><span class="ms-1">${obj.strCategory}</span></h3>
    ${recipesBox}
    ${tagsBox}
    <a target="_blank" href="${obj.strSource}" class="btn btn-success mt-2">Source</a>
    <a target="_blank" href="${obj.strYoutube}" class="btn btn-danger mt-2 ms-2">Youtube</a>
  </div>
  </div>`);
  }

  displayCategories(list) {
    this.clearData;
    this.hideSearch();
    let box = "";
    for (let i = 0; i < list.length; i++) {
      box += `<div class="col-xl-3 col-lg-4 col-md-6">
      <div class="meal rounded-2 overflow-hidden position-relative" role="button" data-value="${
        list[i].strCategory
      }">
        <img class="w-100" src="${list[i].strCategoryThumb}" alt="${
        list[i].strCategory
      }">
        <div class="layer position-absolute text-black d-flex align-items-center text-center flex-column">
          <h3 class="mx-3 mt-3">${list[i].strCategory}</h3>
          <p class="mb-0 mx-3">${list[i].strCategoryDescription
            .split(" ")
            .slice(0, 20)
            .join(" ")}</p>
        </div>
      </div>
    </div>`;
    }
    $("#rowData").html(`<div class="row py-5 g-4">
    ${box}
    </div>`);
    this.getCategoriesMeals();
  }

  getCategoriesMeals() {
    this.categories = new Categories();
    $(".meal").on("click", (e) => {
      this.categories.getCategoriesMeals($(e.currentTarget).attr("data-value"));
    });
  }

  displayArea(list) {
    this.clearData;
    this.hideSearch();
    let box = "";
    for (let i = 0; i < list.length; i++) {
      box += `<div class="col-xl-3 col-lg-4 col-md-6">
      <div class="area text-center" role="button" data-value="${list[i].strArea}">
        <i class="fa-solid fa-house-laptop fa-4x mb-2"></i>
        <h3>${list[i].strArea}</h3>
      </div>
    </div>`;
    }
    $("#rowData").html(`<div class="row py-5 g-4">
    ${box}
    </div>`);
    this.getAreaMeals();
  }

  getAreaMeals() {
    this.area = new Area();
    $(".area").on("click", (e) => {
      this.area.getAreaMeals($(e.currentTarget).attr("data-value"));
    });
  }

  displayIngredients(list) {
    this.clearData;
    this.hideSearch();
    let box = "";
    let ingredientsLength = list.length > 20 ? 20 : list.length;
    for (let i = 0; i < ingredientsLength; i++) {
      let ingredientsdescription = "";
      list[i].strDescription
        ? (ingredientsdescription = `<p>${list[i].strDescription
            .split(" ")
            .slice(0, 20)
            .join(" ")}</p>`)
        : "";
      box += `<div class="col-xl-3 col-lg-4 col-md-6">
      <div class="ingredient text-center" role="button" data-value="${list[i].strIngredient}">
      <i class="fa-solid fa-drumstick-bite fa-4x mb-2"></i>
        <h3>${list[i].strIngredient}</h3>
        ${ingredientsdescription}
      </div>
    </div>`;
    }
    $("#rowData").html(`<div class="row py-5 g-4">
    ${box}
    </div>`);
    this.getIngredientsMeals();
  }

  getIngredientsMeals() {
    this.ingredient = new Ingredients();
    $(".ingredient").on("click", (e) => {
      this.ingredient.getIngredientsMeals(
        $(e.currentTarget).attr("data-value")
      );
    });
  }

  displayContact() {
    this.clearData();
    this.hideSearch();
    $("#rowData").html(`
    <form method="" class="text-center mb-4">
    <div class="row py-5 g-4">
      <div class="col-md-6">
        <input id="nameInput" type="text" class="form-control bg-transparent text-white"
        placeholder="Enter Your Name" autocomplete="off"/>
        <div class="alert-box"></div>
      </div>
      <div class="col-md-6">
        <input id="emailInput" type="email" class="form-control bg-transparent text-white"
          placeholder="Enter Your Email" autocomplete="off"/>
          <div class="alert-box"></div>
      </div>
      <div class="col-md-6">
        <input id="phoneInput" type="text" class="form-control bg-transparent text-white"
          placeholder="Enter Your Phone" autocomplete="off"/>
          <div class="alert-box"></div>
      </div>
      <div class="col-md-6">
        <input id="ageInput" type="number" class="form-control bg-transparent text-white"
          placeholder="Enter Your Age" autocomplete="off"/>
          <div class="alert-box"></div>
      </div>
      <div class="col-md-6">
        <input id="passwordInput" type="password" class="form-control bg-transparent text-white"
          placeholder="Enter Your Password" autocomplete="off"/>
          <div class="alert-box"></div>
      </div>
      <div class="col-md-6">
        <input id="rePasswordInput" type="password" class="form-control bg-transparent text-white"
          placeholder="Retype Your Password" autocomplete="off"/>
          <div class="alert-box"></div>
      </div>
      </div>
      <button id="submitBtn" class="btn btn-outline-danger px-5 py-2 rounded-pill" disabled>Submit</button>
      </form>
    `);
    this.contact = new Contact();
    this.contact.stopForm();
    this.getNameData();
    this.getEmailData();
    this.getPhoneData();
    this.getAgeData();
    this.getPasswordData();
    this.getRePasswordData();
  }

  getNameData() {
    $("#nameInput").on("input", () => {
      let validName = this.contact.checkName($("#nameInput").val());
      if (validName === "empty") {
        $("#nameInput")
          .next()
          .html("")
          .append(
            `<div class="alert alert-danger w-100 mt-4">Please fill out this field before continuing</div>`
          );
        $("#nameInput").next().children(".alert").fadeIn(400);
      } else if (validName === true) {
        $("#nameInput")
          .next()
          .html("")
          .append(`<div class="alert alert-success w-100 mt-4">Valid</div>`);
        $("#nameInput").next().children(".alert").fadeIn(400);
      } else if (validName === false) {
        $("#nameInput")
          .next()
          .html("")
          .append(
            `<div class="alert alert-danger w-100 mt-4">Special characters and numbers not allowed</div>`
          );
        $("#nameInput").next().children(".alert").fadeIn(400);
      }
    });
  }

  getEmailData() {
    $("#emailInput").on("input", () => {
      let validEmail = this.contact.checkEmail($("#emailInput").val());
      if (validEmail === "empty") {
        $("#emailInput")
          .next()
          .html("")
          .append(
            `<div class="alert alert-danger w-100 mt-4">Please fill out this field before continuing</div>`
          );
        $("#emailInput").next().children(".alert").fadeIn(400);
      } else if (validEmail === true) {
        $("#emailInput")
          .next()
          .html("")
          .append(`<div class="alert alert-success w-100 mt-4">Valid</div>`);
        $("#emailInput").next().children(".alert").fadeIn(400);
      } else if (validEmail === false) {
        $("#emailInput")
          .next()
          .html("")
          .append(
            `<div class="alert alert-danger w-100 mt-4">Invalid email format. Please enter a valid email address (e.g., example@yyy.zzz)</div>`
          );
        $("#emailInput").next().children(".alert").fadeIn(400);
      }
    });
  }

  getPhoneData() {
    $("#phoneInput").on("input", () => {
      let validPhone = this.contact.checkPhone($("#phoneInput").val());
      if (validPhone === "empty") {
        $("#phoneInput")
          .next()
          .html("")
          .append(
            `<div class="alert alert-danger w-100 mt-4">Please fill out this field before continuing</div>`
          );
        $("#phoneInput").next().children(".alert").fadeIn(400);
      } else if (validPhone === true) {
        $("#phoneInput")
          .next()
          .html("")
          .append(`<div class="alert alert-success w-100 mt-4">Valid</div>`);
        $("#phoneInput").next().children(".alert").fadeIn(400);
      } else if (validPhone === false) {
        $("#phoneInput")
          .next()
          .html("")
          .append(
            `<div class="alert alert-danger w-100 mt-4">Enter valid Phone Number</div>`
          );
        $("#phoneInput").next().children(".alert").fadeIn(400);
      }
    });
  }

  getAgeData() {
    $("#ageInput").on("input", () => {
      let validAge = this.contact.checkAge($("#ageInput").val());
      if (validAge === "empty") {
        $("#ageInput")
          .next()
          .html("")
          .append(
            `<div class="alert alert-danger w-100 mt-4">Please fill out this field before continuing</div>`
          );
        $("#ageInput").next().children(".alert").fadeIn(400);
      } else if (validAge === true) {
        $("#ageInput")
          .next()
          .html("")
          .append(`<div class="alert alert-success w-100 mt-4">Valid</div>`);
        $("#ageInput").next().children(".alert").fadeIn(400);
      } else if (validAge === false) {
        $("#ageInput")
          .next()
          .html("")
          .append(
            `<div class="alert alert-danger w-100 mt-4">Enter valid age</div>`
          );
        $("#ageInput").next().children(".alert").fadeIn(400);
      }
    });
  }

  getPasswordData() {
    $("#passwordInput").on("input", () => {
      let validPassword = this.contact.checkPassword($("#passwordInput").val());
      if (validPassword === "empty") {
        $("#passwordInput")
          .next()
          .html("")
          .append(
            `<div class="alert alert-danger w-100 mt-4">Please fill out this field before continuing</div>`
          );
        $("#passwordInput").next().children(".alert").fadeIn(400);
      } else if (validPassword === true) {
        $("#passwordInput")
          .next()
          .html("")
          .append(`<div class="alert alert-success w-100 mt-4">Valid</div>`);
        $("#passwordInput").next().children(".alert").fadeIn(400);
      } else if (validPassword === false) {
        $("#passwordInput")
          .next()
          .html("")
          .append(
            `<div class="alert alert-danger w-100 mt-4">Enter valid password *Minimum eight characters, at least one capital letter, one small letter, one special character and one number:*</div>`
          );
        $("#passwordInput").next().children(".alert").fadeIn(400);
      }
      this.confirmPassword();
    });
  }

  getRePasswordData() {
    $("#rePasswordInput").on("input", () => {
      this.confirmPassword();
    });
  }

  confirmPassword() {
    let validRePassword = this.contact.checkRePassword(
      $("#rePasswordInput").val(),
      $("#passwordInput").val()
    );
    if (validRePassword === "empty") {
      $("#rePasswordInput")
        .next()
        .html("")
        .append(
          `<div class="alert alert-danger w-100 mt-4">Please fill out this field before continuing</div>`
        );
      $("#rePasswordInput").next().children(".alert").fadeIn(400);
    } else if (validRePassword === true) {
      $("#rePasswordInput")
        .next()
        .html("")
        .append(
          `<div class="alert alert-success w-100 mt-4">Password confirmed</div>`
        );
      $("#rePasswordInput").next().children(".alert").fadeIn(400);
    } else if (validRePassword === false) {
      $("#rePasswordInput")
        .next()
        .html("")
        .append(
          `<div class="alert alert-danger w-100 mt-4">Please retype your password</div>`
        );
      $("#rePasswordInput").next().children(".alert").fadeIn(400);
    } else if (validRePassword === "not") {
      $("#rePasswordInput")
        .next()
        .html("")
        .append(
          `<div class="alert alert-danger w-100 mt-4">Password not confirmed</div>`
        );
      $("#rePasswordInput").next().children(".alert").fadeIn(400);
    }
  }

  checkForm(flag) {
    if (flag) {
      $("#submitBtn").prop("disabled", false);
      $("#submitBtn").removeClass("btn-outline-danger").addClass("btn-danger");
      $("#submitBtn").on("click", () => {
        $("#rowData form .row").append(
          `<div class="alert end alert-success text-center w-100 mt-4 mb-5">Success</div>`
        );
        $("#rowData .end").fadeIn(1000, () => {
          $("#rowData .end").fadeOut(1000, () => {
            $("#rowData .end").remove();
            $("input").val("");
          });
          $(".alert-box .alert").fadeOut(1000, () => {
            $(".alert-box .alert").remove();
            $("#submitBtn").prop("disabled", true);
            $("#submitBtn")
              .removeClass("btn-danger")
              .addClass("btn-outline-danger");
          });
        });
      });
    } else {
      $("#submitBtn").prop("disabled", true);
      $("#submitBtn").removeClass("btn-danger").addClass("btn-outline-danger");
    }
  }
}
