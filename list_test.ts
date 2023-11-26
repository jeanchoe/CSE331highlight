/**collab Justin Dong Antonio Ji David Lym */
import * as assert from 'assert';
import { nil, cons, len, split, compact_list, explode_array } from './list';
import { explode } from './char_list';
import { split_at } from './list';



describe('list', function() {

  it('len', function() {
    // 0-1-many: base case, 0 recursive calls (only 1 possible input)
    assert.deepEqual(len(nil), 0);

    // 0-1-many: 1 recursive call
    assert.deepEqual(len(cons(1, nil)), 1);
    assert.deepEqual(len(cons(2, nil)), 1);

    // 0-1-many: 2+ recursive calls
    assert.deepEqual(len(cons(1, cons(2, nil))), 2);
    assert.deepEqual(len(cons(3, cons(2, cons(1, cons(0, nil))))), 4);
  });

  it('split', function() {
    // 0-1-many: base case
    assert.deepEqual(split(0, explode("")), [nil, nil]);
    assert.deepEqual(split(0, explode("a")), [nil, explode("a")]);

    // 0-1-many: 1 recursive call
    assert.deepEqual(split(1, explode("a")), [explode("a"), nil]);
    assert.deepEqual(split(1, explode("as")), [explode("a"), explode("s")]);
    assert.deepEqual(split(1, explode("stray")), [explode("s"), explode("tray")]);

    // 0-1-many: 2+ recursive calls (lots for fun)
    assert.deepEqual(split(2, explode("as")), [explode("as"), nil]);
    assert.deepEqual(split(2, explode("stray")), [explode("st"), explode("ray")]);
    assert.deepEqual(split(3, explode("stray")), [explode("str"), explode("ay")]);
    assert.deepEqual(split(4, explode("stray")), [explode("stra"), explode("y")]);
    assert.deepEqual(split(5, explode("stray")), [explode("stray"), explode("")]);
  });

  it('split_at', function() {
    //0-1-many: base case
    assert.deepEqual(split_at(nil, "a"), [nil, nil]);
    assert.deepEqual(split_at(nil, "b"), [nil, nil]);

    //0-1-many: second base case
    assert.deepEqual(split_at(explode("c"), "c".charCodeAt(0)), [nil, explode("c")]);
    assert.deepEqual(split_at(explode("d"), "d".charCodeAt(0)), [nil, explode("d")]);

    //0-1-many: 1 recursive call
    assert.deepEqual(split_at(explode("ab"), "b".charCodeAt(0)), [explode("a"), explode("b")])
    assert.deepEqual(split_at(explode("bc"), "c".charCodeAt(0)), [explode("b"), explode("c")])
    assert.deepEqual(split_at(explode("x"), "y".charCodeAt(0)), [explode("x"), nil])
    assert.deepEqual(split_at(explode("a"), "b".charCodeAt(0)), [explode("a"), nil])

    //0-1-many: 2+ recursive calls
    assert.deepEqual(split_at(explode("nut"), "t".charCodeAt(0)), [explode("nu"), explode("t")])
    assert.deepEqual(split_at(explode("peanuts"), "n".charCodeAt(0)), [explode("pea"), explode("nuts")])
    assert.deepEqual(split_at(explode("po"), "x".charCodeAt(0)), [explode("po"), nil])
    assert.deepEqual(split_at(explode("peanuts"), "b".charCodeAt(0)), [explode("peanuts"), nil])
  });

  it('compact_list', function() {
    // 0-1-many: base case (only 1 possible)
    assert.deepEqual(compact_list(nil), []);

    // 0-1-many: 1 recursive call
    assert.deepEqual(compact_list(cons(1, nil)), [1]);
    assert.deepEqual(compact_list(cons(8, nil)), [8]);

    // 0-1-many: 2+ recursive calls
    assert.deepEqual(compact_list(cons(1, cons(2, nil))), [1, 2]);
    assert.deepEqual(compact_list(cons(3, cons(2, cons(1, nil)))), [3, 2, 1]);
  });

  it('explode_array', function() {
    // 0-1-many: base case (only 1 possible)
    assert.deepEqual(explode_array([]), nil);

    // 0-1-many: 1 recursive call
    assert.deepEqual(explode_array([1]), cons(1, nil));
    assert.deepEqual(explode_array([8]), cons(8, nil));

    // 0-1-many: 2+ recursive calls
    assert.deepEqual(explode_array([1, 2]), cons(1, cons(2, nil)));
    assert.deepEqual(explode_array([1, 2, 3]), cons(1, cons(2, cons(3, nil))));
  });

});