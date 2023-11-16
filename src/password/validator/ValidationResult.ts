export class ValidationResult {

  private readonly valid: boolean;
  private readonly messages: string[]

  constructor(valid: boolean, messages: string[]) {

    this.valid = valid;
    this.messages = messages;
  }

  public isValid(): boolean {

    return this.valid;
  }

  public getMessages(): string[] {

    return this.messages;
  }

}
