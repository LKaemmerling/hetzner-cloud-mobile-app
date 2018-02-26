import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {DebugElement} from '@angular/core';
import {HomePage} from './home';
import {IonicModule, LoadingController, ModalController, NavController, Platform} from 'ionic-angular/index';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {PlatformMock, SplashScreenMock, StatusBarMock} from '../../../test-config/mocks-ionic';
import {HttpClientModule} from "@angular/common/http";
import {LoadingControllerMock, ModalControllerMock, StorageMock} from "ionic-mocks";
import {TranslateFakeLoader, TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {ProjectModule} from "../../models/project/project.module";
import {ServersModule} from "../../models/servers/Servers.module";
import {IonicStorageModule, Storage} from "@ionic/storage";

describe('Home Page', () => {
  let de: DebugElement;
  let de2: DebugElement;
  let comp: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomePage],
      imports: [
        IonicModule.forRoot(HomePage),
        HttpClientModule,
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: TranslateFakeLoader},
        }),
        ProjectModule,
        ServersModule,
        IonicStorageModule
      ],
      providers: [
        NavController,
        {provide: Platform, useClass: PlatformMock},
        {provide: StatusBar, useClass: StatusBarMock},
        {provide: SplashScreen, useClass: SplashScreenMock},
        {provide: ModalController, useFactory: () => ModalControllerMock.instance()},
        {provide: LoadingController, useFactory: () => LoadingControllerMock.instance() },
        {provide: Storage, useFactory: () => StorageMock.instance() }

      ]
    }).compileComponents();  // compile template and css;
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePage);
    comp = fixture.componentInstance;
  });

  it('should create component', () => expect(comp).toBeDefined());
});
