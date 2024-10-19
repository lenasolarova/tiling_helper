import Gio from 'gi://Gio';
import Gtk from 'gi://Gtk';
import Adw from 'gi://Adw';
import {ExtensionPreferences, gettext as _} from 'resource:///org/gnome/Shell/Extensions/js/extensions/prefs.js';
/*import Main from 'resource:///org/gnome/shell/ui/main.js';*/
//import Tiler from './tiler.js'



export default class ExamplePreferences extends ExtensionPreferences {
    fillPreferencesWindow(window) {

        //this._monitors = Main.layoutManager.monitors;

        window._settings = this.getSettings();
        const builder = new Gtk.Builder();
        builder.set_translation_domain(this.uuid);
        builder.add_from_file(`/home/leni/.local/share/gnome-shell/extensions/tiling_helper@helping_tiler/prefs.ui`);

        //add pages
        window.add(builder.get_object('keybinding'));
        window.add(builder.get_object('in-progress'));

        //bind the row to the key
        const widget = builder.get_object('select-one');
        window._settings.bind('select-one', widget, 'selected',
            Gio.SettingsBindFlags.DEFAULT);
        //widget.set_selected(window._settings.get_int('select-one'));
        console.log(window._settings.get_int('select-one'));
        widget.connect('notify::selected-item', () => {
            console.log("hello");
        });


        //if (this._monitors.length > 1){
            const widget1 = builder.get_object('select-two');
            window._settings.bind('select-two', widget1, 'selected',
                Gio.SettingsBindFlags.DEFAULT);
            //widget.set_selected(window._settings.get_int('select-two'));
            console.log(window._settings.get_int('select-two'));
        //}

        const widget2 = builder.get_object('nothing-yet');
        window._settings.bind('nothing-yet', widget2, 'value',
            Gio.SettingsBindFlags.DEFAULT);
    }
}