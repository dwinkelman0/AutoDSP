NODE_TYPES = {
	"coordinate": ".",
	"dspnodeopen": "Open Node",
	"dspnodefull": "Full Node",
	"dspadder": "Adder",
	"dspmixer": "Mixer",
	"dspsquare": "Square"
};

HOR_EDGE_TYPES = {
	"none": " ",
	"line": "Line",
	"conn_right": "Right",
	"conn_left": "Left",
	"flow_right": "Flow Right",
	"flow_left": "Flow Left"
};

VERT_EDGE_TYPES = {
	"none": " ",
	"line": "Line",
	"conn_up": "Up",
	"conn_down": "Down",
	"flow_up": "Flow Up",
	"flow_down": "Flow Down"
};

function newSelect(options)
{
	var select = $("<select/>");
	for (var option in options)
	{
		var newOption = $("<option/>");
		$(newOption).val(option);
		$(newOption).text(options[option]);
		$(select).append(newOption);
	}
	return select;
}

function newNode()
{
	var select = newSelect(NODE_TYPES);
	var node = $("<td class='node'/>");
	$(node).append(select);
	$(node).css("background", "#90ee90");
	return node;
}

function newHorEdge()
{
	var select = newSelect(HOR_EDGE_TYPES);
	var edge = $("<td class='hor_edge'/>");
	$(edge).append(select);
	return edge;
}

function newVertEdge()
{
	var select = newSelect(VERT_EDGE_TYPES);
	var edge = $("<td class='vert_edge'/>");
	$(edge).append(select);
	return edge;
}

function newBlank()
{
	return $("<td/>");
}

function newNodeRow(size)
{
	row = $("<tr/>");
	for (var i = 0; i < size; i++)
	{
		$(row).append(i % 2 == 0 ? newNode() : newHorEdge());
	}
	return row;
}

function newEdgeRow(size)
{
	row = $("<tr/>");
	for (var i = 0; i < size; i++)
	{
		$(row).append(i % 2 == 0 ? newVertEdge() : newBlank());
	}
	return row;
}


$(document).ready(function()
{
	// Initialize 1x1 grid
	$("#grid").append(newNodeRow(1));

	$("#add_col").on("click", function()
	{
		var i = 0;
		$("#grid").children().each(function()
		{
			if (i % 2 == 0)
			{
				$(this).append([newHorEdge(), newNode()]);
			}
			else
			{
				$(this).append([newBlank(), newVertEdge()]);
			}
			i++;
		});
	});

	$("#add_row").on("click", function()
	{
		n_cols = $($("#grid").children()[0]).children().length;
		$("#grid").append([newEdgeRow(n_cols), newNodeRow(n_cols)]);
	});
});