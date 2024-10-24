import Meta from 'gi://Meta';
import Mtk  from 'gi://Mtk';
import Shell from 'gi://Shell';
import * as Main from 'resource:///org/gnome/shell/ui/main.js';

export default class Tiler {
    static vertTileByNum(number){
        this._windows = [];

        const currWorkspace = global.workspace_manager.get_active_workspace();
        const currMonitor = global.display.get_current_monitor();
        const monitorRect = new Mtk.Rectangle(currWorkspace.get_work_area_for_monitor(currMonitor));

        const blockWidth = Math.ceil(monitorRect.width / number);

        this._windows = currWorkspace.list_windows();

        this._windows.forEach(window => {
            if (window.get_monitor() === currMonitor && window.get_workspace() === currWorkspace){
                window.unmaximize(1);
                window.move_resize_frame(
                    false, 
                    monitorRect.x + Math.ceil(blockWidth * (this._windows.indexOf(window) % number)), 
                    monitorRect.y, 
                    blockWidth, 
                    monitorRect.height);

                console.log("inside if-----------------");
            }
        });
    }

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
        this.vertTileByNum(3);
    }
}

