import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appNumericInput]'
})
export class NumericInputDirective {
  private readonly maxLength = 10;

  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event']) onInputChange(event: Event) {
    const initialValue = this.el.nativeElement.value;

    // Remove all non-digit characters and limit to 10 digits
    const cleanedValue = initialValue.replace(/[^0-9]*/g, '').substring(0, this.maxLength);

    this.el.nativeElement.value = cleanedValue;
    event.stopPropagation();
  }

  @HostListener('paste', ['$event']) onPaste(event: ClipboardEvent) {
    const pastedText = event.clipboardData?.getData('text/plain');
    if (pastedText) {
      event.preventDefault();
      const sanitized = pastedText.replace(/[^0-9]/g, '').substring(0, this.maxLength);
      document.execCommand('insertText', false, sanitized);
    }
  }
}