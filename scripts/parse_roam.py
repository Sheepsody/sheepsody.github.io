#!/usr/bin/env python3

import argparse
import json
import os
import re

import community as louvain
import networkx as nx
import pygraphviz as pgv

LINKS_SECTION_DELIMITER = "## Links to this note {#links-to-this-note}"

def pagerank(graph):
    for node, rank in nx.pagerank(graph, alpha=0.9).items():
        graph.nodes[node]["rank"] = rank * 10


def group_nodes(graph):
    partition = louvain.best_partition(graph.to_undirected())
    for i, g in partition.items():
        graph.nodes[i]["group"] = g


def dump_graph(filepath):
    os.makedirs(os.path.dirname(filepath), exist_ok=True)
    with open(filepath, "w") as out:
        json.dump(
            {
                "nodes": [l[1] for l in list(graph.nodes(data=True))],
                "links": [{"source": l[0], "target": l[1]} for l in graph.edges()],
            },
            out,
        )


def parse_cli():
    parser = argparse.ArgumentParser()

    parser.add_argument("--hugo", help="Hugo website location", required=True)

    return parser.parse_args()


if __name__ == "__main__":
    args = parse_cli()

    in_graph_path = os.path.join(args.hugo, "static/org-roam", "graph.dot")
    out_graph_path = os.path.join(args.hugo, "static/org-roam", "graph.json")

    graph = pgv.AGraph(in_graph_path, strict=False, directed=True)
    graph = nx.nx_agraph.from_agraph(graph)
    graph = nx.DiGraph(graph)

    pagerank(graph)
    group_nodes(graph)

    dump_graph(out_graph_path)
