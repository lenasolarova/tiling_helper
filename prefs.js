import Gio from 'gi://Gio';
import Gtk from 'gi://Gtk';
import {ExtensionPreferences, gettext as _} from 'resource:///org/gnome/Shell/Extensions/js/extensions/prefs.js';



export default class ExamplePreferences extends ExtensionPreferences {
    fillPreferencesWindow(window) {
        window._settings = this.getSettings();
        const builder = new Gtk.Builder();
        builder.set_translation_domain(this.uuid);
        builder.add_from_file(`/home/leni/.local/share/gnome-shell/extensions/tiling_helper@helping_tiler/prefs.ui`);

        //add pages
        window.add(builder.get_object('keybinding'));
        window.add(builder.get_object('in-progress'));

        //bind the setting to the button for monitor one
        const widget = builder.get_object('select-one');
        window._settings.bind('select-one', widget, 'selected',
            Gio.SettingsBindFlags.DEFAULT);
        widget.connect('notify::selected-item', () => {
            console.log("hello monitor one")
            console.log(window._settings.get_int('select-one'))
        });

        //bind after > 1 monitor is active
        if ((window._settings.get_int('monitor-num')) != 1){
            const widget1 = builder.get_object('select-two');
            window._settings.bind('select-two', widget1, 'selected',
            Gio.SettingsBindFlags.DEFAULT);
            widget.connect('notify::selected-item', () => {
                console.log("hello monitor two")
                console.log(window._settings.get_int('select-two'))
            });
        }
    
        //TODO figure what will be here
        const widget2 = builder.get_object('nothing-yet');
        window._settings.bind('nothing-yet', widget2, 'value',
            Gio.SettingsBindFlags.DEFAULT);
    }
}