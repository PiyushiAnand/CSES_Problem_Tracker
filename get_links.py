from pydoc_data.topics import topics

import requests
from bs4 import BeautifulSoup

url = "https://cses.fi/problemset/"
html = requests.get(url).text

soup = BeautifulSoup(html, "html.parser")

sections = soup.find_all("h2")

for section in sections:
    topic = section.text.strip()
    print(f"\n=== {topic} ===")

    nxt = section.find_next("ul")

    if nxt:
        for a in nxt.find_all("a"):
            link = "https://cses.fi" + a["href"]

            if topic not in topics:
                topics[topic] = []
            topics[topic].append({
                "name": a.text.strip(),
                "link": link
            })

with open("topics.json", "w") as f:
    import json
    json.dump(topics, f, indent=4)
    