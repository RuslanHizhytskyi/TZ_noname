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
    errorContainer.textContent = message;
    errorContainer.classList.add(errorActiveClass);
  }

  function hideErroe(elem, errorContainer) {
    elem.setAttribute('data-valid', true)
    errorContainer.classList.remove(errorActiveClass);
  }
  
  function validation(el) {
    const errorContainer = el.parentElement.querySelector('.form__errormessage');
    if (el.name === 'name' || el.name == 'surname') {
      if (el.value.length < 3) {
        showError(el, errorContainer, errorMessage.name)
      } else {
        hideErroe(el, errorContainer);
      }
    }

    if (el.name === 'email') {
      if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(el.value)) {
        hideErroe(el, errorContainer);
      } else {
        showError(el, errorContainer, errorMessage.email);
      }
    }

    if (el.name === 'country') {
      if (el.value === 'default') {
        showError(el, errorContainer, errorMessage.country);
      } else {
        hideErroe(el, errorContainer);
      }
    }

    if (el.name === 'prefix') {
      if (el.value.trim().split('').every(el => Number.isInteger(+el))) {
        hideErroe(el, errorContainer);
      } else {
        showError(el, errorContainer, errorMessage.prefix);
      }
    }

    if (el.name == 'phone') {
      if (el.value.length > 6 && el.value.trim().split('').every(el => Number.isInteger(+el))) {
        hideErroe(el, errorContainer);
      } else {
        showError(el, errorContainer, errorMessage.phone);
      }
    }
  }

  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const inputs = form.querySelectorAll('input, select'),
          validArr = [];
    inputs.forEach((elem, i) => {
      validation(elem);
      elem.addEventListener('blur', () => validation(elem));
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