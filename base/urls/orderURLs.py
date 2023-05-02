from django.urls import path
from base.views import orderViews as views

urlpatterns = [
    path('add/', views.addOrderItems, name='orders_add'),
    path('myorders/', views.getMyOrders, name='my_orders'),
    path('', views.getOrders, name='orders'),
    path('<str:pk>/deliver/', views.updateOrderToDelivered, name='order_delivered'),
    path('<str:pk>/', views.getOrderById, name='user_order'),
    path('<str:pk>/pay/', views.updateOrderToPaid, name='paid'),
]