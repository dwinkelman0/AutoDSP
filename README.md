# AutoDSP

This is a tool for generating signal processing block diagrams in Latex using the Tikz library. This library must be installed alongside Latex for these diagrams to be compilable by Latex.

## Summary
The tool is run in a browser. It produces text which can be copy-and-pasted into a Latex document; the text automatically updates as the block diagram is edited in the user interface.

Tikz block diagrams are organized in a grid of nodes and edges. Each node can be an input/output, junction, adder, mixer, filter, nothing, etc.; any node can have associated text by checking the checkbox listed under the node. Edges can be lines, arrows, or nothing. Rows and columns can be dynamically added (but not removed) using the buttons along the top of the screen.

## Installation and Usage
 1. `git clone https://github.com/dwinkelman0/AutoDSP`
 2. `cd AutoDSP`
 3. Open `index.html` in your browser of choice
 4. Edit the block diagram in the user interface
 5. Copy and paste the Latex output into a Latex document

## Contributions
Please submit a pull request if you make extensions to this tool. Any contributions are welcome.

