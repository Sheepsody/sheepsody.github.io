+++
title = "Causal Inference in Statistics : A Primer"
author = ["Victor Vialard"]
lastmod = 2021-08-09
draft = false
+++

tags
: [Causality]({{<relref "20210504-causality.md#" >}})


## Graphical Models {#graphical-models}


### Chains and forks {#chains-and-forks}


#### Chains {#chains}

{{< figure src="/ox-hugo/plantuml-pqx2lc.png" >}}

-   Z and X are _likely dependent_
-   Z and X are _independant, conditional on Y_, i.e. \\(P(Z=z|Y=y, X=x) = P(Z=z|Y=y)\\)

Terms:

-   _Intransitive case_: X and Y vary independently

Rule: **Conditional Independence on Chains**

-   Two variables, X and Y, are conditionally independent given Z, if there is only one unidirectional path between X and Y and Z is any set of variables that intercepts that path.
-   !! Only holds if \\(U\_X, U\_Y, U\_Z\\) are independant


#### Forks {#forks}

{{< figure src="/ox-hugo/plantuml-2lVkIu.png" >}}

-   Z and Y are _likely dependent_
-   Z and Y are _independant, conditional on X_

Rule: **Conditional Independence in Forks**

-   If a variable X is a common cause of variables Y and Z, and there is only one path between Y and Z, then Y and Z are independent conditional on X.


### Colliders {#colliders}

{{< figure src="/ox-hugo/plantuml-6IsBL7.png" >}}

-   X and Y are _dependent conditional on Z_

Example of such problem: _Monty Hall_

> « Suppose you're on a game show, and you're given the choice of three doors: Behind one door is a car; behind the others, goats. You pick a door, say No. 1, and the host, who knows what's behind the doors, opens another door, say No. 3, which has a goat. He then says to you, "Do you want to pick door No. 2?" Is it to your advantage to switch your choice? »

Rule: **Conditional Independence in Colliders**

-   If a variable Z is the collision node between two variables X and Y, and there is only one path between X and Y, then X and Y are unconditionally independent but are dependent conditional on Z and any descendants of Z.


### d-Separation {#d-separation}

Definition: **d-Separation**

-   A path p is blocked by a set of nodes Z if and only if
    1.  p contains a chain of nodes A → B → C or a fork A ← B → C such that the middle node B is in Z (i.e., B is conditioned on), or
    2.  p contains a collider A → B ← C such that the collision node B is not in Z, and no descendant of B is in Z.
-   If Z blocks every path between two nodes X and Y, then X and Y are d-separated, conditional on Z, and thus are independent conditional on Z

Definition: **Markov Blanket**

-   minimal set of nodes that renders V independent of all other variables in the graph


### Model Testing and Causal Search {#model-testing-and-causal-search}

-   We can check the results using standard regression, and checking that the coefficients are 0
    -   If \\(X, Y\\) are independant, \\(Y \sim r\_{0} W + r\_{1} X\\) should display \\(r\_{1} \approx 0\\)

-   Issues with the statistical hypothesis testing framework (observe how likely it is for the observed samples to have been generated from the hypothesized model)
    1.  If any parameter can not be tested, the model cannot be
    2.  No way to determine why a model is not a good fit
    3.  Not reliable if large number of variables

-   Advantages of d-separation
    1.  Non-parametric
    2.  Tests model locally

-   _Equivalence Class_: set of graph sharing indistinguishable implications
    -   Important result: we can share for models from a dataset, or do the reverse operation


## The Effects of Interventions {#the-effects-of-interventions}


### What are interventions ? {#what-are-interventions}

-   <span class="underline">Correlation doest not imply causation</span>
    -   Famous ex. : ice creams sales vs. violent crimes

-   Most of the time, we perform _observational studies_
    -   Difficult to untangle causal from correlation

-   _Intervening_ vs _Conditioning_
    -   Intervening = we fix a variable, and change the system
        -   \\(P( Y=y | do(X=x) )\\)
    -   Conditioning = we merely narrow the subset of cases, and only our perception of the system changes
        -   \\(P( Y=y | X=x )\\)


### Adjustment Formula {#adjustment-formula}

_Ex:_ As in Simpson's paradox, where X stands for drug usage, Y for recovery and Z for gender

{{< figure src="/ox-hugo/plantuml-v6pHCo.png" >}}

-   Our goal is to estimate the _ACE ("Average Causal Effect")_, i.e. \\(P(Y = 1|do(X = 1)) − P(Y = 1|do(X = 0))\\)
    -   Without the _causal story_ (i.e. the graph), it is impossible to estimate causal effects
    -   The causal effect \\(P(Y = y|do(X = x))\\) is the same as the conditional probability \\(P\_{m} (Y = y|X = x)\\), in the following _manipulated model_

{{< figure src="/ox-hugo/plantuml-BfDUM1.png" >}}

