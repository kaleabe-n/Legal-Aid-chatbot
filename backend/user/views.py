from django.core.mail import EmailMessage
from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework import status
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from rest_framework_simplejwt.tokens import RefreshToken, AccessToken

from .models import *
from .serializers import *

# Create your views here.


def email_text(code: str):
    return """<html>
        <body>
            <h1>Welcome to Legal aid</h1>
            <p>This is your verification code.</p>
            <p style="font-weight:bold">{code}</p>
            <p> If you haven't registered for legal aid just ignore this message.</p>
        </body>
        </html>
        """.format(
        code=code
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
        verification: Verification = Verification.objects.create(
            username=username, full_name=name, password=password
        )
        try:
            email = EmailMessage(
                "Verify legal aid",
                email_text(verification.code),
                "noreply@gmail.com",
                [username],
            )
            email.content_subtype = "html"
            email.body = email_text(verification.code)
            email.send(fail_silently=False)
        except:
            return Response(
                "failed to send verification email",
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
        return Response("verification email has been sent", status=status.HTTP_201_CREATED)
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
        code = code.replace("-","")
        verification: Verification = Verification.objects.get(code=code, username=email)
        print(verification)
        try:
            user = User.objects.create(
                username=verification.username,
                password=verification.password,
                first_name=verification.full_name,
            )
        except:
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
