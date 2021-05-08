#!/usr/bin/env python3
# TODO: exlcude private and draft files

import argparse
import os
import re
import json
import networkx as nx
import community as louvain

LINKS_SECTION_DELIMITER = "## Links to this note {#links-to-this-note}"


def list_slugs(posts_path):
    files = os.listdir(posts_path)
    return [path[:-3] for path in files]


def read_file(filepath):
    content = ""
    with open(filepath, "r") as f:
        for line in f.readlines():
            if line.startswith(LINKS_SECTION_DELIMITER):
                return content
            content += line
    return content


def extract_title(content):
    title = re.findall('title = "(.+)"', content)[0]
    return title


def extract_links(content):
    links = re.findall('<\s+relref\s+"([^"]+)"\s+>', content)
    return links


def create_graph_from_slugs(posts_path, slugs_list):
    graph = nx.DiGraph()
    edges = list()

    for index, slug in enumerate(slugs_list):

        content = read_file(os.path.join(posts_path, slug + ".md"))

        title = extract_title(content)

        graph.add_node(index, id=index, title=title, slug=slug.lower(), rank=1)

        links = extract_links(content)
        for l in links:
            edges.append((index, slugs_list.index(l)))

    graph.add_edges_from(edges)

    return graph


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

    posts_path = os.path.join(args.hugo, "content/posts/")
    graph_path = os.path.join(args.hugo, "static/data", "graph.json")

    files_list = list_slugs(posts_path)

    graph = create_graph_from_slugs(posts_path, files_list)

    pagerank(graph)
    group_nodes(graph)

    dump_graph(graph_path)
