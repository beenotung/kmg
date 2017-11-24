import {new_even_random_enum} from "../src/utils-lib";
import {GridType} from "../src/model/game-map.type";

let r = new_even_random_enum(GridType);
console.log(r.next());
console.log(r.next());
console.log(r.next());
console.log(r.next());
