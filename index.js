var formEl = document.querySelector('.form');
var firstNameEl = document.querySelector('#first-name');
var lastNameEl = document.querySelector('#last-name');
var emailEl = document.querySelector('#email');
var password1El = document.querySelector('#password');
var password2El = document.querySelector('#confirm');
var ageEl = document.querySelector('#age');
var errorContainer = document.querySelector('.form__error');
var Validation = /** @class */ (function () {
    function Validation(firstName, lastName, email, password1, password2, age, requiredFields) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password1 = password1;
        this.password2 = password2;
        this.age = age;
        this.requiredFields = requiredFields;
    }
    Validation.prototype.submitForm = function (e) {
        e.preventDefault();
        this.generateErrMsg();
    };
    Validation.prototype.generateErrMsg = function () {
        errorContainer.innerHTML = '';
        var requiredErrors = this.checkRequired(this.requiredFields);
        var spellingErrors = this.checkSpelling();
        if (requiredErrors) {
            this.createErrorContent(requiredErrors);
        }
        else if (spellingErrors) {
            this.createErrorContent(spellingErrors);
        }
        else {
            this.showSuccessMsg();
            window.setTimeout(function () {
                errorContainer.innerHTML = '';
            }, 3000);
        }
    };
    Validation.prototype.checkRequired = function (elements) {
        var _this = this;
        elements.map(function (el) {
            el.style.border = "1px solid lightgrey";
        });
        elements = elements.filter(function (el) { return !_this.isRequired(el.value); });
        return elements[0]
            ? elements.map(function (el) {
                el.style.border = "2px solid red";
                return "\n               <li>\n                  \"".concat(el.id.replace(/^\w/, function (c) { return c.toUpperCase(); }), "\" input is required\n               </li>\n            ");
            }).join('')
            : null;
    };
    Validation.prototype.checkSpelling = function () {
        var errorsList = [];
        if (!this.isName(this.firstName.value)) {
            errorsList.push("<li>\n            First name should be between 4 and 20 letters long\n         </li>");
        }
        else if (!this.isName(this.lastName.value)) {
            errorsList.push("<li>\n            Last name should be between 4 and 20 letters long\n         </li>");
        }
        else if (!this.isEmail(this.email.value)) {
            errorsList.push("<li>\n            Email should stick to a proper format\n         </li>");
        }
        else if (!this.isPassword(this.password1.value)) {
            errorsList.push("<li>\n            Password should have at least 8 characters, include small and capital letters, numbers, and symbols\n         </li>");
        }
        else if (this.password1.value !== this.password2.value) {
            errorsList.push("<li>\n            Your passwords don't match\n         </li>");
        }
        else if (!this.isAge(this.age.value)) {
            errorsList.push("<li>\n            Your Age must be 18 and more\n         </li>");
        }
        return errorsList.join('');
    };
    Validation.prototype.createErrorContent = function (list) {
        var errorH3 = document.createElement('h3');
        var errorUl = document.createElement('ul');
        errorH3.textContent = 'Errors Log';
        errorUl.innerHTML = list;
        errorContainer.appendChild(errorH3);
        errorContainer.appendChild(errorUl);
    };
    Validation.prototype.showSuccessMsg = function () {
        var successH4 = document.createElement('h4');
        successH4.textContent = 'Successfully created!';
        errorContainer.appendChild(successH4);
    };
    Validation.prototype.isRequired = function (inputValue) {
        return inputValue.trim().length > 0;
    };
    Validation.prototype.isName = function (name) {
        return name.length > 3 && name.length < 20;
    };
    Validation.prototype.isEmail = function (email) {
        return (/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(email.toLowerCase());
    };
    Validation.prototype.isPassword = function (password) {
        return (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/).test(password);
    };
    Validation.prototype.isAge = function (age) {
        return parseInt(age) > 17;
    };
    Validation.prototype.isDate = function (date) {
        return (/^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/).test(date);
    };
    return Validation;
}());
var myAccount = new Validation(firstNameEl, lastNameEl, emailEl, password1El, password2El, ageEl, [firstNameEl, lastNameEl, emailEl, password1El, password2El, ageEl]);
formEl.addEventListener('submit', function (e) { return myAccount.submitForm(e); });
