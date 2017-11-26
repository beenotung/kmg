import {inject, TestBed} from "@angular/core/testing";

import {StorageService} from "./storage.service";
import {AppModule} from "../../app/app.module";
import {IonicMockProviders} from "../../test/ionic.spec";

describe("StorageService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      providers: IonicMockProviders,
    });
  });

  it("should be created", inject([StorageService], (service: StorageService) => {
    expect(service).toBeTruthy();
  }));
});
