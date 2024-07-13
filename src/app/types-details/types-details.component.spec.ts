import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypesDetailsComponent } from './types-details.component';

describe('TypesDetailsComponent', () => {
  let component: TypesDetailsComponent;
  let fixture: ComponentFixture<TypesDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TypesDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TypesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
