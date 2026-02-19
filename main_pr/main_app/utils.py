import requests, os, random

def get_quote():
    try:
        response = requests.get("https://zenquotes.io/api/random", timeout=5)
        data = response.json()[0]
        return f"Motivational Quote:\n\"{data['q']}\" - {data['a']}"
    except:
        return 'Motivational Quote:\n"Keep pushing forward!" - Unknown'

def get_finance_update():
    try:
        api_key = os.getenv("NEWS_API_KEY")
        url = f"https://newsapi.org/v2/everything?q=finance&language=en&pageSize=3&apiKey={api_key}"
        response = requests.get(url, timeout=5)
        articles = response.json().get("articles", [])
        content = "Finance News:\n"
        for article in articles:
            content += f"- {article['title']}\n"
        return content
    except:
        return "Finance News:\n- Unable to fetch news at the moment."

def get_stock_update():
    try:
        api_key = os.getenv("ALPHA_VANTAGE_KEY")
        url = f"https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=SPY&apikey={api_key}"
        response = requests.get(url, timeout=5)
        data = response.json().get("Global Quote", {})
        price = data.get("05. price", "N/A")
        change = data.get("10. change percent", "N/A")
        return f"Stock Update:\nSPY Price: ${price} ({change})"
    except:
        return "Stock Update:\nUnable to fetch stock data at the moment."

def get_workout_plan():
    workouts = [
        "20 Pushups\n20 Squats\n30-sec Plank",
        "15 Burpees\n20 Lunges\n1-min Plank",
        "30-sec Jump Rope\n15 Pushups\n15 Situps",
    ]
    return "Workout tips:\n" + random.choice(workouts)
