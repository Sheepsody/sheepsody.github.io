+++
title = "Introduction to Quantum Computing And Quantum Hardware"
author = ["Victor Vialard"]
date = 2021-05-05
lastmod = 2021-07-24
draft = false
+++

tags
: [Quantum Computing]({{<relref "20210405-quantum_computing.md#" >}})


source
: [Qiskit's Introduction to Quantum Computing and Quantum Hardware](https://qiskit.org/learn/intro-qc-qh/)


### Quantum States and Qubits {#quantum-states-and-qubits}


#### From Bits to Qubits {#from-bits-to-qubits}

Classical computers work with either 0s and 1s, but quantum computer work with states that can be _superpositions_, i.e. superpositions of 0s and 1s. This allows us to do multiple computations on many states at he same time. That allows us to have exponential speed-up on some algorithms.

However, once we measure a superposition, the superposition state collapses to one of its states, but we can use _interference effects_.


#### Dirac Notation {#dirac-notation}

We use this notation to describe quantum states. Let \\(a, b \in \mathbb{C}\\), then we have the _ket_ \\(|a> = (a\_1, a\_2)\\) and the _bra_ \\(<b| = (b\_{1}^{\star}, b\_{2}^{\star})\\), and we have the _braket_ \\(<a | b> = (a\_{1}b\_{1}^{\star}, a\_{2}b\_{2}^{\star})\\) and the _ketbra_ \\(|a><b| = (a\_{i}b\_{j}^{\star})\_{i,j \le 2}\\).

We define the state \\(|0> = \binom{1}{0}\\), and \\(<1| = \binom{0}{1}\\), the two of which are _orthogonal_.

All the quantum states are _normalized_, i.e. \\(<\Psi | \Psi> = 1\\). We normalize quantum states, because it helps compute the probabilities. It is however a convention.


#### Measurements {#measurements}

Measurements are usually done along orthogonal bases.

During a measure on \\(\\{ <1|, <0|\\}\\), the state will collide to either \\(<1|\\) and \\(<0|\\), as those are the eigenvectors of \\(\sigma\_{z}\\). We call this the _z-measure_.

We can define an infinite number of bases.

We also have \\(\\{ <+| =  \frac{1}{\sqrt{2}} ( <0| + <1|), <-| = \frac{1}{\sqrt{2}} ( <0| - <1|) \\}\\), and \\(\\{ <\sigma\_{1+i}| =  \frac{1}{\sqrt{2}} ( <0| + i <1|), <\sigma\_{1-i}| = \frac{1}{\sqrt{2}} ( <0| - i<1|) \\}\\), corresponding to \\(\sigma\_{-}\\) and \\(\sigma\_{+}\\).

We have the _Born rule_, that states that when a state \\(<\Psi|\\) is measure on an orthogonal basis, \\(P(x) = | < x | \Psi > |^{2}\\), and \\(\sum P(x\_{i}) = 1\\).


#### Bloch sphere {#bloch-sphere}

We can write any normalized (pure) state as \\(<\Psi| = cos(\theta / 2) <0| + \exp^{i \phi} sin(\theta / 2) <1|\\). In this situation, \\(\phi\\) describes the phase and \\(\theta\\) the probability to measure \\(<0|\\) and \\(<1|\\).

The coordinates of a block are given by the _Bloch vector_ \\(r = ( sin \theta cos \theta, sin \theta \sin \phi, cos \theta )^{T}\\).

**Careful :** on the Bloch sphere, angles are two times bigger compare to the Hilbert space. Thus to orthogonal elements have an angle of 180°.

{{< figure src="/ox-hugo/bloch.jpeg" caption="Figure 1: The Bloch Sphere" >}}


### Quantum circuits {#quantum-circuits}

The **circuit model** is a sequence of blocks that we call **gates**. As quantum theory is unitary, quantum gates are represented as **unitary matrices**, i.e. \\(U⁺U=1\\). We can represent it as the _Dirac notation_ (matrix) or using the braket method.

The **Pauli matrices** are:

-   \\(\sigma\_{X}\\)  (\\(|0><1| + |1><0|\\)) that we can think of it as a rotation along the x-axis, or _bit-shift_;
-   \\(\sigma\_{z}\\)  (\\(|0><0| - |1><1|\\)), or _phase-flip_;
-   \\(\sigma\_{Y}\\)  (\\(i \sigma\_{X} \sigma\_{Z}\\)), it acts simultaneously like a bit and a phase flip;

One of the most important is the **Hadamard gate** : \\(\frac{1}{\sqrt{2}} \begin{pmatrix} 1 & 1 \\ 1 & -1 \end{pmatrix}\\). We use is often as it performs a **superposition**, used to switch between the X and the A basis.
Similarly, we have the **S gate**, \\(\begin{pmatrix} 1 & 0 \\ 0 & i \end{pmatrix}\\), which applies a 90° rotation to the phase \\(\varphi\\), and is used to perform a rotation from Z to Y.


#### Multipartite quantum states {#multipartite-quantum-states}

For that, we use **tensor products** between the states. That way \\(|a> \otimes |b> = \begin{pmatrix} a\_{1}b\_{1}  a\_{1}b\_{2}  a\_{2}b\_{1}  a\_{2}b\_{2} \end{pmatrix}\\). We can dot it in any number of qubits, with \\(dim = 2^{n\_{qubits}}\\). States in this form are called **un-correlated**, but some multi-partite states cannot be written in this form, which we call **correlated**. Sometimes, they can even be **entangled**, for example \\(|\Psi>\_{AB} = \frac{1}{\sqrt{2}} (|00>\_{AB} + |11>\_{AB})\\), which we can not write in the previous form.


#### Q-sphere {#q-sphere}

The Bloch sphere can only represent the state of one qubit, so that is why we want to introduce the **q-sphere**. For one qubit, the _north pole_ represents the state \\(|0>\\) and the _south pole_ the state \\(|1>\\). The size of the blobs is proportional to the probability of measuring a state. The colour than represents the relative phase compared to the state \\(|0>\\).

For n-qubits, there are \\(2^{n}\\) possible states, so we plot those basis states as equally distributed points on the sphere \\(0^{\otimes n}\\) (_north pole_) and \\(1^{\otimes n}\\) (_south pole_), and all other states are aligned on parallels, so that the number of ones is increasing from north to south.

{{< figure src="/ox-hugo/qsphere.png" caption="Figure 2: The Q Sphere" >}}


#### Two-qubits gates {#two-qubits-gates}

We can thus introduce two-qubits gates :

-   XOR: this gate would be _irreversible_, which is impossible since quantum theory is unitary
-   CNOT: which transforms \\(|y>\\) into \\(| x \oplus y >\\). It is called CNOT for _controlled-not_.

We can show that quantum circuits can perform all functions, even though they need to be reversible.


### Entanglement {#entanglement}

If a pure state \\(|\Psi>\_{AB}\\) on systems \\(A,B\\) cannot be written as \\(|\varphi>\_{1} \otimes |\psi>\_{B}\\). There are four so-called **Bell-states** that are maximally entangled and build an orthogonal basis.

-   \\(| \Psi^{00} > = \frac{1}{\sqrt{2}} (|00> + |11>)\\)
-   \\(| \Psi^{01} > = \frac{1}{\sqrt{2}} (|01> + |10>)\\)
-   \\(| \Psi^{00} > = \frac{1}{\sqrt{2}} (|00> - |11>)\\)
-   \\(| \Psi^{01} > = \frac{1}{\sqrt{2}} (|01> - |10>)\\)

In general, we can write that \\(| \Psi^{ij} > = ( 1 \oplus \sigma\_{X}^{j} \sigma\_{Z}^{i}) | \Psi^{00} >\\). So these states can be obtained using a single Hadamard gate and a single CNOT gate, with \\((H\_{A} \oplus 1\_{B}) |ij>\_{AB}\\).

If we go in the opposite direction, then this is called a **Bell-measurement**, because from \\(| \Psi^{ij} >\\) we can retrieve i and j.


### Quantum teleportation {#quantum-teleportation}

Goal: Alice wants to send Bob her unknown state \\(| \phi >\_{S} = \alpha |0> + \beta |1>\\), but she can only send classical bits. However, they both share the maximally entangled state \\(| \Psi^{00} >\\).

We can show that \\(| \phi >\_{S} \oplus | \Psi^{00} >\_{\_{AB}} = | \Psi^{00}>\_{\_{SA}} \oplus | \psi >\_{\_{B}} + | \Psi^{01} >\_{\_{SA}} \oplus \sigma\_{X} | \psi >\_{\_{B}} +  | \Psi^{10} >\_{\_{SA}} \oplus \sigma\_{Z} | \psi >\_{\_{B}}  + | \Psi^{11} >\_{\_{SA}} \oplus \sigma\_{X}\sigma\_{Z} | \psi >\_{\_{B}}\\).

{{< figure src="/ox-hugo/teleportation.png" caption="Figure 3: Quantum teleportation circuit" >}}

The protocol is thus depicted in the figure above. For quantum teleportation, we thus need a _Bell state_ to be created for the information to be transmitted. The _Bell test experiments_ have suggested they remain correlated even when measurements are performed independently.

However, Alice's state has collapse, so she doesn't have the initial state anymore. This is called the **no-cloning** theorem, as Alice cannot copy her state.

The quantum teleportation was performed by scientists in China in a distance of 1400 kms.


## Quantum Algorithms {#quantum-algorithms}


### Deutsch-Jorza algorithm {#deutsch-jorza-algorithm}


#### Oracles {#oracles}

-   _Oracle_
    -   Assume access to an oracle (physical device we cannot look inside), to which we can pass queries
    -   _goal:_ determine properties of this oracle using the minimal of queries
    -   The oracle \\(f : \\{0, 1\\}^{N} \rightarrow \\{0, 1\\}^{N}\\), needs to be reversible

-   _Bit-Oracle_
    -   Unitary gate \\(O\_{f} | x > |y > = |x> |y \oplus f(x) >\\)

-   _Phase-Oracle_
    -   We construct \\(U\_{f}\\) with \\(y = 1/\sqrt{2} (|0> - |1>)\\), we get \\(O\_{f} |x> |y> = (-1)^{f(x)} |x> |y>\\) (indep. of y)


#### Hadamard Gate on n-qubits {#hadamard-gate-on-n-qubits}

-   _Hadamard Gate_ on n qubits
    -   Recall that \\(H |0> = |+>\\) and \\(H |1> = |->\\)
    -   \\(H^{\oplus n} |x> = \frac{1}{\sqrt{2^{n}}} \sum\_{k \in \\{0, 1\\}^{n}} (-1)^{k \cdot x} |k>\\)


#### The Algorithm itself ! {#the-algorithm-itself}


### Grover's algorithm {#grover-s-algorithm}

-   /Grover's algorithm
    -   [The rest of the lectures are on paper]

-   _Amplitude Amplification_
    -   General idea behind Grover's algorithm
    -   [Steps of the algorithms](https://qiskit.org/textbook/ch-algorithms/grover.html)
        1.  _Create superposition state_
            -   \\(|s> := H^{\otimes n} |0>^{\otimes n}\\)
            -   Average amplitude is \\(1 / \sqrt{n}\\)
        2.  _Apply the oracle_
            -   \\(U\_{f} |s> = (1 - 2 | \omega >< \omega |) |s>\\)
            -   Flips the amplitude at \\(\omega\\)
        3.  _Apply unitary V, the diffuser_
            -   \\(V \cdot U\_{f} |s> = (2 |s><s| -1) U\_{f} |s>\\)
            -   Reflects all amplitudes about the average amplitude
        4.  Repeat 3 and 4, so that the amplitude of \\(\omega\\) increases


### Shor's Algorithm {#shor-s-algorithm}


#### Preliminaries {#preliminaries}

-   Preliminaries for _Shor's Algorithm_
    -   Problem: Period function -> Find it's period
    -   Classically: \\(O(e^{C \cdot n^{1/3} \cdot (\log n)^{2/3}})\\) (where n is the number of bits to describe the period)
    -   Quantum: \\(O(n^{2} \cdot \log n \cdot \log \log n)\\)
        -   Quantum Fourier Transform
        -   Modular exponentiation


#### Quantum Fourier Transform {#quantum-fourier-transform}

-   QFT is a change from the _computational basis_ to the _Fourier transform_ (\\(| \tilde{x} >}\\))
    -   _Ex:_ 1-qubit \\(\\{|0>, |1>\\} \rightarrow \\{|+>, |->\\}\\) (which is just the application of a Hadamard gate)

{{< figure src="https://qiskit.org/textbook/ch-algorithms/images/zbasis-counting.gif" caption="Figure 4: Computational Basis" >}}

{{< figure src="https://qiskit.org/textbook/ch-algorithms/images/fourierbasis-counting.gif" caption="Figure 5: Fourier Basis" >}}

-   Building a Quantum Circuit for QFT
    1.  Demonstrate QFT rigorously
    2.  Find the circuit to demonstrate it

-   **Quantum Fourier Transform**
    -   \\(| \tilde{x} > = \frac{1}{\sqrt{N}} \sum\_{y=0}^{N-1} e^{\frac{2 \pi i x y}{2}} |y>\\), with \\(N=2^{n}\\)
    -   Demonstration -> write \\(y\\) as \\(|y> = |y\_{1} y\_{2} ... y\_{n}>\\)!
    -   \\(| \tilde{x} > = \frac{1}{\sqrt{N}} ( |0> + e^{\frac{2 \pi i x}{2^{1}}} |1> ) \otimes ... \otimes ( |0> + e^{\frac{2 \pi i x}{2^{n}}} |1> )\\)

-   **QFT Circuit**
    -   Each qubit went from \\(|x\_{k}>\\) to \\(|0> + e^{\frac{2 \pi i x}{2^{k}}} |1>\\)
    -   _Unitary Rotation Matrix:_ \\(UROT\_{k} |x\_{j}> = e^{\frac{2 \pi i}{2^{k}} |x\_{j}>} |x\_{j}>\\)
        -   Applies a specific phase
    -   _Warning:_ Reverse order if not swapping after applying the rotations

<!--listend-->

```python
import numpy as np
from numpy import pi

# importing Qiskit
from qiskit import QuantumCircuit


def qft_rotations(circuit, n):
    """Performs qft on the first n qubits in circuit (without swaps)"""
    if n == 0:
        return circuit
    n -= 1
    circuit.h(n)
    for qubit in range(n):
        circuit.cp(pi / 2 ** (n - qubit), qubit, n)
    # At the end of our function, we call the same function again on
    # the next qubits (we reduced n by one earlier in the function)
    qft_rotations(circuit, n)


def swap_registers(circuit, n):
    for qubit in range(n // 2):
        circuit.swap(qubit, n - qubit - 1)
    return circuit


def qft(circuit, n):
    """QFT on the first n qubits in circuit"""
    qft_rotations(circuit, n)
    swap_registers(circuit, n)
    return circuit


# Let's see how it looks:
qc = QuantumCircuit(3)
qft(qc, 3)
print(qc)
```

```text
                                                ┌───┐
q_0: ──────────■──────────────────────────■─────┤ H ├─X─
               │                ┌───┐┌────┴────┐└───┘ │
q_1: ──────────┼──────────■─────┤ H ├┤ P(pi/2) ├──────┼─
     ┌───┐┌────┴────┐┌────┴────┐└───┘└─────────┘      │
q_2: ┤ H ├┤ P(pi/4) ├┤ P(pi/2) ├──────────────────────X─
     └───┘└─────────┘└─────────┘
```

-   Books to use
    -   Quantum Computation and Quantum Information (Mike&Nike)
    -   Quantum Computer Science, Merman (less overwhelming)
    -   Quantum Computing for Computer Scientists
    -   Picturing Quantum Procuresses


#### Quantum Phase Estimation {#quantum-phase-estimation}

-   Shor's algorithm is really just a QPE in disguise...
    -   Encode information about the phase in a QFT-like state
    -   Use \\(QFT^{\dagger}\\) to convert from phases to amplitudes

-   _Pb:_ A unitary matrix has unitary values \\(e^{i \theta}\\), eigenvectors in the form of an orthogonal basis
    -   \\(U | \Phi > = e^{i \theta\_{Phi}} | \Phi >\\)
    -   Outcomes still measuring \\(|0>\\) and \\(|1>\\) with probability \\(1/2\\)
    -   Hamiltonian evolution is unitary (implications for q-simulations)

-   QPE Trick (1 qubit)
    -   (Circuit)
    -   End up with
        -   \\(|0> \rightarrow | \frac{1}{2} (1 + e^{i \Theta \Phi}) |^{2}\\)
        -   \\(|1> \rightarrow | \frac{1}{2} (1 - e^{i \Theta \Phi}) |^{2}\\)
    -   Similar to QFT (without the \\(2 \pi / \sqrt(N)\\) factor)
    -   => Inverse QFT: end up with \\(|2^{n} \Theta\_{\Phi}>\\)
    -   Less qubits means less precision

{{< figure src="/ox-hugo/qpe.png" caption="Figure 6: Quantum Phase Estimation (n-qubits)" >}}

-   Subtleties
    -   \\(2 \pi i \times \theta\\) factor
    -   \\(QFT^{\dagger}\\) (\\((ABC)^{\dagger} = C^{\dagger} B^{\dagger} A^{\dagger}\\), and apply QFT-inverse)
    -   Quantum Counting


### Shor's algorithm {#shor-s-algorithm}

-   [Shor's Algorithm]({{<relref "20210720-shors_algorithm.md#" >}})


## Quantum Error Correction (QEC) {#quantum-error-correction--qec}

-   Many physical qubits are needed to build a logical qubit
    -   Overhead of error correction


### Quantum Repetition Code {#quantum-repetition-code}

-   Repetition code
    -   Sensible option of _majority voting_
    -   For d repetitions, the probability that the majority gets flip is \\(p = \sum \binom{d}{n} p^{n} (1-p)^{d-n} \sim \left( \frac{p}{1-p} \right)^{|d/2|}\\)

-   But... we cannot measure encoded information in quantum since we would lose superpositions

-   Quantum Repetition Code
    -   One extra qubit for each pair of qubits
    -   Use two CNOTs to control the values of adjacent qubits (_syndrome measurement_), and check if they are different on the z-basis
    -   Errors create _defects_ (error between pairs) that can be used to find minimal pairing

<!--listend-->

```python
from qiskit import QuantumRegister, ClassicalRegister
from qiskit import QuantumCircuit

cq = QuantumRegister(2, "code_qubit")
lq = QuantumRegister(1, "auxiliary_qubit")
sb = ClassicalRegister(1, "syndrome_bit")
qc = QuantumCircuit(cq, lq, sb)
qc.cx(cq[0], lq[0])
qc.cx(cq[1], lq[0])
qc.measure(lq, sb)
print(qc)
```

```text

     code_qubit_0: ──■──────────
                     │
     code_qubit_1: ──┼────■─────
                   ┌─┴─┐┌─┴─┐┌─┐
auxiliary_qubit_0: ┤ X ├┤ X ├┤M├
                   └───┘└───┘└╥┘
   syndrome_bit: 1/═══════════╩═
                              0
```

-   Repetition code comes with a drawback
    -   Cannot decode _phase changes_


### Surface Code {#surface-code}

-   Generalisation of repetition code

-   Two kinds of syndromes
    -   _Plaquettes syndromes:_ check for X-errors
    -   _Vertices syndromes:_ check for Z-error

{{< figure src="/ox-hugo/surface_code.png" caption="Figure 7: QEC - Surface Code" >}}


## Super Conducting Qubits {#super-conducting-qubits}

-


## Investigating Quantum Hardware Using Microwave Pulses {#investigating-quantum-hardware-using-microwave-pulses}
