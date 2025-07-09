# projectCafeeSEP/urls.py
from django.contrib import admin
from django.urls import path, include
from django.contrib.auth import views as auth_views
from django.conf.urls.static import static
from django.conf import settings


urlpatterns = [
    path('admin/', admin.site.urls),
    path('login/', auth_views.LoginView.as_view(template_name='login.html'), name='login'),
    path('logout/', auth_views.LogoutView.as_view(), name='logout'),
    path('', include('main.urls')),
]
# Serve static and media files only in development
if settings.DEBUG:
    # Static files (CSS, JavaScript, Images)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    # Media files (uploads)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

