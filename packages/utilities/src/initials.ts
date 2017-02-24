/** Regex to detect words within paraenthesis in a string where gi implies global and case-insensitive. */
const CHARS_WITHIN_PARENTHESIS_REGEX: RegExp = new RegExp('\\(([^)]*)\\)', 'gi');

/**
 *  Matches any non-word characters with respect to the Unicode codepoints; generated by
 * https://mothereff.in/regexpu for regex /\W /u where u stands for Unicode support (ES6 feature).
 * More info here: http://stackoverflow.com/questions/280712/javascript-unicode-regexes.
 * gi implies global and case-insensitive.
 */
const UNICODE_ALPHANUMERIC_CHARS_REGEX =
  new RegExp(
    '(?:[\0-/:-@\[-\^`\{-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]) ',
    'gi');

/** Regex to detect multiple spaces in a string where gi implies global and case-insensitive. */
const MULTIPLE_WHITESPACES_REGEX_TOKEN: RegExp = new RegExp('\\s+', 'gi');

/** Get (up to 2 characters) initials based on display name of the persona. */
export function getInitials(displayName: string, isRtl: boolean): string {
  let initials = '';

  if (displayName != null) {
    // Do not consider the suffixes within parenthesis while computing the initials.
    let personaName: string = displayName.replace(CHARS_WITHIN_PARENTHESIS_REGEX, '');
    personaName = personaName.replace(UNICODE_ALPHANUMERIC_CHARS_REGEX, '');
    personaName = personaName.replace(MULTIPLE_WHITESPACES_REGEX_TOKEN, ' ');

    // Trim leading and trailing spaces if any.
    personaName = personaName.trim();

    const splits: string[] = personaName.split(' ');

    if (splits.length === 2) {
      initials += splits[0].charAt(0).toUpperCase();
      initials += splits[1].charAt(0).toUpperCase();
    } else if (splits.length === 3) {
      initials += splits[0].charAt(0).toUpperCase();
      initials += splits[2].charAt(0).toUpperCase();
    } else if (splits.length !== 0) {
      initials += splits[0].charAt(0).toUpperCase();
    }
  }

  if (isRtl && initials.length > 1) {
    return initials.charAt(1) + initials.charAt(0);
  }

  return initials;
}
