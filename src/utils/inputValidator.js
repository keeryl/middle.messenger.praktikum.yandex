
const useInputValidation = () => {

  const formValues = {
    email: '',
    login: '',
    first_name: '',
    second_name: '',
    phone: '',
    password: '',
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
    phone: {
      required: false,
      format: false,
    },
    password: {
      required: false,
      format: false
    },
    passwordCheck: {
      required: false,
      format: false,
    },
    message: {
      required: true,
    }
  }


  const validators = {
    email: {
      required: (value) => value !== '',
      format: (value) => /^[^-_](?!.*_-)(?!.*-_)(?!.*--)(?!.*__)((?!-_)[(\d\w)|-]+)@([a-z]+)\.([a-z]{2,})$/gmi.test(value),
    },
    login: {
      required: (value) => value !== '',
      format: (value) => /^(?!.*_-)(?!.*-_)(?!.*--)(?!.*__)([(\d\w)|-]{3,16})(?<!-|_)$/gm.test(value),
    },
    first_name: {
      required: (value) => value !== '',
      format: (value) => /^[a-z0-9_-]{3,16}$/.test(value),
    },
    second_name: {
      required: (value) => value !== '',
      format: (value) => /^[a-z0-9_-]{3,16}$/.test(value),
    },
    phone: {
      required: (value) => value !== '',
      format: (value) => /^[0-9]{10,15}$/.test(value),
    },
    password: {
      required: (value) => value !== '',
      format: (value) => /^[a-z0-9]{8,40}$/.test(value),
    },
    passwordCheck: {
      required: (value) => value !== '',
      format: (value) => /^[a-z0-9]{8,40}$/.test(value),
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


