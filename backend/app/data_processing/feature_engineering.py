import pandas as pd
import numpy as np

def compute_player_aggregates(df: pd.DataFrame) -> pd.DataFrame:
    """
    Compute player-level aggregates such as career averages, strike rates, economy rates.
    """
    # Example: Compute batsman career average and strike rate
    batsman_stats = df.groupby('batsman').agg(
        runs_off_bat=pd.NamedAgg(column='runs_off_bat', aggfunc='sum'),
        balls_faced=pd.NamedAgg(column='ball', aggfunc='count'),
        dismissals=pd.NamedAgg(column='player_dismissed', aggfunc=lambda x: x.notnull().sum())
    ).reset_index()

    batsman_stats['average'] = batsman_stats['runs_off_bat'] / batsman_stats['dismissals'].replace(0, np.nan)
    batsman_stats['strike_rate'] = (batsman_stats['runs_off_bat'] / batsman_stats['balls_faced']) * 100

    return batsman_stats

def compute_venue_characteristics(df: pd.DataFrame) -> pd.DataFrame:
    """
    Derive venue/pitch characteristics such as average first innings score.
    """
    first_innings = df[df['inning'] == 1]
    venue_scores = first_innings.groupby('venue').agg(
        avg_first_innings_score=pd.NamedAgg(column='total_runs', aggfunc='sum')
    ).reset_index()

    return venue_scores

def tag_player_form(df: pd.DataFrame, player: str, last_n_matches: int = 5) -> float:
    """
    Tag player's form over last N matches by average runs.
    """
    player_data = df[df['batsman'] == player].sort_values(by=['date'], ascending=False).head(last_n_matches)
    if player_data.empty:
        return np.nan
    return player_data['runs_off_bat'].mean()

# Additional feature engineering functions can be added here
