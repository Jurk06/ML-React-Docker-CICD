from sklearn.datasets import fetch_california_housing
from sklearn.linear_model import LinearRegression
import pandas as pd
import pickle

housing = fetch_california_housing()
df=pd.DataFrame(housing.data, columns=housing.feature_names)
df['target']=housing.target

X=df.drop('target', axis=1)
y=df['target']

model=LinearRegression()
model.fit(X, y)

with open('model.pkl', 'wb') as f:
    
    pickle.dump(model, f)