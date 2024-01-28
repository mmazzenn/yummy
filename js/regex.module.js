export class Regex {
  validateSearchName(name) {
    const regex = /^[A-Za-z]+(\s)?[A-Za-z]*$/gi;
    return regex.test(name);
  }

  validateSearchLetter(letter) {
    const regex = /^[A-Za-z]{1}$/gi;
    return regex.test(letter);
  }

  validateName(name) {
    const regex = /^[A-Za-z]{3,15}(?:\s[A-Za-z]{3,15})?$/gi;
    return regex.test(name);
  }

  validateEmail(email) {
    const regex =
      /^[a-zA-Z0-9]*((.|!|#|\$|%|&|\*|\+|\/|\?|_|-)?[a-zA-Z0-9]+){1,}@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.[A-Za-z]{2,61}$/gi;
    return regex.test(email);
  }

  validatePhone(phone) {
    const regex = /^[\+]?(\([0-9]{3}\))?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,9}$/gi;
    return regex.test(phone);
  }

  validateAge(age) {
    const regex = /^(1[6-9]|[2-9][0-9]|1[0-2][0-9]|130)$/gi;
    return regex.test(age);
  }

  validatePassword(password) {
    const regex = /(?=.*[a-z])(?=.*[A-Z])(?=.*[\d])(?=.*[~`!@#\$%\^&\*\(\)_\-\+={\[}\]\|\:;"'<,>\.\?\/])[a-zA-Z\d~`!@#\$%\^&\*\(\)_\-\+={\[}\]\|\:;"'<,>\.\?\/]{8,}$/gi;
    return regex.test(password);
  }
}
