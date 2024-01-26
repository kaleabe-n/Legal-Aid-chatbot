from django.shortcuts import render
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAdminUser,IsAuthenticated
from rest_framework import status
from rest_framework.request import Request
from rest_framework.response import Response
from .models import Message
from .serilizers import *
from django.contrib.auth.models import User

# Create your views here.

@api_view(["GET","POST"])
@permission_classes([IsAuthenticated])
def message_api(request:Request)->Response:
    if request.method == "GET":
        user:User = request.user
        try:
            params = request.query_params
            all_messages:[Message] = Message.objects.filter(user=user)
            per_page = int(params.get("per_page", 100000000))
            page = int(params.get("page", 0))
            start = page * per_page
            end = start + per_page
            messages = all_messages[start:end]
            message_serilizer: MessageSerilizer = MessageSerilizer(
                messages, many=True
            )
            return Response(
                {
                    "data": message_serilizer.data,
                    "total": all_messages.count(),
                    "curr_page": page,
                }
            )
        except Exception as e:
            print(e)
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
    if request.method == "POST":
        data = request.POST
        user:User = request.user
        content = data.get('content',None)
        if content == None:
            return Response("content is required",status=status.HTTP_400_BAD_REQUEST)
        try:
            message = Message.objects.create(content=content,user=user,is_user_message=True)
            message_serilizer:MessageSerilizer = MessageSerilizer(message)
            
            # the model is added here after development is completed
            answer:str = "this feature is under development"
            response_message = Message.objects.create(content=answer,user=user,is_user_message=False)
            response_message_serilizer:MessageSerilizer = MessageSerilizer(response_message)
            response_obj = {
                "request":message_serilizer.data,
                "response":response_message_serilizer.data
            }
            return Response(response_obj,status=status.HTTP_201_CREATED)
        except Exception as e:
            print(e)
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        
@api_view(["DELETE","GET"])
@permission_classes([IsAuthenticated])
def single_message_api(request:Request,pk:str)->Response:
    user:User = request.user
    try:
        message:Message = Message.objects.get(id=pk)
    except Exception as e:
        return Response("message not found",status=status.HTTP_404_NOT_FOUND)
    if message.user != user and not user.is_superuser:
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    if request.method == "DELETE":
        try:
            message.delete()
            return Response(status=status.HTTP_200_OK)
        except Exception as e:
            print(e)
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    if request.method == "GET":
        try:
            message_serilizer:MessageSerilizer = MessageSerilizer(message)
            return Response(message_serilizer.data)
        except Exception as e:
            print(e)
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    
    
@api_view(["GET"])
@permission_classes([IsAdminUser])
def get_message_by_user(request:Request,email:str)->Response:
    try:
        user:User = User.objects.get(username=email)
    except Exception as e:
        print(e)
        return Response(status=status.HTTP_404_NOT_FOUND)
    try:
        params = request.query_params
        all_messages:[Message] = Message.objects.filter(user=user)
        per_page = int(params.get("per_page", 100000000))
        page = int(params.get("page", 0))
        start = page * per_page
        end = start + per_page
        messages = all_messages[start:end]
        message_serilizer: MessageSerilizer = MessageSerilizer(
            messages, many=True
        )
        return Response(
            {
                "data": message_serilizer.data,
                "total": all_messages.count(),
                "curr_page": page,
            }
        )
    except Exception as e:
        return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
        

    