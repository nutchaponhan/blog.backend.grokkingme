import * as argon2 from 'argon2';

export class ArgonHasher {
  private password: string | Buffer;
  private hashed: string;

  constructor(password?: string | Buffer, hashed?: string) {
    this.password = password || null;
    this.hashed = hashed || null;
  }

  addPassword(newPassword: string | Buffer) {
    this.password = newPassword;
    return this;
  }

  addHashed(newHashed: string) {
    this.hashed = newHashed;
    return this;
  }

  build() {
    return new ArgonHasher(this.password, this.hashed);
  }

  async hash(): Promise<string> {
    return argon2.hash(this.password);
  }

  async verify(): Promise<boolean> {
    return argon2.verify(this.hashed, this.password);
  }
}
