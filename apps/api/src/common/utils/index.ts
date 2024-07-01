import * as bcrypt from 'bcrypt';

export const hashPass = (pass: string): string => {
  const saltOrRound = 10;
  const hashPass = bcrypt.hashSync(pass, saltOrRound);
  return hashPass;
};
