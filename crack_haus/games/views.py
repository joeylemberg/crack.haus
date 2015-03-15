from games.models import Game, Player
from games.serializer import GameSerializer, PlayerSerializer
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework import generics, viewsets

class PlayerViewSet(viewsets.ModelViewSet):
    queryset = Player.objects.all()
    serializer_class = PlayerSerializer
    permission_classes = AllowAny

class GameViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Game.objects.all()
    serializer_class = GameSerializer
