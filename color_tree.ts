/**collab Justin Dong Antonio Ji David Lym */

import { List, len, split, nil } from './list';
import { ColorInfo, COLORS } from './colors';
import { ColorNode, empty, node } from './color_node';
import { findMatchingNamesIn, getColorCssIn, ColorList} from './color_list';

// TODO: Uncomment and complete


/**
 * Constructs a binary search tree (BST) from a sorted list of ColorInfo objects.
 *
 * @param L - The sorted list of objects from colorinfo to construct a bst
 * @requires L is sorted by color names.
 * @returns A ColorNode serves as the root of a Binary Search Tree (BST) that adheres to the principles of a valid binary search tree.
 * In this BST, each node in the tree follows a specific ordering:
 * all nodes in the left subtree have color names that are less than the color of the node,
 * while all nodes in the right subtree have color names that are greater than or equal to the node's color.
 */
export const makeBst = (L: List<ColorInfo>): ColorNode => {
    if (L === nil) {
        return empty;
      }

      const m = Math.floor(len(L) / 2);
      const [P, S] = split(m, L);
      if (S !== nil) {
        const [b, R] = [S.hd, S.tl];
        return node(b, makeBst(P), makeBst(R));
      } else {
        return makeBst(P);
      }
};

/**
 * Searches for a color name in a binary search tree of ColorNode elements.
 *
 * @param y - The color name.
 * @param root - The root of the ColorNode bst.
 * @requires The input tree is a valid binary search tree, the nodes in the left subtree have color names that
 * are less than the node's color, and nodes in the right subtree
 * have color names that are greater than or equal to the node's color.
 * @returns The ColorInfo object with the color name anything else is undefined.
 */
export const lookup = (y: string, root: ColorNode): ColorInfo | undefined => {
    if (root === empty) {
    return undefined;
    }

    if (root.kind === "node") {
        const [color] = root.info;
        if (y === color) {
            return root.info;
        } else if (y < color) {
            return lookup(y, root.before);
        } else {
            return lookup(y, root.after);
        }
    }

    return undefined;
};

// TODO: add interfaces, classes, functions here

/**
 * ColorTree storing color information in a bst
 * Implements the ColorList interface
 */
class ColorTree implements ColorList {
  /**
   * RI: this.colorTree = makeBST(colorInfoList)
   * AF: obj = this.colorInfoList
   */
    readonly colorInfoList: List<ColorInfo>;
    readonly colorTree: ColorNode;

    /**
     * Creates a instance of a ColorTree
     * @param colorInfoList A list of ColorInfo
     */
     constructor(colorInfoList: List<ColorInfo>) {
        this.colorInfoList = colorInfoList;
        this.colorTree = makeBst(colorInfoList);
      }

    /**
     * Returns a list of all color names that have the given text.
     * @param text searches for the names of the colors (case insensitive).
     * @returns List of all color names that have the given text.
     */
    findMatchingNames = (text: string): List<string> => {
      return findMatchingNamesIn(text, this.colorInfoList);
    }

    /**
     * Returns the backand foreground to highlight with CSS colors.
     * @param name Name of the color.
     * @throws Error if there is no color.
     * @returns tuple storing background (css color) and foreground (foreground).
     */
    getColorCss = (name: string): readonly [string, string] => {
      const colorInfo = lookup(name, this.colorTree);
      if (colorInfo) {
        return getColorCssIn(name, this.colorInfoList);
      } else {
        throw new Error(`no color called "${name}"`);
      }
    }
}

/**
 * contructs new colorTree by taking in COLORS
 */
export const makeColorTree = (): ColorTree => {
    return new ColorTree(COLORS);
};