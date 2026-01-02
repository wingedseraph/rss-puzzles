type User = { name?: string; surname?: string };

export type ValidationError = string[];

const isEnglishLettersRegex = /^[A-Za-z-]+$/;
const isFirstLetterIsUppercase = /^[A-Z]/;

export function validateName(name?: string): string[] {
  const errors: string[] = [];

  if (!name) {
    errors.push('name is required');
    return errors;
  }

  if (typeof name !== 'string') {
    errors.push('name must be a string');
    return errors;
  }

  if (!isEnglishLettersRegex.test(name)) {
    errors.push('name can contain only English letters and hyphen');
  }

  if (!isFirstLetterIsUppercase.test(name)) {
    errors.push('name must start with an uppercase letter');
  }

  if (name.length < 3) {
    errors.push('name must be at least 3 characters');
  }

  return errors;
}

export function validateSurname(surname?: string): string[] {
  const errors: string[] = [];

  if (!surname) {
    errors.push('surname is required');
    return errors;
  }

  if (typeof surname !== 'string') {
    errors.push('surname must be a string');
    return errors;
  }

  if (!isEnglishLettersRegex.test(surname)) {
    errors.push('surname can contain only English letters and hyphen');
  }

  if (!isFirstLetterIsUppercase.test(surname)) {
    errors.push('surname must start with an uppercase letter');
  }

  if (surname.length < 4) {
    errors.push('surname must be at least 4 characters');
  }

  return errors;
}

export function validation(user: User) {
  const { name, surname } = user;
  const errors: ValidationError = [];

  errors.push(...validateName(name));
  errors.push(...validateSurname(surname));

  return errors;
}
