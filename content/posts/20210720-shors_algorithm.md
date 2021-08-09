+++
title = "Shor's Algorithm"
author = ["Victor Vialard"]
date = 2021-07-20
lastmod = 2021-07-21
draft = false
+++

-   _Goal:_ factor a number \\(N = p \times q\\) where p and q are primes
    -   Classically -> \\(O \left[ exp( x \cdot n^{1/3} (\log n)^{1/3} ) \right]\\)
    -   Shor's algorithm -> \\(O( n^{3} )\\)

-   Why is it important?
    -   Cryptographic operations are based on integer factoring...


## The Algorithm {#the-algorithm}

source
: <https://riliu.math.ncsu.edu/437/notes3se4.html>


### Classical Part {#classical-part}

-   _Protocol for Shor's algorithm_
    1.  Pick a number a that is _co-prime_ with n (no common factors)
    2.  Find order r of the function \\(a^{r} (mod N)\\) (i.e. the _period_ of this function, i.e. smallest r such that \\(a^{r} \equiv 1 (mod N)\\))
    3.  If r is _odd_ : pick a new a and start over
    4.  If r is _even_ : \\(x \equiv a^{r/2} (mod N)\\)
        -   And if \\(x+1 \not\equiv 0 (mod N)\\) -> \\(\\{p, q\\} \in \left\\{ gcd(x+1, N), gcd(x-1, N) \right\\}\\)

-   This procedure is effective since half of the choices for a will work!
    -   But the order is hard to find...


### Discrete Fourier Transform {#discrete-fourier-transform}

-   _Magical trick_: turning a problem of factoring into a problem of <span class="underline">period-finding</span>
    -   Use the discrete Fourier transform!

-   \\(y\_{k} = \frac{1}{\sqrt{N}} \sum\_{j=0}^{n-1} x\_{j} \omega^{jk}\\), where \\(\omega = e^{2 \pi i / N}\\)
    -   This sum is maximum whenever \\(\frac{r k}{N}\\) is close to an integer

-   There should be several \\(k\\) satisfying this property...
    -   Use _continued fractions_, i.e \\(z = a\_{0} + \frac{1}{a\_{1} + \frac{1}{a\_{2} + ...}}\\)
    -   _Theorem:_ let z be a real number and \\(\frac{s}{r}\\) a rational number such that \\(\left| \frac{s}{r} -z \right| < \frac{1}{2r^{2}}\\), then \\(\frac{s}{r}\\) is a convergent of the continued fraction for z


### QFT (Quantum Fourier Transform) {#qft--quantum-fourier-transform}

-   Classically, computing the Fourier transform takes \\(O( n 2^{n})\\)
    -   QFT -> \\(O(n^{2})\\)

-   QFT (recall)
    -   \\(|j> \mapsto \frac {1}{\sqrt N} \sum \_{k=0}^{N-1}e^{2\pi i j k/N} |k>\\)


### The circuit... {#the-circuit-dot-dot-dot}

{{< figure src="./images/quantum/shors.jpeg" caption="Figure 1: Shor's Algorithm - Circuit" >}}

-   Caveats of this circuit
    -   registers if \\(|x>\\) has n qubits -> \\(2 \times n\\) qubits for input register
    -   with probability \\(1/2\\), r will be even


## Experimental Proof {#experimental-proof}

source
: ([Vandersypen et al. 2001](#orga7647de))


## Links to this note {#links-to-this-note}

-   [Introduction to Quantum Computing And Quantum Hardware]({{<relref "20210505-introduction_to_quantum_computing_and_quantum_hardware.md#" >}})

> [Quantum Computing]({{<relref "20210405-quantum_computing.md#" >}})


## Bibliography {#bibliography}

<a id="orga7647de"></a>Vandersypen, Lieven M. K., Matthias Steffen, Gregory Breyta, Costantino S. Yannoni, Mark H. Sherwood, and Isaac L. Chuang. 2001. “Experimental Realization of Shor’s Quantum Factoring Algorithm Using Nuclear Magnetic Resonance.” _Nature_ 414 (6866):883–87. <https://doi.org/10.1038/414883a>.
