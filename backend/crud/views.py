from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from .models import Blog
from .serializers import BlogSerializer


# I`m going to create views with @api_view for understanding the background logic in the code.

@api_view(['GET', 'POST'])
@permission_classes([AllowAny])
def blog_list(request):
    
    if request.method == 'GET':
        blogs = Blog.objects.all().order_by('-created_at')
        serializer = BlogSerializer(blogs, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        print(request.data)
        if not request.user.is_authenticated:
            return Response({'detail': 'Authentication required'}, status=401)
    try:
        serializer = BlogSerializer(data={'title': request.data['title'], 'content': request.data['content'], 'cover_image': request.data['cover_image'], 'owner': request.user.pk})
        if serializer.is_valid():
            serializer.save(owner = request.user)
            print('working')
            return Response(status=201)
        
        print(serializer.errors)

        
    except Exception as error:
        print(error)
        print(serializer.errors)
    
    return Response(serializer.errors,status=404)

    
@api_view(['GET','PUT','PATCH', 'DELETE'])
@permission_classes([AllowAny])
def blog_detail(request, pk):

    try:
        blog = Blog.objects.get(pk=pk)
    except Blog.DoesNotExist:
        return Response(status=404)
    
    def check_owner_permission(request, blog):
        if not request.user.is_authenticated:
            return Response ({'detail': 'Authorization required'}, status=401)
        if request.user != blog.owner:
            return Response({'detail': 'Not Allowed'}, status= 403)
        
    
    if request.method == 'GET':
        serializer = BlogSerializer(blog)
        return Response(serializer.data)
  
    
    elif request.method == 'PUT':
        permission_check = check_owner_permission(request, blog)
        if permission_check:
            return permission_check
        
        serializer = BlogSerializer(blog, data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(status=400)
    
    
    elif request.method == 'PATCH':
        permission_check = check_owner_permission(request, blog)
        if permission_check:
            return permission_check
      
        serializer = BlogSerializer(blog, data = request.data, partial = True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(status=400)

    elif request.method == 'DELETE':
        permission_check = check_owner_permission(request, blog)
        if permission_check:
            return permission_check
       
        blog.delete()
        return Response(status=204)


