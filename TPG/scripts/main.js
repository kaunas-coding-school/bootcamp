function init()
{
	var tables = document.getElementsByClassName("editabletable");
	var i;
	for (i = 0; i < tables.length; i++)
	{
		makeTableEditable(tables[i]);
	}


}
function makeTableEditable(table)
{
	var rows = table.rows;
	var r;
	for (r = 0; r < rows.length; r++)
	{
		var cols = rows[r].cells;
		var c;
		for (c = 0; c < cols.length; c++)
		{
			var cell = cols[c];
			var listener = makeEditListener(table, r, c);
			cell.addEventListener("input", listener, false);
		}
	}
}
function makeEditListener(table, row, col)
{
	return function(event)
	{
		var cell = getCellElement(table, row, col);
		var text = cell.innerHTML.replace(/<br>$/, '');
		var items = split(text);
		if (items.length === 1)
		{
			return;
		}

		var i;
		var r = row;
		var c = col;
		for (i = 0; i < items.length && r < table.rows.length; i++)
		{
			cell = getCellElement(table, r, c);
			cell.innerHTML = items[i];

			c++;
			if (c === table.rows[r].cells.length)
			{
				r++;
				c = 0;
			}
		}
		cell.focus();
		if (r == table.rows.length)
		{
			tableCreate();
		}
	};
}
function tableCreate(){
    var tbl = document.getElementsByClassName("editabletable")[0];
        var tr = tbl.insertRow();
        for(var j = 0; j < 5; j++){
			var td = tr.insertCell();
			td.innerHTML = "<div contenteditable>.</div>";
		}
		init();
}
function getCellElement(table, row, col)
{
	return table.rows[row].cells[col].firstChild;
}

function split(str)
{
	return str.split(/,|\n|<br>/);
}


window.onload = init;
