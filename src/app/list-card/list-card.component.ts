import { Component, input, output } from '@angular/core';
import { List } from '../interfaces/list';

@Component({
    selector: 'list-card',
    imports: [],
    templateUrl: './list-card.component.html',
    styleUrl: './list-card.component.css',
})
export class ListCardComponent {
    list = input.required<List>();
    delete = output<void>();

    deleteList() {
        this.delete.emit();
    }
}
