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

TEXT_ALIGN_TYPES = {
	"above": "Above",
	"below": "Below",
	"left": "Left",
	"right": "Right"
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
	$(select).change(generateCode);
	return select;
}

function newNode()
{
	var node = $("<td class='node'/>");
	$(node).css("background", "#90ee90");

	// Select node type
	var select = newSelect(NODE_TYPES);
	$(select).addClass("node_type");
	$(node).append(select);
	$(node).append("<br>");

	// Whether the node has text
	var hasText = $("<input type='checkbox' value='hasText'/>");
	$(hasText).change(generateCode);
	$(node).append(hasText);

	// Text for the node
	var text = $("<input type='text' size='3'/>");
	$(text).change(generateCode);
	$(text).hide();
	$(node).append(text);

	// Alignment of the node text
	var align = newSelect(TEXT_ALIGN_TYPES);
	$(align).change(generateCode);
	$(align).addClass("text_align");
	$(align).hide();
	$(node).append("<br>");
	$(node).append(align);

	// Interactivity
	$(hasText).change(function()
	{
		var enabled = $(this).is(":checked");
		if (enabled)
		{
			$(text).show();
			$(align).show();
		}
		else
		{
			$(text).hide();
			$(text).val("");
			$(align).hide();
		}
	});

	return node;
}

function newHorEdge()
{
	var select = newSelect(HOR_EDGE_TYPES);
	var edge = $("<td class='hor_edge'/>");
	$(edge).css("background", "#f0f0f0");
	$(edge).append(select);
	return edge;
}

function newVertEdge()
{
	var select = newSelect(VERT_EDGE_TYPES);
	var edge = $("<td class='vert_edge'/>");
	$(edge).css("background", "#f0f0f0");
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

	generateCode();
});