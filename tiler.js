import Meta from 'gi://Meta';
import Mtk  from 'gi://Mtk';
import Shell from 'gi://Shell';
import * as Main from 'resource:///org/gnome/shell/ui/main.js';

import TilingHelper from './extension.js'

export default class Tiler {
    static tileByNum(number){     
        this._windows = [];

        const currWorkspace = global.workspace_manager.get_active_workspace();
        const currMonitor = global.display.get_current_monitor();
        const monitorRect = new Mtk.Rectangle(currWorkspace.get_work_area_for_monitor(currMonitor));
        this._windows = currWorkspace.list_windows();

        console.log("got here by", number);

        //decides if we need to tile horizontally
        let horizontalDif = 1;
        if (number >= 4){
            horizontalDif = 2;
        }
        Tiler.allTile(number, currWorkspace, currMonitor, monitorRect, this._windows, horizontalDif);
        
    }

    static allTile(number, currWorkspace, currMonitor, monitorRect, windows, horizontalDif){
        const blockWidth = Math.ceil(monitorRect.width / number * horizontalDif);

        windows.forEach(window => {
            let newY = monitorRect.y;
            if ((windows.indexOf(window) % number) >= number / horizontalDif){
                newY = monitorRect.y + (monitorRect.height / horizontalDif);
            }

            if (window.get_monitor() === currMonitor && window.get_workspace() === currWorkspace){
                window.unmaximize(1);
                window.move_resize_frame(
                    false, 
                    monitorRect.x + Math.ceil(blockWidth * (windows.indexOf(window) % (number / horizontalDif))), 
                    newY, 
                    blockWidth, 
                    monitorRect.height / horizontalDif);
            }
        });
    }

    static tileNumKeybinds(settings, position){
        const currWorkspace = global.workspace_manager.get_active_workspace();
        const currMonitor = global.display.get_current_monitor();
        const monitorRect = new Mtk.Rectangle(currWorkspace.get_work_area_for_monitor(currMonitor));
        
        const sectionCount = settings.get_int('select-one');
        const correctSection = TilingHelper.correctNumber(sectionCount);

        let horizontalDif = 1;
        if (correctSection >= 4){
            horizontalDif = 2;
        }

        const blockWidth = Math.ceil(monitorRect.width / correctSection * horizontalDif);

        const currWindow = global.display.get_focus_window();

        let newY = monitorRect.y;
        if ((position % correctSection) >= correctSection / horizontalDif){
            newY = monitorRect.y + (monitorRect.height / horizontalDif);
        }
        
        currWindow.unmaximize(1);
        currWindow.move_resize_frame(
            false, 
            monitorRect.x + Math.ceil(blockWidth * (position % (correctSection / horizontalDif))), 
            newY, 
            blockWidth, 
            monitorRect.height / horizontalDif);
    }
}

