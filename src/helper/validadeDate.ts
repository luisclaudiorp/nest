import { AgeError } from 'src/errors/ageError';

export const validateDate = (dateUser: string): number => {
  const dates = dateUser.split('/');
  const d = new Date();

  const userday = parseInt(dates[0]);
  const usermonth = parseInt(dates[1]);
  const useryear = parseInt(dates[2]);

  const curday = d.getDate();
  const curmonth = d.getMonth() + 1;
  const curyear = d.getFullYear();

  let age = curyear - useryear;

  if (curmonth < usermonth || (curmonth === usermonth && curday < userday)) {
    age--;
  }
  if (age < 18) {
    throw new AgeError('age under 18 years');
  }
  return age;
};
