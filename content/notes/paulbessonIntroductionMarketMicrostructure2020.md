+++
title = "Introduction to Market Microstructure - Institut Louis Bachelier"
author = ["Victor Vialard"]
date = 2021-03-23
lastmod = 2021-08-19
draft = false
+++

tags
: [Financial Market Microstructure]({{< relref "20210329-financial_market_microstructure.md" >}})


## Introduction : elementary concepts in Market Microstructure {#introduction-elementary-concepts-in-market-microstructure}


### Elementary concepts {#elementary-concepts}

-   The five types of investors
    1.  Institutional investors
    2.  Banks &amp; trading firms
    3.  Sovereign investors
    4.  Corporate investors
    5.  Retail investors (small fraction)

-   Market participants
    1.  Execution brokers
    2.  Market makers (or HFT)

-   Exchanges
    -   Multilateral platform that brings together buyers and sellers to reduce their search cost
    -   Different types
        1.  Primary (or regulated) markets
        2.  MTFs (Multilateral Trading Facilities)
            -   Lit &amp; Dark


### Order-books {#order-books}

-   Two types of orders
    1.  _Passive orders_ (_good-to-cancel_)
        -   Uncertain timing
        -   Liquidity providers on the market
    2.  _Aggressive orders_, or IOC (_Immediate-Or-Cancel order_)

-   Important notions
    -   _Bid-Ask-Spread_
        -   Measure of liquidity price
    -   _Mid-price_
    -   _Tick-size_

-   Different kinds of order books
    -   _Consolidated_ vs. _venue specific_
    -   _Lit_ (public) vs. _Dark_ order-books (prevents information leakage)


## European markets fragmentation and liquidity {#european-markets-fragmentation-and-liquidity}


### Fragmentation &amp; Liquidity over the past five years {#fragmentation-and-liquidity-over-the-past-five-years}

-   MiFID1 (2007)
    -   Alternative trading destinations to compete with primary markets
    -   100% → 70% on primary markets
    -   Price war between exchanges

-   Market fragmentation in Europe
    -   Primary: 66%
    -   Chi-X: 12%
    -   Dark: 6%
    -   BATS: 5%
    -   Turquoise: 4%

-   Dark Pools
    -   No pre-trade visibility so market participants can execute large orders
    -   Transaction prices are imported from lit markets (generally mid-price)
    -   Seriously lessened in 2018 after MiFID2, for they could divert away liquidity


### Turnover, Volume &amp; Spreads over the past 10 years {#turnover-volume-and-spreads-over-the-past-10-years}

-   Definitions
    1.  _Turnover_: turnover exchanged during a period of time
        -   Plunged after the 2008 crisis, whereas the volume rose (reallocation of assets)
        -   Linked to stocks' prices
    2.  _Volume_: number of shares exchanged (measure of liquidity), regardless of price level
    3.  _Spreads_
        -   Small capitalisations have bigger spreads
        -   Correlation between volatility and spread
    4.  _Closing auctions volume_
        -   Increase from 10% to 20% due to the rise of ETFs and Passive-Funds (safer for ETFs managers)

\## Turnover, Spreads, Trade Sizes &amp; Market caps

-   Yearly turnover ~= Market Cap
-   Decrease in bid-ask spread =&gt; increase in trade size &amp; number of trades

\## Main types of trading &amp; algorithms

-   Bilateral trading
    -   Existed before modern exchanges
    -   Still the primary form of trading


## Multilateral trading {#multilateral-trading}

-   Exchanges (and venue) allow all orders to aggregate to create a price
-   Different types
    -   Continuous trading
        1.  Trading (market-making) algorithms

            | Algo type                                    | Inputs           |
            |----------------------------------------------|------------------|
            | VWAP/TWAP                                    | Duration         |
            | Volume (POV)                                 | Participation    |
            | Implementation shortfall (liquidity seeking) | Venues selection |

        2.  Order-book
    -   Auction trading
    -   Dark trading


