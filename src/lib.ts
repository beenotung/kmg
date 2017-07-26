import "rxjs/add/operator/toPromise";
import {config} from "./app/app.config";
import {SweetAlert2} from "@beenotung/tslib/src/typestub-sweetalert2";

/* for easy change of impl */
export let swal: SweetAlert2 = SweetAlert2;
// swal = window['swal'];
if (config.mode === "dev") {
  window["swal"] = window["SweetAlert2"] = swal;
}
