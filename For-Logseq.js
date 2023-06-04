// This is a Logseq plugin that can generate a timeline from markdown
// The markdown should be written in the textarea and the timeline will be generated
// when the button is clicked. The timeline will be displayed as an svg element.

// Define some constants for the svg dimensions and styles
const SVG_WIDTH = 800;
const SVG_HEIGHT = 600;
const SVG_MARGIN = 20;
const SVG_STYLE = "stroke: black; fill: none; font-family: Arial; font-size: 12px;";
const WAYMARK_HEIGHT = 40;
const WAYMARK_GAP = 10;
const WAYMARK_STYLE = "stroke-width: 2px;";
const LABEL_STYLE = "text-anchor: middle;";

// Get the textarea and button elements from the document
const textarea = document.getElementById("textarea");
const button = document.getElementById("button");

// Define a function to parse the markdown and return an array of timelines
// Each timeline is an object with a name and an array of waymarks
// Each waymark is an object with a label and an array of sublabels
function parseMarkdown(markdown) {
  // Split the markdown by line breaks and trim whitespace
  const lines = markdown.split("\n").map(line => line.trim());
  // Initialize an empty array for the timelines
  const timelines = [];
  // Initialize an empty object for the current timeline
  let currentTimeline = null;
  // Initialize an empty object for the current waymark
  let currentWaymark = null;
  // Loop through the lines
  for (let line of lines) {
    // If the line starts with "@Line:", it indicates a new timeline
    if (line.startsWith("@Line:")) {
      // If there is a current timeline, push it to the timelines array
      if (currentTimeline) {
        timelines.push(currentTimeline);
      }
      // Create a new timeline object with the name from the line
      currentTimeline = {
        name: line.slice(6),
        waymarks: []
      };
      // Reset the current waymark to null
      currentWaymark = null;
    }
    // If the line is "end", it indicates the end of the current timeline
    else if (line === "end") {
      // If there is a current waymark, push it to the current timeline's waymarks array
      if (currentWaymark) {
        currentTimeline.waymarks.push(currentWaymark);
      }
      // Reset the current waymark to null
      currentWaymark = null;
    }
    // If the line is not empty and does not start with a dash, it indicates a new waymark
    else if (line && !line.startsWith("-")) {
      // If there is a current waymark, push it to the current timeline's waymarks array
      if (currentWaymark) {
        currentTimeline.waymarks.push(currentWaymark);
      }
      // Create a new waymark object with the label from the line
      currentWaymark = {
        label: line,
        sublabels: []
      };
    }
    // If the line starts with a dash, it indicates a sublabel for the current waymark
    else if (line.startsWith("-")) {
      // If there is a current waymark, push the sublabel to its sublabels array
      if (currentWaymark) {
        currentWaymark.sublabels.push(line.slice(1).trim());
      }
    }
  }
  // If there is a current timeline, push it to the timelines array
  if (currentTimeline) {
    timelines.push(currentTimeline);
  }
  // Return the timelines array
  return timelines;
}

