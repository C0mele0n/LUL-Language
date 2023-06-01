
Prompts:
Here is my code: https://github.com/C0mele0n/LUL-Language/blob/main/index.html  . Can you write a revised version of the code provided, so that the following features are implemented in a way that works?
1. Currently, a line is only generated based on a list with a single level, and if any indented list items are in the list, only 
the list items before the inented ones will render in the svg (atop the waymarks for the generated timeline). I would like for the 
generated timeline to show every list item (without indentations) within the generated svg, regardless of whether there are indented 
list items or not. I would like the user to have to write "end" line under the last list item for it to be considered the end.
1. I would like for all indented list items to be rendered directly under their parent list item's waymark (vertical line) within the svg.
2. I would like there to be a minimum space added after the indented list items (within the svg), so that no content overlaps between different list generations.



Test Input:
@Line: Millerites
- 1798
- 1833
- 1840
end

@Line: Millerites
- 1798
  - TOE
  - 1AM
  - Deadly Wound
- 1833
  - Stars Fall
  - Miller Preaches
- 1840
- 1842
- 1843
end


@Line: Millerites
- 1798
- 1833

- 1840
- 1842
- 1843
end

