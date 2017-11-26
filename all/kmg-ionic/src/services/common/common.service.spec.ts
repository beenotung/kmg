import {inject, TestBed} from "@angular/core/testing";

import {CommonService} from "./common.service";
import {AppModule} from "../../app/app.module";
import {IonicMockProviders} from "../../test/ionic.spec";

describe("CommonService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      providers: IonicMockProviders,
    });
  });

  it("should be created", inject([CommonService], (service: CommonService) => {
    expect(service).toBeTruthy();
  }));
});
