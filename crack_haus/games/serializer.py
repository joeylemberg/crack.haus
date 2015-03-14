from django.contrib.auth.models import User, Group
from rest_framework import serializers

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

class GameSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Game
        fields = ('url', 'name', 'description', 'players')

class PlayerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Player
        fields = ('tag', 'peer_id', 'game')