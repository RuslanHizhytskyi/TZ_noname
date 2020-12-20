function formValidation(formSelector, errorActiveClass) {
  const form = document.querySelector(formSelector),
        errorMessage = {
          name: 'Please contain 3 or more chars',
          email: 'Example: name@email.domen',
          country: 'Please choose country',
          prefix: 'Only digits',
          phone: 'Only digits, 7 or more chars'
        };

  function showError(elem, errorContainer, message) {
    elem.setAttribute('data-valid', false)
    elem.style.outline = '2px solid red';
    elem.style.marginBottom = '17px';
    errorContainer.textContent = message;
    errorContainer.classList.add(errorActiveClass);
  }

  function hideError(elem, errorContainer) {
    elem.setAttribute('data-valid', true)
    elem.style.cssText = '';
    errorContainer.classList.remove(errorActiveClass);
  }
  
  function validation(el) {
    const errorContainer = el.parentElement.querySelector('.form__errormessage');
    if (el.name === 'name' || el.name == 'surname') {
      // if (el.value.length < 3) {
      //   showError(el, errorContainer, errorMessage.name)
      // } else {
      //   hideErroe(el, errorContainer);
      // }
      el.value.length < 3
        ? showError(el, errorContainer, errorMessage.name)
        : hideError(el, errorContainer);
    }

    if (el.name === 'email') {
      // if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(el.value)) {
      //   hideErroe(el, errorContainer);
      // } else {
      //   showError(el, errorContainer, errorMessage.email);
      // }
      el.value.match(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        )
          ? hideError(el, errorContainer)
          : showError(el, errorContainer, errorMessage.email);
      
    }

    if (el.name === 'country') {
      // if (el.value === 'default') {
      //   showError(el, errorContainer, errorMessage.country);
      // } else {
      //   hideErroe(el, errorContainer);
      // }
      el.value === "default"
        ? showError(el, errorContainer, errorMessage.country)
        : hideError(el, errorContainer);
    }

    if (el.name === 'prefix') {
      // if (el.value.trim().split('').every(el => Number.isInteger(+el))) {
      //   hideErroe(el, errorContainer);
      // } else {
      //   showError(el, errorContainer, errorMessage.prefix);
      // }
      el.value.trim().split("").every((el) => Number.isInteger(+el))
        ? hideError(el, errorContainer)
        : showError(el, errorContainer, errorMessage.prefix);
  
    }

    if (el.name === 'phone') {
      // if (el.value.length > 6 && el.value.trim().split('').every(el => Number.isInteger(+el))) {
      //   hideErroe(el, errorContainer);
      // } else {
      //   showError(el, errorContainer, errorMessage.phone);
      // }
      el.value.length > 6 && el.value.trim().split("").every((el) => Number.isInteger(+el))
        ? hideError(el, errorContainer)
        : showError(el, errorContainer, errorMessage.phone);
    }
  }

  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const inputs = form.querySelectorAll('input, select');
    let validArr = [];

    
    inputs.forEach((elem, i) => {
      validation(elem);
      elem.addEventListener('change', () => validation(elem));
      validArr[i] = elem.getAttribute('data-valid');
    });
    if (validArr.every(el => el === 'true')) {
      form.reset();
      console.log('sending form to server');
    } else {
      console.log("form isn't valid");
    }
  });
}

export default formValidation;