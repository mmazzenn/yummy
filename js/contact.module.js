import { Regex } from "./regex.module.js";
import { Ui } from "./ui.module.js";

export class Contact {
  constructor() {
    this.regex = new Regex();
    this.ui = new Ui();
  }

  validName = false;
  validEmail = false;
  validPhone = false;
  validAge = false;
  validPassword = false;
  validRePassword = false;

  stopForm() {
    $("form").on("click", (e) => {
      e.preventDefault();
    });
  }

  checkName(name) {
    if ($.trim(name) === "") {
      this.validName = false;
      this.checkAllData();
      return "empty";
    } else if (this.regex.validateName(name)) {
      this.validName = true;
      this.checkAllData();
      return true;
    } else {
      this.validName = false;
      this.checkAllData();
      return false;
    }
  }

  checkEmail(email) {
    if ($.trim(email) === "") {
      this.validEmail = false;
      this.checkAllData();
      return "empty";
    } else if (this.regex.validateEmail(email)) {
      this.validEmail = true;
      this.checkAllData();
      return true;
    } else {
      this.validEmail = false;
      this.checkAllData();
      return false;
    }
  }

  checkPhone(phone) {
    if ($.trim(phone) === "") {
      this.validPhone = false;
      this.checkAllData();
      return "empty";
    } else if (this.regex.validatePhone(phone)) {
      this.validPhone = true;
      this.checkAllData();
      return true;
    } else {
      this.validPhone = false;
      this.checkAllData();
      return false;
    }
  }

  checkAge(age) {
    if ($.trim(age) === "") {
      this.validAge = false;
      this.checkAllData();
      return "empty";
    } else if (this.regex.validateAge(age)) {
      this.validAge = true;
      this.checkAllData();
      return true;
    } else {
      this.validAge = false;
      this.checkAllData();
      return false;
    }
  }

  checkPassword(password) {
    if ($.trim(password) === "") {
      this.validPassword = false;
      this.checkAllData();
      return "empty";
    } else if (this.regex.validatePassword(password)) {
      this.validPassword = true;
      this.checkAllData();
      return true;
    } else {
      this.validPassword = false;
      this.checkAllData();
      return false;
    }
  }

  checkRePassword(rePassword, password) {
    if ($.trim(rePassword) === "") {
      this.validRePassword = false;
      this.checkAllData();
      return "empty";
    } else if ($.trim(rePassword) === $.trim(password)) {
      this.validRePassword = true;
      this.checkAllData();
      return true;
    } else if ($.trim(rePassword) !== $.trim(password)) {
      this.validRePassword = false;
      this.checkAllData();
      return "not";
    } else {
      this.validRePassword = false;
      this.checkAllData();
      return false;
    }
  }

  checkAllData() {
    if (
      this.validName &&
      this.validEmail &&
      this.validAge &&
      this.validPhone &&
      this.validPassword &&
      this.validRePassword
    ) {
      this.ui.checkForm(true);
    } else {
      this.ui.checkForm();
    }
  }
}
