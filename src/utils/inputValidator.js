
const useInputValidation = () => {

  const formValues = {
    email: '',
    login: '',
    first_name: '',
    second_name: '',
    display_name: '',
    phone: '',
    password: '',
    newPassword: '',
    passwordCheck: '',
    message: ''
  }

  const errors = {
    email: {
      required: false,
      format: false,
    },
    login: {
      required: false,
      format: false,
    },
    first_name: {
      required: false,
      format: false,
    },
    second_name: {
      required: false,
      format: false,
    },
    display_name: {
      required: false,
      format: false
    },
    phone: {
      required: false,
      format: false,
    },
    password: {
      required: false,
      format: false
    },
    newPassword: {
      required: false,
      format: false
    },
    passwordCheck: {
      required: false,
      format: false,
    },
    message: {
      required: false,
    }
  }


  const validators = {
    email: {
      required: (value) => value !== '',
      format: (value) => /^[^-_\W](?!.*_-)(?!.*-_)(?!.*--)(?!.*__)((?!-_)[(\d\w)|-]+)@([a-z]+)\.([a-z]{2,})$/gmi.test(value),
    },
    login: {
      required: (value) => value !== '',
      format: (value) => /^(?!.*_-)(?!.*-_)(?!.*--)(?!.*__)([(\d\w)|-]{3,16})(?<!-|_)$/gm.test(value),
    },
    first_name: {
      required: (value) => value !== '',
      format: (value) => /^[A-ZА-ЯЁ]{1}[a-zа-яё]{2,15}$/.test(value),
    },
    second_name: {
      required: (value) => value !== '',
      format: (value) => /^[A-ZА-ЯЁ]{1}[a-zа-яё]{2,15}$/.test(value),
    },
    display_name: {
      required: (value) => value !== '',
      format: (value) => /^[A-ZА-ЯЁ]{1}[a-zа-яё]{2,15}$/.test(value),
    },
    phone: {
      required: (value) => value !== '',
      format: (value) => /\+?[\d]{10,15}$/.test(value),
    },
    password: {
      required: (value) => value !== '',
      format: (value) => /^(?=.*?[0-9])(?=.*?[A-Z])[\S]{8,40}$/.test(value),
    },
    newPassword: {
      required: (value) => value !== '',
      format: (value) => /^(?=.*?[0-9])(?=.*?[A-Z])[\S]{8,40}$/.test(value),
    },
    passwordCheck: {
      required: (value) => value !== '',
      format: (value) => /^(?=.*?[0-9])(?=.*?[A-Z])[\S]{8,40}$/.test(value),
    },
    message: {
      required: (value) => value !== '',
    }
  }

  const validateInput = (inputName, inputValue) => {
    const validationRes = Object.keys(validators[inputName]).map(
      errorKey => {
        const errorResult = validators[inputName][errorKey](inputValue);
        return { [errorKey]: errorResult };
      }
    ).reduce((acc, el) => ({ ...acc, ...el }), {});

    return validationRes;
  }

  const validateForm = (inputNames, errors) => {
    const validationRes = inputNames.reduce((res, inputName) => {
      res = [...res, ...Object.values(errors[inputName])]
      return res;
    }, []).some(el => el !== true);

    return validationRes;
  }

  return [formValues, errors, validateInput, validateForm];

}

export default useInputValidation;


