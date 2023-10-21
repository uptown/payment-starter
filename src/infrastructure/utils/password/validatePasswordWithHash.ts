import * as bcrypt from 'bcrypt';

export async function validatePasswordWithHash(
  password: string,
  passwordHash: string,
): Promise<boolean> {
  return bcrypt.compare(password, passwordHash);
}
