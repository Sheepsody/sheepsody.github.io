+++
title = "Kalman Filter"
author = ["Victor Vialard"]
date = 2022-03-06
lastmod = 2022-03-20
draft = false
+++

-   **Kalman filtering**, or **linear quadratic estimation (LQE)**
    -   Use a time-series of measurements to produce estimates of unknown variables
    -   Estimates the _joint probability distribution_ over the variables for each time-frame

-   Assumptions
    -   Errors have a zero-mean normal distribution


## Underlying model <span class="tag"><span class="ATTACH">ATTACH</span></span> {#underlying-model}

-   Underlying dynamical model
    -   Modelled on a markov chain built on linear operators, perturbed by errors that may include Gaussian noise
    -   \\(\mathbf{x}\_k = \mathbf{F}\_k \mathbf{x}\_{k-1} + \mathbf{B}\_k \mathbf{u}\_k + \mathbf{w}\_k\\)
    -   \\(\mathbf{z}\_k = \mathbf{H}\_k \mathbf{x}\_k + \mathbf{v}\_k\\)

<_20220306_142328screenshot.png>


## Algorithm <span class="tag"><span class="ATTACH">ATTACH</span></span> {#algorithm}

-   **Recursive estimator**
    -   Only the estimated state from the previous step and the current measurement are needed
        -   \\(\hat{\mathbf{x}}\_{k\mid k}\\), the a posteriori state estimate at time k given observations up to and including at time k;
        -   \\(\mathbf{P}\_{k\mid k}\\), the a posteriori estimate covariance matrix (a measure of the estimated accuracy of the state estimate).

<_20220306_144301screenshot.png>

-   Two steps
    1.  **Predict**
        -   Predicted _a-priori_ state estimation : \\(\hat{\mathbf{x}}\_{k\mid k-1} = \mathbf{F}\_k\hat{\mathbf{x}}\_{k-1\mid k-1} + \mathbf{B}\_k \mathbf{u}\_{k}\\)
        -   Predicted _a-priori_ covariance estimate : \\(\mathbf{P}\_{k\mid k-1} = \mathbf{F}\_k \mathbf{P}\_{k-1 \mid k-1} \mathbf{F}\_k^\textsf{T} + \mathbf{Q}\_k\\)
    2.  **Update**
        -   Innovation : \\(\tilde{\mathbf{y}}\_k = \mathbf{z}\_k - \mathbf{H}\_k\hat{\mathbf{x}}\_{k\mid k-1}\\)
        -   Innovation covariance : \\(\mathbf{S}\_k = \mathbf{H}\_k \mathbf{P}\_{k\mid k-1} \mathbf{H}\_k^\textsf{T} + \mathbf{R}\_k\\)
        -   Optimal Kalman Gain : \\(\mathbf{K}\_k = \mathbf{P}\_{k\mid k-1}\mathbf{H}\_k^\textsf{T} \mathbf{S}\_k^{-1}\\)
        -   Update (a posteriori) state estimate : \\(\hat{\mathbf{x}}\_{k\mid k} = \hat{\mathbf{x}}\_{k\mid k-1} + \mathbf{K}\_k\tilde{\mathbf{y}}\_k\\)
        -   Update (a posteriori) covariance estimate : \\(\mathbf{P}\_{k|k} = \left(\mathbf{I} - \mathbf{K}\_k \mathbf{H}\_k\right) \mathbf{P}\_{k|k-1}\\)
        -   Measurement post-fit residuals : \\(\tilde{\mathbf{y}}\_{k\mid k} = \mathbf{z}\_k - \mathbf{H}\_k\hat{\mathbf{x}}\_{k\mid k}\\)


## Extended Kalman Filter (EKF) {#extended-kalman-filter--ekf}

-   _Non-linear_ version of the Kalman filter
    -   Linearises an about-estimate
    -   Model equations
        -   \\(\boldsymbol{x}\_{k} = f(\boldsymbol{x}\_{k-1}, \boldsymbol{u}\_{k}) + \boldsymbol{w}\_{k}\\)
        -   \\(\boldsymbol{z}\_{k} = h(\boldsymbol{x}\_{k}) + \boldsymbol{v}\_{k}\\)
    -   Same algorithm, except that
        -   \\({{\boldsymbol{F}\_{k}}} = \left . \frac{\partial f}{\partial \boldsymbol{x} } \right \vert \_{\hat{\boldsymbol{x}}\_{k-1|k-1},\boldsymbol{u}\_{k}}\\)
        -   \\({{\boldsymbol{H}\_{k}}} = \left . \frac{\partial h}{\partial \boldsymbol{x} } \right \vert \_{\hat{\boldsymbol{x}}\_{k|k-1}}\\)


## Links to this note {#links-to-this-note}

-   [Multistream Extended Kalman Filtering (MS-EKF)]({{< relref "20220303-multistream_extended_kalman_filtering_ms_ekf.md" >}})
