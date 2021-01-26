document.addEventListener('DOMContentLoaded', function () {
    d3.json('/data/graph.json').then((data) => {
        var svg = d3.select('#graph-svg');
        var [_, width, height] = /(\w+)\s(\w+)$/g.exec(svg.attr('viewBox'));

        var nodes_data = data['nodes'];

        var simulation = d3.forceSimulation().alpha(0.1).nodes(nodes_data);

        simulation
            .force('charge', d3.forceManyBody().strength(-100))
            .force('center', d3.forceCenter(width / 2, height / 2))
            .force('collision', d3.forceCollide());

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

        var node = svg
            .append('g')
            .attr('class', 'nodes-group')
            .selectAll('circle')
            .data(nodes_data)
            .enter()
            .append('a')
            .attr('href', (d) => ['/posts', d.slug].join('/'))
            .append('circle')
            .attr('class', 'graph-nodes')
            .attr('id', (d) => d.id)
            .attr('r', (d) => d.rank * 10)
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
            .attr('id', (d) => d.id)
            .attr('dy', -50)
            .text((d) => d.title);

        var links_data = data['links'];

        var link_force = d3
            .forceLink(links_data)
            .id(function (d) {
                return d.id;
            })
            .strength(0.1);

        simulation.force('links', link_force);

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
});
