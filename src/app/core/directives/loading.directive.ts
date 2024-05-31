import {Directive, ElementRef, input, InputSignal, OnChanges, Renderer2, SimpleChanges} from '@angular/core';

@Directive({
  selector: '[loading]',
  standalone: true,
})
export class LoadingDirective implements OnChanges {
  loading:InputSignal<boolean> = input<boolean>(false);

  private spinnerElement: HTMLElement | null = null;
  private originalButtonContent: string | null = null;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['loading']) {
      this.updateButtonState();
    }
  }

  private updateButtonState(): void {
    const button = this.el.nativeElement;
    if (this.loading()) {
      this.disableButton(button);
      this.showSpinner(button);
    } else {
      this.enableButton(button);
      this.hideSpinner(button);
    }
  }

  private disableButton(button: HTMLElement): void {
    this.renderer.setAttribute(button, 'disabled', 'true');
  }

  private enableButton(button: HTMLElement): void {
    this.renderer.removeAttribute(button, 'disabled');
  }

  private showSpinner(button: HTMLElement): void {
    if (!this.spinnerElement) {
      this.originalButtonContent = button.innerHTML;
      this.spinnerElement = this.renderer.createElement('div');
      this.renderer.addClass(this.spinnerElement, 'spinner');
      button.style.pointerEvents = 'none';
      button.innerHTML = '';
      this.renderer.appendChild(button, this.spinnerElement);
    }
  }

  private hideSpinner(button: HTMLElement): void {
    if (this.spinnerElement && this.originalButtonContent) {
      button.style.pointerEvents = '';
      button.innerHTML = this.originalButtonContent;
      this.originalButtonContent = null;
      this.spinnerElement = null;
    }
  }
}
