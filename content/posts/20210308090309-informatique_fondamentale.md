+++
title = "Informatique Fondamentale"
author = ["Victor Vialard"]
date = 2021-03-08
lastmod = 2021-03-30
draft = false
+++

tags
: [Computer Science]({{<relref "20210124000000-computer_science.md#" >}})

<!--listend-->

-   Qu'est ce que la discipline _informatique_ ?
    -   technologie : outil
    -   science : résolution de problèmes
    -   mathématiques : donner une réponse (branche _constructive_)
        -   Nécessite d'une formalisation (axiomes & déductions)


## Limites de l'informatique {#limites-de-l-informatique}


### Notion de problème {#notion-de-problème}

-   Problème
    -   _"Question à résoudre qui prête à discussion"_ (Larousse)
    -   Trouver une réponse (problème de décision et valeur booléenne, ou calcul et valeur non booléenne)
    -   Transformation d'un problème de calcul en un problème de décision

-   Comment décrire un langage ?
    -   Décomposition structurelle (jeton ou _tokens_)
    -   Analyse syntaxique : _arbre de syntaxe_, ou **AST _(Abstract Syntax Tree)_**

-   Grammaire BNF (Backus-Naur Form) pour les arbres de syntaxe
    -   Approche descriptive : décrire toutes les expressions bien formées du langage
    -   Deux types de symboles
        -   symboles terminaux : représentent eux mêmes
        -   symboles non-terminaux : génèrent des éléments composés
    -   [Grammaire BNF de Java](https://cs.au.dk/~amoeller/RegAut/JavaBNF.html)

-   Règles de production des expressions arithmétiques
    1.  Chiffres et lettres
        -   <digit>, <alpha>
        -   <alphanum> ::= <alpha> | <digit>
        -   Dérivation : suite de mots finis
    2.  Nombres & identificateurs
        -   <number> ::= <digit> | <digit> <number>
        -   <ident> ::= <alpha><alphanum>\*
    3.  Expressions arithmétiques
        -   <bop> ::= "+" | "-" | "\*" | "/"
        -   <expr> ::= <number> | <ident> | <expr> <bop> <expr> | "(" <expr> ")"
    4.  Affectation
        -   <assign> ::= <ident> "=" <expr> ";"

-   Formalisation de logique propositionnelle
    1.  Tokens
        -   <atom>   ::= <ident>
        -   <bop>    ::= "∧" | "∨" | "⇒"
        -   <uop>    ::= "¬"
        -   <prop>   ::= <atom> | <uop> <prop> | <prop> <bop> <prop> | "(" <prop> ")"
    2.  Connecteurs
        -   ∧ : conjonction
        -   ∨ : disjonction
        -   ⇒ : implication
        -   ¬ : négation

-   Prédicats : classement par ordre
    1.  Proposition
    2.  Ordre 1 + termes + quantification sur les variables
    3.  Ordre 2 + quantification sur les fonctions/proposition

-   Qu'est ce qu'un problème en logique propositionnelle ?
    -   La véracité dépend de l'interprétation
    -   Ce qui nous intéresse est la notion de preuve, pas la notion de vrai/faux

-   Importance d’énoncer des hypothèses
    -   Grammaire des séquents
        -   <listprop> ::= "" | <prop> | <prop> "," <listprop>
        -   <sequent>  ::= <listprop> "⊦" <prop>
    -   _Ex:_ a,b ⊦ a∧c

-   Déduction naturelle
    -   <span class="underline">arbre de preuve</span> : arbre dont les nœuds sont étiquetés par des règles et les branches, par des séquents
    -   <span class="underline">preuve</span> : arbre dont toutes les feuilles sont des règles axiomes

-   Problème de David Hilbert (1862-1943)
    -   Conférence sur les 23 problèmes

-   Lien de prouvabilité & véracité
    -   Théorème de correction : si la proposition F est prouvable, elle est vraie dans tous les modèles
    -   Théorème de complétude : si la proposition F est vraie dans tous les modèles, elle est prouvable

-   Décider l'arithmétique : G. Peano (1888)
    -   Syntaxe : 0 (zéro), s (successeur), + (addition) & \* (multiplication)
    -   Axiomes de l'addition, de la multiplication, injectivité du successeur & principe de récurrence


### Notion de résolution effective {#notion-de-résolution-effective}

-   La révolution de la résolution effective
    -   Théorème d'incomplétude de Gödel : certaines propositions vraies, dites incomplètes, ne peuvent être prouvées

-   Arguments diagonaux
    -   Pas de bijection entre \\(\mathbb{N}\\) et \\([0, 1[\\)
    -   Pas de bijection entre \\(A\\) et \\(p(A)\\) (les parties de A)

-   Décidabilité i.e. construire une réponse de manière effective
    -   Classification en fonction de la réponse booléenne \\(P(x)\\) d'un programme \\(M(x)\\)
        1.  Décidable
        2.  Semi-décidable
        3.  Indécidable
    -   Le programme décidable est un _algorithme_

-   Problème de l'indécidabilité de l'arret (\_Halting Problem\_)
    -   _Théorème de Turing:_ déterminer l'arret d'un programe est un problème indécidable


### Notion de représentation {#notion-de-représentation}

-   Un problème de décision revient à démontrer, dans une logique donnée, une appartenance
    -   Attention au Paradoxe de Russsell : la théorie naive des ensembles est incohérente
    -   Codage informatique : \\(P(A) = (codage(a) \in L(P)\\), où \\(L(P)\\) est le language, i.e. un ensemble de symboles codés
    -   Données discrètes et finites

-   Hiérarchie des languages de Chomsky
    -   Type 0: récursivement énumérable (aucune restriction)
    -   Type 1: contexte préservé
    -   Type 2: hors-contexte
    -   Type 3: régulier


## Modèles de calcul {#modèles-de-calcul}

-   Décider, c'est prouver de manière constructive, i.e. reconnaître un langage avec une machine "abstraite"
-   Seulement des langages r.e.


### λ-Calcul (LISP, CAML) {#λ-calcul--lisp-caml}

-   Alonzo Church, 1936
    -   Capturer l'universalité de la notion de calcul
    -   Approche fonctionnelle et mathématique

-   Trois concepts
    1.  _Variables_
    2.  Définition de fonctions (_abstraction_)
    3.  _Application_ d'une fonction à un argument

-   Grammaire
    -   <var> ::= <ident>
    -   <abs> ::= "λ" <var> "." <lamt>
    -   <app> ::= "(" <lamt> <lamt> ")"
    -   <lamt> ::= <var> | <abs> | <app>

-   Abstraction : λx.e
    -   x : argument
    -   e : body
    -   λ : binding operator

-   Calculer en λ-calcul
    -   β-réduction : (λx.t u) → t[u/x]
    -   Confluence (Church-Rosser) : possibilité de prendre divers chemins, mais une seule forme normale après réduction
    -   Et autres conversions de termes...

-   Stratégies d'évaluation
    1.  CBV (Call-By-Value)
        -   Une valeur est une expression qui ne peut pas être réduite d'avantage
        -   (λx.λy.y x) (5 + 2)λx.x+ 1 → (λx.λy.y x) 7λx.x + 1
    2.  CBN (Call-By-Name)
        -   Les fonctions sont appliquées dès que possible
        -   (λx.λy.y x) (5 + 2)λx.x+ 1 → (λy.y(5 + 2))λx.x + 1

-   Calcul λ-typé
    -   <type> ::= <id> | "(" <type> "→" <type> ")"
    -   Γ⊦e:τ (e a pour type dans le τ contexte ⊦)
    -   Existence de règles de typage, que l'on applique sans ambiguïté selon la syntaxe
    -   Correspondance preuve-programme de Curry-Howard
        -   Équivalence entre mathématiques constructives et programmes
    -   Schwichtenberg, 1976 : Les seules fonctions (sur l'encodage entier précédent) exprimables sont les polynômes
        -   Il faut donc étendre le langage
        -   <pair> ::= "〈" <lamt> "," <lamt> "〉"
        -   <proj> ::= "fst(" <lamt> ")" | "snd(" <lamt> ")"


### Machine de Turing {#machine-de-turing}

-   Approche fondée sur le langage, Alan Turing
    -   Approche mécanique de la notion de calcul
    -   Bande(s), tête de lecture et système de contrôle

-   Définition formelle
    -   Transitions possibles
        -   Changer d'état
        -   Imprimer un symbole
        -   Déplacer la tête
    -   MT _"accepte"_ un langage si MT accepte tout mot de L
        -   Si il lui est impossible d'évoluer, la machine de Turing rejette le langage

-   _Ex:_ parité
    -   \\(L = \\{ 0^{n} 1^{n} , n \ge 0 \\}\\)

-   Hiérarchie de Chomsky
    -   Si une machine de Turing accepte un langage, il est au moins récursivement énumérable
    -   Les autres machines sont des restrictions de MT :
        -   LBA : bande de longueur inférieure à l'entrée
        -   Pile : bande utilisée en mode pile uniquement
        -   Etats : déplacement seulement vers la droite, lecture seule
    -   Théorème : il existe des langages non reconnaissable par une machine de Turing

-   Rapport avec les ordinateurs ?
    -   Ordinateur = machine de Turing universelle
        -   Bande = mémoire
        -   Tête de lecture = pointeur d’adresse
        -   Contrôle = programme en

-   Programmation impérative


### Système de réécriture {#système-de-réécriture}

-   Systèmes de réécriture
    -   Théorie des formes normales d'expression (transformation d'objets syntaxiques selon des règles précises)
    -   Théorie des types abstraits algébriques (objet + fonction, & équations de normalisation)

-   Applications
    -   COQ
    -   Langages orientés objets


### Équation diophantienne {#équation-diophantienne}

-   Équations diophantienne
    -   équations arithmétiques sur les rationnels

-   Programmation logique (=équations)
    -   Définition d'applications à partir d'une :
        -   base de faits
        -   base de règles
        -   moteur d'inférence
    -   Intelligence artificielle des années 80
    -   Forme déclarative d'exécution (les enchaînements sont assumés)
    -   Plan des années 80 au Japon


### Équivalences {#équivalences}

-   Un être humain ne peut exprimer d'autres fonctions que celle calculables
    -   Thèse de Church (1936) : toute fonction calculable est exprimable en lambda-calcul
    -   Thèse de Turing (1936) : toute fonction calculable est exprimable en lambda-calcul
    -   Turing (1937) : équivalence entre lambda-calcul et machine de Turing
    -   O'Donnell (1977) : les systèmes de réécriture ont la puissance d'une machine de Turing
    -   Matijasevic (1970) : les équations diophantiennes sont équivalentes aux machines de Turing

| Machine                  | Paradigme          | Langage  | Avantages                      |
|--------------------------|--------------------|----------|--------------------------------|
| machine de Turing        | impératif          | C        | efficace, proche de la machine |
| système de réécriture    | objet              | Java     | "naturel"                      |
| lambda-calcul            | fonctionnel        | Lisp, ML | transparence référentielle     |
| équations diophantiennes | logique/contrainte | Prolog   | spécification                  |


## Complexité {#complexité}


### Non-déterminisme {#non-déterminisme}

-   MTND (Machine de Turing Non Déterministe)
    -   Généralisation abstraite des MT
    -   De multiples MT agissent en parallèle (_simuler_ le parallélisme)

-   Algorithme RAM non déterministe
    -   Machine NRAM, qui introduit 3 nouvelles fonctions
        -   Choix, succès, échec


### Complexité temporelle {#complexité-temporelle}

-   Complexité temporelle
    -   \\(Time(N)\\) : MT de complexité en temps O(T)
    -   \\(NTime(N)\\) : MTND de complexité en temps O(T)
    -   \\(PTime = \cup Time(n^{i})\\)
    -   \\(NPTime = \cup NTime(n^{i})\\)
    -   \\(EXPTime = \cup Time(2^{n^{i}})\\)
    -   PTime correspond aux solutions "réalistes"


### Complexité spéciale {#complexité-spéciale}

-   \\(LOGSpace \subseteq PTime \subseteq NPTime \subseteq (N)PSpace \subseteq EXPTime\\)

-   P = NP?
    -   Problème philosophique clé (remplacer les mathématiciens par des machines)
    -   Compression → Compréhension → Prévision
    -   Prix du _Clay Mathmematics Institute_

-   Problème NP-complet
    -   Représentant de toute la classe NP
    -   Si l'on sait résoudre 1 problème de classe NP, on sait tous les résoudre !

-   Réductibilité en temps polynomial
    -   \\(L <\_{P} L \prime\\) ssi il existe une machine de Turing M dans PTime telle que \\(x \in L \Leftrightarrow  M(x) \in L \prime\\)
    -   LP-Hard : \\(\forall L \prime \in NP, L \prime <\_{P} L\\)
    -   NP-Complet : NP-Hard & NP
