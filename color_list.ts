/**collab Justin Dong Antonio Ji David Lym */
import { ColorInfo, COLORS } from './colors';
import { List, cons, nil } from './list';

// TODO: add interfaces and classes here

// ColorList interface
export interface ColorList{
  /**
   * returns a lost of color names that include the text
   * @param text searching for color names (case insensitive)
   * @returns list of color names
   */
  findMatchingNames:(text: string) => List<string>;
  /**
   * Returns the back and foreground css colors
   * @param name Name of the color
   * @throws throws if there is no such color
   * @returns back and foreground background is css background and foreground is css foreground.
   */
  getColorCss:(name: string) => readonly [string, string];
}

/**
 * Returns a list of all color names that include the given text
 * @param text Text to look for in the names of the colors (case insensitive)
 * @returns list of all color names that include the given text
 */
export const findMatchingNames = (text: string): List<string> => {
  return findMatchingNamesIn(text, COLORS);
};

/** Returns a new list containing just the names of those colors that include the
 *given text.
 *@param text The text in question
 *@param colors The full list of colors
 *@returns The sublist of colors containing those colors whose names contain
 *the given text.
 */
export const findMatchingNamesIn =
    (text: string, colors: List<ColorInfo>): List<string> => {
  if (colors === nil) {
    return nil;
  } else {
    // Note: the _ prevents the typechecker froom complaining about
    // our defining these variables and not using them which we must
    // do to avoid tuple indexing
    const [color, _css, _foreground] = colors.hd;
    if (color.includes(text)) {
      return cons(color, findMatchingNamesIn(text, colors.tl));
    } else {
      return findMatchingNamesIn(text, colors.tl);
    }
  }
};


/**
 * Returns the background and foreground CSS colors to highlight with this color.
 * @param name Name of the color to look for
 * @throws Error if there is no such color
 * @returns (bg, fg) where bg is the CSS background color and fg is foreground
 */
export const getColorCss = (name: string): readonly [string, string] => {
  return getColorCssIn(name, COLORS);
};

/**
* Returns the colors from the (first) list entry with this color name. Throws
* an Error none is found (i.e., we hit the end of the list).
* @param name The name in question.
* @param colors The full list of colors.
* @throws Error if no item in colors has the given name.
* @return The first item in colors whose name matches the given name.
*/
export const getColorCssIn =
    (name: string, colors: List<ColorInfo>): readonly [string, string] => {
  if (colors === nil) {
    throw new Error(`no color called "${name}"`);
  } else {
    const [color, css, foreground] = colors.hd;
    if (color === name) {
      return [css, foreground ? '#F0F0F0' : '#101010'];
    } else {
      return getColorCssIn(name, colors.tl);
    }
  }
};


class SimpleColorList implements ColorList {
  readonly colors: List<ColorInfo>;

  /**
   * constructs SimpleColorList with list from ColorInfo
   * @param colors is a list from ColorInfo
   */

  constructor(colors: List<ColorInfo>) {
    this.colors = colors;
  }

  /**
   * Returns a list of color names from the text
   * @param text searching for the names of colors (case insensitive).
   * @returns list of color names that have the given text.
   */
  findMatchingNames = (text: string): List<string> => {
    return this.findMatchingNamesIn(text, this.colors);
  }

  /**
   * Returns the back and foreground colors to highlight with.
   * @param name Name of the color
   * @throws Error if there is no listed color.
   * @returns tuple where background is css background color and foreground is the css foreground color.
   */
  getColorCss = (name: string): readonly [string, string] => {
    return this.getColorCssIn(name, this.colors);
  }

  /**Implements the helper function for finding names */
  private findMatchingNamesIn = (text: string, colors: List<ColorInfo>): List<string> => {
    if (colors === nil) {
      return nil;
    } else {
      const [color, _css, _foreground] = colors.hd;
      if (color.includes(text)) {
        return cons(color, this.findMatchingNamesIn(text, colors.tl));
      } else {
        return this.findMatchingNamesIn(text, colors.tl);
      }
    }
  }

  /**Implements the helper function for getting color CSS */
  private getColorCssIn = (name: string, colors: List<ColorInfo>): readonly [string, string] => {
    if (colors === nil) {
      throw new Error(`no color called "${name}"`);
    } else {
      const [color, css, foreground] = colors.hd;
      if (color === name) {
        return [css, foreground ? '#F0F0F0' : '#101010'];
      } else {
        return this.getColorCssIn(name, colors.tl);
      }
    }
  }
}

/**
 * Creates and returns an instance of SimpleColorList that uses colors from COLORS
 * @returns an insance of SimpleColorList
 */
export const makeSimpleColorList = (): ColorList => {
  return new SimpleColorList(COLORS);;
};