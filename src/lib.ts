import 'rxjs/add/operator/toPromise';
import {config} from './app/app.config';
import {SweetAlert2, sweetalert2} from '../lib/tslib/src/typestub-sweetalert2';

/* for easy change of impl */
export let swal: sweetalert2 = SweetAlert2;
// swal = window['swal'];
if (config.mode === 'dev') {
  window['swal'] = window['SweetAlert2'] = swal;
}