### TCA (Trading Cost Analysis) {#tca--trading-cost-analysis}

-   Market impact = difference between average price &amp; execution benchmark (i.e. cost of liquidity)
    -   Arrival price: prevailing price once the trade arrives at the broker
    -   Enforce best execution prices across brokers
-   Market impact
    -   Used before a trade to estimate market impact
    -   Buy order: difference weighted execution price &amp; arrival price
    -   Inputs: bid-ask spread, trading duration, participation &amp; intra-day volatility


## Key orderbook properties {#key-orderbook-properties}


### How bid-ask spread, turnover, volatility, available volume &amp; volatility relate together {#how-bid-ask-spread-turnover-volatility-available-volume-and-volatility-relate-together}

-   Data analysis
    -   Over-time analysis: impact of time ignoring the differences across stocks between the variables
    -   Cross-sectional analysis: differences between stocks, ignoring the differences over time

| Turnover &amp; Volume | Bid-ask spread                                                  | Volatility                                                                                                              | Available size                                                     |
|-----------------------|-----------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------|
| Nb of trades          | Correlated, especially over time                                |                                                                                                                         |                                                                    |
| Average trade size    | No relationship over time, but relationship over stocks         |                                                                                                                         |                                                                    |
| Bid-ask spread        | Negative relationship                                           |                                                                                                                         |                                                                    |
| Volatility            | Overtime: strong relationship, cross-sectional: no relationship | Reason: Bid-ask spread = elementary gain of market maker, correlated (more volatility, or risk should yield more gains) |                                                                    |
| First limit           | No relationship (time), small relationship (cross)              | Negative relationship                                                                                                   | Negative relationship (market makers want to constrain their risk) |


## Market fragmentation and competition across venues {#market-fragmentation-and-competition-across-venues}

-   Fragmentation is the inverse of primary market share

-   Relations
    -   Positive relationship between primary market share &amp; relative number of trades
    -   No relationship between trade sizes &amp; primary market share
    -   Positive relationship between primary market share &amp; relative first limit sizes
    -   Decreasing relationship between primary market share &amp; bid-ask spread (as one would expect)


## Key forecasts based on the order-book {#key-forecasts-based-on-the-order-book}


### Which data for which forecasting horizon {#which-data-for-which-forecasting-horizon}

-   Two levels
    -   Level1 data: limit of order-book at each trade time
    -   Level2 data: order-book at each update (trade, cancelation, arrival on existing limit, arrival at a new limit price)
        -   Trades only represent 5% of events
-   3 forcecasts horizons
    -   Last update -&gt; next trade (next trade size)
    -   Prior trade -&gt; next trade (next trade orderbook)
    -   Prior trade -&gt; 30 secs (price reversion prediction i.e. future consolidated price)


### Anticipating the next trade side {#anticipating-the-next-trade-side}

-   Popular belief _"The price rises when there are more buyers then selles"_
-   The _order-book imbalance_ (difference between bid/ask volumes can be used to measure
    -   Strong positive correlation between order-book imbalance &amp; next trade side
    -   Not always relates in trading oportunities because of trading costs


### Order-book reaction after an aggressive buy {#order-book-reaction-after-an-aggressive-buy}

-   Possibilities after an aggressive buy
    -   Sellers
        1.  Perform an aggressive buy
        2.  Increase the bid by 1 tick
        3.  Decrease buy 1 tick (less probable)
    -   Buyers
        1.  Increase ask by 1 tick
        2.  Decrease ask by 1 tick (less probable)
    -   One would excpect higher buy &amp; sell limits
-   =&gt; Statistics on order 1 data yields important statistics


### Future price profile after an aggressive trade on a given venue {#future-price-profile-after-an-aggressive-trade-on-a-given-venue}

-   Different time frame: 30 secs
-   Price reversion analysis
    -   Alternativelly used to best decide the best trading venue for the next order
    -   Compute the relative _toxicity_
-   Profiles
    -   Future price profile after an aggressive buy : increase of 1 bips
