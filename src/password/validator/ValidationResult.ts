export class ValidationResult {
  private readonly valid: boolean;
  private readonly messages: Array<string>;

  constructor(valid: boolean, messages: Array<string>) {
    this.valid = valid;
    this.messages = messages;
  }

  public isValid(): boolean {
    return this.valid;
  }

  public getMessages(): Array<string> {
    return this.messages;
  }
}
