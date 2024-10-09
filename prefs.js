import Gio from 'gi://Gio';
import Gtk from 'gi://Gtk';
import Adw from 'gi://Adw';
import {ExtensionPreferences, gettext as _} from 'resource:///org/gnome/Shell/Extensions/js/extensions/prefs.js';

export default class ExamplePreferences extends ExtensionPreferences {
    fillPreferencesWindow(window) {

        window._settings = this.getSettings();
        const builder = new Gtk.Builder();
        builder.set_translation_domain(this.uuid);
        builder.add_from_file(`/home/leni/.local/share/gnome-shell/extensions/tiling_helper@helping_tiler/prefs.ui`);

        //add pages
        window.add(builder.get_object('visual'));
        window.add(builder.get_object('numerical'));

        //bind the row to the key
        const widget = builder.get_object('show-indicator');
        window._settings.bind('show-indicator', widget, 'active',
            Gio.SettingsBindFlags.DEFAULT);

        const widget1 = builder.get_object('show-indi');
        window._settings.bind('show-indi', widget1, 'value',
            Gio.SettingsBindFlags.DEFAULT);

        const widget2 = builder.get_object('show-i');
        window._settings.bind('show-i', widget2, 'value',
            Gio.SettingsBindFlags.DEFAULT);
    }
}