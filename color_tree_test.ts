/**collab Justin Dong Antonio Ji David Lym */
import * as assert from 'assert';
import { explode_array, nil, cons } from "./list";
import { makeBst, lookup, makeColorTree } from "./color_tree";
import { node, empty } from "./color_node";
import { ColorList } from './color_list';

const colorTree: ColorList = makeColorTree();

describe('color_tree', function() {

    it('make_bst', function() {

        // Base Case
        assert.deepStrictEqual(makeBst(nil), empty);

        // 0-1-Many Heuristic - 1 recursive calls:
        assert.deepStrictEqual(makeBst(explode_array([
            ['Blue', '#0000FF', true],
          ])), node(['Blue', '#0000FF', true], empty, empty));

        assert.deepStrictEqual(makeBst(explode_array([
            ['Red', '#FF0000', true],
        ])), node(['Red', '#FF0000', true], empty, empty));

        // 0-1-Many Heuristic - Many recursive calls:
        assert.deepStrictEqual(makeBst(explode_array([
            ['pink', '#FFC0CB', true], ['purple', '#FF0000', true]
        ])), node(['purple', '#FF0000', true], node(['pink', '#FFC0CB', true], empty, empty), empty));

        assert.deepStrictEqual(makeBst(explode_array([
            ['silver', '#C0C0C0', false], ['snow', '#FFFAFA', false], ['yellow', '#FFFF00', false],])),
            node(['snow', '#FFFAFA', false], node(['silver', '#C0C0C0', false], empty, empty), node(['yellow', '#FFFF00', false], empty, empty))
        );

    });

    it('lookup', function() {

        // Base Cases
        assert.deepStrictEqual(lookup('green', empty), undefined);

        // 0-1-Many Heuristic - 1 recursive calls:
        assert.deepStrictEqual(lookup('blue',
        node(['yellow', '#FFF00', false], empty, empty)), undefined);

        assert.deepStrictEqual(lookup('blue',
        node(['red', '#FF0000', false], empty, empty)), undefined);

        // Tree height of 1
        assert.deepStrictEqual(lookup('red',
        node(['blueviolet', '##8A2BE2', true], empty, empty)), undefined);

        // Tree height of 2
        assert.deepStrictEqual(lookup('orange', node(['red', '#FF0000', true],
        node(['orange', '#FFA500', false], empty, empty), empty)), ['orange', '#FFA500', false]);
        // 0-1-Many Heuristic - Many recursive calls:

        // Tree height of 3
        assert.deepStrictEqual(lookup('blue', node(['red', '#FFFF00', true],
        node(['pink', '#FFC0CB', false], node(['blue', '#0000FF', true], empty, empty), empty), empty)), ['blue', '#0000FF', true]);


    });

    it('findMatchingNames', function() {
        assert.deepStrictEqual(colorTree.findMatchingNames("doesnotexist"), nil);
        assert.deepStrictEqual(colorTree.findMatchingNames("indigo"), cons("indigo", nil));
        assert.deepStrictEqual(colorTree.findMatchingNames("azure"), cons("azure", nil));
        assert.deepStrictEqual(colorTree.findMatchingNames("lavender"),
            cons("lavender", cons("lavenderblush", nil)));
        assert.deepStrictEqual(colorTree.findMatchingNames("pink"),
            cons("deeppink", cons("hotpink", cons("lightpink", cons("pink", nil)))));
    });

    it('getColorCss', function() {
        assert.deepStrictEqual(colorTree.getColorCss("lavender"), ['#E6E6FA', '#101010']);
        assert.deepStrictEqual(colorTree.getColorCss("indigo"), ['#4B0082', '#F0F0F0']);
    });
});