/**
 * must be pre-defined index on the table
 * */
export class BaseSearchObject {
  constructor(public delete_date = 0) {
  }
}

export class SearchByUserID extends BaseSearchObject {
  constructor(public user_id: string) {
    super();
  }
}
