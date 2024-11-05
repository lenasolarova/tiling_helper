import Meta from 'gi://Meta';
import Shell from 'gi://Shell';
import * as Main from 'resource:///org/gnome/shell/ui/main.js';

import Tiler from './tiler.js'

export default class Shortcutter {
    static shortcuts(extension){
        Main.wm.addKeybinding(
            'left-thirds',
            extension.getSettings(),
            Meta.KeyBindingFlags.IGNORE_AUTOREPEAT,
            Shell.ActionMode.NORMAL | Shell.ActionMode.OVERVIEW,
            Tiler.tileByNum.bind(this, 3)
        );

        Main.wm.addKeybinding(
            'left-quarter',
            extension.getSettings(),
            Meta.KeyBindingFlags.IGNORE_AUTOREPEAT,
            Shell.ActionMode.NORMAL | Shell.ActionMode.OVERVIEW,
            Tiler.tileByNum.bind(this, 4)
        );
    }
}