from celery import shared_task
from django.contrib.auth.models import User
import os
import requests
from .utils import (
    get_quote,
    get_finance_update,
    get_stock_update,
    get_workout_plan,
    build_email_content,
)


def send_resend_email(to_email, subject, message):
    response = requests.post(
        "https://api.resend.com/emails",
        headers={
            "Authorization": f"Bearer {os.getenv('RESEND_API_KEY')}",
            "Content-Type": "application/json",
        },
        json={
            "from": "onboarding@resend.dev",
            "to": [to_email],
            "subject": subject,
            "text": message,
        },
    )

    print("Status:", response.status_code)
    print("Response:", response.text)

    return response.status_code


@shared_task
def send_daily_emails():
    quote = get_quote()
    finance = get_finance_update()
    stock = get_stock_update()
    workout = get_workout_plan()

    message = f"{quote}\n\n{finance}\n\n{stock}\n\n{workout}"

    users = User.objects.all()
    for user in users:
        send_resend_email(
            user.email,
            "Your Daily Update 🚀",
            message,
        )

    return "Daily emails sent!"


@shared_task
def send_weekly_emails():
    weekly_users = User.objects.filter(preference__frequency="weekly")

    for user in weekly_users:
        content = build_email_content(user)

        if content:
            send_resend_email(
                user.email,
                "Your Weekly Update 🚀",
                content,
            )

    return f"Weekly emails sent to {weekly_users.count()} users!"


@shared_task
def send_test_email_task(user_email):
    return send_resend_email(
        user_email,
        "Test Email 🚀",
        "If you're seeing this, everything is set! 🎉 Just see this as a test of your email configuration.",
    )