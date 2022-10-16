from django.urls import URLPattern, path
from base.views import order_views as views


urlpatterns = [
    path('', views.getOrders, name='orders'),

    path('add/', views.addOrderItems, name='orders-add'),
    path('myorders/', views.getMyOrders, name='myorders'),

    path('delete/<str:pk>/', views.deleteOrder, name='order-delete'),

    path('<str:pk>/deliver/', views.updateOrderToDelivered, name='order-delivered'),

    path('<str:pk>/', views.getOrderById, name='user-order'),
    path('<str:pk>/pay/', views.updateOrderToPaid, name='pay'),
]
