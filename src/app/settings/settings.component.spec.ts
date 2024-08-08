import { TestBed } from '@angular/core/testing';
import { SettingsComponent } from './settings.component';

describe('SettingsComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingsComponent],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(SettingsComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});

