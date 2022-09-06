const formEl = document.querySelector('.form')!
const firstNameEl = document.querySelector('#first-name')! as HTMLInputElement
const lastNameEl = document.querySelector('#last-name')! as HTMLInputElement
const emailEl = document.querySelector('#email')! as HTMLInputElement
const password1El = document.querySelector('#password')! as HTMLInputElement
const password2El = document.querySelector('#confirm')! as HTMLInputElement
const ageEl = document.querySelector('#age')! as HTMLInputElement
const errorContainer = document.querySelector('.form__error')!

class Validation {
   constructor(
      readonly firstName: HTMLInputElement,
      readonly lastName: HTMLInputElement,
      readonly email: HTMLInputElement,
      readonly password1: HTMLInputElement,
      readonly password2: HTMLInputElement,
      readonly age: HTMLInputElement,
      readonly requiredFields: HTMLInputElement[]
   ) {}

   submitForm(e) {
      e.preventDefault()
      this.generateErrMsg()
   }

   generateErrMsg() {
      errorContainer.innerHTML = ''
      const requiredErrors = this.checkRequired(this.requiredFields)
      const spellingErrors = this.checkSpelling()

      if (requiredErrors) {
         this.createErrorContent(requiredErrors)
      } else if (spellingErrors) {
         this.createErrorContent(spellingErrors)
      } else {
         this.showSuccessMsg()
         window.setTimeout(() => {
            errorContainer.innerHTML = ''
         }, 3000)
      }
   }

   checkRequired(elements: HTMLInputElement[]) {
      elements.map(el => {
         el.style.border="1px solid lightgrey"
      })
      elements = elements.filter( el => !this.isRequired(el.value) )

      return elements[0]
          ? elements.map(el => {
             el.style.border="2px solid red"
             return `
               <li>
                  "${el.id.replace(/^\w/, (c) => c.toUpperCase())}" input is required
               </li>
            `
          }).join('')
          : null
   }

   checkSpelling() {
      const errorsList: string[] = []

      if ( !this.isName(this.firstName.value) ) {
         errorsList.push(`<li>
            First name should be between 4 and 20 letters long
         </li>`)

      } else if ( !this.isName(this.lastName.value) ) {
         errorsList.push(`<li>
            Last name should be between 4 and 20 letters long
         </li>`)

      } else if ( !this.isEmail(this.email.value) ) {
         errorsList.push(`<li>
            Email should stick to a proper format
         </li>`)

      } else if ( !this.isPassword(this.password1.value) ) {
         errorsList.push(`<li>
            Password should have at least 8 characters, include small and capital letters, numbers, and symbols
         </li>`)

      } else if ( this.password1.value !== this.password2.value ) {
         errorsList.push(`<li>
            Your passwords don't match
         </li>`)

      } else if ( !this.isAge(this.age.value) ) {
         errorsList.push(`<li>
            Your Age must be 18 and more
         </li>`)
      }

      return errorsList.join('')
   }

   createErrorContent(list: string) {
      const errorH3 = document.createElement('h3')
      const errorUl = document.createElement('ul')

      errorH3.textContent = 'Errors Log'
      errorUl.innerHTML = list
      errorContainer.appendChild(errorH3)
      errorContainer.appendChild(errorUl)
   }

   showSuccessMsg() {
      const successH4 = document.createElement('h4')
      successH4.textContent = 'Successfully created!'
      errorContainer.appendChild(successH4)
   }

   isRequired(inputValue: string) {
      return inputValue.trim().length > 0
   }

   isName(name: string) {
      return name.length > 3 && name.length < 20
   }

   isEmail(email: string) {
      return (/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(email.toLowerCase())
   }

   isPassword(password: string) {
      return (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/).test(password)
   }

   isAge(age: string) {
      return parseInt(age) > 17
   }

   isDate(date: string) {
      return (/^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/).test(date)
   }
}

const myAccount = new Validation(
   firstNameEl,
   lastNameEl,
   emailEl,
   password1El,
   password2El,
   ageEl,
   [firstNameEl, lastNameEl, emailEl, password1El, password2El, ageEl]
)

formEl.addEventListener( 'submit', (e) => myAccount.submitForm(e) )