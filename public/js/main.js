import KnockoutApplication from './framework/app/KnockoutApplication';

// import required components
import ActionButton from './components/gui/ActionButton';
import AJAX from './framework/com/AJAX';

class Main extends KnockoutApplication {
    constructor(context) {
        super(context);

        // confirm event
        this.on('test-clicked', (event) => {
            event.stop();
            setTimeout(() => {
                event.notifyOrigin('confirm');
            }, 1000);
        });

        // alternative confirmation using component 'id'
        this.on('globe-clicked', (event) => {
            event.stop();
            setTimeout(() => {
                this.notify('globebutton', 'confirm');
            }, 1000);
        });
    }
}

var main = new Main('dev');
main.run();
