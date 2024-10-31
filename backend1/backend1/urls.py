from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from todo.views import TokenView, UserView, UserInfoView, TodoView

router = routers.DefaultRouter()
router.register(r'todos', TodoView, 'todo')
from . import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/v1/identity-management/token', TokenView.as_view(), name='token'),
    path('api/v1/identity-management/user', UserView.as_view(), name='user'),
    path('api/v1/user-management/userinfo', UserInfoView.as_view(), name='userinfo'),
    path('toggle-admin/<int:user_id>/', views.toggle_admin_status, name='toggle_admin_status'),  # For Option 1
]