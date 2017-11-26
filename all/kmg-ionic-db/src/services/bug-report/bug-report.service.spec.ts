import {inject, TestBed} from "@angular/core/testing";

import {BugReportService} from "./bug-report.service";
import {IonicMockProviders} from "../../test/ionic.spec";
import {AppModule} from "../../app/app.module";

describe("BugReportService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      providers: IonicMockProviders,
    });
  });

  it("should be created", inject([BugReportService], (service: BugReportService) => {
    expect(service).toBeTruthy();
  }));
});
