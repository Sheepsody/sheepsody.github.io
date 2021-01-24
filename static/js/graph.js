document.addEventListener("DOMContentLoaded", function () {
  console.log("plop");
  var svg = d3.select("#graph-svg");

  var width = 1000;
  var height = 800;

  var nodes_data = [
    { name: "Travis", sex: "M" },
    { name: "Rake", sex: "M" },
    { name: "Diana", sex: "F" },
    { name: "Rachel", sex: "F" },
    { name: "Shawn", sex: "M" },
    { name: "Emerald", sex: "F" },
  ];

  //set up the simulation
  //nodes only for now
  var simulation = d3
    .forceSimulation()
    //add nodes
    .nodes(nodes_data);

  //add forces
  //we're going to add a charge to each node
  //also going to add a centering force
  simulation
    .force("charge_force", d3.forceManyBody())
    .force("center_force", d3.forceCenter(width / 2, height / 2));

  //draw circles for the nodes
  var node = svg
    .append("g")
    .attr("class", "nodes")
    .selectAll("circle")
    .data(nodes_data)
    .enter()
    .append("circle")
    .attr("r", 5)
    .attr("fill", "red");

  //Time for the links

  //Create links data
  var links_data = [
    { source: "Travis", target: "Rake" },
    { source: "Diana", target: "Rake" },
    { source: "Diana", target: "Rachel" },
    { source: "Rachel", target: "Rake" },
    { source: "Rachel", target: "Shawn" },
    { source: "Emerald", target: "Rachel" },
  ];

  //Create the link force
  //We need the id accessor to use named sources and targets

  var link_force = d3.forceLink(links_data).id(function (d) {
    return d.name;
  });

  //Add a links force to the simulation
  //Specify links  in d3.forceLink argument

  simulation.force("links", link_force);

  //draw lines for the links
  var link = svg
    .append("g")
    .attr("class", "links")
    .selectAll("line")
    .data(links_data)
    .enter()
    .append("line")
    .attr("stroke-width", 2);

  simulation.on("tick", () => {
    link
      .attr("x1", (d) => d.source.x)
      .attr("y1", (d) => d.source.y)
      .attr("x2", (d) => d.target.x)
      .attr("y2", (d) => d.target.y);

    node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
  });
});
