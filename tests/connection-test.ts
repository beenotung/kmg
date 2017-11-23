import {isConnected} from "./model/game-map.data";
import {assert} from "../src/utils-lib";

assert(isConnected(49, 53), "should be connected");
assert(isConnected(53, 49), "should be connected");
assert(isConnected(35, 20), "should be connected");
assert(isConnected(106, 96), "should be connected");
assert(isConnected(40, 27), "should be connected");

assert(!isConnected(40, 100), "should not be connected");
assert(!isConnected(49, 77), "should not be connected");
assert(!isConnected(6, 31), "should not be connected");

console.log("all ok.");
