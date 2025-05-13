import type * as types from './types';
import type { ConfigOptions, FetchResponse } from 'api/dist/core'
import Oas from 'oas';
import APICore from 'api/dist/core';
import definition from './openapi.json';

class SDK {
  spec: Oas;
  core: APICore;

  constructor() {
    this.spec = Oas.init(definition);
    this.core = new APICore(this.spec, 'tm-api/unknown (api/6.1.3)');
  }

  /**
   * Optionally configure various options that the SDK allows.
   *
   * @param config Object of supported SDK options and toggles.
   * @param config.timeout Override the default `fetch` request timeout of 30 seconds. This number
   * should be represented in milliseconds.
   */
  config(config: ConfigOptions) {
    this.core.setConfig(config);
  }

  /**
   * If the API you're using requires authentication you can supply the required credentials
   * through this method and the library will magically determine how they should be used
   * within your API request.
   *
   * With the exception of OpenID and MutualTLS, it supports all forms of authentication
   * supported by the OpenAPI specification.
   *
   * @example <caption>HTTP Basic auth</caption>
   * sdk.auth('username', 'password');
   *
   * @example <caption>Bearer tokens (HTTP or OAuth 2)</caption>
   * sdk.auth('myBearerToken');
   *
   * @example <caption>API Keys</caption>
   * sdk.auth('myApiKey');
   *
   * @see {@link https://spec.openapis.org/oas/v3.0.3#fixed-fields-22}
   * @see {@link https://spec.openapis.org/oas/v3.1.0#fixed-fields-22}
   * @param values Your auth credentials for the API; can specify up to two strings or numbers.
   */
  auth(...values: string[] | number[]) {
    this.core.setAuth(...values);
    return this;
  }

  /**
   * If the API you're using offers alternate server URLs, and server variables, you can tell
   * the SDK which one to use with this method. To use it you can supply either one of the
   * server URLs that are contained within the OpenAPI definition (along with any server
   * variables), or you can pass it a fully qualified URL to use (that may or may not exist
   * within the OpenAPI definition).
   *
   * @example <caption>Server URL with server variables</caption>
   * sdk.server('https://{region}.api.example.com/{basePath}', {
   *   name: 'eu',
   *   basePath: 'v14',
   * });
   *
   * @example <caption>Fully qualified server URL</caption>
   * sdk.server('https://eu.api.example.com/v14');
   *
   * @param url Server URL
   * @param variables An object of variables to replace into the server URL.
   */
  server(url: string, variables = {}) {
    this.core.setServer(url, variables);
  }

  /**
   * Get the short term grades, including the 24h percent change for the TM Trader Grade
   *
   * @summary Trader Grades
   * @throws FetchError<400, types.TraderGradesResponse400> 400
   */
  traderGrades(metadata: types.TraderGradesMetadataParam): Promise<FetchResponse<200, types.TraderGradesResponse200>> {
    return this.core.fetch('/v2/trader-grades', 'get', metadata);
  }

  /**
   * Get the long term grades, including Technology and Fundamental metrics
   *
   * @summary Investor Grades
   * @throws FetchError<400, types.InvestorGradesResponse400> 400
   */
  investorGrades(metadata: types.InvestorGradesMetadataParam): Promise<FetchResponse<200, types.InvestorGradesResponse200>> {
    return this.core.fetch('/v2/investor-grades', 'get', metadata);
  }

  /**
   * Get the AI generated trading signals for long and short positions for all tokens
   *
   * @summary Trading Signals
   * @throws FetchError<400, types.TradingSignalsResponse400> 400
   */
  tradingSignals(metadata: types.TradingSignalsMetadataParam): Promise<FetchResponse<200, types.TradingSignalsResponse200>> {
    return this.core.fetch('/v2/trading-signals', 'get', metadata);
  }

