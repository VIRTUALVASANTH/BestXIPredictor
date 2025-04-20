import joblib
from sklearn.ensemble import RandomForestClassifier
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.compose import ColumnTransformer
import pandas as pd
import numpy as np

class RFModel:
    def __init__(self):
        self.model = None
        self.pipeline = None

    def build_pipeline(self, numeric_features, categorical_features):
        numeric_transformer = StandardScaler()
        categorical_transformer = OneHotEncoder(handle_unknown='ignore')

        preprocessor = ColumnTransformer(
            transformers=[
                ('num', numeric_transformer, numeric_features),
                ('cat', categorical_transformer, categorical_features)
            ])

        self.pipeline = Pipeline(steps=[
            ('preprocessor', preprocessor),
            ('classifier', RandomForestClassifier(n_estimators=100, random_state=42))
        ])

    def train(self, X: pd.DataFrame, y: pd.Series):
        if self.pipeline is None:
            raise ValueError("Pipeline not built. Call build_pipeline first.")
        self.pipeline.fit(X, y)

    def predict_proba(self, X: pd.DataFrame):
        if self.pipeline is None:
            raise ValueError("Pipeline not built. Call build_pipeline first.")
        return self.pipeline.predict_proba(X)

    def save(self, filepath: str):
        joblib.dump(self.pipeline, filepath)

    def load(self, filepath: str):
        self.pipeline = joblib.load(filepath)
