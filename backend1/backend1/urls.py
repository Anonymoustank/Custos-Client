from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from todo.views import TokenView, UserView, UserInfoView, TodoView, AddAdmin, RemoveAdmin

router = routers.DefaultRouter()
router.register(r'todos', TodoView, 'todo')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/v1/identity-management/token', TokenView.as_view(), name='token'),
    path('api/v1/identity-management/user', UserView.as_view(), name='user'),
    path('api/v1/user-management/userinfo', UserInfoView.as_view(), name='userinfo'),
    path('api/v1/group-management/addAdmin', AddAdmin.as_view(), name='addAdmin'),
    path('api/v1/group-management/removeAdmin', RemoveAdmin.as_view(), name='removeAdmin'),
]