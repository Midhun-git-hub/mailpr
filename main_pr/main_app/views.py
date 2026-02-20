from django.shortcuts import render
from rest_framework.decorators import api_view , permission_classes
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework.response import Response
from rest_framework import status
from .tasks import send_test_email_task
from .serializers import *
from .models import *
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from django.core.mail import send_mail
import random
import requests
import os
from dotenv import load_dotenv
from django.conf import settings
load_dotenv()
# Create your views here.

# Registration API
@api_view(['POST'])
def register(request):
    serializer = RegistrationSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"Message":"User Created Successfully"},status=status.HTTP_201_CREATED)
    return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)   


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def protected(request):
    return Response({"message":"You are authenticated","user":request.user.username})

@api_view(['GET','POST','PUT'])
@permission_classes([IsAuthenticated])
def user_preference(request):
    try:
        preference = UserPreference.objects.get(user=request.user)
    except UserPreference.DoesNotExist:
        preference = None
    if request.method == 'GET':
        if preference:
            serializer = UserPreferenceSerializer(preference)
            return Response(serializer.data)
        return Response({"message": "User preference not found"},status=status.HTTP_404_NOT_FOUND)
    elif request.method == 'POST':
        serializer = UserPreferenceSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'PUT':
        if not preference:
            return Response({"message":"First create a preference using POST method"},status=status.HTTP_404_NOT_FOUND)
        serializer = UserPreferenceSerializer(preference,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
        

class RegisterView(APIView):
    permission_classes = [AllowAny]
    
    def post(self,request):
        serializer = RegistrationSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            refresh = RefreshToken.for_user(user)
            return Response({
                "refresh":str(refresh),
                "access":str(refresh.access_token)
            },status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    
    
@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def update_email(request):
    user = request.user
    new_email = request.data.get("email")

    if not new_email:
        return Response({"error": "Email required"}, status=400)

    user.email = new_email
    user.save()

    return Response({"message": "Email updated successfully"})


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def send_test_email(request):
    user = request.user

    send_test_email_task.delay(user.email)

    return Response({"message": "Email queued successfully 🚀"})




@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def change_password(request):
    user = request.user

    current_password = request.data.get("current_password")
    new_password = request.data.get("new_password")

    if not user.check_password(current_password):
        return Response({"error": "Wrong password"}, status=400)

    user.set_password(new_password)
    user.save()

    return Response({"message": "Password updated successfully"})


def build_email_content(user):
    
    pref , created =UserPreference.objects.get_or_create(user=user)
    content=''

    if pref.receive_motivation:
        content += get_quote() + "\n\n"
        
    if pref.receive_finance:
        content += get_finance_update() + "\n\n"

    if pref.receive_stocks:
        content += get_stock_update() + "\n\n"
        
    if pref.receive_workout:
        content += get_workout_plan() + "\n\n"
    
    return content

def get_quote():
    try:
        response= requests.get("https://zenquotes.io/api/random" , timeout=5) 
        data = response.json()[0]

        return f"Motivational Quote:\n\"{data['q']}\" - {data['a']}"
    except:
        return "Motivational Quote:\n\"Keep pushing forward!\" - Unknown"
    
def get_finance_update():
    try:
        api_key = os.getenv("NEWS_API_KEY")
        url = (
            f"https://newsapi.org/v2/everything?"
            f"q=finance&language=en&pageSize=3&apiKey={api_key}"
        )
        response= requests.get(url, timeout=5)
        articles = response.json().get("articles", [])
        
        content="Finance News:\n"
        for article in articles:
            content += f"- {article['title']}\n"
        return content
    except:
        return "Finance News:\n- Unable to fetch news at the moment."
    
def get_stock_update():
    try:
        api_key = os.getenv("ALPHA_VANTAGE_KEY")
        url = (
            f"https://www.alphavantage.co/query?"
            f"function=GLOBAL_QUOTE&symbol=SPY&apikey={api_key}"
        )
        
        response = requests.get(url, timeout=5)
        data = response.json().get("Global Quote", {})
        
        price= data.get("05. price", "N/A")
        change = data.get("10. change percent", "N/A")
        
        return f"Stock Update:\nSPY Price: ${price} ({change})"
    except:
        return "Stock Update:\nUnable to fetch stock data at the moment."
    
    
def get_workout_plan():
    workout = [
        "20 Pushups\n20 Squats\n30-sec Plank",
        "15 Burpees\n20 Lunges\n1-min Plank",
        "30-sec Jump Rope\n15 Pushups\n15 Situps",
    ]
    return ('Workout tips \n'f"{random.choice(workout)}")

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def send_my_email(request):
    user = request.user

    content = build_email_content(user)

    if not content:
        return Response({"message": "No content selected in preferences"}, status=400)
    send_mail(
        subject="Your Daily Update 🚀",
        message=content,
        from_email=settings.EMAIL_HOST_USER,
        recipient_list=[user.email],
    )

    return Response({"message": "Email sent"})