  /**
   * Get the latest AI weekly price prediction
   *
   * @summary Price Prediction
   * @throws FetchError<400, types.PricePredictionResponse400> 400
   */
  pricePrediction(metadata: types.PricePredictionMetadataParam): Promise<FetchResponse<200, types.PricePredictionResponse200>> {
    return this.core.fetch('/v2/price-prediction', 'get', metadata);
  }

  /**
   * Get the historical levels of resistance and support for each token
   *
   * @summary Resistance & Support
   * @throws FetchError<400, types.ResistanceSupportResponse400> 400
   */
  resistanceSupport(metadata: types.ResistanceSupportMetadataParam): Promise<FetchResponse<200, types.ResistanceSupportResponse200>> {
    return this.core.fetch('/v2/resistance-support', 'get', metadata);
  }

  /**
   * Get the latest quantitative metrics for tokens. Note that Token Metrics pricing data
   * starts on 2019-01-01 for most tokens. More historical data will be available soon.
   *
   * @summary Quantmetrics
   * @throws FetchError<400, types.QuantmetricsResponse400> 400
   */
  quantmetrics(metadata: types.QuantmetricsMetadataParam): Promise<FetchResponse<200, types.QuantmetricsResponse200>> {
    return this.core.fetch('/v2/quantmetrics', 'get', metadata);
  }

  /**
   * Get the hourly sentiment score for Twitter, Reddit, and all the News, including quick
   * summary of what happened
   *
   * @summary Sentiment
   * @throws FetchError<400, types.SentimentsResponse400> 400
   */
  sentiments(metadata: types.SentimentsMetadataParam): Promise<FetchResponse<200, types.SentimentsResponse200>> {
    return this.core.fetch('/v2/sentiments', 'get', metadata);
  }

  /**
   * Get the price prediction based on different Crypto Market scenario
   *
   * @summary Scenario Analysis
   * @throws FetchError<400, types.ScenarioAnalysisResponse400> 400
   */
  scenarioAnalysis(metadata: types.ScenarioAnalysisMetadataParam): Promise<FetchResponse<200, types.ScenarioAnalysisResponse200>> {
    return this.core.fetch('/v2/scenario-analysis', 'get', metadata);
  }

  /**
   * Get the Top 10 and Bottom 10 correlation of tokens with the top 100 market cap tokens
   *
   * @summary Correlation
   * @throws FetchError<400, types.CorrelationResponse400> 400
   */
  correlation(metadata: types.CorrelationMetadataParam): Promise<FetchResponse<200, types.CorrelationResponse200>> {
    return this.core.fetch('/v2/correlation', 'get', metadata);
  }

  /**
   * Get the list of coins and their associated TOKEN_ID supported by Token Metrics. If ID or
   * symbol alone isn’t enough to identify a token, use this reference to clarify → [Click
   * Here](https://api.tokenmetrics.com/api-docs/#/Tokens/get_v2_tokens)
   *
   * @summary Tokens
   * @throws FetchError<400, types.TokensResponse400> 400
   */
  tokens(metadata: types.TokensMetadataParam): Promise<FetchResponse<200, types.TokensResponse200>> {
    return this.core.fetch('/v2/tokens', 'get', metadata);
  }

  /**
   * Retrieve AI-generated reports providing comprehensive analyses of cryptocurrency tokens,
   * including deep dives, investment analyses, and code reviews.
   *
   * @summary AI Reports
   * @throws FetchError<400, types.AiReportsResponse400> 400
   */
  aiReports(metadata: types.AiReportsMetadataParam): Promise<FetchResponse<200, types.AiReportsResponse200>> {
    return this.core.fetch('/v2/ai-reports', 'get', metadata);
  }

  /**
   * Get the trends from more than 20 technical indicators
   *
   * @summary All Trend Indicators
   * @throws FetchError<400, types.AllTrendIndicatorsResponse400> 400
   */
  allTrendIndicators(metadata: types.AllTrendIndicatorsMetadataParam): Promise<FetchResponse<200, types.AllTrendIndicatorsResponse200>> {
    return this.core.fetch('/v2/all-trend-indicators', 'get', metadata);
  }

