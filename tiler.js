import Meta from 'gi://Meta';
import Atk from 'gi://Atk';
import Clutter from 'gi://Clutter';
import GObject from 'gi://GObject';
import Mtk  from 'gi://Mtk';
import Shell from 'gi://Shell';
import Gio from 'gi://Gio';

export default class Tiler {
    static vertTileByNum(number){
        this._windows = [];
        /*this._workspaces = [];
        this._monitors = [];*/

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

    static shortcuts(){
        global.display.add_keybinding(
            'left-third',
            new Gio.Settings({ schema_id: 'org.gnome.shell.extensions.tiling_helper' }),
            Meta.KeyBindingFlags.IGNORE_AUTOREPEAT,
            this.handler
        );
        console.log("left third pls");
    }

    static handler(arg1, arg2, arg3){
        console.log(arg3.get_name());

    }
}

