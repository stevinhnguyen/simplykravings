from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken

from .models import Product, Order, OrderItem, Address, Review


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model=Review
        fields='__all__'


class ProductSerializer(serializers.ModelSerializer):
    reviews = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = Product
        fields = '__all__'

    def get_reviews(self, obj):
        reviews = obj.review_set.all()
        serializer = ReviewSerializer(reviews, many=True)
        return serializer.data


class UserSerializer(serializers.ModelSerializer):
    _id = serializers.SerializerMethodField(read_only=True)
    isAdmin = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['_id', 'username', 'email',
                  'first_name', 'last_name', 'isAdmin']

    def get__id(self, object):
        return object.id

    def get_isAdmin(self, object):
        return object.is_staff


class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['_id', 'username', 'email',
                  'first_name', 'last_name', 'isAdmin', 'token']

    def get_token(self, object):
        token = RefreshToken.for_user(object)
        return str(token.access_token)


class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = '__all__'


class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = '__all__'


class OrderSerializer(serializers.ModelSerializer):
    orderItems = serializers.SerializerMethodField(read_only=True)
    address = serializers.SerializerMethodField(read_only=True)
    user = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Order
        fields = '__all__'

    def get_orderItems(self, object):
        items = object.orderitem_set.all()
        serializer = OrderItemSerializer(items, many=True)
        return serializer.data

    def get_address(self, object):
        try:
            address = AddressSerializer(object.address, many=False).data
        except:
            address = False
        return address
    
    def get_user(self, object):
        user = object.user
        serializer = UserSerializer(user, many=False)
        return serializer.data
