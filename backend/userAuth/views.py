from django.shortcuts import render
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.permissions import IsAuthenticated
from .serializer import RegistrationSerializer




class CookiesTokenObtainPairView(TokenObtainPairView):

    def post(self, request, *args, **kwargs):

        try:
            response = super().post(request, *args, **kwargs)
            tokens = response.data
            print(response.data)

            access_token = tokens['access']
            refresh_token = tokens['refresh']

            res = Response()

            res.data = {'success': True}

            res.set_cookie(
                key="access_token",
                value= access_token,
                samesite= 'None',
                secure=True,
                path = '/', # I should modify this path later !!!
                max_age= 3600
            )
            res.set_cookie(
                key= "refresh_token",
                value= refresh_token,
                samesite= 'None',
                secure= True,
                path = '/',
                max_age= 5*3600

  
            )
            return res
            
        except:

            return Response({"success": False})
        

class CookiesTokenRefreshView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        try:
            refresh_token = request.COOKIES.get('refresh_token')
            request.data['refresh'] = refresh_token

            response = super().post(request, *args, *kwargs)
            tokens = response.data

            access_token = tokens['access']

            res = Response()

            res.data = {'success': True}

            res.set_cookie(
                key= 'access_token',
                value= access_token,
                # httponly=True,
                samesite= 'None',
                secure=True,
                path = '/',
                max_age= 3600

            )

            return res


        except:
            res.data = {'success': False}

@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    serializer = RegistrationSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.error)


@api_view(['POST'])
def logout(request):
    try:
        res = Response()
        res.data = {"success": True}
        res.delete_cookie('access_token',path='/', samesite = 'None')
        res.delete_cookie('refresh_token', path='/', samesite = 'None')
        return res

    except:
        return Response({"success": False}) 


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def is_authenticated(request):
    return Response({'authenticated': True})


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def current_user(request):
    user = request.user
    return Response({
        'id': user.id,
        'username': user.username   
    })

