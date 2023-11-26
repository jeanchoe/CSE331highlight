/**collab Justin Dong Antonio Ji David Lym */
import * as assert from 'assert';
import { explode } from './char_list';
import { explode_array , cons, nil} from './list';
import { findHighlights, getNextHighlight, parseHighlightLines , parseHighlightText} from './parser';
// import { find } from './webpack.config';


describe('parser', function() {

  it('parseHighlightLines', function() {
    assert.deepEqual(parseHighlightLines(""), explode_array([]));
    assert.deepEqual(
      parseHighlightLines("Red hi there"),
      explode_array([
        {color: 'red', text: 'hi there'},
      ]));
    assert.deepEqual(
      parseHighlightLines("Red hi there\nGreen more text"),
      explode_array([
        {color: 'red', text: 'hi there'},
        {color: 'green', text: 'more text'},
      ]));
    assert.deepEqual(
      parseHighlightLines("Red hi there\nGreen more text\nBlue really? more?"),
      explode_array([
        {color: 'red', text: 'hi there'},
        {color: 'green', text: 'more text'},
        {color: 'blue', text: 'really? more?'},
      ]));
  });

  it('getNextHighlight', function() {
    // first branch
    assert.strictEqual(getNextHighlight(explode("")), undefined);

    // second branch
    assert.strictEqual(getNextHighlight(explode("ab")), undefined);
    assert.strictEqual(getNextHighlight(explode("abc")), undefined);

    // third branch
    assert.strictEqual(getNextHighlight(explode("ab[red")), undefined);
    assert.strictEqual(getNextHighlight(explode("[red")), undefined);

    // fourth branch
    assert.strictEqual(getNextHighlight(explode("abc[red|")), undefined);
    assert.strictEqual(getNextHighlight(explode("abc[red|def")), undefined);

    // fifth branch
    assert.deepStrictEqual(getNextHighlight(explode("my [red|ball] is great")),
        ["my ", {color: "red", text: "ball"}, explode(" is great")]);
    assert.deepStrictEqual(getNextHighlight(explode("grass is [green|itchy]")),
        ["grass is ", {color: "green", text: "itchy"}, explode("")]);
  });

  it('findHighlights', function() {
    // TODO: Add tests here
    // base case
    assert.deepStrictEqual(findHighlights(explode("")), nil);
    // second branch
    assert.deepStrictEqual(findHighlights(explode("dc")), cons({ color: "white", text: "dc" }, nil));
    // third branch
    assert.deepStrictEqual(findHighlights(explode("[red|ball]")), cons({color: "red", text: "ball"}, nil));
    assert.deepStrictEqual(findHighlights(explode("[green|itchy] grass")), cons({color: "green", text: "itchy"},
    cons({color: "white", text: " grass"}, nil)));
    // fourth branch
    assert.deepStrictEqual(findHighlights(explode("[red|ball][green|itchy]")), cons({color: "red", text: "ball"},
    cons({color: "green", text: "itchy"}, nil)));
    assert.deepStrictEqual(findHighlights(explode("[blue|steel][purple|hall] tea")), cons({color: "blue", text: "steel"},
    cons({color: "purple", text: "hall"}, cons({color: "white", text: " tea"}, nil))));

  });

  // TODO: Uncomment to test
 it('parseHighlightText', function() {
   assert.deepEqual(parseHighlightText(""), explode_array([]));
   assert.deepEqual(
     parseHighlightText("my [red|favorite] book"),
     explode_array([
       {color: 'white', text: 'my '},
       {color: 'red', text: 'favorite'},
       {color: 'white', text: ' book'},
     ]));
 });

});
