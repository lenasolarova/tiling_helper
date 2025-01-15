import Gio from 'gi://Gio';
import Adw from 'gi://Adw';
import Gtk from 'gi://Gtk';
import {ExtensionPreferences, gettext as _} from 'resource:///org/gnome/Shell/Extensions/js/extensions/prefs.js';

export default class ExamplePreferences extends ExtensionPreferences {
    //adds ui
    fillPreferencesWindow(window) {
        window._settings = this.getSettings();

        //adds the Keybinding page
        const pageKeybind = new Adw.PreferencesPage({
            title: _('Monitor Setup'),
            icon_name: 'edit-copy-symbolic',
        });
        window.add(pageKeybind);

        //adds preference group for monitor one
        const monitorOne = new Adw.PreferencesGroup({
            title: _('Monitor One:'),
        });
        pageKeybind.add(monitorOne);


        const optionOne =  [_("Choose an option"), _("Halves"), _("Thirds"), _("Quarters"), _("Sixths")];
        let optionsListOne = new Gtk.StringList();
        optionOne.forEach((thing) => {
            optionsListOne.append(thing);
        })


        //adds comborow for first monitor
        const selectileOne = new Adw.ComboRow({
            title: _('Select tiing'),
            model: optionsListOne
        })
        monitorOne.add(selectileOne);

        const keybindPicture = new Gtk.Picture();

        window._settings.bind('select-one', selectileOne, 'selected',
            Gio.SettingsBindFlags.DEFAULT);
        selectileOne.connect('notify::selected-item', () => {
            console.log("hello monitor one")
            console.log(window._settings.get_int('select-one'));

            //adds keybinding picture
            let keybindPicturePath = "";
            let alternativeText = "";
            switch(window._settings.get_int('select-one')){
                case 1:
                    keybindPicturePath = "2.png";
                    alternativeText = "Super + Left / Right";
                    break;
                case 2:
                    keybindPicturePath = "3.png";
                    alternativeText = "Super + 4 / 5 / 6";
                    break;
                case 3:
                    keybindPicturePath = "4.png";
                    alternativeText = "Super + Q / W \n E / R";
                    break;
                case 4:
                    keybindPicturePath = "6.png"; 
                    alternativeText = "Super + 7 / 8 / 9 \n 1 / 2 / 3";
            }

            if (keybindPicturePath != ""){
                keybindPicture.set_filename(keybindPicturePath);
                keybindPicture.set_alternative_text(alternativeText);
                monitorOne.add(keybindPicture);
            }
        });

        /*const applyTileOne = new Gtk.Button({
            label: _('APPLY'),
            valign: Gtk.Align.END,
            halign: Gtk.Align.END,
            margin_top: 5,
        })*/

        //adds switchrow for first monitor
        const applyTileOne = new Adw.SwitchRow({
            title: _('APPLY'),
        })
        monitorOne.add(applyTileOne);
        window._settings.set_boolean('apply-one', false);

        window._settings.bind('apply-one', applyTileOne, 'active',
            Gio.SettingsBindFlags.DEFAULT);
        applyTileOne.connect('activated', () => {
            console.log("inside apply")
        });

        //adds buttons and binds them after > 1 monitor is active
        //only allows two for testing purposes for now
        //TODO: create the settings backend, test on more monitors
        if ((window._settings.get_int('monitor-num')) == 2){
            //adds preference group for monitor two
            const monitorTwo = new Adw.PreferencesGroup({
                title: _('Monitor Two:'),
            });
            pageKeybind.add(monitorTwo);

            const optionTwo =  [_("Choose an option"), ("Halves"), _("Thirds"), _("Quarters"), _("Sixths")];
            let optionsListTwo = new Gtk.StringList();
            optionTwo.forEach((thing) => {
                optionsListTwo.append(thing);
            })

            const selectileTwo = new Adw.ComboRow({
                title: _('Select tiing'),
                model: optionsListTwo
            })
            monitorTwo.add(selectileTwo);

            window._settings.bind('select-two', selectileTwo, 'selected',
                Gio.SettingsBindFlags.DEFAULT);
            selectileTwo.connect('notify::selected-item', () => {
                console.log("hello monitor two")
                console.log(window._settings.get_int('select-two'))
            });

            //adds switchrow for second monitor
            const applyTileTwo = new Adw.SwitchRow({
                title: _('APPLY'),
            })
            monitorTwo.add(applyTileTwo);

            window._settings.bind('apply-two', applyTileTwo, 'active',
                Gio.SettingsBindFlags.DEFAULT);
            applyTileTwo.connect('activated', () => {
                console.log("inside apply")
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