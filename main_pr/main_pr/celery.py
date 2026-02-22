import os
import ssl
from celery import Celery
from celery.schedules import crontab
from dotenv import load_dotenv

load_dotenv()

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "main_pr.settings")

app = Celery("main_pr")
app.config_from_object("django.conf:settings", namespace="CELERY")
app.autodiscover_tasks()

# Redis (Upstash)
app.conf.broker_url = os.getenv("REDIS_URL")
app.conf.result_backend = os.getenv("REDIS_URL")

# Required for rediss:// (Upstash SSL)
app.conf.broker_use_ssl = {
    "ssl_cert_reqs": ssl.CERT_NONE
}

app.conf.redis_backend_use_ssl = {
    "ssl_cert_reqs": ssl.CERT_NONE
}

# Scheduled tasks
app.conf.beat_schedule = {
    "send-daily-emails": {
        "task": "main_app.tasks.send_daily_emails",
        "schedule": crontab(hour=12, minute=20),
    },
    "send-weekly-emails": {
        "task": "main_app.tasks.send_weekly_emails",
        "schedule": crontab(hour=9, minute=0, day_of_week=1),
    }
}