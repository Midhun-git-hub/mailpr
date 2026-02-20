from celery import shared_task
from django.core.mail import send_mail
from django.contrib.auth.models import User
import os
from .utils import get_quote, get_finance_update, get_stock_update, get_workout_plan, build_email_content
from django.conf import settings
from . models import UserPreference

@shared_task
def send_daily_emails():
    quote = get_quote()
    finance = get_finance_update()
    stock = get_stock_update()
    workout = get_workout_plan()

    message = f"{quote}\n\n{finance}\n\n{stock}\n\n{workout}"

    users = User.objects.all()
    for user in users:
        send_mail(
            "Your Daily Update 🚀",
            message,
            settings.EMAIL_HOST_USER,
            [user.email],
        )
    return "Emails Sent!"

@shared_task
def send_weekly_emails():
    # Get only users who opted for weekly emails
    weekly_users = User.objects.filter(preference__frequency='weekly')

    for user in weekly_users:
        content = build_email_content(user)  # respects motivation, finance, stocks, workout

        if content:  # only send if content exists
            send_mail(
                subject="Your Weekly Update 🚀",
                message=content,
                from_email=settings.EMAIL_HOST_USER,
                recipient_list=[user.email],
            )

    return f"Weekly emails sent to {weekly_users.count()} users!"

@shared_task
def send_test_email_task(user_email):
    send_mail(
        "Test Email 🚀",
        "This is a test email from your app!",
        "m20787549@gmail.com",
        [user_email],
        fail_silently=False,
    )