  /**
   * Get the latest list of crypto investors and their scores
   *
   * @summary Crypto Investors
   * @throws FetchError<400, types.CryptoInvestorsResponse400> 400
   */
  cryptoInvestors(metadata: types.CryptoInvestorsMetadataParam): Promise<FetchResponse<200, types.CryptoInvestorsResponse200>> {
    return this.core.fetch('/v2/crypto-investors', 'get', metadata);
  }

  /**
   * Token Metrics AI
   *
   * @throws FetchError<400, types.TmaiResponse400> 400
   */
  tmai(body: types.TmaiBodyParam, metadata?: types.TmaiMetadataParam): Promise<FetchResponse<200, types.TmaiResponse200>> {
    return this.core.fetch('/v2/tmai', 'post', body, metadata);
  }

  /**
   * Get the AI generated portfolio for Traders, updated Daily
   *
   * @summary Trader Indices
   * @throws FetchError<400, types.TraderIndicesResponse400> 400
   */
  traderIndices(metadata: types.TraderIndicesMetadataParam): Promise<FetchResponse<200, types.TraderIndicesResponse200>> {
    return this.core.fetch('/v2/trader-indices', 'get', metadata);
  }

  /**
   * Get the AI generated portfolio for Investors, updated Quarterly
   *
   * @summary Investor Indices
   * @throws FetchError<400, types.InvestorIndicesResponse400> 400
   */
  investorIndices(metadata: types.InvestorIndicesMetadataParam): Promise<FetchResponse<200, types.InvestorIndicesResponse200>> {
    return this.core.fetch('/v2/investor-indices', 'get', metadata);
  }

  /**
   * Get the Market Analytics from Token Metrics. They provide insight into the full Crypto
   * Market, including the Bullish/Bearish Market indicator.
   *
   * @summary Market Metrics
   * @throws FetchError<400, types.MarketMetricsResponse400> 400
   */
  marketMetrics(metadata: types.MarketMetricsMetadataParam): Promise<FetchResponse<200, types.MarketMetricsResponse200>> {
    return this.core.fetch('/v2/market-metrics', 'get', metadata);
  }

  /**
   * Retrieve real-time price charts with bull and bear signals, overlaid with Token Metrics'
   * Trader Grade for each asset.
   *
   * @summary Token Details Price Charts
   * @throws FetchError<400, types.TokenDetailsPriceChartsResponse400> 400
   */
  tokenDetailsPriceCharts(metadata: types.TokenDetailsPriceChartsMetadataParam): Promise<FetchResponse<200, types.TokenDetailsPriceChartsResponse200>> {
    return this.core.fetch('/v2/token-details-price-charts', 'get', metadata);
  }

  /**
   * View a real-time, pie chart visualization of the AI-driven index's current crypto asset
   * allocations.
   *
   * @summary Indices Index Allocation Charts
   * @throws FetchError<400, types.IndicesIndexAllocationChartsResponse400> 400
   */
  indicesIndexAllocationCharts(metadata: types.IndicesIndexAllocationChartsMetadataParam): Promise<FetchResponse<200, types.IndicesIndexAllocationChartsResponse200>> {
    return this.core.fetch('/v2/indices-index-allocation-charts', 'get', metadata);
  }

  /**
   * Access historical and real-time returns of the Trader Index, highlighting performance
   * with backtested data (in red) and post-launch data (in yellow).
   *
   * @summary Trader Index ROI
   * @throws FetchError<400, types.IndicesRoiChartsResponse400> 400
   */
  indicesRoiCharts(metadata: types.IndicesRoiChartsMetadataParam): Promise<FetchResponse<200, types.IndicesRoiChartsResponse200>> {
    return this.core.fetch('/v2/indices-roi-charts', 'get', metadata);
  }

