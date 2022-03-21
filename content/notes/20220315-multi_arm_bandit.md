+++
title = "Multi-Arm Bandit"
author = ["Victor Vialard"]
date = 2022-03-15
lastmod = 2022-03-16
draft = false
+++

tags
: [Reinforcement Learning]({{< relref "20220306-reinforcement_learning.md" >}})

source
: [Lil'log - Multi-Arm Bandit](https://lilianweng.github.io/posts/2018-01-23-multi-armed-bandit/)


## Introduction {#introduction}

-   **Exploration vs exploitation dilemma**
    -   Gather information to make the best overall decisions while keeping risk under control
    -   _incomplete information dilemma_

-   **Multi-arm bandit**
    -   Explores this trade-off
    -   Find the best strategy to achieve the highest _long-term rewards_ from a set of _slot-machines_, each with their own probabilities

-   _Setting: Bernouilli bandit_
    -   simplified Markov Decision process
    -   \\(Q(a) = \mathbb{E} [r \vert a] = \theta\\), (or \\(Q(a\_t) = \theta\_i\\) if the i-th machine is used on step t)
    -   \\(r\_t = \mathcal{R}(a\_t)\\) is a stochastic reward (1 with prob. \\(Q(a\_t)\\), 0 otherwise)
    -   _Loss-function:_ **total regret** by not selecting optimal action
        -   \\(\mathcal{L}\_T = \mathbb{E} \Big[ \sum\_{t=1}^T \big( \theta^{\*} - Q(a\_t) \big) \Big]\\)


## Strategies {#strategies}


### ε-Greedy Algorithm {#ε-greedy-algorithm}

-   Perform random exploration with probability ε
    -   _action-value_ \\(\hat{Q}\_t(a) = \frac{1}{N\_t(a)} \sum\_{\tau=1}^t r\_\tau \mathbb{1}[a\_\tau = a]\\)


### Upper-Confidence Bounds {#upper-confidence-bounds}

-   _Goal:_ be optimistic about options with _high-uncertainty_
    -   \\(Q(a) \leq \hat{Q}\_t(a) + \hat{U}\_t(a)\\), where \\(\hat{U}\_t(a)\\) is a function of \\(N\_t(a)\\)
    -   \\(a^{UCB}\_t = argmax\_{a \in \mathcal{A}} \left( \hat{Q}\_t(a) + \hat{U}\_t(a) \right)\\)


#### Hoeffding's Inequality {#hoeffding-s-inequality}

-   _Goal:_ no prior knowledge on the distribution's shape
    -   \\(\mathbb{P} [ \mathbb{E}[X] > \overline{X}\_t + u] \leq e^{-2tu^2}\\) for any random variable

-   In our case...
    -   \\(\mathbb{P} [ Q(a) > \hat{Q}\_t(a) + U\_t(a)] \leq e^{-2t{U\_t(a)}^2}\\)
    -   By introducting a threshold p, we get \\(e^{-2t U\_t(a)^2} = p \text{  Thus, } U\_t(a) = \sqrt{\frac{-\log p}{2 N\_t(a)}}\\)


#### Variations {#variations}

-   **UCB-1** : a _new heuristic_
    -   Decrease parameter p in time \\(p=t^{-4}\\)

-   **Bayesian UCB**
    -   Introduce a prior on the distribution


### Thompson Sampling {#thompson-sampling}

-   Sample action a according to its **optimal** probability
    -   \\(\pi(a \\; \vert \\; h\_t) = \mathbb{P} [ Q(a) > Q(a'), \forall a' \neq a \\; \vert \\; h\_t] = \mathbb{E}\_{\mathcal{R} \vert h\_t} [ \mathbb{1}(a = \arg\max\_{a \in \mathcal{A}} Q(a)) ]\\)

-   Assume that \\(Q(a)\\) follows a _beta-distribution_ \\(\text{Beta}(\alpha, \beta)\\)
    -   \\(\alpha\\) and \\(\beta\\) count respectively successes and failures
    -   At each time step, we use _Bayesian inference_
        1.  \\(\alpha\_i \leftarrow \alpha\_i + r\_t \mathbb{1}[a^{TS}\_t = a\_i]\\)
        2.  \\(\beta\_i \leftarrow \beta\_i + (1-r\_t) \mathbb{1} [a^{TS}\_t = a\_i]\\)


## Links to this note {#links-to-this-note}

-   [Thompson Sampling]({{< relref "russoTutorialThompsonSampling2020.md" >}})
