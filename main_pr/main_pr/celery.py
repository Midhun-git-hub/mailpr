import os
from celery import Celery
from celery.schedules import crontab
from dotenv import load_dotenv

load_dotenv()

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "main_pr.settings")

app = Celery("main_pr")
app.config_from_object("django.conf:settings", namespace="CELERY")
app.autodiscover_tasks()

app.conf.broker_url = os.getenv("REDIS_URL")
app.conf.result_backend = os.getenv("REDIS_URL")

app.conf.beat_schedule = {
    "send-daily-emails": {
        "task": "main_app.tasks.send_daily_emails",
        "schedule": crontab(hour=8, minute=0),  # Every day at 8:00 AM
    },
    "send-weekly-emails": {
        "task": "main_app.tasks.send_weekly_emails",
        "schedule": crontab(hour=9, minute=0, day_of_week=1),  # Every Monday at 9:00 AM
    }
}