import { TestBed } from '@angular/core/testing';
import { LayoutComponent } from './layout.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('LayoutComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutComponent, RouterTestingModule],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(LayoutComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});

