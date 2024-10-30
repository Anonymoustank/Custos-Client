from django.shortcuts import render
from rest_framework import viewsets
from .serializers import TodoSerializer
from .models import Todo
import os
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.views import View
from dotenv import load_dotenv
import httpx
import urllib.parse

load_dotenv()

@method_decorator(csrf_exempt, name='dispatch')
class TokenView(View):
    async def post(self, request):
        data = json.loads(request.body)
        code = data.get('code')
        redirect_uri = data.get('redirect_uri')
        grant_type = data.get('grant_type')
        code_verifier = data.get('code_verifier')
        clientId = data.get('clientId')

        encoded_code_verifier = urllib.parse.quote(code_verifier)

        async with httpx.AsyncClient() as client:
            try:
                response = await client.post(
                    f'https://api.playground.usecustos.org/api/v1/identity-management/token?code_verifier={encoded_code_verifier}',
                    headers={'Content-Type': 'application/x-www-form-urlencoded'},
                    data={
                        'code': code,
                        'redirect_uri': redirect_uri,
                        'grant_type': grant_type,
                        'client_id': clientId,
                        'code_verifier': code_verifier
                    }
                )
                response.raise_for_status()
                return JsonResponse(response.json())
            except httpx.RequestError as e:
                return JsonResponse({'error': str(e)}, status=500)

@method_decorator(csrf_exempt, name='dispatch')
class UserView(View):
    async def post(self, request):
        data = json.loads(request.body)
        access_token = data.get('access_token')

        async with httpx.AsyncClient() as client:
            try:
                response = await client.get(
                    f'https://api.playground.usecustos.org/api/v1/identity-management/user?access_token={access_token}',
                    headers={
                        'Content-Type': 'application/json',
                        'Authorization': f'Bearer {access_token}',
                    }
                )
                response.raise_for_status()
                return JsonResponse(response.json())
            except httpx.RequestError as e:
                return JsonResponse({'error': str(e)}, status=500)

@method_decorator(csrf_exempt, name='dispatch')
class UserInfoView(View):
    async def post(self, request):
        data = json.loads(request.body)
        access_token = data.get('access_token')
        clientId = data.get('clientId')

        async with httpx.AsyncClient() as client:
            try:
                response = await client.get(
                    f'https://api.playground.usecustos.org/api/v1/user-management/userinfo?client_id={clientId}',
                    headers={
                        'Content-Type': 'application/json',
                        'Authorization': f'Bearer {access_token}',
                    }
                )
                response.raise_for_status()
                return JsonResponse(response.json())
            except httpx.RequestError as e:
                return JsonResponse({'error': str(e)}, status=500)

class TodoView(viewsets.ModelViewSet):
    serializer_class = TodoSerializer
    queryset = Todo.objects.all()
