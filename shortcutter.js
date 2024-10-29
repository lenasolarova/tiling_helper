import Meta from 'gi://Meta';
import Shell from 'gi://Shell';
import * as Main from 'resource:///org/gnome/shell/ui/main.js';

import Tiler from './tiler.js'

export default class Shortcutter {
    static shortcuts(extension){
        Main.wm.addKeybinding(
            'left-third',
            extension.getSettings(),
            Meta.KeyBindingFlags.IGNORE_AUTOREPEAT,
            Shell.ActionMode.NORMAL | Shell.ActionMode.OVERVIEW,
            this.tile2.bind(this)
        );
    }

    static tile2(){
        Tiler.tileByNum(3);
    }
}