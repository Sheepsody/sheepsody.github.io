+++
title = "Decision Transformer: Reinforcement Learning via Sequence Modeling"
author = ["Chen", "L.", "Lu", "K.", "Rajeswaran", "A.", "Lee", "Grover", "Laskin", "M.", "Abbeel", "P.", "…"]
lastmod = 2022-03-20
draft = false
+++

tags
: [Reinforcement Learning]({{< relref "20220306-reinforcement_learning.md" >}})


_Paper's idea:_
    -   Model RL as a **sequence modelling problem**
    -   _Why?_ simplicity &amp; scalability of the transformer architecture
    -   **Decision transformer** leverages on a causally masked Transformer
    -   Conditioning on an autoregressive model to generate future actions


Training: collected experience using sequence modelling objective
    -   bypass the need for bootstrapping for long term credit assignment, thus avoiding the "deadly triad" of RL
    -   _Node:_ deadly triad = combining
        -   Bootstrapping (using one or more estimated values in the update step for the same kind of estimated value)
        -   Off-Policy learning (such as Q learning, where we evaluate one policy while following another)
        -   Function approximation


Transformers
    -   Architecture to efficiently model sequential data
    -   Stacked attention layers with residual connections
    -   =&gt; Use GPT, which adds a causal self-attention mask to autoregressive generation, replacing the summation/softmax over the n tokens with only the previous tokens in the sequence
