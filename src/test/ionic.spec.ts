import {App, Config, Platform, ViewController} from "ionic-angular";
import {mockApp, mockConfig, mockPlatform, MockPlatform, mockView} from "ionic-angular/util/mock-providers";

export const IonicMockProviders = [
  {provide: App, useValue: mockApp()},
  {provide: Config, useValue: mockConfig()},
  {provide: Platform, useValue: mockPlatform() as MockPlatform},
  {provide: ViewController, useValue: mockView()},
];
