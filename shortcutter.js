import Meta from 'gi://Meta';
import Shell from 'gi://Shell';
import * as Main from 'resource:///org/gnome/shell/ui/main.js';

import Tiler from './tiler.js'

export default class Shortcutter {
    static shortcuts(extension){
        Main.wm.addKeybinding(
            'left-half',
            extension.getSettings(),
            Meta.KeyBindingFlags.IGNORE_AUTOREPEAT,
            Shell.ActionMode.NORMAL | Shell.ActionMode.OVERVIEW,
            Tiler.tileNumKeybinds.bind(this, extension.getSettings(), 0)
        );

        Main.wm.addKeybinding(
            'right-half',
            extension.getSettings(),
            Meta.KeyBindingFlags.IGNORE_AUTOREPEAT,
            Shell.ActionMode.NORMAL | Shell.ActionMode.OVERVIEW,
            Tiler.tileNumKeybinds.bind(this, extension.getSettings(), 1)
        );

        Main.wm.addKeybinding(
            'left-third',
            extension.getSettings(),
            Meta.KeyBindingFlags.IGNORE_AUTOREPEAT,
            Shell.ActionMode.NORMAL | Shell.ActionMode.OVERVIEW,
            Tiler.tileNumKeybinds.bind(this, extension.getSettings(), 0)
        );

        Main.wm.addKeybinding(
            'middle-third',
            extension.getSettings(),
            Meta.KeyBindingFlags.IGNORE_AUTOREPEAT,
            Shell.ActionMode.NORMAL | Shell.ActionMode.OVERVIEW,
            Tiler.tileNumKeybinds.bind(this, extension.getSettings(), 1)
        );

        Main.wm.addKeybinding(
            'right-third',
            extension.getSettings(),
            Meta.KeyBindingFlags.IGNORE_AUTOREPEAT,
            Shell.ActionMode.NORMAL | Shell.ActionMode.OVERVIEW,
            Tiler.tileNumKeybinds.bind(this, extension.getSettings(), 2)
        );

        Main.wm.addKeybinding(
            'left-upper-quarter',
            extension.getSettings(),
            Meta.KeyBindingFlags.IGNORE_AUTOREPEAT,
            Shell.ActionMode.NORMAL | Shell.ActionMode.OVERVIEW,
            Tiler.tileNumKeybinds.bind(this, extension.getSettings(), 0)
        );

        Main.wm.addKeybinding(
            'right-upper-quarter',
            extension.getSettings(),
            Meta.KeyBindingFlags.IGNORE_AUTOREPEAT,
            Shell.ActionMode.NORMAL | Shell.ActionMode.OVERVIEW,
            Tiler.tileNumKeybinds.bind(this, extension.getSettings(), 1)
        );

        Main.wm.addKeybinding(
            'left-lower-quarter',
            extension.getSettings(),
            Meta.KeyBindingFlags.IGNORE_AUTOREPEAT,
            Shell.ActionMode.NORMAL | Shell.ActionMode.OVERVIEW,
            Tiler.tileNumKeybinds.bind(this, extension.getSettings(), 2)
        );

        Main.wm.addKeybinding(
            'right-lower-quarter',
            extension.getSettings(),
            Meta.KeyBindingFlags.IGNORE_AUTOREPEAT,
            Shell.ActionMode.NORMAL | Shell.ActionMode.OVERVIEW,
            Tiler.tileNumKeybinds.bind(this, extension.getSettings(), 3)
        );

        Main.wm.addKeybinding(
            'left-upper-sixth',
            extension.getSettings(),
            Meta.KeyBindingFlags.IGNORE_AUTOREPEAT,
            Shell.ActionMode.NORMAL | Shell.ActionMode.OVERVIEW,
            Tiler.tileNumKeybinds.bind(this, extension.getSettings(), 0)
        );

        Main.wm.addKeybinding(
            'middle-upper-sixth',
            extension.getSettings(),
            Meta.KeyBindingFlags.IGNORE_AUTOREPEAT,
            Shell.ActionMode.NORMAL | Shell.ActionMode.OVERVIEW,
            Tiler.tileNumKeybinds.bind(this, extension.getSettings(), 1)
        );

        Main.wm.addKeybinding(
            'right-upper-sixth',
            extension.getSettings(),
            Meta.KeyBindingFlags.IGNORE_AUTOREPEAT,
            Shell.ActionMode.NORMAL | Shell.ActionMode.OVERVIEW,
            Tiler.tileNumKeybinds.bind(this, extension.getSettings(), 2)
        );

        Main.wm.addKeybinding(
            'left-lower-sixth',
            extension.getSettings(),
            Meta.KeyBindingFlags.IGNORE_AUTOREPEAT,
            Shell.ActionMode.NORMAL | Shell.ActionMode.OVERVIEW,
            Tiler.tileNumKeybinds.bind(this, extension.getSettings(), 3)
        );

        Main.wm.addKeybinding(
            'middle-lower-sixth',
            extension.getSettings(),
            Meta.KeyBindingFlags.IGNORE_AUTOREPEAT,
            Shell.ActionMode.NORMAL | Shell.ActionMode.OVERVIEW,
            Tiler.tileNumKeybinds.bind(this, extension.getSettings(), 4)
        );

        Main.wm.addKeybinding(
            'right-lower-sixth',
            extension.getSettings(),
            Meta.KeyBindingFlags.IGNORE_AUTOREPEAT,
            Shell.ActionMode.NORMAL | Shell.ActionMode.OVERVIEW,
            Tiler.tileNumKeybinds.bind(this, extension.getSettings(), 5)
        );
    }
}