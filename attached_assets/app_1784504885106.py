import warnings
warnings.filterwarnings('ignore')
import streamlit as st
import pandas as pd
import time
import datetime
import plotly.express as px
import streamlit as st
import pandas as pd
import numpy as np
import plotly.express as px
import glob
import os
import re
import matplotlib.pyplot as plt
from gluonts.dataset.field_names import FieldName
from gluonts.dataset.common import ListDataset
from gluonts.mx.model import deepar 
from gluonts.mx.trainer import Trainer
from gluonts.evaluation.backtest import make_evaluation_predictions
from gluonts.evaluation import Evaluator
from gluonts.model.predictor import Predictor
import plotly.graph_objects as go



st.set_page_config(
    page_title="Portfolio Risk Analysis",
    page_icon="🌍",
    layout="wide", 
    initial_sidebar_state="expanded",
)



csv_files = glob.glob(os.path.join('stock_data', "*.csv"))

def read_asset_data(path):

    asset = pd.read_csv(path, usecols=[0,4],names=['datetime','price'], header=2)
    asset.datetime = pd.to_datetime(asset.datetime)
    asset.set_index('datetime', inplace=True)
    asset_name = "".join(re.findall("[A-Z]+", path))
    asset.rename(columns={"price": asset_name}, inplace=True)

    return asset[[asset_name]]

paths = csv_files

h = {}
for i in range(len(paths)):
    h["asset" + str(i)] = read_asset_data(paths[i])

prices = pd.concat(h, axis=1)
prices.columns = prices.columns.droplevel()
#prices.fillna(method='pad', axis=0, limit=2,inplace=True)
prices = prices.dropna()

returns = prices.pct_change().dropna()
returns = returns.asfreq(freq='1D', fill_value=0.0)
returns = returns[returns.index>='2019-01-01']

st.title("Portfolio Risk Analysis")

with st.sidebar:


    st.markdown("### 💼 Portfolio Setup")
    portfolio_value = st.number_input(
        "Enter your total portfolio value (in USD):",
        min_value=500,
        value=10000,
        step=100)

    all_users = prices.columns
    with st.container(border=True):
        users = st.multiselect("📈 Choose your stocks:", all_users, help="Pick the stocks that are part of your portfolio.")


    if users: 
        weights1 = [] 
        for i in range(len(users)):
            w1 = st.select_slider( f"% of {users[i]} in Portfolio", [0,10, 20, 30, 40, 50, 60, 70, 80, 90, 100], key=i)
            weights1.append(w1/100)
       
        df_weights = pd.DataFrame({'Stock': users, 'Weight': weights1})
        st.plotly_chart(px.pie(df_weights, names='Stock', values='Weight', title='Your Portfolio Allocation'))    


tab1, tab2, tab3 = st.tabs(["Overview","Individual Analysis", "Portfolio Analysis"])

   
with tab1:

    
    
    st.markdown("""
        ### 📊 Welcome to the DeepVaR Portfolio Risk App!

        This app helps you **understand the future risk of your stock portfolio** using AI-based predictions.

        📌 **How it works**:
        - You select your stocks and assign weights.
        - Our model predicts future scenarios.
        - We show your expected profits and potential losses using **Value at Risk (VaR)**.

        💡 _Don’t worry if you're new to these terms — we’ll guide you along the way!_
        """) 
    l1, l2 = st.columns(2)
    with l1.expander("📘 What is Value at Risk (VaR)?"):
        st.markdown("""
        **Value at Risk (VaR)** is the **maximum amount you're likely to lose** in your portfolio over a certain time period, with a given confidence level.
        
        - A **95% VaR** of 3% means there's a 95% chance you **won’t lose more than 3%** in a day.
        - A **99% VaR** is stricter – there’s only a 1% chance you’ll lose **more than that** amount.

        This app predicts 10-day ahead VaR using DeepAR, a powerful AI forecasting method.
        """)
        
    with l2.expander("🧠 Glossary of Terms"):
        st.markdown("""
        - **PnL**: Profit and Loss
        - **VaR**: Value at Risk
        - **Volatility**: How much your portfolio returns move up or down
        - **Correlation**: How stocks move relative to each other
        """)


