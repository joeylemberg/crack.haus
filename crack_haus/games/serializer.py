from django.contrib.auth.models import User, Group
from rest_framework import serializers
from django.utils import timezone

from rest_framework import viewsets

from games.models import Game, Player

# Serializers define the API representation.
class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('url', 'username', 'email', 'is_staff')

# ViewSets define the view behavior.
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class PlayerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Player
        fields = ('id', 'tag', 'peer_id', 'game', 'url')

class GameSerializer(serializers.ModelSerializer):
    lobby_size = serializers.IntegerField(source='get_lobby_size', read_only=True)

    class Meta:
        model = Game
        fields = ('url', 'id', 'name', 'description', 'lobby_size')
        depth = 1