  /**
   * Analyze the market's sentiment with a chart displaying the percentage of
   * cryptocurrencies deemed bullish versus bearish by Token Metrics AI, reflecting overall
   * market conditions.
   *
   * @summary Market Percent of Bullish vs Bearish Charts
   * @throws FetchError<400, types.MarketPercentOfBullishVsBearishChartsResponse400> 400
   */
  marketPercentOfBullishVsBearishCharts(metadata: types.MarketPercentOfBullishVsBearishChartsMetadataParam): Promise<FetchResponse<200, types.MarketPercentOfBullishVsBearishChartsResponse200>> {
    return this.core.fetch('/v2/market-percent-of-bullish-vs-bearish-charts', 'get', metadata);
  }

  /**
   * Gauge the current market sentiment with a 0-100 scale chart, indicating the level of
   * bullishness or bearishness in the cryptocurrency market.
   *
   * @summary Market Bull and Bear Chart
   * @throws FetchError<400, types.MarketBullAndBearChartsResponse400> 400
   */
  marketBullAndBearCharts(metadata: types.MarketBullAndBearChartsMetadataParam): Promise<FetchResponse<200, types.MarketBullAndBearChartsResponse200>> {
    return this.core.fetch('/v2/market-bull-and-bear-charts', 'get', metadata);
  }

  /**
   * Track the percentage of bullish Token Metrics (TM) grades against the total
   * cryptocurrency market capitalization, visualized with a yellow line overlay on a black
   * line representing market cap.
   *
   * @summary Market Percent of Bullish TM Grades
   * @throws FetchError<400, types.MarketPercentOfBullishTmGradesResponse400> 400
   */
  marketPercentOfBullishTmGrades(metadata: types.MarketPercentOfBullishTmGradesMetadataParam): Promise<FetchResponse<200, types.MarketPercentOfBullishTmGradesResponse200>> {
    return this.core.fetch('/v2/market-percent-of-bullish-tm-grades', 'get', metadata);
  }

  /**
   * Discover current market trends with a chart indicating Bitcoin vs Altcoin season, where
   * green signifies Altcoin season and red denotes Bitcoin dominance
   *
   * @summary Market TM Grade Signal
   * @throws FetchError<400, types.MarketTmGradeSignalResponse400> 400
   */
  marketTmGradeSignal(metadata: types.MarketTmGradeSignalMetadataParam): Promise<FetchResponse<200, types.MarketTmGradeSignalResponse200>> {
    return this.core.fetch('/v2/market-tm-grade-signal', 'get', metadata);
  }

  /**
   * Discover current market trends with a chart indicating Bitcoin vs Altcoin season, where
   * green signifies Altcoin season and red denotes Bitcoin dominance.
   *
   * @summary Market Bitcoin vs Altcoin season
   * @throws FetchError<400, types.BitcoinVsAltcoinSeasonChartsResponse400> 400
   */
  bitcoinVsAltcoinSeasonCharts(metadata: types.BitcoinVsAltcoinSeasonChartsMetadataParam): Promise<FetchResponse<200, types.BitcoinVsAltcoinSeasonChartsResponse200>> {
    return this.core.fetch('/v2/bitcoin-vs-altcoin-season-charts', 'get', metadata);
  }

  /**
   * Examine the state of the cryptocurrency market's volatility with a chart that overlays
   * the total market cap, our volatility index, and the 90th and 10th percentile markers.
   *
   * @summary Market Annualized Historical Volatility
   * @throws FetchError<400, types.AnnualizedHistoricalVolatilityChartsResponse400> 400
   */
  annualizedHistoricalVolatilityCharts(metadata: types.AnnualizedHistoricalVolatilityChartsMetadataParam): Promise<FetchResponse<200, types.AnnualizedHistoricalVolatilityChartsResponse200>> {
    return this.core.fetch('/v2/annualized-historical-volatility-charts', 'get', metadata);
  }

