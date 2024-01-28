import { Search } from "./search.module.js";
import { Categories } from "./categories.module.js";
import { Area } from "./area.module.js";
import { Ingredients } from "./ingredients.module.js";
import { Ui } from "./ui.module.js";

export class Sidebar {
  constructor() {
    this.search = new Search();
    this.search.searchByName("");
    $(".full-loading").fadeOut(1000);
    $("body").css("overflow", "auto");

    const sidebarWidth = $(".sidebar-menu .sidebar-header").innerWidth();
    const sectionWidth = `calc(100% - ${sidebarWidth}px)`;

    $(".sidebar-menu").css({
      left: `-${$(".sidebar-menu .sidebar-nav").innerWidth()}px`,
    });

    $(".search").css({
      width: sectionWidth,
    });

    $(".main-content").css({
      width: sectionWidth,
    });

    $(".sidebar-menu .sidebar-header .open-close-icon").on("click", () => {
      this.openCloseSidebar();
    });
    $(".sidebar-menu .sidebar-nav .links li a").on("click", (e) => {
      e.preventDefault();
      this.sidebarOption($(e.target).attr("data-value"));
    });
  }

  sidebarOption(option) {
    if (option === "search") {
      this.ui = new Ui();
      this.ui.displaySearch();
    } else if (option === "categories") {
      this.categories = new Categories();
      this.categories.getCategories();
    } else if (option === "area") {
      this.area = new Area();
      this.area.getArea();
    } else if (option === "ingredients") {
      this.ingredient = new Ingredients();
      this.ingredient.getIngredients();
    } else if (option === "contact") {
      this.ui = new Ui();
      this.ui.displayContact();
    }
    this.closeSidebar();
  }

  openCloseSidebar() {
    if ($(".sidebar-menu").css("left") == "0px") {
      this.closeSidebar();
    } else {
      this.openSidebar();
    }
  }

  closeSidebar() {
    $(".sidebar-menu").animate(
      { left: `-${$(".sidebar-menu .sidebar-nav").innerWidth()}px` },
      500
    );
    $(".sidebar-menu .sidebar-nav .links li").animate({ top: "300px" }, 500);
    $(".sidebar-menu .sidebar-header .open-close-icon").fadeOut(200, () => {
      $(".sidebar-menu .sidebar-header .open-close-icon").removeClass("fa-x");
      $(".sidebar-menu .sidebar-header .open-close-icon").addClass(
        "fa-align-justify"
      );
      $(".sidebar-menu .sidebar-header .open-close-icon").fadeIn(200);
    });
  }

  openSidebar() {
    $(".sidebar-menu").animate({ left: 0 }, 500);
    for (let i = 0; i < 5; i++) {
      $(".sidebar-menu .sidebar-nav .links li")
        .eq(i)
        .animate({ top: 0 }, (i + 5) * 100);
    }
    $(".sidebar-menu .sidebar-header .open-close-icon").fadeOut(200, () => {
      $(".sidebar-menu .sidebar-header .open-close-icon").removeClass(
        "fa-align-justify"
      );
      $(".sidebar-menu .sidebar-header .open-close-icon").addClass("fa-x");
      $(".sidebar-menu .sidebar-header .open-close-icon").fadeIn(200);
    });
  }
}
