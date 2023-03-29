const rulesPassword = [
  {
    regex: /^.{8,}$/,
    errorMessage: "Password must be at least 8 characters long.",
  },
  {
    regex: /[A-Z]/,
    errorMessage: "Password must contain at least one capital letter.",
  },
  {
    regex: /[a-z]/,
    errorMessage: "Password must contain at least one small letter.",
  },
  {
    regex: /\d/,
    errorMessage: "Password must contain at least one number.",
  },
  {
    regex: /[\W_]/,
    errorMessage: "Password must contain at least one special character.",
  },
];
const rulesEmail = [
  {
    regex: /\s/,
    errorMessage: "Email address cannot contain spaces.",
    inverseMatch: true,
  },
  {
    regex: /^[^@]+@[^@]+\.[^@]+$/,
    errorMessage: "Invalid email address format.",
    inverseMatch: false,
  },
];


export function validatePassword(password) {
  for (let i = 0; i < rulesPassword.length; i++) {
    if (!password.match(rulesPassword[i].regex)) {
      return rulesPassword[i].errorMessage;
    }
  }
  return "";
}
export function validateEmail(email) {
  for (let i = 0; i < rulesEmail.length; i++) {
    const rule = rulesEmail[i];
    const isMatch = email.match(rule.regex);
    if ((isMatch && rule.inverseMatch) || (!isMatch && !rule.inverseMatch)) {
      return rule.errorMessage;
    }
  }
  return "";
}


const validationMethods = { validatePassword, validateEmail };

export default validationMethods;
