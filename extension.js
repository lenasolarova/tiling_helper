import GObject from 'gi://GObject';
import Gio from 'gi://Gio';
import GLib from 'gi://GLib';
import St from 'gi://St';

import Tiler from './tiler.js'
import Shortcutter from './shortcutter.js'

import {Extension, gettext as _} from 'resource:///org/gnome/shell/extensions/extension.js';
import * as PanelMenu from 'resource:///org/gnome/shell/ui/panelMenu.js';
import * as PopupMenu from 'resource:///org/gnome/shell/ui/popupMenu.js';
import * as Main from 'resource:///org/gnome/shell/ui/main.js';

const Indicator = GObject.registerClass(
class Indicator extends PanelMenu.Button {
    _init(settings) {
        super._init(0.0, _('Indicator'));

        this.add_child(new St.Icon({
            icon_name: 'input-dialpad',
            style_class: 'system-status-icon',
        }));

        let quickSetup = new PopupMenu.PopupSeparatorMenuItem(_('Quick setup:'));
        this.menu.addMenuItem(quickSetup);

        let tileHalves = new PopupMenu.PopupMenuItem(_('Tile halves'));
        let tileThirds = new PopupMenu.PopupMenuItem(_('Tile thirds'));

        //binds the two basic buttons ('Tile halves' and 'Tile thirds')
        tileHalves.connect('activate', () => {
            Tiler.tileByNum(2);
        });
        tileThirds.connect('activate', () => {
            Tiler.tileByNum(3);
        });

        this.menu.addMenuItem(tileHalves);
        this.menu.addMenuItem(tileThirds);

        let emptySeparator = new PopupMenu.PopupSeparatorMenuItem(_(''));
        this.menu.addMenuItem(emptySeparator);
    }
    
});


export default class TilingHelper extends Extension {
    constructor(metadata) {
        super(metadata);
    }

    async enable() {
        this._settings = this.getSettings();
        this._indicator = new Indicator(this._settings);
        Main.panel.addToStatusArea(this.uuid, this._indicator);

        //adds a menu item to open the preferences window
        this._indicator.menu.addAction(_('Preferences'),
        () => this.openPreferences());

        //disables shortcuts
        //TODO: should loop through the whole settings and find keywords
        const gnomeMutterKeybindings = new Gio.Settings({
            schema_id: 'org.gnome.mutter.keybindings'
        });

        const gnomeDesktopKeybindings = new Gio.Settings({
            schema_id: 'org.gnome.desktop.wm.keybindings'
        });
        //const emptyStrvVariant = new GLib.Variant('as', []);
        //idk whz it does not work with empty one
        const emptyStrvVariant1 = new GLib.Variant('as', ['<Super>KP_2']);
        const emptyStrvVariant2 = new GLib.Variant('as', ['<Super>KP_3']);
        const emptyStrvVariant3 = new GLib.Variant('as', ['<Super>KP_1']);
        const emptyStrvVariant4 = new GLib.Variant('as', ['<Super>KP_9']);


        
        //unbinds current keybinds
        if (gnomeDesktopKeybindings.get_strv('maximize').includes('<Super>Up')) {
            gnomeDesktopKeybindings.set_value('maximize', emptyStrvVariant1);
        }
        gnomeDesktopKeybindings.set_value('maximize', emptyStrvVariant1);

        if (gnomeDesktopKeybindings.get_strv('unmaximize').includes('<Super>Down')) {
            //console.log("found super downer");
            gnomeDesktopKeybindings.set_value('unmaximize', emptyStrvVariant2);
            //console.log("now binded there:", gnomeDesktopKeybindings.get_strv('unmaximize'));
        }
        gnomeDesktopKeybindings.set_value('unmaximize', emptyStrvVariant2);


        if (gnomeMutterKeybindings.get_strv('toggle-tiled-left').includes('<Super>Left')) {
            gnomeMutterKeybindings.set_value('toggle-tiled-left', emptyStrvVariant3);
        }
        gnomeMutterKeybindings.set_value('toggle-tiled-left', emptyStrvVariant3)

        if (gnomeMutterKeybindings.get_strv('toggle-tiled-right').includes('<Super>Right')) {
            gnomeMutterKeybindings.set_value('toggle-tiled-right', emptyStrvVariant4);
        }
        gnomeMutterKeybindings.set_value('toggle-tiled-right', emptyStrvVariant4)

        //adds shortcuts
        Shortcutter.shortcuts(this);

        console.log("now binded on left t:", this._settings.get_strv('left-thirds'));
        console.log("now binded on left q:", this._settings.get_strv('left-quarter'));


        //tiles current monitor on change
        this.selectOneHnadler = this._settings.connect('changed::select-one', (settings, key) => {
            let selectOne = settings.get_int(key);
            Tiler.tileByNum(this.correctNumber(selectOne));
        });

        this._settings.set_int('monitor-num', Main.layoutManager.monitors.length);
        console.log("number of monitors:", this._settings.get_int('monitor-num'));

    }

    correctNumber(number){
        switch(number){
            case 0:
                return 2;
            case 1:
                return 3;
            case 2:
                return 4;
            case 3:
                return 6;
        }
    }

    disable() {
        this._indicator?.destroy();
        this._indicator = null;
        this._settings = null;
    }
}
