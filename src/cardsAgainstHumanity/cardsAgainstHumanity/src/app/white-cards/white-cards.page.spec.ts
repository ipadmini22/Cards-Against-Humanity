import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WhiteCardsPage } from './white-cards.page';

describe('WhiteCardsPage', () => {
  let component: WhiteCardsPage;
  let fixture: ComponentFixture<WhiteCardsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WhiteCardsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WhiteCardsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