class DeepARModel:

    '''Class to ease fitting and predicting with GluonTS DeepAR estimator '''

    def __init__(self, freq='1D', context_length=15, prediction_length=10,
                epochs=5, learning_rate=1e-4, n_layers=2., dropout=0.1):

        self.freq = freq
        self.context_length = context_length
        self.prediction_length = prediction_length
        self.epochs = epochs
        self.learning_rate = learning_rate
        self.n_layers = n_layers
        self.dropout = dropout

    def df_to_np(self, ts):
        return ts.to_numpy().T

    def list_dataset(self, ts, train=True):

        '''expects as input a pandas df with datetime index and
        columns the asset returns and outputs the train or test dataset in
        a proper form to be used as intput to a GluonTS estimator'''

        custom_dataset = self.df_to_np(ts)
        start = pd.Timestamp(ts.index[0])
        if train == True:
            ds = ListDataset([{'target': x, 'start': start}
                            for x in custom_dataset[:, :-self.prediction_length]],
                            freq=self.freq)
        else:
            ds = ListDataset([{'target': x, 'start': start}
                            for x in custom_dataset],
                            freq=self.freq)
        return ds

    def fit(self, ts):

        '''expects as input a pandas df with datetime index and
        columns the returns of the assets to be predicted'''
        # iniallize deepar estimator
        estimator = deepar.DeepAREstimator(
            prediction_length=self.prediction_length,
            context_length=self.context_length,
            freq=self.freq,
            trainer=Trainer(epochs=self.epochs,
                            ctx="cpu",
                            learning_rate=self.learning_rate,
                            num_batches_per_epoch=50,
                            ),
            num_layers=self.n_layers,
            dropout_rate=self.dropout,
            cell_type='lstm',
            num_cells=50
        )
        # prepare training data
        list_ds = self.list_dataset(ts, train=True)
        # train deepar on training data
        predictor = estimator.train(list_ds)
        return predictor

    def predict(self, ts ):
        '''expects as input a pandas df with datetime index and
        columns the returns of the assets to be predicted'''
        # get the test data in proper form
        test_ds = self.list_dataset(ts, train=False)
        return self.estimator.predict(test_ds, num_samples=1000)


def make_forecasts(predictor, test_data, n_sampl):
    """takes a  predictor, gluonTS test data and the number of samples
    and returns MC samples for each datetime of the test set"""
    forecasts = []
    tss = []
    forecast_it, ts_it = make_evaluation_predictions(
        dataset=test_data,
        predictor=predictor,
        num_samples=n_sampl
    )
    forecasts = list(forecast_it)
    tss = list(ts_it)
    return forecasts, tss

def plot_prob_forecasts(ts_entry, forecast_entry, asset_name, plot_length=20):
    prediction_intervals = (99.0, 95.0)
    legend = ["observations", "median prediction"] + [f"{k}% prediction interval" for k in prediction_intervals][::-1]
    fig, ax = plt.subplots(1, 1)
    ts_entry[-plot_length:].plot(ax=ax) 
    forecast_entry.plot(color='g')
    plt.grid(which="both")
    plt.legend(legend, loc="upper left")
    plt.title(f'Forecast of {asset_name} series Returns')
    st.pyplot(fig)

def var_p(predictions, returns, weights, days_ahead=0, alpha=95):

    '''takes as inputs the deepar sample predictions,
    the dataframe with the asset returns, the portfolio weights,
    the index of the predicted day and the confidence probability
    and returns the portfolio VaR of the given day'''

    V = np.zeros(len(weights))
    for i in range(len(weights)):
        if weights[i] < 0 :
            V[i] = weights[i] * np.percentile(predictions[i].samples[:,days_ahead], alpha)
        else:
            V[i] = weights[i] * np.percentile(predictions[i].samples[:,days_ahead], 100-alpha)
    R = returns.corr()
    return -np.sqrt(V @ R @ V.T)


def plot_var_chart(results):
    fig = go.Figure()
    fig.add_trace(go.Scatter(x=results.index, y=results['PnL'], mode='lines+markers', name='PnL'))
    fig.add_trace(go.Scatter(x=results.index, y=results['DeepVaR95'], mode='lines+markers', name='VaR 95%'))
    fig.add_trace(go.Scatter(x=results.index, y=results['DeepVaR99'], mode='lines+markers', name='VaR 99%'))

    fig.update_layout(
        title='DeepVaR: 10-Day Ahead Value at Risk',
        xaxis_title='Date',
        yaxis_title='Portfolio Returns (%)',
        template='plotly_white',
        legend=dict(orientation="h", yanchor="bottom", y=1.02, xanchor="right", x=1),
    )
    st.plotly_chart(fig, use_container_width=True)


