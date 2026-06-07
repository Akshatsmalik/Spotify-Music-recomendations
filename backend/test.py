import pandas as pd
import numpy as np
from fastapi import FastAPI
from pydantic import BaseModel
from sklearn.metrics.pairwise import cosine_similarity
from fastapi.middleware.cors import CORSMiddleware

app=FastAPI()

data=pd.read_pickle(r'recomendation2.pickle')

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/random')
async def starting():
    data1=data[data['release_year']>2000]['id'].sample(5).tolist()
    return data1

class RecRequest(BaseModel):
    id: str

@app.post('/recomendations')
async def recomendation(req:RecRequest):
    try:
        index=data[(data['id']==req.id)&(data['release_year']>=2010)].index[0]
    except IndexError:
        return 'wrong id'
    
    cluster=data.loc[index,'clusters']
    clustersongs=data[data['clusters']==cluster].copy()
    clustervector=list(data[data['clusters']==cluster]['vector'].values)
    targetvector=np.array(data.loc[index,'vector']).reshape(1,-1)

    similarity=cosine_similarity(targetvector,clustervector)[0]

    clustersongs['similarity']=similarity
    recommendation = clustersongs[clustersongs['id'] != id].sort_values(by='similarity', ascending=False)
    return recommendation['id'].head(5).tolist()

@app.post('/recommendations2')
async def get_recommendations(id):
    try:
        # 1. Find the row index of the requested song ID
        target_index = data[data['id'] == id].index[0]
    except IndexError:
        # Return a clean JSON error if the ID doesn't exist
        return {"error": "Song ID not found"}

    # 2. Find the cluster for this song
    cluster = data.loc[target_index, 'clusters']

    # 3. Filter for all songs in the same cluster
    clustersongs = data[data['clusters'] == cluster].copy()

    # 4. Extract and shape the vectors for Scikit-Learn
    # np.vstack turns a pandas column of arrays into a proper 2D matrix
    cluster_vectors = np.vstack(clustersongs['vector'].values)
    
    # .reshape(1, -1) makes the target vector a flat, single-row matrix
    target_vector = np.array(data.loc[target_index, 'vector']).reshape(1, -1)

    # 5. Calculate Cosine Similarity
    similarity = cosine_similarity(target_vector, cluster_vectors)[0]
    
    # 6. Add scores to the dataframe
    clustersongs['similarity_score'] = similarity

    # 7. Remove the queried song and sort
    # CRITICAL: ascending=False to put the highest similarity scores at the top
    recommendations = clustersongs[
        clustersongs['id'] != id
    ].sort_values(
        by='similarity_score',
        ascending=False 
    )

    # 8. Return as a standard Python list so FastAPI can turn it into JSON
    # This will return a list of just the IDs (e.g., [104, 209, 311, 49, 88])
    return recommendations['id'].head(5).tolist()

def get_id(data):
    # arr=[]
    # for i in data['id']:
    #     arr.append(i)4
    data1=data['id'].sample(5).tolist()
    return data1

def main():
    data=pd.read_csv(r'tracks.csv')
    df=pd.DataFrame(data)
    response=get_id(df)
    print(response)
    return 

if __name__=='__main__':
    print(main())
