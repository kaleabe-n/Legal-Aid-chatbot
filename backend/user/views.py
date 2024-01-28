from django.core.mail import EmailMessage
from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework import status
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from rest_framework_simplejwt.tokens import RefreshToken
import requests
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import get_user_model

from .models import *
from .serializers import *

from random import randint

# Create your views here.


def email_text(name: str, code: str):
    return """<!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <title>Legal Aid Email Verification</title>
        </head>
        <body>
            <div style="max-width: 600px; margin: 0 auto;">
                <h1>Legal Aid Email Verification</h1>
                <p>Dear {name},</p>
                <p>Thank you for signing up with Legal Aid. Please use the verification code below to complete your registration:</p>
                <div style="background-color: #f2f2f2; padding: 10px; font-size: 18px; font-weight: bold;">
                    <span style="color: #555;">{code}</span>
                </div>
                <p>Copy and paste the above verification code into the verification field on our website to verify your email address.</p>
                <p>If you did not sign up for an account, please ignore this email.</p>
                <p>Thank you,</p>
                <p>Legal Aid</p>
            </div>
        </body>
        </html>
        """.format(
        name=name, code=code
    )


@api_view(["POST"])
@permission_classes([AllowAny])
def register(request: Request) -> Response:
    data = request.POST
    username: str = data.get("email", None)
    if username is None:
        return Response("email is required field", status=status.HTTP_400_BAD_REQUEST)
    name: str = data.get("name", None)
    if not name:
        return Response("name is required", status=status.HTTP_400_BAD_REQUEST)
    try:
        User.objects.get(username=username)
        return Response("email already used", status=status.HTTP_400_BAD_REQUEST)
    except:
        pass
    password: str = data.get("password", None)
    if not password:
        return Response("password is required", status=status.HTTP_400_BAD_REQUEST)
    password = make_password(password)
    try:
        prev_verifcations = Verification.objects.filter(username=username)
        prev_verifcations.delete()
    except:
        pass

    try:
        new_code = randint(0, 899999) + 100000
        verification: Verification = Verification.objects.create(
            username=username, full_name=name, password=password, code=new_code
        )
        try:
            email = EmailMessage(
                "Verify legal aid",
                email_text(name, verification.code),
                "noreply@gmail.com",
                [username],
            )
            email.content_subtype = "html"
            email.body = email_text(name, verification.code)
            email.send(fail_silently=False)
        except Exception as e:
            print(e)
            return Response(
                "failed to send verification email",
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
        return Response(
            "verification email has been sent", status=status.HTTP_201_CREATED
        )
    except Exception as e:
        print(e)
        return Response(
            "failed to create user", status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )


@api_view(["POST"])
@permission_classes([AllowAny])
def verify(request: Request):
    data = request.POST
    email: str = data.get("email", None)
    if not email:
        return Response(
            "email is required for veificaiton", status=status.HTTP_400_BAD_REQUEST
        )
    code: str = data.get("code", None)
    if not code:
        return Response(
            "verification code is required", status=status.HTTP_400_BAD_REQUEST
        )

    try:
        code = code.strip()
        code = code.replace("-", "")
        verification: Verification = Verification.objects.get(code=code, username=email)
        try:
            try:
                prev_users = User.objects.filter(username=verification.username)
                prev_users.delete()
            except:
                pass
            user = User.objects.create(
                username=verification.username,
                password=verification.password,
                first_name=verification.full_name,
            )
            user.is_superuser = verification.is_superuser
            user.is_staff = verification.is_superuser
            user.save()
        except Exception as e:
            print(e)
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)
        refresh_token = str(refresh)
        serilizer: UserSerilizer = UserSerilizer(user)
        data = {
            "access": access_token,
            "refresh": refresh_token,
            "user": serilizer.data,
        }
        try:
            verification.delete()
        except:
            pass

        return Response(data, status=status.HTTP_201_CREATED)
    except Exception as e:
        print(e)
        return Response("verification does not exits", status=status.HTTP_404_NOT_FOUND)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_curr_user(request: Request):
    user = request.user
    serilizer: UserSerilizer = UserSerilizer(user)
    return Response(serilizer.data, status=status.HTTP_200_OK)


