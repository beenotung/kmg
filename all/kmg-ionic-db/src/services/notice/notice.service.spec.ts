import {inject, TestBed} from "@angular/core/testing";

import {NoticeService} from "./notice.service";
import {AppModule} from "../../app/app.module";
import {IonicMockProviders} from "../../test/ionic.spec";

describe("NoticeService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      providers: IonicMockProviders,
    });
  });

  it("should be created", inject([NoticeService], (service: NoticeService) => {
    expect(service).toBeTruthy();
  }));
});
