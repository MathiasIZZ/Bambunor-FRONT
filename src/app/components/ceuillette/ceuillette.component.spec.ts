import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CeuilletteComponent } from './ceuillette.component';

describe('CeuilletteComponent', () => {
  let component: CeuilletteComponent;
  let fixture: ComponentFixture<CeuilletteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CeuilletteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CeuilletteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