@api_view(["GET"])
@permission_classes([IsAdminUser])
def get_all_users(request: Request) -> Response:
    try:
        params = request.query_params
        all_users: [User] = User.objects.all()
        per_page = int(params.get("per_page", 100000000))
        page = int(params.get("page", 0))
        start = page * per_page
        end = start + per_page
        users = all_users[start:end]
        user_serilizer: UserSerilizer = UserSerilizer(users, many=True)
        return Response(
            {
                "data": user_serilizer.data,
                "total": all_users.count(),
                "curr_page": page,
            }
        )
    except Exception as e:
        print(e)
        return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(["GET"])
@permission_classes([IsAdminUser])
def get_single_user(request: Request, email) -> Response:
    try:
        user: User = User.objects.get(username=email)
    except:
        return Response(status=status.HTTP_404_NOT_FOUND)
    try:
        user_serilizer: UserSerilizer = UserSerilizer(user)
        return Response(user_serilizer.data)
    except Exception as e:
        print(e)
        return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def update_user(request: Request):
    try:
        user: User = request.user
        email: str = user.username
    except:
        return Response(
            "user with this email is not found", status=status.HTTP_404_NOT_FOUND
        )
    data = request.data
    new_email = data.get("email", None)
    if new_email is None:
        return Response("email is required", status=status.HTTP_400_BAD_REQUEST)
    if "name" not in data:
        return Response("email is required", status=status.HTTP_400_BAD_REQUEST)
    try:
        prev_verifcations = Verification.objects.filter(username=new_email)
        prev_verifcations.delete()
    except:
        pass
    try:
        if new_email == email:
            try:
                if "password" not in data:
                    password: str = user.password
                else:
                    password: str = make_password(data.get("password"))
                user.password = password
                user.first_name = data.get("name")
                user.save()
                return Response(status=status.HTTP_200_OK)
            except Exception as e:
                return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            username = new_email
            full_name = data.get("name", user.first_name)
            if "password" not in data:
                password: str = user.password
            else:
                password: str = make_password(data.get("password"))
            try:
                new_code = randint(0, 899999) + 100000
                verification: Verification = Verification.objects.create(
                    username=username,
                    full_name=full_name,
                    password=password,
                    is_superuser=user.is_superuser,
                    code=new_code,
                )
            except Exception as e:
                print(e)
                return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            try:
                email = EmailMessage(
                    "Verify legal aid",
                    email_text(full_name, verification.code),
                    "noreply@gmail.com",
                    [username],
                )
                email.content_subtype = "html"
                email.body = email_text(full_name, verification.code)
                email.send(fail_silently=False)
                user.delete()
            except:
                return Response(
                    "failed to send verification email",
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR,
                )
            return Response(
                "verification email has been sent", status=status.HTTP_201_CREATED
            )
    except Exception as e:
        print(e)
        return Response(
            "failed to update user", status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@api_view(["POST"])
@permission_classes([AllowAny])
def signInWithGoogle(request: Request):
    token = request.data.get('token')
    google_info = requests.get(f'https://www.googleapis.com/oauth2/v3/tokeninfo?access_token={token}')
    if google_info.status_code != 200:
        return Response({"error": "Invalid token"}, status=status.HTTP_400_BAD_REQUEST)
    google_data = google_info.json()

    # Get or create user from database
    User = get_user_model()
    user, created = User.objects.get_or_create(email=google_data['email'], defaults={
        'username': google_data['email']
    })

    # Generate JWT token
    refresh = RefreshToken.for_user(user)
    jwt_token = {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }

    return Response(jwt_token)