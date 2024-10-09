import GObject from 'gi://GObject';
import St from 'gi://St';

import Tiler from './tiler.js'
import {Extension, gettext as _} from 'resource:///org/gnome/shell/extensions/extension.js';
import * as PanelMenu from 'resource:///org/gnome/shell/ui/panelMenu.js';
import * as PopupMenu from 'resource:///org/gnome/shell/ui/popupMenu.js';

import * as Main from 'resource:///org/gnome/shell/ui/main.js';

const Indicator = GObject.registerClass(
class Indicator extends PanelMenu.Button {
    _init() {
        super._init(0.0, _('Indicator'));

        this.add_child(new St.Icon({
            icon_name: 'input-dialpad',
            style_class: 'system-status-icon',
        }));

        let quickSetup = new PopupMenu.PopupSeparatorMenuItem(_('Quick setup:'));
        this.menu.addMenuItem(quickSetup);

        let tileHalves = new PopupMenu.PopupMenuItem(_('Tile halves'));
        let tileThirds = new PopupMenu.PopupMenuItem(_('Tile thirds'));

        tileHalves.connect('activate', () => {
            Tiler.vertTileByNum(2);
        });
        tileThirds.connect('activate', () => {
            Tiler.vertTileByNum(3);
        });

        this.menu.addMenuItem(tileHalves);
        this.menu.addMenuItem(tileThirds);

        let emptySeparator = new PopupMenu.PopupSeparatorMenuItem(_(''));
        this.menu.addMenuItem(emptySeparator);

        Tiler.shortcuts();
    }
    
});


export default class TilingHelper extends Extension {
    enable() {
        this._indicator = new Indicator();
        Main.panel.addToStatusArea(this.uuid, this._indicator);

         // Add a menu item to open the preferences window
         this._indicator.menu.addAction(_('Preferences'),
         () => this.openPreferences());

    }

    disable() {
        this._indicator?.destroy();
        this._indicator = null;
        this._settings = null;
    }
}
