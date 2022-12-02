import { Directive, HostListener, HostBinding, ElementRef} from '@angular/core'

@Directive({
    selector: '[appDropdown]'
})

export class DropdownDirective{
    @HostBinding('class.open') isOpen = false;

    //this version of listener will only open/close wehn directly clicking the element
    // @HostListener('click') toggleOpen()
    // {
    //     this.isOpen = !this.isOpen;
    // }

    //his version will open when clicking the leemtn, but close if click anywhere outside of the element

    @HostListener('document:click', ['$event']) toggleOpen(event: Event)
    {
        this.isOpen = this.elRef.nativeElement.contains(event.target) ? !this.isOpen : false;
    }

    constructor(private elRef: ElementRef){}
}