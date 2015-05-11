import Component from '../../ko/Component';
import template from './ActionButton.html!text';

export default class ActionButton extends Component {
    constructor(params) {
        super(params, 'icon', 'title', 'event', 'data');
        this.clicked = false;
        this.importObservables();

        this.on('confirm', (event) => {
            this.clicked = false;
        })
    }

    click() {
        this.clicked = true;
        this.emit(this.event, this.data);
    }
}

Component.registerComponent('action-button', ActionButton, template);
