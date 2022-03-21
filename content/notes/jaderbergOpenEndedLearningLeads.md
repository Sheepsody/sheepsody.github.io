+++
title = "Open-Ended learning leads to Generally Capable Agents"
author = ["Jaderberg", "M.", "Mathieu", "McAleese", "N.", "Bradley-Schmieg", "Nathalie", "Wong", "Porcel", "Hughes-Fitt", "Steph", "…"]
lastmod = 2022-03-20
draft = false
+++

tags
: [Reinforcement Learning]({{< relref "20220306-reinforcement_learning.md" >}})


## General information {#general-information}

-   _Goal_:
    -   Create agents that perform well beyond individual tasks, and exhibit much wider generalization

-   _How:_
    -   Define a universe of tasks targetting different behaviours (coop, competitive, independent, etc.)
    -   Iterative improvements between successive generations of agents, rather than single-objective maximization
    -   Open-ended learning process which dynamically changes objectives &amp; tasks
    -   Multi-dimensional measure of performance
    -   Population training is sequential, each generation of agents bootstrapping their performance from previous generations with _policy distillation_


## XLand Environment Space {#xland-environment-space}

<20210915-000116_xland_deepming.png>

-   Make-up of the environment
    1.  Environment (topology, objects and players)
    2.  Game Space (goal represented through a _disjunctive normal form (DNF)_)
    3.  Task space (combination of world, game and co-players)


## Environment properties {#environment-properties}

-   World properties
    1.  _Navigational complexity:_
        -   \\(\rho\_{s, p} (w)\\) as the distribution of lengths of shortest path in \\(G\_{w}\\)
        -   _Resistance distances distribution_
    2.  _World vastness_ (estimated using Monte Carlo)
        -   \\(9 \times 9 \rightarrow 10^{16}\\) (correcting for invariances &amp; accessibility)
    3.  _World smoothness_ (resistance to small changes in tomography)
        -   Cauchy-Schwartz divergence _L-Lipschitz_
    4.  =&gt; Diverse worlds with little modifications, exploration through evolutionary algorithms

-   Game Properties
    1.  _Exploration difficulty:_ fraction of predicate states in which no player is rewarded
        -   \\(\phi: S \rightarrow \\{0, 1\\}^{d}\\) assigns predicates to  simulation states
        -   \\(\kappa (G) = \frac{\\# \\{\phi (s) : \forall\_{k} r\_{g\_{k}} (s) = 0\\}}{N\_{\phi}}\\)
        -   \\(1 - \kappa\\): probability that at least one player gets a reward (if equiprobability)
    2.  _Cooperativeness:_ fraction of predicate states if which all players are rewarded, compared to the fraction in which at least one of them is
        -   \\(coop (G) = \frac{\\# \\{\phi (s) : \forall\_{k} r\_{g\_{k}} (s) = 1\\}}{N\_{\phi} - \hat{\kappa} (G)}\\)
    3.  _Competitiveness:_ fraction of predicates in which some but not all players are rewarded, compared to the fraction in which at least one of them is
        -   \\(coop (G) = \frac{\\# \\{\phi (s) : \max\_{k} r\_{g\_{k}} (s) \ne \min\_{k} r\_{g\_{k}} (s)\\}}{N\_{\phi} - \hat{\kappa} (G)}\\)
    4.  _Balance_ (maximum cooperativeness of the game when goals are transformed by individual game transformations)
        -   \\(bal(G) = max\_{\xi \in \Xi} coop(\xi(G))\\)


## Goal and Metric {#goal-and-metric}

-   _Goal:_ maximization of reward \\(V\_{\pi} (P\_{\pi}) := E\_{P\_{\pi} (N)} [R\_{\pi} (x)]\\)
    -   Difficulty: different tasks are jointly optimized

-   _Generally capable agents_
    -   Mixture of agents to define a normalization
    -   evaluation of agents across normalized score percentiles
    -   agent better if better on all tasks and strictly better on at least one (_Pareto dominance_)


## Learning Process {#learning-process}

1.  _Deep-Reinforcement Learning_
    -   _[V-MPO]({{< relref "songVMPOOnPolicyMaximum2019.md" >}}) algorithm_
    -   _GOAT (Goal Attention Network_)
        -   Architecture that maximize the value of the optimal policy _given_ a task
        -   Value consistency given a goal
            -   \\(\mathbf{g}\_{l}:=\bigvee\_{o=1}^{k-1}\left[\bigwedge\_{c=1}^{n\_{o}} \phi\_{o c}\right], \mathbf{g}\_{u}:=\bigvee\_{o=1}^{k}\left[\bigwedge\_{c=1}^{n\_{o}^{\prime}} \phi\_{o c}\right]\\), for \\(n\_{o}\prime \ge n\_{o}\\)
            -   =&gt; optimal value is the maximum value over all sub-games

2.  _Dynamic task generation_
    -   Tasks are selected such that:
        1.  Low probability of scoring high
        2.  High probability of scoring higher than control policy
        3.  Control policy not performing well
    -   Population-based training
        -   Train a population of agents with different hyper-parameters
        -   Evolution of an agent if Pareto dominance
    -   Early game
        -   focus on participation using self-game (i.e. g and not(g))

3.  _Generational training of agents_
    -   Policy distillation in early training
    -   Iterative normalized percentiles in validation set

4.  _Combined Learning Process_
    1.  Deep RL (seconds)
    2.  Dynamic task generation &amp; population based training (hours)
    3.  Generational training (days)


## Results {#results}
