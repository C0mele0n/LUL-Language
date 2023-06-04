
Prompts:

Write an HTML code for a markdown editor that can create SVG timelines from ordered lists. The editor should have a textarea where the user can write in .md syntax and a button to generate the SVG. The user should start each list with “@Line:” followed by a name and end it with “end”. Each list will become a timeline with vertical lines (waymarks) connected by a horizontal line. The top-level list items will be the labels on top of the waymarks. The sublist items will be shown below the horizontal line under their corresponding waymarks. The links in the text should work in the SVG. The SVG should appear above the textarea and fit within the page. The waymarks should be 30px tall. If there are multiple lists, there should be multiple timelines displayed one after another with enough space between them to avoid overlapping. All the code should be in the HTML file.
Here is an example image demonstrating some of the functionality: https://github.com/C0mele0n/LUL-Language/blob/main/Example%20Image.jpg




Sure, here's a consolidated prompt:

Can you write the code for an HTML markdown editor that generates an SVG timeline from the markdown? The editor should have a textarea and a "generate SVG" button. The user should be able to write in the textarea using .md syntax. The program should recognize ordered lists in the textarea and use them to generate a simple, evenly spaced, SVG timeline upon submission. Each top-level list item of a single list should be the text displayed on top of each vertical line or "waymark," and the bottoms of all waymarks should be attached to a single horizontal line that spans from the first to the last waymark. If there are indented list items (sublist items), the sublist items should be displayed directly underneath the top-level list item's corresponding waymark (right under the horizontal line) within the generated SVG. If any text content is a link, the link should work in the SVG file. The generated SVG should be displayed above the text field, and the timeline should fit within the page, with 30px tall waymarks. 
If the user makes a second list in the textarea, a second timeline should be generated underneath the first timeline. All waymarks of all lists should be displayed, even if different lists have differing amounts of items. If one list has 7 waymarks and another has 4, the list with 4 waymarks should be parallel to the first 4 of the list with 7 waymarks. All timelines should be vertically spaced so that no text content overlaps or touches. To make it clear, there should be one timeline per list. All the code should be in the HTML file. The user should write "@Line:" followed by a name to tell the program to parse the following lines as list items. The user must write "end" at the end of the list to tell the program to stop parsing the list. The user can create multiple lists, which will be displayed as multiple timelines (one below the next). 
Here is an example image demonstrating some of the functionality: https://github.com/C0mele0n/LUL-Language/blob/main/Example%20Image.jpg










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

