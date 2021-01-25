document.addEventListener('DOMContentLoaded', function () {
    // Extract SVG placeholder and its dimensions
    var svg = d3.select('#graph-svg');
    var [_, width, height] = /(\d+)\s(\d+)$/g.exec(svg.attr('viewBox'));

    var nodes_data = [
        { name: 'Travis', rank: 1, link: '&' },
        { name: 'Rake', rank: 2, link: '&' },
        { name: 'Diana', rank: 3, link: '&' },
        { name: 'Rachel', rank: 4, link: '&' },
        { name: 'Shawn', rank: 5, link: '&' },
        { name: 'Emerald', rank: 6, link: '&' },
    ];

    //set up the simulation
    //nodes only for now
    var simulation = d3.forceSimulation().alpha(0.1).nodes(nodes_data);

    //add forces
    //we're going to add a charge to each node
    //also going to add a centering force
    simulation.force('charge_force', d3.forceManyBody()).force('center_force', d3.forceCenter(width / 2, height / 2));

    handleMouseOver = (d) => {
        nde = d3.select(d.currentTarget);
        nde.attr('r', nde.attr('r') * 1.5);
        d3.selectAll('text')
            .filter('#' + CSS.escape(d.currentTarget.id))
            .style('display', 'block');
    };

    handleMouseOut = (d) => {
        nde = d3.select(d.currentTarget);
        nde.attr('r', nde.attr('r') / 1.5);
        d3.selectAll('text')
            .filter('#' + CSS.escape(d.currentTarget.id))
            .style('display', 'none');
    };

    //draw circles for the nodes
    var node = svg
        .append('g')
        .attr('class', 'nodes-group')
        .selectAll('circle')
        .data(nodes_data)
        .enter()
        .append('a')
        .attr('href', '/')
        .append('circle')
        .attr('class', 'graph-nodes')
        .attr('id', (d) => d.name)
        .attr('r', (d) => d.rank)
        .on('mouseover', handleMouseOver)
        .on('mouseout', handleMouseOut);

    var label = svg
        .append('g')
        .attr('class', 'labels-group')
        .selectAll('text')
        .data(nodes_data)
        .enter()
        .append('text')
        .attr('class', 'graph-labels')
        .attr('filter', 'url(#solid)')
        .attr('id', (d) => d.name)
        .attr('dy', -50)
        .text((d) => d.name);

    //Time for the links

    //Create links data
    var links_data = [
        { source: 'Travis', target: 'Rake' },
        { source: 'Diana', target: 'Rake' },
        { source: 'Diana', target: 'Rachel' },
        { source: 'Rachel', target: 'Rake' },
        { source: 'Rachel', target: 'Shawn' },
        { source: 'Emerald', target: 'Rachel' },
    ];

    //Create the link force
    //We need the id accessor to use named sources and targets

    var link_force = d3
        .forceLink(links_data)
        .id(function (d) {
            return d.name;
        })
        .strength(0.1);

    //Add a links force to the simulation
    //Specify links  in d3.forceLink argument

    simulation.force('links', link_force);

    //draw lines for the links
    var link = svg
        .append('g')
        .attr('class', 'links-group')
        .selectAll('line')
        .data(links_data)
        .enter()
        .append('line')
        .attr('stroke-width', 2)
        .attr('stroke', 'var(--secondary)');

    simulation.on('tick', () => {
        link.attr('x1', (d) => d.source.x)
            .attr('y1', (d) => d.source.y)
            .attr('x2', (d) => d.target.x)
            .attr('y2', (d) => d.target.y);

        node.attr('cx', (d) => d.x).attr('cy', (d) => d.y);

        label.attr('x', (d) => d.x).attr('y', (d) => d.y);
    });
});
