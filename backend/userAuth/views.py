from django.shortcuts import render
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from rest_framework.response import Response
from rest_framework.decorators import api_view



class CookiesTokenObtainPairSerializer(TokenObtainPairView):

    def post(self, request, *args, **kwargs):

        try:
            response = super().post(request, *args, **kwargs)
            tokens = response.data

            access_token = tokens['access']
            refresh_token = tokens['refresh']

            res = Response()

            res.data = {'success': True}

            res.set_cookie(
                key="access_token",
                value= access_token,
                httponly=True,
                samesite=None,
                secure=True,
                path = '/' # I should modify this path later !!!
    
            )
            res.set_cookie(
                key= "refresh_token",
                value= refresh_token,
                httponly= True,
                samesite= None,
                secure= True,
                path = '/'
  
            )

            return res

        except:

            res.data = {'success': False}
        

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
                httponly=True,
                samesite=None,
                secure=True,
                path = '/'
            )

            return res


        except:
            res.data = {'success': False}


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

    