
const useInputValidation = () => {

  type FormValues = { [key: string]: string };
  type Errors = { [key: string]: Record<string, boolean> };
  type Validators = {
    [key: string]: Record<string, (arg: string) => boolean>
  };

  const formValues: FormValues = {
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


  const errors: Errors = {
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

  const validators: Validators = {
    email: {
      required: (value: string): boolean => value !== '',
      format: (value: string): boolean => /^[^-_\W](?!.*_-)(?!.*-_)(?!.*--)(?!.*__)((?!-_)[(\d\w)|-]+)@([a-z]+)\.([a-z]{2,})$/gmi.test(value),
    },
    login: {
      required: (value: string): boolean => value !== '',
      format: (value: string): boolean => /^(?!.*_-)(?!.*-_)(?!.*--)(?!.*__)([(\d\w)|-]{3,16})(?<!-|_)$/gm.test(value),
    },
    first_name: {
      required: (value: string): boolean => value !== '',
      format: (value: string): boolean => /^[A-ZА-ЯЁ]{1}[a-zа-яё]{2,15}$/.test(value),
    },
    second_name: {
      required: (value: string): boolean => value !== '',
      format: (value: string): boolean => /^[A-ZА-ЯЁ]{1}[a-zа-яё]{2,15}$/.test(value),
    },
    display_name: {
      required: (value: string): boolean => value !== '',
      format: (value: string): boolean => /^[A-ZА-ЯЁ]{1}[a-zа-яё]{2,15}$/.test(value),
    },
    phone: {
      required: (value: string): boolean => value !== '',
      format: (value: string): boolean => /\+?[\d]{10,15}$/.test(value),
    },
    password: {
      required: (value: string): boolean => value !== '',
      format: (value: string): boolean => /^(?=.*?[0-9])(?=.*?[A-Z])[\S]{8,40}$/.test(value),
    },
    newPassword: {
      required: (value: string): boolean => value !== '',
      format: (value: string): boolean => /^(?=.*?[0-9])(?=.*?[A-Z])[\S]{8,40}$/.test(value),
    },
    passwordCheck: {
      required: (value: string): boolean => value !== '',
      format: (value: string): boolean => /^(?=.*?[0-9])(?=.*?[A-Z])[\S]{8,40}$/.test(value),
    },
    message: {
      required: (value: string): boolean => value !== '',
    }
  }

  const validateInput = (inputName: string, inputValue: string) => {
    const validationRes = Object.keys(validators[inputName]).map(
      errorKey => {
        const errorResult = validators[inputName][errorKey](inputValue);
        return { [errorKey]: errorResult };
      }
    ).reduce((acc, el) => ({ ...acc, ...el }), {});

    return validationRes;
  }

  const validateForm = (inputNames: string[], errors: Errors): boolean => {
    const validationRes = inputNames.reduce((res: [], inputName: string) => {
      res: [] = [...res, ...Object.values(errors[inputName])]
      return res;
    }, []).some(el => el !== true);

    return validationRes;
  }

  return [formValues, errors, validateInput, validateForm];

}

export default useInputValidation;