// Define a function to generate an svg element from an array of timelines
function generateSvg(timelines) {
  // Create a new svg element with the specified width, height and style
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", SVG_WIDTH);
  svg.setAttribute("height", SVG_HEIGHT);
  svg.setAttribute("style", SVG_STYLE);
  
  // Calculate the horizontal spacing between waymarks based on the number of waymarks in each timeline
  const maxWaymarks = Math.max(...timelines.map(timeline => timeline.waymarks.length));
  const waymarkSpacing = (SVG_WIDTH - SVG_MARGIN * 2) / maxWaymarks;

  // Loop through the timelines and draw them on the svg element
  for (let i = 0; i < timelines.length; i++) {
    const timeline = timelines[i];
    // Calculate the vertical position of the timeline based on its index and margin
    const timelineY = SVG_MARGIN + i * (WAYMARK_HEIGHT + WAYMARK_GAP);
    // Draw a horizontal line for the timeline using a path element
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", `M${SVG_MARGIN} ${timelineY} H${SVG_WIDTH - SVG_MARGIN}`);
    path.setAttribute("style", WAYMARK_STYLE);
    svg.appendChild(path);
    // Loop through the waymarks of the timeline and draw them on the svg element
    for (let j = 0; j < timeline.waymarks.length; j++) {
      const waymark = timeline.waymarks[j];
      // Calculate the horizontal position of the waymark based on its index and spacing
      const waymarkX = SVG_MARGIN + j * waymarkSpacing;
      // Draw a vertical line for the waymark using another path element
      const path2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
      path2.setAttribute("d", `M${waymarkX} ${timelineY} V${timelineY - WAYMARK_HEIGHT}`);
      path2.setAttribute("style", WAYMARK_STYLE);
      svg.appendChild(path2);
      
      // Draw a text element for the label of the waymark above it 
      const text1 = document.createElementNS("http://www.w3.org/2000/svg", "text");
      text1.setAttribute("x", waymarkX);
      text1.setAttribute("y", timelineY - WAYMARK_HEIGHT - WAYMARK_GAP);
      text1.setAttribute("style", LABEL_STYLE);
      // Check if the label contains a link by looking for square brackets or double square brackets
      const linkRegex = /\[([^\]]+)\](?:\(([^)]+)\))?|\[\[([^\]]+)\]\]/;
      const linkMatch = linkRegex.exec(waymark.label);
      // If there is a link, create a tspan element for the link text and a title element for the link url
      if (linkMatch) {
        const linkText = linkMatch[1] || linkMatch[3];
        const linkUrl = linkMatch[2] || `[[${linkText}]]`;
        const tspan = document.createElementNS("http://www.w3.org/2000/svg", "tspan");
        tspan.textContent = linkText;
        tspan.setAttribute("style", "fill: blue; text-decoration: underline; cursor: pointer;");
        // Add an event listener to the tspan element to open the link url in a new window when clicked
        tspan.addEventListener("click", () => {
          window.open(linkUrl, "_blank");
        });
        text1.appendChild(tspan);
        const title = document.createElementNS("http://www.w3.org/2000/svg", "title");
        title.textContent = linkUrl;
        text1.appendChild(title);
      }
      // If there is no link, just set the text content of the text element to the label
      else {
        text1.textContent = waymark.label;
      }
      svg.appendChild(text1);

      // Loop through the sublabels of the waymark and draw them on the svg element below it
      for (let k = 0; k < waymark.sublabels.length; k++) {
        const sublabel = waymark.sublabels[k];
        // Draw a text element for the sublabel of the waymark below it 
        const text2 = document.createElementNS("http://www.w3.org/2000/svg", "text");
        text2.setAttribute("x", waymarkX);
        text2.setAttribute("y", timelineY + WAYMARK_GAP + (k + 1) * WAYMARK_HEIGHT / 4);
        text2.setAttribute("style", LABEL_STYLE);
        
        // Check if the sublabel contains a link by looking for square brackets or double square brackets 
        const linkRegex2 = /\[([^\]]+)\](?:\(([^)]+)\))?|\[\[([^\]]+)\]\]/;
        const linkMatch2 = linkRegex2.exec(sublabel);
        // If there is a link, create a tspan element for the link text and a title element for the link url
        if (linkMatch2) {
          const linkText2 = linkMatch2[1] || linkMatch2[3];
          const linkUrl2 = linkMatch2[2] || `[[${linkText2}]]`;
          const tspan2 = document.createElementNS("http://www.w3.org/2000/svg", "tspan");
          tspan2.textContent = linkText2;
          tspan2.setAttribute("style", "fill: blue; text-decoration: underline; cursor: pointer;");
          // Add an event listener to the tspan element to open the link url in a new window when clicked
          tspan2.addEventListener("click", () => {
            window.open(linkUrl2, "_blank");
          });
          text2.appendChild(tspan2);
          const title2 = document.createElementNS("http://www.w3.org/2000/svg", "title");
          title2.textContent = linkUrl2;
          text2.appendChild(title2);
        }
        // If there is no link, just set the text content of the text element to the sublabel
        else {
          text2.textContent = sublabel;
        }
        
        svg.appendChild(text2);
      }
    }
  }
  // Return the svg element
  return svg;
}

// Define a function to handle the button click event
function handleClick() {
  // Get the markdown from the textarea value
  const markdown = textarea.value;
  // Parse the markdown and generate an svg element
  const svg = generateSvg(parseMarkdown(markdown));
  // Append the svg element to the document body
  document.body.appendChild(svg);
  // Add an event listener to the svg element to open it in a new window when clicked
  svg.addEventListener("click", () => {
    window.open(URL.createObjectURL(new Blob([svg.outerHTML], {type: "image/svg+xml"})), "_blank");
  });
}

// Add an event listener to the button to call the handleClick function when clicked
button.addEventListener("click", handleClick);