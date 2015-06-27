from django.conf.urls import patterns, include, url
from django.contrib import admin
from games.views import *
from rest_framework import routers
from django.views.generic import TemplateView

# Routers provide an easy way of automatically determining the URL conf.
router = routers.DefaultRouter()
router.register(r'players', PlayerViewSet)
router.register(r'games', GameViewSet)
router.register(r'matches', MatchViewSet)
# router.register(r'lobbies', LobbyViewSet)
router.register(r'profiles', ProfileViewSet)

urlpatterns = patterns('',
    # Examples:
    url(r'^docs/', include('rest_framework_swagger.urls')),

    url(r'^lobby/$', TemplateView.as_view(template_name='games/lobby.html'), name='lobby'),

    # url(r'^blog/', include('blog.urls')),

    url(r'^api/', include(router.get_urls())),
    # url(r'^', include('games.urls')),

    url(r'', include('social_auth.urls')),

    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),


    url(r'^admin/', include(admin.site.urls)),

    url(r'', TemplateView.as_view(template_name='games/index.html'), name='home'),

)
