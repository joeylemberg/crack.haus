from games.models import Game, Player
from games.serializer import GameSerializer, PlayerSerializer
from rest_framework.response import Response
from rest_framework import generics, viewsets

class PlayerViewSet(viewsets.ModelViewSet):
    queryset = Player.objects.all()
    serializer_class = PlayerSerializer

class GameViewSet(viewsets.ModelViewSet):
    queryset = Game.objects.all()
    serializer_class = GameSerializer
