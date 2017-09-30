import {inject, TestBed} from "@angular/core/testing";

import {DatabaseService} from "./database.service";
import {AppModule} from "../../app/app.module";
import {IonicMockProviders} from "../../test/ionic.spec";

describe("DatabaseService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      providers: IonicMockProviders,
    });
  });

  it("should be created", inject([DatabaseService], (service: DatabaseService) => {
    expect(service).toBeTruthy();
  }));
});
