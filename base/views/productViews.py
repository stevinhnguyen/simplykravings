from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework import status

from base.models import Product, Review
from base.serializers import ProductSerializer


@api_view(['GET'])
def getProducts(request):
    query = request.query_params.get('keyword')
    if query == None:
        query = ''
    products = Product.objects.filter(name__icontains=query)
    page = request.query_params.get('page')
    paginator = Paginator(products, 10)
    try:
        products = paginator.page(page)
    except PageNotAnInteger:
        products = paginator.page(1)
    except EmptyPage:
        products = paginator.page(paginator.num_pages)
    if page == None:
        page = 1
    page = int(page)
    serializer = ProductSerializer(products, many=True)
    return Response({
        'products': serializer.data,
        'page': page,
        'pages': paginator.num_pages
    })


@api_view(['GET'])
def getTopProducts(request):
    products = Product.objects.filter(rating__gte=4).order_by('-rating')[0:5]
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getProduct(request, pk):
    product = Product.objects.get(_id=pk)
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteProduct(request, pk):
    productForDeletion = Product.objects.get(_id=pk)
    productForDeletion.delete()
    return Response('Product is deleted')


@api_view(['POST'])
@permission_classes({IsAdminUser})
def createProduct(request):
    user = request.user
    data = request.data
    product = Product.objects.create(
        user=user,
        name='Sample',
        description='Sample',
        category='Sample',
        price=0,
    )
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateProduct(request, pk):
    data = request.data
    product = Product.objects.get(_id=pk)
    product.name = data['name']
    product.description = data['description']
    product.category = data['category']
    product.price = data['price']
    product.save()
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)


@api_view(['POST'])
def uploadImage(request):
    data = request.data
    id = data['id']
    product = Product.objects.get(_id=id)
    product.image = request.FILES.get('image')
    product.save()
    return Response('Image uploaded')


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createProductReview(request, pk):
    user = request.user
    product = Product.objects.get(_id=pk)
    data = request.data
    alreadyExist = product.review_set.filter(user=user).exists()
    if alreadyExist:
        content = {'detail': 'Product already reviewed'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)
    elif data['rating'] == 0:
        content = {'detail': 'Please select a rating'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)
    else:
        review = Review.objects.create(
            user=user,
            product=product,
            name=user.first_name + ' ' + user.last_name,
            rating=data['rating'],
            comment=data['comment']
        )
        reviews = product.review_set.all()
        product.numReviews = len(reviews)
        total = 0
        for review in reviews:
            total += review.rating
        product.rating = total / len(reviews)
        product.save()
        return Response('Review is added')
