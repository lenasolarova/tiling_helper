import Gio from 'gi://Gio';
import Adw from 'gi://Adw';
import Gtk from 'gi://Gtk';
import {ExtensionPreferences, gettext as _} from 'resource:///org/gnome/Shell/Extensions/js/extensions/prefs.js';

export default class ExamplePreferences extends ExtensionPreferences {
    fillPreferencesWindow(window) {
        window._settings = this.getSettings();

        //adds the Keybinding page
        const pageKeybind = new Adw.PreferencesPage({
            title: _('Keybinding'),
            icon_name: 'edit-copy-symbolic',
        });
        window.add(pageKeybind);

        //adds preference group for monitors
        const monitors = new Adw.PreferencesGroup({
            title: _('Monitors:'),
        });
        pageKeybind.add(monitors);


        const optionOne =  [_("Halves"), _("Thirds"), _("Quarters"), _("Sixths")];
        let optionsListOne = new Gtk.StringList();
        optionOne.forEach((thing) => {
            optionsListOne.append(thing);
        })

        //adds comborow for first monitor
        const selectileOne = new Adw.ComboRow({
            title: _('Select tiing'),
            model: optionsListOne
        })
        monitors.add(selectileOne);

        window._settings.bind('select-one', selectileOne, 'selected',
            Gio.SettingsBindFlags.DEFAULT);
            selectileOne.connect('notify::selected-item', () => {
            console.log("hello monitor one")
            console.log(window._settings.get_int('select-one'))
        });

        //adds buttons and binds them after > 1 monitor is active
        //only allows two for testing purposes for now
        if ((window._settings.get_int('monitor-num')) == 2){
            const optionTwo =  [_("Halves"), _("Thirds"), _("Quarters"), _("Sixths")];
            let optionsListTwo = new Gtk.StringList();
            optionTwo.forEach((thing) => {
                optionsListTwo.append(thing);
            })

            const selectileTwo = new Adw.ComboRow({
                title: _('Select tiing'),
                model: optionsListTwo
            })
            monitors.add(selectileTwo);

            window._settings.bind('select-two', selectileTwo, 'selected',
                Gio.SettingsBindFlags.DEFAULT);
                selectileTwo.connect('notify::selected-item', () => {
                console.log("hello monitor two")
                console.log(window._settings.get_int('select-two'))
            });
        }
    
        
        //TODO figure what will be here
        //adds the Other page
         const pageOther = new Adw.PreferencesPage({
            title: _('Other'),
            icon_name: 'format-justify-fill-symbolic',
        });
        window.add(pageOther);
    }
}