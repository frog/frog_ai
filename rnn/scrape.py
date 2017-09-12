from pymongo import MongoClient
from newspaper import Article
import json

if __name__ == "__main__":
    client = MongoClient("mongodb://127.0.0.1/frogai")
    db = client.frogai

    cursor = db.articles.find()
    items = [c["url"] for c in cursor]
    print(items)

    with open("data/canon.txt") as f:
        canon = f.read()
        with open("data/input.txt", "w") as f:
            f.write(canon)

        with open("data/input.txt", "a") as f:
            for url in items:
                article = Article(url)
                article.download()
                article.parse()
                f.write(article.text)
                print(article.text)
