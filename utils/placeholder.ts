export function GetPlaceholderImageByString(str: string): string {
  const placeholderLink: string =
    "https://via.placeholder.com/200x200.png?text=";

  const words = str.split(" ");
  const firstCharacters = words.map((word) => word.charAt(0));
  return placeholderLink + firstCharacters.join("");
}
