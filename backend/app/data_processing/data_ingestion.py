import pandas as pd

def load_ball_by_ball_data(filepath: str) -> pd.DataFrame:
    """
    Load the ball_by_ball_ipl.csv dataset.
    """
    df = pd.read_csv(filepath)
    return df

def filter_data_by_season_and_venue(df: pd.DataFrame, season: int = None, venue: str = None) -> pd.DataFrame:
    """
    Filter data by season and/or venue.
    """
    if season is not None:
        df = df[df['season'] == season]
    if venue is not None:
        df = df[df['venue'] == venue]
    return df