def format_risk_label(var):
    percent = abs(var) * 100
    if percent < 2:
        return "🟢 Low Risk"
    elif percent < 5:
        return "🟡 Moderate Risk"
    else:
        return "🔴 High Risk"

def var_explainer(var, confidence, portfolio_value):
    dollar_loss = abs(var) * portfolio_value
    risk_label = format_risk_label(var)
    return f"""
    ### 🔎 {confidence}% VaR
    - Expected Max Daily Loss: **${dollar_loss:,.2f}**
    - Risk Level: **{risk_label}**
    - Interpretation: With {confidence}% confidence, you are unlikely to lose **more than ${dollar_loss:,.2f}** in one day.
    """


if users:
    returns = returns[users]
    
    if st.button('Train model', key = 11111111111):
    
        with st.spinner("Preding Individual Risk..", show_time=True):
            
            estimator = DeepARModel(prediction_length=10, context_length=15, epochs=5).fit(returns)       

            test_ds = DeepARModel(prediction_length=10, context_length=15, freq='D').list_dataset(returns, train=False)

            forecasts, tss = make_forecasts(estimator, test_ds, n_sampl=1000)
            
            if forecasts:
                forecasts1= forecasts
                
            w = weights1
            var95 = []
            var99 = []
            for i in range(10):
                var95.append(var_p(forecasts1,returns.iloc[-75:], w, i, alpha=95))
                var99.append(var_p(forecasts1,returns.iloc[-75:], w, i, alpha=99))

            pnl = (returns.iloc[-10:] @ w).values.flatten()
            results = pd.DataFrame({'DeepVaR95':var95,'DeepVaR99':var99, 'PnL':pnl}, index=returns.index[-10:])    
                
        with tab2:
            st.markdown("### 📉 Forecasted Price Paths")
            st.markdown("We used DeepAR to simulate future prices for each stock. The shaded area shows uncertainty — wider bands mean more risk.")
            cols = st.columns(2)  
            for i in range(len(forecasts)):
                col = cols[i % 2] 
                with col:
                    plot_prob_forecasts(tss[i], forecasts[i], returns.columns[i])   
               
        
        
        
        with tab3:
            
            
           
            plot_var_chart(results)
            
            left, right = st.columns(2)
            breaches_95 = results[results['PnL'] < results['DeepVaR95']]
            breaches_99 = results[results['PnL'] < results['DeepVaR99']]
            left.markdown(f"**Days PnL breached 95% VaR:** {len(breaches_95)}")
            right.markdown(f"**Days PnL breached 99% VaR:** {len(breaches_99)}")
            
            
            left.markdown(var_explainer(var95[0], 95, portfolio_value))
            right.markdown(var_explainer(var99[0], 99, portfolio_value)) 
        
            
            rolling_vol = returns @ weights1
            rolling_vol = rolling_vol.rolling(window=30).std()

            fig_vol = px.line(x=rolling_vol.index, y=rolling_vol, title='Rolling Portfolio Volatility (30-day)')
            fig_vol.update_layout(yaxis_title='Std Dev', xaxis_title='Date')
            left.plotly_chart(fig_vol, use_container_width=True)
            
            fig_corr = px.imshow(returns.corr(), text_auto=True, color_continuous_scale='RdBu', title="Asset Correlation Matrix")
            right.plotly_chart(fig_corr, use_container_width=True)
            
            
            var_summary = results.iloc[-1]
            left.markdown(f"""
            - 🟢 **Expected Return (PnL)** on last day: `{var_summary['PnL']:.2%}`
            - 🔴 **VaR (95%)**: `{var_summary['DeepVaR95']:.2%}`
            - 🔴 **VaR (99%)**: `{var_summary['DeepVaR99']:.2%}`

            > If your portfolio performs worse than -{abs(var_summary['DeepVaR99']):.2%}, that's a rare, severe loss scenario.
            """)

            right.markdown("📊 Risk Level Legend")
            right.markdown("""
            | Level            | Description         |
            |------------------|---------------------|
            | 🟢 Low Risk      | VaR < 2%            |
            | 🟡 Moderate Risk | VaR 2% – 4%         |
            | 🔴 High Risk     | VaR > 4%            |
            """)    
            
            

            
            


                   
      
                     