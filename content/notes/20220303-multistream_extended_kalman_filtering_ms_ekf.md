+++
title = "Multistream Extended Kalman Filtering (MS-EKF)"
author = ["Victor Vialard"]
date = 2022-03-03
lastmod = 2022-03-06
draft = false
+++

tags
: [ML Optimization Algorithms]({{< relref "20220303-ml_optimization_algorithms.md" >}}) [Kalman Filter]({{< relref "20220306-kalman_filter_lqe.md" >}})


## Introduction {#introduction}

-   Addressed in [Parallel Multistream Training of High-Dimensional Neural Network Potentials]({{< relref "singraberParallelMultistreamTraining2019.md" >}})
    -   Reproduce energy surfaces using neural networks

-   Use **Extended Kalman Filter (EKF)**
    -   Efficient for _2 hidden layers of about 100 neurons each_
    -   Kalman filter optimizes the estimate of a linear dynamical system's unknown state from given observations from a history of possibly noisy data points

-   _Advantages:_
    -   Distribute computational burden (derivatives, etc.) accross CPUs with MPI
    -   Speed-up compared to Stochastic Gradient Descent (x3 speedup)
        -   SGD, Adam, etc. are 1st order methods
        -   EKF is a 2nd order method


## Algorithm {#algorithm}

-   Application to neural networks
    -   System state = vector of neural network weights (ideally stationary)
    -   Training data = used as artificial time series

-   Iteratively minimize the mean squared error
    -   \\(\xi(t) = y^{ref} - y(t)\\)
    -   \\(H\_{ij}(t) = \frac{\partial}{\partial w\_{i}} \xi\_{j}(t)\\)
    -   \\(A(t) = \left( \frac{1}{\eta(t)} I + H^{T} (t) P(t) H(t) \right )^{-1}\\)
        -   \\(\eta\\) is the learning rate
    -   Kalman gain : \\(K(t) = P(t) H(t) A(t)\\), where P is the error covariance matrix
    -   Update :
        -   \\(w(t+1) = w(t) + K(t) \xi(t)\\)
        -   \\(P(t+1) = P(t) - K(t) H^{T}(t) P(t) + Q(t)\\) (Q is the noise covariance matrix, used to avoid local minimas)

-   Initialisation
    -   \\(P(0) = \epsilon^{-1} I\\), where \\(\epsilon \approx 10^{⁻3}\\)
    -   Learning rate : \\(\eta(t) \approx 10^{-3}\\)
    -   Artificial process noise: \\(q(t) = \max(q\_{0} e^{-t \div \tau q}, q\_{min})\\)

-   Multistream Kalman filtering
    -   _Goal:_ combine updates to avoid oscillations caused by individual updates
