// https://stackoverflow.com/questions/610406/javascript-equivalent-to-printf-string-format
if (!String.format) {
	String.format = function(format) {
		var args = Array.prototype.slice.call(arguments, 1);
		return format.replace(/{(\d+)}/g, function(match, number) { 
			return typeof args[number] != 'undefined'
				? args[number] 
				: match
			;
		});
	};
}


function rowToMatrix(row_index, row)
{
	var entries = [];

	$(row).children().each(function(col_index)
	{
		if ($(this).hasClass("node"))
		{
			if ($(this).find("input:checkbox").is(":checked") && $(this).find("input:text").val().length > 0)
			{
				entries.push(String.format(
					"\t\t\\node[{0},dsp/label={1}] (m{2}_{3}) \{{4}\};",
					$(this).find("select.node_type").val(),
					$(this).find("select.text_align").val(),
					row_index,
					col_index,
					$(this).find("input:text").val()
				));
			}
			else
			{
				entries.push(String.format(
					"\t\t\\node[{0}] (m{1}_{2}) \{\};",
					$(this).find("select.node_type").val(),
					row_index,
					col_index
				));
			}
		}
	});

	return entries.join("&\n") + "\n\t\t\\\\";
}


$(document).ready(function()
{
	$("#generate").on("click", function()
	{
		var rows = [];
		$("#grid").children().each(function(index)
		{
			if (index % 2 == 0)
			{
				rows.push(rowToMatrix(index, this));
			}
		});
		console.log(rows.join("\n"));
	});
});