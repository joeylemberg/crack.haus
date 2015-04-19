from games.models import Game, Player
from games.serializer import GameSerializer, PlayerSerializer
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework import generics, viewsets
from django.utils import timezone
import datetime

class PlayerViewSet(viewsets.ModelViewSet):
    queryset = Player.objects.all()
    serializer_class = PlayerSerializer
    permission_classes = (AllowAny,)

    def create(self, request, **kwargs):
        res = super(PlayerViewSet, self).create(request, **kwargs)
        request.session['player_id'] = res.data['id']
        return res

class GameViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Game.objects.all()
    serializer_class = GameSerializer

    def retrieve(self, request, *args, **kwargs):
        res = super(GameViewSet, self).retrieve(request, *args, **kwargs)
        queryset = Player.objects.filter(last_ping__gte=timezone.now() - timezone.timedelta(seconds=5))
        serializer = PlayerSerializer(queryset, many=True, context={'request': request})
        player = Player.objects.get(id=request.session['player_id'])
        player.last_ping=timezone.now()
        player.save()
        res.data['players'] = serializer.data
        return res #Response(serializer.data)
