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

        //adds shortcuts
        Shortcutter.shortcuts(this);

        //tiles monitor one on click on "apply" button
        this.selectOneHandler = this._settings.connect('changed::apply-one', (settings, key) => {
            console.log("apply 1 clicked");
            let selectOne = settings.get_int('select-one');
            
            const tilingNum = TilingHelper.correctNumber(selectOne);
            if (!(tilingNum == 0)){
                Tiler.tileByNum(tilingNum);
            }
        });

        //tiles monitor two on click on "apply" button
        //TODO: change tilebynum func to reflect another monitor, not just current one
        this.selectTwoHandler = this._settings.connect('changed::apply-two', (settings, key) => {
            console.log("apply 2 clicked");
            let selectTwo = settings.get_int('select-two');
            Tiler.tileByNum(TilingHelper.correctNumber(selectTwo));
        });

        this._settings.set_int('monitor-num', Main.layoutManager.monitors.length);
        console.log("number of monitors:", this._settings.get_int('monitor-num'));
    }

    static correctNumber(number){
        switch(number){
            case 0:
                return 0;
            case 1:
                return 2;
            case 2:
                return 3;
            case 3:
                return 4;
            case 4:
                return 6;
        }
    }

    disable() {
        this._indicator?.destroy();
        this._indicator = null;
        this._settings = null;
    }
}
