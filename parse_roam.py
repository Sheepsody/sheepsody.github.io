#!/usr/bin/env python3
# TODO: exlcude private and draft files

import argparse
import os
import re
import glob
import json


def list_roam_files(roam_path):
    return glob.glob(os.path.join(roam_path, "**/*.org"), recursive=True)


def parse_links(files_list):
    data = dict()
    private_slugs = list()
    i = 0
    for filepath in files_list:
        with open(filepath, "r") as f:
            content = f.read()

            slug = re.findall("([^/]+)\.org$", filepath)[0]
            roam_tags = re.findall("#\+ROAM_TAGS: ([a-z]+)", content) + re.findall(
                "#\+roam_tags: ([a-z]+)", content
            )

            if "private" in roam_tags or "draft" in roam_tags:
                private_slugs.append(slug)

            else:
                title = (
                    re.findall("#\+TITLE[: ]+(.+)[\n$]", content)
                    + re.findall("#\+title[: ]+(.+)[\n$]", content)
                )[0]
                links = re.findall("\[\[file:([A-Za-z0-9_-]+)\.org\]", content)

                data[slug] = {
                    "id": i,
                    "slug": slug,
                    "title": title,
                    "links": links,
                }
                i += 1

    for d in data.values():
        d["links"] = [
            data[slug]["id"] for slug in d["links"] if slug not in private_slugs
        ]

    return data


def parse_cli():
    parser = argparse.ArgumentParser()

    parser.add_argument("-r", "--roam", help="Org Roam directory", required=True)
    parser.add_argument("-u", "--hugo", help="Hugo website location", required=True)

    return parser.parse_args()


if __name__ == "__main__":
    args = parse_cli()

    os.makedirs(os.path.join(args.hugo, "static/data/"), exist_ok=True)

    files_list = list_roam_files(args.roam)

    data = parse_links(files_list)

    with open(os.path.join(args.hugo, "graph.json"), "w") as out:
        json.dump(
            {
                "nodes": [
                    {"id": l["id"], "title": l["title"], "slug": l["slug"], "rank": 1}
                    for l in data.values()
                ],
                "links": [
                    {"source": l["id"], "target": t}
                    for l in data.values()
                    for t in l["links"]
                ],
            },
            out,
        )
