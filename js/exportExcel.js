//导出后的文件打开时会提示“您尝试打开的xls格式与文件扩展名不一致”，点“是”就ok了
//name只在IE中有效

var exportExcel = function (id,name) {
    if (this.getExplorer() == 'ie') {
        var curTbl = document.getElementById(id);
        var rows = curTbl.rows.length;
        var columns = curTbl.rows[0].cells.length;

        var oXL = new ActiveXObject("Excel.Application");
        var oWB = oXL.Workbooks.Add();
        var xlsheet = oWB.Worksheets(1);
        var sel = document.body.createTextRange();
        sel.moveToElementText(curTbl);
        sel.select;
        sel.execCommand("Copy");
        xlsheet.Paste();
        try {
            xlsheet.columns.AutoFit();
            for (var i = 2; i < rows+1; i++) {
                for (var j = 1; j < columns+1; j++) {
                    xlsheet.Cells(i, j).Interior.ColorIndex = 2;
                }
            }
            var fname = oXL.Application.GetSaveAsFilename(name+".xls", "Excel Spreadsheets (*.xls), *.xls");
        } catch (e) {
            print("Nested catch caught " + e);
        } finally { 
            oWB.SaveAs(fname);
            oWB.Close(savechanges = false);
            oXL.Quit();
            oXL = null;
        }
    }
    else {
        var uri = 'data:application/vnd.ms-excel;base64,',
            template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><meta charset="UTF-8"><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table  style="font-size:15px;">{table}</table></body></html>',
            base64 = function (s) { return window.btoa(unescape(encodeURIComponent(s))) },
            format = function (s, c) {
                return s.replace(/{(\w+)}/g,
                        function (m, p) { return c[p]; })
            }
        if (!id.nodeType) table = document.getElementById(id)
        var ctx = { worksheet: name || 'Worksheet', table: table.innerHTML }
        window.location.href = uri + base64(format(template, ctx))
    }
}
//判断是什么浏览器
var getExplorer = function() {  
    var explorer = window.navigator.userAgent ;  
   
    if (explorer.indexOf("MSIE") >= 0 || explorer.indexOf("Triden") >= 0) {
        return 'ie';  
    } 
    else if (explorer.indexOf("Firefox") >= 0) {  
        return 'Firefox';  
    } 
    else if(explorer.indexOf("Chrome") >= 0){  
        return 'Chrome';  
    }
    else if(explorer.indexOf("Opera") >= 0){  
        return 'Opera';  
    }
    else if(explorer.indexOf("Safari") >= 0){  
        return 'Safari';  
    }  
}