-   **Adjustment-formula**
    -   \\(P(Y = y|do(X = x)) = \sum\_{z} P(Y = y|X = x, Z = z)P(Z = z)\\)
    -   Can be estimated using the data at hand

-   _To adjust or not adjust?_
    -   Rule: **Causal Effect Rule**
        -   Given a graph G in which a set of variables PA are designated as the parents of X, the causal effect of X on Y is given by : \\(P(Y = y|do(X = x) = \sum\_{z} P(Y = y|X = x, PA = z)P(PA = z)\\), where z ranges over all combinations of PAs

-   _Multiple Interventions & Truncated Product Rule_
    -   \\(P(x\_{1} , x\_{2} , ... , x\_{n} |do(x)) = \prod\_{i} P(x\_{i} |pa\_{i} )\\) for all i with \\(X\_{i}\\) not in \\(X\\) (the intervention set)


### The Backdoor Criterion {#the-backdoor-criterion}

-   Issue: what to do when parents are inaccessible or unmeasurable ?
    -   Graph-theoretical problem: Under what conditions, is the structure of the causal graph sufficient for computing a causal effect from a given data set?

-   Definition, **Backdoor Criterion**
    -   Given an ordered pair of variables (X, Y) in a directed acyclic graph G, a set of variables Z satisfies the backdoor criterion relative to (X, Y) if no node in Z is a descendant of X, and Z blocks every path between X and Y that contains an arrow into X.
    -   In these conditions, \\(P(Y = y|do(X = x)) = \sum\_{z} P(Y = y|X = x, Z = z)P(Z = z)\\)


### Front-Door Criterion {#front-door-criterion}

-   _Ex:_ effect of smoking on lung cancer

{{< figure src="/ox-hugo/plantuml-3wxjEw.png" >}}

-   Applying 2 times the front-door criteria, we find that :
    -   \\(P(Y = y|do(X = x)) = \sum\_{z} \sum\_{x \prime} P(Y = y|Z = z, X = x \prime )P(X = x \prime )P(Z = z|X = x)\\)

-   Definition, **Front-Door**
    -   A set of variables Z is said to satisfy the front-door criterion relative to an ordered pair of variables (X, Y) if
        1.  Z intercepts all directed paths from X to Y.
        2.  There is no unblocked path from X to Z.
        3.  All backdoor paths from Z to Y are blocked by X.
-   Definition, **Front-Door Adjustment**
    -   If Z satisfies the front-door criterion relative to (X, Y) and if P(x, z) > 0, then the causal effect of X on Y is identifiable and is given by the formula
    -   \\(P(y|do(x)) = \sum\_{z} P(z|x) \sum\_{x \prime} P(y|x \prime , z)P(x \prime )\\)


### Conditional Interventions and Covariate-Specific Effects {#conditional-interventions-and-covariate-specific-effects}

-   Issue: often, interventions results from dynamic policies, such that action X is _conditional_ upon the value of another variable Z
    -   The probability distribution becomes \\(P(Y = y|do(X = g(Z)))\\)

-   Rule
    -   The z-specific effect P(Y = y|do(X = x), Z = z) is identified whenever we can measure a set S of variables such that S ∪ Z satisfies the backdoor criterion. Moreover, the z-specific effect is given by the following adjustment formula :
    -   \\(P(Y = y|do(X = x), Z = z) = \sum\_{s} P(Y = y|X = x, S = s, Z = z)P(S = s)\\)


### Inverse Probability Weighting {#inverse-probability-weighting}

-   Issue: while adjusting on large Zs, we might face computational and estimational problems

-   _Propensity function:_ \\(g(x , z) = P(X=x|Z=z)\\)
    -   Evaluate this distribution & draw samples as if from post-intervention probability \\(P\_{m}\\)

-   _"Inverse Probability Weighting"_
    -   \\(P(y | do(x)) = sum\_{z} \frac{ P(Y=y, X=x, Z=z) }{ P(X=x | Z=z) }\\)
    -   We weight each available sample so as we can treat them as it they were generated from \\(P\_{m}\\)
    -   Yields benefits when sample size in hundreds, and Zs in thousands
    -   !!! Z must satisfy the backdoor criterion, and the bias can be larger


### Mediation {#mediation}

{{< figure src="/ox-hugo/plantuml-eRPC7Z.png" >}}

-   The _mediator_ affects the dependent variable
    -   _Ex:_ gender may also have an indirect effect on hiring through the mediating variable of qualifications (Z)

-   _Issue:_ if we condition on qualifications, we condition on a collider
    -   We intervene on qualifications

-   **CDE** _(Controlled Direct Effect)_
    -   CDE = P(Y = y|do(X = x), do(Z = z)) − P(Y = y|do(X = x &prime; ), do(Z = z))
    -   Practically, this definition assures us that in any case where the intervened probabilities are identifiable from the observed probabilities, we can estimate the direct effect of X on Y.

-   In the above example
    -   No backdoor from X to Y (thus \\(do(x)\\) is simply conditioning on X)
    -   Backdoor from Z to Y, that we fix by adjusting on I
    -   \\(CDE = \sum\_{i} [P(Y = y|X = x, Z = z, I = i) − P(Y = y|X = x \prime , Z = z, I = i)]P(I = i)\\)

    -   The CDE of X on Y, from which we can determine \\(P(Y = y|do(X = x), do(Z = z))\\), mediated by Z holds if
        1.  There exists a set \\(S\_{1}\\) of variables that blocks all backdoor paths from Z to Y.
        2.  There exists a set \\(S\_{2}\\) of variables that blocks all backdoor paths from X to Y, after deleting all arrows entering Z.

    -   How to determine the indirect effect ?
        -   Use of counterfactuals


### Causal Inference in Linear Systems {#causal-inference-in-linear-systems}

-   _Objective:_ Examine causal assumptions and implications in linear systems
    -   _Assumptions:_ relationships are linear and errors terms are Gaussian
    -   Under these assumptions, \\(X\_{1}, ..., X\_{N}\\) variables distributions can be described with \\(2N + N (N-1) / 2\\) parameters, and the distributions can be fully described by expectations.
    -   We can thus substitute expectations for probabilities, and use regressions to determine causal information, i.e. \\(E[ Y | X\_{1}=x\_{1}, ..., X\_{N} = x\_{N}] = r\_{0} + \sum r\_{i} x\_{i}\\)
    -   _Path coefficients_ can be directly annotated from _regressors_ on the causal graph

-   Difference between _structural_ and _regression_ equations
    -   Regression equations merely describe the best fit !

-   Identifying Structural Coefficients and Causal Effect, or _"identifiability"_
    -   How to express the path coefficients associated with total and direct effects from covariances and regression coefficients ?

{{< figure src="/ox-hugo/plantuml-q585Ku.png" >}}

-   _Ex:_ Determine total causal effect of X on Y
    -   Backdoor criterion → adjust on T → regress Y on X & T
    -   \\(y = r\_{X}X + r\_{T}T + \epsilon\\), where \\(r\_{X}\\) is the total effect of X on Y

{{< figure src="/ox-hugo/plantuml-VEXrjm.png" >}}

-   _Ex:_ Determine direct causal effect of X on Y.
    -   We need to block both backdoors and indirect paths from X to Y
    -   The procedure is :
        1.  Remove edge from X to Y
        2.  If there is a set Z that d-separates X and Y, we can regress Y on X & Z
    -   In the above graph, the set \\({W}\\) d-separates them


## Counterfactuals and their applications {#counterfactuals-and-their-applications}

-   **Counterfactual** = _"if" statement untrue or unrealized_
    -   Condition = **antecedent** (or _hypothetical condition_)
    -   The outcome is important, because the estimation is based on the actual realisation
    -   We wish to estimate \\(E(Y\_{X=1} | X = 0, Y = Y\_{X=0} = 1)\\), where \\(Y\_{X=1}\\) is the hypothetical variable, and the two others are observed
    -   The clash between two "worlds", prevents us from using do-, meaning that we cannot use interventional experiments
    -   Using fully specified models, we can compute the probabilities of counterfactuals, even when the underlying functions are not specified or when some variables are unmeasured


### Defining and Computing Counterfactuals {#defining-and-computing-counterfactuals}

-   _Structural Interpretation of Counterfactuals_
    -   Model M, with known functions \\({F}\\) and the values all exogenous variables
    -   Every assignment corresponds to a _"unit"_ in the population
    -   \\(Y\_{X=x}(u) = y\\) : _"Y would be y, had X been x, in situation U=u"_
    -   Is it different from the do-operator, as it only focuses on individual levels \\(U=u\\) of analysis, whereas the do-operator uses the whole population (\\(E[Y | do(x)]\\))

-   _Fundamental Law of Counterfactuals_
    -   \\(Y\_{x}(u) = Y\_{M\_{x}} (u)\\), which corresponds to a modified sub-model \\(M\_{x}\\)
    -   Counterfactuals must _cohere_ with each others
    -   _Consistency rule_ (generally obeyed): if \\(X=x\\) then \\(Y\_{x} = Y\\)

-   _From Population to Individual Behaviour: The Three Steps in Computing Counterfactuals_
    1.  _Abduction_: Use evidence \\(E=e\\) to computer the value of \\(U\\)
    2.  _Action_: Modify the model, by removing the structural equations for \\(X\\) and replacing them with appropriate function, to obtain a modified model \\(M\_{x}\\)
    3.  _Prediction_: Use the modified model to compute \\(Y\\), the consequence of the counterfactual

-   For _non-deterministic counterfactuals_, \\(E[Y\_{X=x}|E=e]\\),the above steps rewrites:
    1.  **_Abduction_**: Update \\(P(U)\\) from the evidence to obtain \\(P(U|E=e)\\)
    2.  **_Action_**: Modify the model, by removing the structural equations for \\(X\\) and replacing them with appropriate function, to obtain a modified model \\(M\_{x}\\)
    3.  **_Prediction_**: Use the modified model and the updated probabilities over \\(U\\) variables, \\(P(U|E=e)\\), to compute the expectation of \\(Y\\), the consequence of the counterfactual


### Nondeterministic Counterfactuals {#nondeterministic-counterfactuals}

-   _Warning!_ \\(E[Y | do(X=1), Z=1] \ne E[ Y\_{X=1} | Z=1 ]\\)
    -   We can capture the post-intervention in counterfactuals using \\(E[ Y\_{X=1} | Z\_{X=1} = 1 ]\\), which designates \\(Z=1\\) as post-intervention
    -   _Unrealized_ events can creates dependences on the unrealized parts, and thus change the behaviour of chains! (see ex. pg. 100)

-   _Graphical Representation of Counterfactuals_
    -   Under the fundamental law of counterfactuals, we remove all the edges entering the variable X to get the modified world \\(M\_{X}\\)

{{< figure src="/ox-hugo/plantuml-BHoIis.png" >}}

-   **Theorem**: _Counterfactual Interpretation of Backdoor_
    -   If a set Z of variables satisfies the backdoor condition relative to (X, Y), then, for all x, the counterfactual Y x is conditionally independent of X given Z
    -   \\(P(Y\_{X} |X, Z) = P(Y\_{X} |Z)\\)

-   _Counterfactuals in Experimental Settings_

-   _Counterfactuals in Linear Models_
    -   In linear models, any counterfactual quantity is identifiable whenever the model parameters are identified
    -   **Theorem**
        -   Let τ be the slope of the total effect of X on Y, \\(τ = E[Y|do(x + 1)] − E[Y|do(x)]\\), then, for any evidence \\(Z = e\\), we have \\(E[Y\_{X=x} |Z = e] = E[Y|Z = e] + τ(x − E[X|Z = e])\\)


### Practical Uses of Counterfactuals {#practical-uses-of-counterfactuals}

> « It is though counterfactual reinforcement that we learn to improve our own decision-making processes and achieve higher performance. »

-   See the book for the examples


### Mathematical Tool Kits for Attribution and Mediation {#mathematical-tool-kits-for-attribution-and-mediation}


#### Toolkit for Attribution and Probabilities of Causation {#toolkit-for-attribution-and-probabilities-of-causation}

-   _Probability of Necessity_ (PN)
    -   \\(PN(x, y) = P( Y\_{x \prime} = y \prime | X=x, Y=y )\\)
    -   Legal criterion "had for"

-   **Theorem**
    -   If Y is monotonic relative to X, that is, \\(Y\_{1} (u) \ge Y\_{0} (u)\\) for all u, then PN is identifiable whenever the causal effect \\(P(y|do(x))\\) is identifiable, and
    -   \\(PN = \frac{P(y) - P(y|do(x \prime ))}{P(x, y) }\\)
    -   or, substituting \\(P(y) = P(y|x)P(x) + P(y|x \prime )(1 − P(x))\\), we obtain :
    -   \\(PN = \frac{P(y|x) - P(y|x \prime )}{P(y|x)} + \frac{P(y|x \prime) - P(y|do(x \prime))}{P(x, y)}\\)

-   In the non-monotonic case, we have upper and lower bounds for PN
    -   \\(max \\{ 0, \frac{P(y) - P(y|do(x \prime))}{P(x, y)} \\} \le PN \le min \\{ 1, \frac{P(y \prime | do (x \prime )) - P(x \prime, y \prime)}{P(x, y)} \\}\\)


#### Toolkit for Mediation {#toolkit-for-mediation}

{{< figure src="/ox-hugo/plantuml-nGm7po.png" >}}

-   **Definitions**
    -   **Total Effect**
        \\(TE = E[ Y\_{1} - Y\_{0} ] = E[ Y | do(T=1) ] - E[ Y | do(T=0) ]\\)
    -   **Controlled Direct Effect**
        \\(CDE = E[ Y\_{1,m} - Y\_{0,m} ] = E[ Y | do(T=1, M=m) ] - E[ Y | do(T=0, M=m) ]\\)
    -   **Natural Direct Effect**
        \\(NDE = E[ Y\_{1,M\_{0}} - Y\_{0,M\_{0}} ]\\)
    -   **Natural Indirect Effect**
        \\(NIE = E[ Y\_{0,M\_{1}} - Y\_{0,M\_{0}} ]\\)
    -   (Conditions are given in the book)
