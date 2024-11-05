import Meta from 'gi://Meta';
import Mtk  from 'gi://Mtk';
import Shell from 'gi://Shell';
import * as Main from 'resource:///org/gnome/shell/ui/main.js';

export default class Tiler {
    static tileByNum(number){     
        this._windows = [];

        const currWorkspace = global.workspace_manager.get_active_workspace();
        const currMonitor = global.display.get_current_monitor();
        const monitorRect = new Mtk.Rectangle(currWorkspace.get_work_area_for_monitor(currMonitor));
        this._windows = currWorkspace.list_windows();

        console.log("got here by", number);

        //tiles only vertically
        if (number < 4){
            Tiler.verticalTile(number, currWorkspace, currMonitor, monitorRect, this._windows);
        }

        //tiles horizontally
        else{
            Tiler.horizontalTile(number, currWorkspace, currMonitor, monitorRect, this._windows);
        }
        
    }

    static verticalTile(number, currWorkspace, currMonitor, monitorRect, windows){
        const blockWidth = Math.ceil(monitorRect.width / number);

        windows.forEach(window => {
            if (window.get_monitor() === currMonitor && window.get_workspace() === currWorkspace){
                window.unmaximize(1);
                window.move_resize_frame(
                    false, 
                    monitorRect.x + Math.ceil(blockWidth * (windows.indexOf(window) % number)), 
                    monitorRect.y, 
                    blockWidth, 
                    monitorRect.height);
            }
        });
    }

    static horizontalTile(number, currWorkspace, currMonitor, monitorRect, windows){
        const blockWidth = Math.ceil(monitorRect.width / number * 2);

        windows.forEach(window => {
            let newY = monitorRect.y;
            if ((windows.indexOf(window) % number) >= number / 2){
                newY = monitorRect.y + (monitorRect.height / 2);
            }

            if (window.get_monitor() === currMonitor && window.get_workspace() === currWorkspace){
                window.unmaximize(1);
                window.move_resize_frame(
                    false, 
                    monitorRect.x + Math.ceil(blockWidth * (windows.indexOf(window) % (number / 2))), 
                    newY, 
                    blockWidth, 
                    monitorRect.height / 2);
            }
        });
    }
}

