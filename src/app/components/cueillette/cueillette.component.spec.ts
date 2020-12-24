import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CueilletteComponent } from './cueillette.component';

describe('CueilletteComponent', () => {
  let component: CueilletteComponent;
  let fixture: ComponentFixture<CueilletteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CueilletteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CueilletteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
