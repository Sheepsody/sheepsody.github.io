---
title: "Knowledge Graph"
layout: graph
filterSection: "notes"
searchboxText: "Search Knowledge Graph"
---

The communities inside this directed graph are detected using the [Louvain method]({{<ref "/notes/20210125193003-louvain#modularity-optimization-louvain">}}), and the notes ranked according to the [PageRank algorithm]({{<ref "/notes/20210125210011-pagerank">}}).

I use [Roam](https://github.com/org-roam/org-roam) as my note-taking and knowledge management methodology, which itself is an implementation of the [Zettlekasten](https://en.wikipedia.org/wiki/Zettelkasten) (or slip-box) method. Some notes are thus intentionally empty, and used only to link the notes between each other.

These notes are automatically exported from my [Org-Roam](https://github.com/org-roam/org-roam) database, using the [ox-hugo](https://ox-hugo.scripter.co/) package. A GitHub actions then builds the graph and the website, and the output is uploaded to my personal server. You can find all of the scripts on the project's GitHub.
