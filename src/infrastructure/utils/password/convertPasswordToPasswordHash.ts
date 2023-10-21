import * as bcrypt from 'bcrypt';

export async function convertPasswordToPasswordHash(
  password: string,
): Promise<string> {
  return bcrypt.hash(password, 10);
}
