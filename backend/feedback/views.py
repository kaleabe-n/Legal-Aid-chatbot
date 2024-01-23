from django.shortcuts import render
from rest_framework.decorators import permission_classes, api_view
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser
from rest_framework.request import Request
from rest_framework.response import Response
from django.contrib.auth.models import User
from rest_framework import status
from .models import *
from .serilizers import *

# Create your views here.


@api_view(["POST", "GET"])
@permission_classes([IsAuthenticated])
def feedback_api(request: Request):
    user: User = request.user
    if request.method == "POST":
        data = request.data
        content: str = data.get("content", None)
        if content == None:
            return Response("content is required", status=status.HTTP_400_BAD_REQUEST)
        try:
            feedback: Feedback = Feedback.objects.create(
                posted_by=user, content=content
            )
            feedback_serilizer: FeedbackSerilizer = FeedbackSerilizer(feedback)
            return Response(feedback_serilizer.data, status=status.HTTP_201_CREATED)
        except Exception as e:
            print(e)
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    elif request.method == "GET":
        if not user.is_superuser:
            print(user)
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        try:
            feedbacks: [Feedback] = Feedback.objects.all()
            feedback_serilizer: FeedbackSerilizer = FeedbackSerilizer(
                feedbacks, many=True
            )
            return Response(feedback_serilizer.data)
        except Exception as e:
            print(e)
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(["PUT", "DELETE", "GET"])
@permission_classes([IsAuthenticated])
def single_feedback_api(request: Request, pk: str):
    user: User = request.user
    if request.method == "PUT":
        content: str = request.data.get("content", None)
        if content == None:
            return Response("content is required", status=status.HTTP_400_BAD_REQUEST)
        try:
            feedback: Feedback = Feedback.objects.get(id=pk)
            feedback_giver: User = feedback.posted_by
        except Exception as e:
            print(e)
            return Response(
                "feedback with this id not found", status=status.HTTP_404_NOT_FOUND
            )
        if not user.is_superuser and feedback_giver != user:
            print(feedback_giver, user)
            return Response(
                "you are not allowed to edit this feedback",
                status=status.HTTP_401_UNAUTHORIZED,
            )
        try:
            feedback.content = content
            feedback.save()
            feedback_serilizer: FeedbackSerilizer = FeedbackSerilizer(feedback)
            return Response(feedback_serilizer.data, status=status.HTTP_200_OK)
        except Exception as e:
            print(e)
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    elif request.method == "DELETE":
        try:
            feedback: Feedback = Feedback.objects.get(id=pk)
            feedback_giver: User = feedback.posted_by
        except Exception as e:
            print(e)
            return Response(
                "feedback with this id not found", status=status.HTTP_404_NOT_FOUND
            )
        if not user.is_superuser and feedback_giver != user:
            return Response(
                "you are not allowed to delete this feedback",
                status=status.HTTP_401_UNAUTHORIZED,
            )
        try:
            feedback.delete()
            return Response(status=status.HTTP_200_OK)
        except Exception as e:
            print(e)
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    elif request.method == "GET":
        try:
            feedback: Feedback = Feedback.objects.get(id=pk)
            feedback_giver: User = feedback.posted_by
        except Exception as e:
            print(e)
            return Response(
                "feedback with this id not found", status=status.HTTP_404_NOT_FOUND
            )
        if not user.is_superuser and feedback_giver != user:
            return Response(
                "you are not allowed to access this feedback",
                status=status.HTTP_401_UNAUTHORIZED,
            )
        try:
            feedback_serilizer: FeedbackSerilizer = FeedbackSerilizer(feedback)
            return Response(feedback_serilizer.data)
        except Exception as e:
            print(e)
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_my_feedbacks(request: Request):
    try:
        feedbacks: [Feedback] = Feedback.objects.filter(posted_by=request.user)
        feedback_serilizer: FeedbackSerilizer = FeedbackSerilizer(feedbacks, many=True)
        return Response(feedback_serilizer.data)
    except Exception as e:
        print(e)
        return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(["GET"])
@permission_classes([IsAdminUser])
def get_feedback_by_user(request: Request, email):
    try:
        user: User = User.objects.get(username=email)
    except Exception as e:
        return Response("user not found", status=status.HTTP_404_NOT_FOUND)
    try:
        feedbacks: [Feedback] = Feedback.objects.filter(posted_by=user)
        feedback_serilizer: FeedbackSerilizer = FeedbackSerilizer(feedbacks, many=True)
        return Response(feedback_serilizer.data)
    except Exception as e:
        print(e)
        return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
