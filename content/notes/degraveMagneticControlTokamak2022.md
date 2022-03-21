+++
title = "Magnetic control of tokamak plasmas through deep reinforcement learning"
author = ["Degrave", "J.", "Felici", "F.", "Buchli", "Neunert", "M.", "Tracey", "B.", "Carpanese", "Ewalds", "T.", "…"]
lastmod = 2022-03-06
draft = false
+++

tags
: [Reinforcement Learning]({{< relref "20220306-reinforcement_learning.md" >}})


## Introduction {#introduction}

-   _Goal:_ shape and maintain a high-temperature plasma within the tokamak vessel of a nuclear fusion reactor
    -   Design a feedback controller that can manipulate a magnetic field though precise control of coils
    -   Use **RL** to generate non-linear feedback controllers

-   _Difficulties:_
    -   High dimensional measurements
    -   Actuation through long time measurements and rapid instability growth


## Design <span class="tag"><span class="ATTACH">ATTACH</span></span> {#design}

<_20220306_190738screenshot.png>

-   _Key points:_
    -   _MPO_ (maximum a posteriori optimization, actor-critic algorithm) to support data collection across distributed parallel streams (simulator is slower than that of a typical RL env)
    -   _Asymetry:_ because the simulating environment is slow, a large critic network is used for the critic, and a small one for the actor (real-time algorithm)
    -   Incorporate the delays, measurement noises and control-voltage offsets during training


## Conclusion {#conclusion}

> We present a new paradigm for plasma magnetic confinement on tokamaks. Our control design fulfils many of the hopes of the community for a machine-learning-based control approach14, including high performance, robustness to uncertain operating conditions, intuitive target specification and unprecedented versatility. This achievement required overcoming gaps in capability and infrastructure through scientific and engineering advances: an accurate, numerically robust simulator; an informed trade-off between simulation accuracy and computational complexity; a sensor and actuator model tuned to specific hardware control; realistic variation of operating conditions during training; a highly data-efficient RL algorithm that scales to high-dimensional problems; an asymmetric learning setup with an expressive critic but fast-to-evaluate policy; a process for compiling neural networks into real-time-capable code and deployment on a tokamak digital control system. This resulted in successful hardware experiments that demonstrate fundamental capability alongside advanced shape control without requiring fine-tuning on the plant. It additionally shows that a free-boundary equilibrium evolution model has sufficient fidelity to develop transferable controllers, offering a justification for using this approach to test control of future devices.
