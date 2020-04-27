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
					"\t\t\\node[{0},dsp/label={1}] (m{2}_{3}) \{${4}$\};",
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


HOR_EDGE_ELEMENTS = {
	"none": " ",
	"line": "dspline",
	"conn_right": "dspconn",
	"conn_left": "dspconn",
	"flow_right": "dspflow",
	"flow_left": "dspflow"
};

function makeHorPath(row_index, col_index, cell)
{
	var type = $(cell).find("select").val();
	var reversed = type == "conn_left" || type == "flow_left";

	if (type == "none") return "";

	return String.format(
		"\t\\begin\{scope\}[start chain]\n\t\t\\chainin (m{0}_{1});\n\t\t\\chainin (m{0}_{2}) [join=by {3}];\n\t\\end\{scope\}",
		row_index,
		reversed ? col_index + 1 : col_index - 1,
		reversed ? col_index - 1 : col_index + 1,
		HOR_EDGE_ELEMENTS[type]
	);
}

VERT_EDGE_ELEMENTS = {
	"none": " ",
	"line": "dspline",
	"conn_up": "dspconn",
	"conn_down": "dspconn",
	"flow_up": "dspflow",
	"flow_down": "dspflow"
};

function makeVertPath(row_index, col_index, cell)
{
	var type = $(cell).find("select").val();
	var reversed = type == "conn_up" || type == "flow_up";

	if (type == "none") return "";

	return String.format(
		"\t\\begin\{scope\}[start chain]\n\t\t\\chainin (m{1}_{0});\n\t\t\\chainin (m{2}_{0}) [join=by {3}];\n\t\\end\{scope\}",
		col_index,
		reversed ? row_index + 1 : row_index - 1,
		reversed ? row_index - 1 : row_index + 1,
		VERT_EDGE_ELEMENTS[type]
	);
}


function generateCode()
{
	var rows = [];
	var paths = [];

	$("#grid").children().each(function(row_index)
	{
		if (row_index % 2 == 0)
		{
			rows.push(rowToMatrix(row_index, this));
			$(this).children().each(function(col_index)
			{
				if ($(this).hasClass("hor_edge"))
				{
					var path = makeHorPath(row_index, col_index, this);
					if (path.length > 0) paths.push(path);
				}
			});
		}
		else
		{
			$(this).children().each(function(col_index)
			{
				if ($(this).hasClass("vert_edge"))
				{
					var path = makeVertPath(row_index, col_index, this);
					if (path.length > 0) paths.push(path);
				}
			});
		}
	});
	output = [
		"\\begin\{center\}\n",
		"\\begin\{tikzpicture\}\n",
		"\t\\matrix (m1) [row sep=2.5mm, column sep=5mm]\n\t\{\n",
		rows.join("\n"),
		"\n\t\};\n",
		paths.join("\n"),
		"\n\\end\{tikzpicture\}\n",
		"\\end\{center\}\n"
	];
	$("#output").text(output.join(""));
}