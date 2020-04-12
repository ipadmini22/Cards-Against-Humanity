import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BlackCardsPage } from './black-cards.page';

describe('BlackCardsPage', () => {
  let component: BlackCardsPage;
  let fixture: ComponentFixture<BlackCardsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlackCardsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BlackCardsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
