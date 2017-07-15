import {Component} from '@angular/core';
import {NavController, NavParams, ViewController} from 'ionic-angular';
import {str_like} from '../../../lib/tslib/src/string';

interface SearchSelectOption<A> {
  text: string;
  value: A;
}

@Component({
  selector: 'page-search-select-list',
  templateUrl: 'search-select-list.html',
})
export class SearchSelectListPage<A> {

  option_list: SearchSelectOption<A>[] = []; // enum value and translate key

  searchText: string = '';

  constructor(public navCtrl: NavController
    , private view: ViewController
    , public navParams: NavParams) {
    const param: SearchSelectList.Param<A> = this.navParams.data;
    this.option_list = param.option_list;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchSelectListPage');
  }

  dismiss() {
    this.view.dismiss();
  }

  onInput(event) {
    console.debug('onInput', event);
  }

  notMatch(option: SearchSelectOption<A>): boolean {
    return !str_like(this.searchText, option.text);
  }

  chooseOption(option: SearchSelectOption<A>) {
    this.view.dismiss(option.value);
  }
}

export namespace SearchSelectList {
  export type Option<A> = SearchSelectOption<A>;

  export interface Param<A> {
    option_list: Option<A>[]
  }
}
