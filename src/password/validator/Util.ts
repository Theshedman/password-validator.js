export class Util {
  public static readonly SPACE_CHARACTER: string = " ";

  public static readonly SPECIAL_CHARACTERS: string =
    "!@#$%^&*()_+-=[]{}|;':\",.<>/?`~";

  public static removeNonAlphabeticCharacterFrom(word: string): string {
    return word
      .split("")
      .filter(char => isNaN(Number(char)))
      .filter(char => char !== this.SPACE_CHARACTER)
      .filter(char => !this.SPECIAL_CHARACTERS.includes(char))
      .join("");
  }
}
