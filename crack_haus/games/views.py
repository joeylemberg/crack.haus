from games.models import *
from games.serializer import *
from rest_framework.response import Response
from rest_framework.exceptions import APIException
from rest_framework.permissions import AllowAny
from rest_framework import generics, viewsets
from rest_framework import mixins
from rest_framework.decorators import api_view
from django.utils import timezone
import datetime

class CreateListRetrieveViewSet(mixins.CreateModelMixin,
                                mixins.ListModelMixin,
                                mixins.RetrieveModelMixin,
                                viewsets.GenericViewSet):
    """
    A viewset that provides `retrieve`, `create`, and `list` actions.

    To use it, override the class and set the `.queryset` and
    `.serializer_class` attributes.
    """
    pass

class ProfileViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

    # def create(self, request, *args, **kwargs):
    #     print request
    #     res = super(ProfileViewSet, self).create(request, *args, **kwargs)
    #     return res

class NotInMatchException(APIException):
    status_code = 400
    default_detail = "user is not in this match"

class MatchViewSet(viewsets.ModelViewSet):
    queryset = Match.objects.all()
    serializer_class = MatchSerializer
    permission_classes = (AllowAny,)

    def retrieve(self, request, *args, **kwargs):
        res = super(MatchViewSet, self).retrieve(request, *args, **kwargs)
        try:
            player = Player.objects.get(id=request.session['player_id'])
            player.ping()
            print 'got profile'
        except (Player.DoesNotExist, KeyError) as e:
            pass
            #raise NotInMatchException(e)
        return res
    
#    def update(self, request, pk=None, *args, **kwargs):
#        print 'hello world'
#        print request
#        res = super(MatchViewSet, self).update(request, pk, *args, **kwargs)
#        print 'update, pk=', pk
#        return res
    
    def partial_update(self, request, pk=None):
        print 'partial update match', pk, request
        return super(MatchViewSet, self).partial_update(request, pk)
    
class PlayerViewSet(viewsets.ModelViewSet):
    queryset = Player.objects.all()
    serializer_class = PlayerSerializer
    permission_classes = (AllowAny,)

    def pre_save(self, obj):
        print 'hi there'
        obj.profile = self.request.user.profile
        # super(PlayerSerializer, self).pre_save(obj)

    def create(self, request, **kwargs):
        res = super(PlayerViewSet, self).create(request, **kwargs)
        request.session['player_id'] = res.data['id']
        return res
    
    def partial_update(self, request, pk=None):
        print 'partial update', pk, request
        return super(PlayerViewSet, self).partial_update(request, pk)


class GameViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Game.objects.all()
    serializer_class = GameSerializer

    # def retrieve(self, request, *args, **kwargs):
    #     print 'ok'
    #     res = super(GameViewSet, self).retrieve(request, *args, **kwargs)
    #     queryset = Player.objects.filter(last_ping__gte=timezone.now() - timezone.timedelta(seconds=5))
    #     serializer = PlayerSerializer(queryset, many=True, context={'request': request})
    #     player = Player.objects.get(id=request.session['player_id'])
    #     player.last_ping=timezone.now()
    #     player.save()
    #     res.data['players'] = serializer.data
    #     return res
