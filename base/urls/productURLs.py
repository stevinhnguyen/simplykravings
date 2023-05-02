from django.urls import path
from base.views import productViews as views

urlpatterns = [
    path('', views.getProducts, name="products"),
    path('create/', views.createProduct, name='product_create'),
    path('upload/', views.uploadImage, name="image_upload"),
    path('top/', views.getTopProducts, name='top_products'),
    path('<str:pk>/reviews/', views.createProductReview, name='product_review'),
    path('update/<str:pk>/', views.updateProduct, name='product_update'),
    path('<str:pk>/', views.getProduct, name="product"),
    path('delete/<str:pk>/', views.deleteProduct, name='product_delete')

]
