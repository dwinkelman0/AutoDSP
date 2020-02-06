function newNode()
{
	var node = $("<td><select><option>Hello</option><option>World</option></select></td>");
	return node;
}

function newEdge()
{
	var edge = $("<td><select><option>Right</option><option>Left</option></select></td>");
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
		$(row).append(i % 2 == 0 ? newNode() : newEdge());
	}
	return row;
}

function newEdgeRow(size)
{
	row = $("<tr/>");
	for (var i = 0; i < size; i++)
	{
		$(row).append(i % 2 == 0 ? newEdge() : newBlank());
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
				$(this).append([newEdge(), newNode()]);
			}
			else
			{
				$(this).append([newBlank(), newEdge()]);
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