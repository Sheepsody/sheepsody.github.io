COLORS = ['#FFADAD', '#FFD6A5', '#FDFFB6', '#CAFFBF', '#9BF6FF', '#A0C4FF', '#BDB2FF', '#FFC6FF', '#FFFFFC'];

document.addEventListener('DOMContentLoaded', function () {
    d3.json('/data/graph.json').then((data) => {
        const links = data.links.map((d) => Object.create(d));
        const nodes = data.nodes.map((d) => Object.create(d));

        var svg = d3.select('#graph-svg');
        var [_, width, height] = /(\w+)\s(\w+)$/g.exec(svg.attr('viewBox'));

        var simulation = d3.forceSimulation().alpha(0.1).nodes(nodes);

        simulation
            .force('charge', d3.forceManyBody().strength(-100))
            .force('center', d3.forceCenter(width / 2, height / 2))
            .force('collision', d3.forceCollide())
            .force(
                'link',
                d3.forceLink(data['links']).id((d) => d.id)
            );

        handleMouseOver = (d) => {
            nde = d3.select(d.currentTarget);
            nde.attr('r', nde.attr('r') * 1.5);

            d3.selectAll('.graph-labels')
                .filter('#' + CSS.escape(d.currentTarget.id))
                .style('display', 'block');

            d3.selectAll('.graph-links')
                .filter((line, id) => nde.attr('id') == line.source.id || nde.attr('id') == line.target.id)
                .attr('stroke-width', 6);
        };

        handleMouseOut = (d) => {
            nde = d3.select(d.currentTarget);
            nde.attr('r', nde.attr('r') / 1.5);

            d3.selectAll('.graph-labels')
                .filter('#' + CSS.escape(d.currentTarget.id))
                .style('display', 'none');

            d3.selectAll('.graph-links')
                .filter((line, id) => nde.attr('id') == line.source.id || nde.attr('id') == line.target.id)
                .attr('stroke-width', 1);
        };

        // Initialize the group before to place it under the nodes
        var link = svg.append('g').attr('class', 'links-group');

        var node = svg
            .append('g')
            .attr('class', 'nodes-group')
            .selectAll('circle')
            .data(nodes)
            .enter()
            .append('a')
            .attr('href', (d) => ['/posts', d.slug].join('/'))
            .append('circle')
            .attr('class', 'graph-nodes')
            .attr('id', (d) => d.id)
            .attr('r', (d) => d.rank * 10)
            .attr('fill', (d) => COLORS[d.group % COLORS.length])
            .on('mouseover', handleMouseOver)
            .on('mouseout', handleMouseOut);

        var label = svg
            .append('g')
            .attr('class', 'labels-group')
            .selectAll('text')
            .data(nodes)
            .enter()
            .append('text')
            .attr('class', 'graph-labels')
            .attr('filter', 'url(#solid)')
            .attr('id', (d) => d.id)
            .attr('dy', -50)
            .text((d) => d.title);

        var link = link
            .selectAll('line')
            .data(links)
            .enter()
            .append('line')
            .attr('class', 'graph-links')
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
});