  /**
   * Visualize the total cryptocurrency market capitalization alongside Bitcoin's market cap,
   * with color-coded periods indicating bearish (red) and bullish (green) seasons.
   *
   * @summary Market Total Crypto Market Cap
   * @throws FetchError<400, types.TotalMarketCryptoCapChartsResponse400> 400
   */
  totalMarketCryptoCapCharts(metadata: types.TotalMarketCryptoCapChartsMetadataParam): Promise<FetchResponse<200, types.TotalMarketCryptoCapChartsResponse200>> {
    return this.core.fetch('/v2/total-market-crypto-cap-charts', 'get', metadata);
  }

  /**
   * Identify standout cryptocurrencies with a chart displaying positive and negative price
   * percentage changes, plotted against volume deviation in bubble format.
   *
   * @summary Market Movers
   * @throws FetchError<400, types.MarketMoversChartsResponse400> 400
   */
  marketMoversCharts(metadata: types.MarketMoversChartsMetadataParam): Promise<FetchResponse<200, types.MarketMoversChartsResponse200>> {
    return this.core.fetch('/v2/market-movers-charts', 'get', metadata);
  }

  /**
   * Get the list of coins for top market cap
   *
   * @summary Top Tokens by Market Cap
   * @throws FetchError<400, types.TopMarketCapTokensResponse400> 400
   */
  topMarketCapTokens(metadata: types.TopMarketCapTokensMetadataParam): Promise<FetchResponse<200, types.TopMarketCapTokensResponse200>> {
    return this.core.fetch('/v2/top-market-cap-tokens', 'get', metadata);
  }

  /**
   * Get hourly OHLCV (Open, High, Low, Close, Volume) data for tokens.
   *
   * @summary Hourly OHLCV
   * @throws FetchError<400, types.HourlyOhlcvResponse400> 400
   */
  hourlyOhlcv(metadata: types.HourlyOhlcvMetadataParam): Promise<FetchResponse<200, types.HourlyOhlcvResponse200>> {
    return this.core.fetch('/v2/hourly-ohlcv', 'get', metadata);
  }

  /**
   * Visualize resistance and support levels in the cryptocurrency market. This endpoint
   * provides charts showing key resistance and support levels for various cryptocurrencies,
   * helping users identify potential market trends and reversal points. The charts include
   * historical data with color-coded zones to indicate where resistance (red) and support
   * (green) levels have been established.
   *
   * @summary Resistance & Support Charts
   * @throws FetchError<400, types.ResistanceAndSupportChartsResponse400> 400
   */
  resistanceAndSupportCharts(metadata: types.ResistanceAndSupportChartsMetadataParam): Promise<FetchResponse<200, types.ResistanceAndSupportChartsResponse200>> {
    return this.core.fetch('/v2/resistance-and-support-charts', 'get', metadata);
  }

  /**
   * Get token prices based on the provided token IDs.
   *
   * @summary Price
   * @throws FetchError<400, types.PriceResponse400> 400
   */
  price(metadata: types.PriceMetadataParam): Promise<FetchResponse<200, types.PriceResponse200>> {
    return this.core.fetch('/v2/price', 'get', metadata);
  }

  /**
   * Get daily OHLCV (Open, High, Low, Close, Volume) data for tokens.
   *
   * @summary Daily OHLCV
   * @throws FetchError<400, types.DailyOhlcvResponse400> 400
   */
  dailyOhlcv(metadata: types.DailyOhlcvMetadataParam): Promise<FetchResponse<200, types.DailyOhlcvResponse200>> {
    return this.core.fetch('/v2/daily-ohlcv', 'get', metadata);
  }

  /**
   * This endpoint returns the current holdings of the given Index, along with their
   * respective weight in %.
   *
   * @summary Index Holdings
   * @throws FetchError<400, types.IndexHoldingsResponse400> 400
   */
  indexHoldings(metadata: types.IndexHoldingsMetadataParam): Promise<FetchResponse<200, types.IndexHoldingsResponse200>> {
    return this.core.fetch('/v2/indices-tree-map', 'get', metadata);
  }

