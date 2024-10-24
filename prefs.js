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

        //bind the row to the key
        const widget = builder.get_object('select-one');
        window._settings.bind('select-one', widget, 'selected',
            Gio.SettingsBindFlags.DEFAULT);
        widget.connect('notify::selected-item', () => {
            console.log("hello")
            console.log(window._settings.get_int('select-one'))
        });

        const widget1 = builder.get_object('select-two');
        window._settings.bind('select-two', widget1, 'selected',
            Gio.SettingsBindFlags.DEFAULT);

        console.log(window._settings.get_int('select-two'));

        const widget2 = builder.get_object('nothing-yet');
        window._settings.bind('nothing-yet', widget2, 'value',
            Gio.SettingsBindFlags.DEFAULT);
    }
}