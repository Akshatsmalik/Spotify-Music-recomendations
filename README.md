# Spotify Music Recommendation System

## Overview
This project is a web-based music recommendation system built using a Spotify dataset. It consists of a React (Vite) frontend and a Python (FastAPI) backend. The application takes a song ID as input and returns a curated list of similar songs that you might enjoy.

## How It Works (The Approach)
The recommendation engine uses a powerful combination of **Clustering** and **Content-Based Filtering (Cosine Similarity)** to deliver fast results. 

1. **Clustering**: During the initial data processing phase, songs are grouped into 40 distinct clusters based on their audio features (such as acousticness, danceability, energy, tempo, etc.). This information, along with vector representations of each song, is stored in a `.pickle` dataset.
2. **Filtering**: When you request a recommendation for a specific song, the backend first identifies which cluster that target song belongs to.
3. **Similarity Calculation**: It then computes the **Cosine Similarity** between your requested song's vector and the vectors of all other songs *only within that specific cluster*. 
4. **Ranking**: The songs are ranked by their similarity scores. The highest-scoring songs are selected and returned to the user via the frontend.

## Efficiency of the Approach
This approach is **highly computationally efficient** at runtime:
- By first categorizing songs into clusters, the system drastically reduces the search space. Instead of calculating cosine similarity across the entire dataset (which could be millions of songs), it only compares the target song against a small subset (songs in the exact same cluster).
- This ensures response times remain incredibly fast (O(M) instead of O(N), where M is the cluster size and N is the total dataset size), making it well-suited for real-time web applications.

## Drawbacks & Potential Fixes

### 1. The "Cold Start" and Precomputation Dependency
* **Drawback**: The system relies entirely on a precomputed `.pickle` dataset. If a user queries a song ID that wasn't in the original dataset during the clustering phase, the system throws an `IndexError` and fails to return recommendations. Similarly, adding new trending songs requires re-running the entire ML clustering pipeline.
* **How to Fix**: Integrate the Spotify Web API on the backend. If a queried song ID isn't found locally, fetch its audio features directly from Spotify, vectorize it on-the-fly, assign it to the nearest existing cluster using a trained ML model, and then compute similarities. 

### 2. High Memory Consumption & Poor Scalability
* **Drawback**: The backend loads the entire dataset into memory (RAM) using Pandas at startup. While this works for a few million rows, it does not scale. A massive dataset would exhaust the server's memory, making deployment expensive.
* **How to Fix**: Migrate the vectorized data to a dedicated **Vector Database** (e.g., Pinecone, Milvus, Qdrant) or use Approximate Nearest Neighbor (ANN) libraries like FAISS or Annoy. This completely eliminates the need to load the dataset into RAM and removes the need for clustering altogether, allowing lightning-fast similarity searches globally.

### 3. Rigid Cluster Boundaries
* **Drawback**: By strictly limiting recommendations to the exact same cluster, the system might miss out on highly relevant songs that were "borderline" and mathematically ended up in an adjacent cluster.
* **How to Fix**: Instead of hard-filtering by a single cluster, expand the search space to include the target song's 2 or 3 nearest clusters, or simply rely on a Vector Database (as mentioned above) to inherently solve this boundary issue.

## FAQ & Design Choices

### Is this a Content-Based Filtering system?
**Yes.** Because the recommendation engine analyzes the intrinsic attributes (audio features like acousticness, energy, danceability) of the songs themselves rather than relying on user interaction history (like Collaborative Filtering does), it is fundamentally a **Content-Based Filtering** system.

### Could we have used DBSCAN for clustering?
While **DBSCAN** (Density-Based Spatial Clustering of Applications with Noise) is a powerful algorithm, it presents a few challenges for this specific architecture:
1. **Uneven Cluster Sizes**: DBSCAN groups data by density. In high-dimensional audio feature space, it often results in one massive cluster containing 90% of the dataset, and many tiny clusters. Since this app uses clustering specifically to *reduce the search space* for the cosine similarity calculation, having one massive cluster defeats the efficiency purpose (your O(M) time complexity would spike back up).
2. **The "Noise" Problem**: DBSCAN inherently identifies outliers as "noise" (points not belonging to any cluster). If a user queries a song that was classified as noise, the system wouldn't have a specific cluster to search within, breaking the current filtering logic.
3. **Curse of Dimensionality**: DBSCAN relies heavily on distance thresholds (`eps`). In a multi-dimensional space like song vectors, finding a meaningful `eps` that perfectly captures density without bleeding into other genres is incredibly difficult. Algorithms like K-Means (which allows explicitly defining `K` clusters to ensure manageable chunk sizes) tend to be more practical for this specific "search-space reduction" technique.
