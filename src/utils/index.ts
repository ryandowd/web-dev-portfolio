export const toKebabCase = (str: string) => {
  if (str) {
    // @ts-ignore
    const kebabCase = str
      .match(
        /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g
      )
      .map((x) => x.toLowerCase())
      .join('-');
    return kebabCase;
  }
};
