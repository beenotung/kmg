import {inject, TestBed} from "@angular/core/testing";

import {UserSessionService} from "./user-session.service";
import {AppModule} from "../../app/app.module";
import {IonicMockProviders} from "../../test/ionic.spec";

describe("UserSessionService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      providers: IonicMockProviders,
    });
  });

  it("should be created", inject([UserSessionService], (service: UserSessionService) => {
    expect(service).toBeTruthy();
  }));
});