  /**
   * This endpoint returns the current holdings of the given Sector Index, along with their
   * respective weight in %.
   *
   * @summary Sector Indices Holdings
   * @throws FetchError<400, types.SectorIndicesHoldingsResponse400> 400
   */
  sectorIndicesHoldings(metadata: types.SectorIndicesHoldingsMetadataParam): Promise<FetchResponse<200, types.SectorIndicesHoldingsResponse200>> {
    return this.core.fetch('/v2/indices-index-specific-tree-map', 'get', metadata);
  }

  /**
   * The Indices Performance endpoint provides historical performance data for a given index,
   * including cumulative return on investment (ROI) over time. This data is useful for
   * analyzing index trends and evaluating investment performance.
   *
   * @summary Indices Performance
   * @throws FetchError<400, types.IndicesPerformanceResponse400> 400
   */
  indicesPerformance(metadata: types.IndicesPerformanceMetadataParam): Promise<FetchResponse<200, types.IndicesPerformanceResponse200>> {
    return this.core.fetch('/v2/indices-performance', 'get', metadata);
  }

  /**
   * The Sector Indices Performance endpoint provides historical performance data for a given
   * Sector Index, including cumulative return on investment (ROI) over time. This data is
   * useful for analyzing index trends and evaluating investment performance.
   *
   * @summary Sector Indices Performance
   * @throws FetchError<400, types.IndexSpecificPerformanceResponse400> 400
   */
  indexSpecificPerformance(metadata: types.IndexSpecificPerformanceMetadataParam): Promise<FetchResponse<200, types.IndexSpecificPerformanceResponse200>> {
    return this.core.fetch('/v2/indices-index-specific-performance', 'get', metadata);
  }

  /**
   * The Index Transaction endpoint provides detailed transaction data related to index
   * holdings, including buy/sell actions, transaction sizes in various units, and
   * timestamps. This allows traders and investors to track index rebalancing activities and
   * market movements.
   *
   * @summary Index Transaction
   * @throws FetchError<400, types.IndicesTransactionResponse400> 400
   */
  indicesTransaction(metadata: types.IndicesTransactionMetadataParam): Promise<FetchResponse<200, types.IndicesTransactionResponse200>> {
    return this.core.fetch('/v2/indices-index-transaction', 'get', metadata);
  }

  /**
   * The Sector Index Transaction endpoint provides detailed transaction data related to
   * index holdings, including buy/sell actions, transaction sizes in various units, and
   * timestamps. This allows traders and investors to track index rebalancing activities and
   * market movements.
   *
   * @summary Sector Index Transaction
   * @throws FetchError<400, types.SectorIndexTransactionResponse400> 400
   */
  sectorIndexTransaction(metadata: types.SectorIndexTransactionMetadataParam): Promise<FetchResponse<200, types.SectorIndexTransactionResponse200>> {
    return this.core.fetch('/v2/indices-index-specific-index-transaction', 'get', metadata);
  }
}

const createSDK = (() => { return new SDK(); })()
;

export default createSDK;

