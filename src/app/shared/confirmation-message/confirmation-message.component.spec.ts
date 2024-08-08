import { TestBed } from '@angular/core/testing';
import { ConfirmationMessageComponent } from './confirmation-message.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

describe('ConfirmationMessageComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmationMessageComponent],
      providers: [
        { provide: MatDialogRef, useValue: {} }, // Mock MatDialogRef
        { provide: MAT_DIALOG_DATA, useValue: {} }, // Mock MAT_DIALOG_DATA (if needed)
      ],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(ConfirmationMessageComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
