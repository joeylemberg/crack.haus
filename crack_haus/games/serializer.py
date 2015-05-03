from django.contrib.auth.models import User, Group
from rest_framework import serializers
from django.utils import timezone

from rest_framework import viewsets

from games.models import Game, Player, Profile, Match, Lobby

class ProfileSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField()

    class Meta:
        model = Profile
        fields = ('user', 'description', 'colors',)

class PlayerSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer(read_only=True)

    class Meta:
        model = Player
        fields = ('peer_id', 'profile', 'score', 'result', 'team')

class MatchSerializer(serializers.ModelSerializer):
    players = PlayerSerializer(many=True)

    class Meta:
        model = Match
        fields = ('game', 'state', 'players', 'created_at', 'started_at', 'done_at', 'url')

class LobbySerializer(serializers.ModelSerializer):
    match = MatchSerializer(read_only=True)

    class Meta:
        model = Lobby
        fields = ('match', 'game', 'url')

class GameSerializer(serializers.ModelSerializer):
    lobby_size = serializers.IntegerField(source='get_lobby_size', read_only=True)
    lobby_set = serializers.HyperlinkedRelatedField(many=True, read_only=True, view_name='lobby-detail')
    # lobbies = serializers.PrimaryKeyRelatedField(source='get_lobbies', read_only=True)

    class Meta:
        model = Game
        fields = ('url', 'id', 'name', 'description', 'lobby_size', 'lobby_set')
        depth = 1