export type { AiReportsMetadataParam, AiReportsResponse200, AiReportsResponse400, AllTrendIndicatorsMetadataParam, AllTrendIndicatorsResponse200, AllTrendIndicatorsResponse400, AnnualizedHistoricalVolatilityChartsMetadataParam, AnnualizedHistoricalVolatilityChartsResponse200, AnnualizedHistoricalVolatilityChartsResponse400, BitcoinVsAltcoinSeasonChartsMetadataParam, BitcoinVsAltcoinSeasonChartsResponse200, BitcoinVsAltcoinSeasonChartsResponse400, CorrelationMetadataParam, CorrelationResponse200, CorrelationResponse400, CryptoInvestorsMetadataParam, CryptoInvestorsResponse200, CryptoInvestorsResponse400, DailyOhlcvMetadataParam, DailyOhlcvResponse200, DailyOhlcvResponse400, HourlyOhlcvMetadataParam, HourlyOhlcvResponse200, HourlyOhlcvResponse400, IndexHoldingsMetadataParam, IndexHoldingsResponse200, IndexHoldingsResponse400, IndexSpecificPerformanceMetadataParam, IndexSpecificPerformanceResponse200, IndexSpecificPerformanceResponse400, IndicesIndexAllocationChartsMetadataParam, IndicesIndexAllocationChartsResponse200, IndicesIndexAllocationChartsResponse400, IndicesPerformanceMetadataParam, IndicesPerformanceResponse200, IndicesPerformanceResponse400, IndicesRoiChartsMetadataParam, IndicesRoiChartsResponse200, IndicesRoiChartsResponse400, IndicesTransactionMetadataParam, IndicesTransactionResponse200, IndicesTransactionResponse400, InvestorGradesMetadataParam, InvestorGradesResponse200, InvestorGradesResponse400, InvestorIndicesMetadataParam, InvestorIndicesResponse200, InvestorIndicesResponse400, MarketBullAndBearChartsMetadataParam, MarketBullAndBearChartsResponse200, MarketBullAndBearChartsResponse400, MarketMetricsMetadataParam, MarketMetricsResponse200, MarketMetricsResponse400, MarketMoversChartsMetadataParam, MarketMoversChartsResponse200, MarketMoversChartsResponse400, MarketPercentOfBullishTmGradesMetadataParam, MarketPercentOfBullishTmGradesResponse200, MarketPercentOfBullishTmGradesResponse400, MarketPercentOfBullishVsBearishChartsMetadataParam, MarketPercentOfBullishVsBearishChartsResponse200, MarketPercentOfBullishVsBearishChartsResponse400, MarketTmGradeSignalMetadataParam, MarketTmGradeSignalResponse200, MarketTmGradeSignalResponse400, PriceMetadataParam, PricePredictionMetadataParam, PricePredictionResponse200, PricePredictionResponse400, PriceResponse200, PriceResponse400, QuantmetricsMetadataParam, QuantmetricsResponse200, QuantmetricsResponse400, ResistanceAndSupportChartsMetadataParam, ResistanceAndSupportChartsResponse200, ResistanceAndSupportChartsResponse400, ResistanceSupportMetadataParam, ResistanceSupportResponse200, ResistanceSupportResponse400, ScenarioAnalysisMetadataParam, ScenarioAnalysisResponse200, ScenarioAnalysisResponse400, SectorIndexTransactionMetadataParam, SectorIndexTransactionResponse200, SectorIndexTransactionResponse400, SectorIndicesHoldingsMetadataParam, SectorIndicesHoldingsResponse200, SectorIndicesHoldingsResponse400, SentimentsMetadataParam, SentimentsResponse200, SentimentsResponse400, TmaiBodyParam, TmaiMetadataParam, TmaiResponse200, TmaiResponse400, TokenDetailsPriceChartsMetadataParam, TokenDetailsPriceChartsResponse200, TokenDetailsPriceChartsResponse400, TokensMetadataParam, TokensResponse200, TokensResponse400, TopMarketCapTokensMetadataParam, TopMarketCapTokensResponse200, TopMarketCapTokensResponse400, TotalMarketCryptoCapChartsMetadataParam, TotalMarketCryptoCapChartsResponse200, TotalMarketCryptoCapChartsResponse400, TraderGradesMetadataParam, TraderGradesResponse200, TraderGradesResponse400, TraderIndicesMetadataParam, TraderIndicesResponse200, TraderIndicesResponse400, TradingSignalsMetadataParam, TradingSignalsResponse200, TradingSignalsResponse400 } from './types';
