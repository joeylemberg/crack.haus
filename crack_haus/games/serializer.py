from django.contrib.auth.models import User, Group
from rest_framework import serializers
from django.utils import timezone

from rest_framework import viewsets

from games.models import *

class ProfileSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField()

    class Meta:
        model = Profile
        fields = ('user', 'description', 'colors',)
        depth = 1

class PlayerSerializer(serializers.ModelSerializer):
    profile = serializers.HyperlinkedRelatedField(queryset=Profile.objects.all(), view_name='profile-detail')
    match = serializers.HyperlinkedRelatedField(queryset=Match.objects.all(), view_name='match-detail')
    # profile = serializers.StringRelatedField()

    class Meta:
        model = Player
        fields = ('peer_id', 'profile', 'score', 'result', 'team', 'match')

class MatchSerializer(serializers.ModelSerializer):
    # game = serializers.StringRelatedField()
    state = serializers.CharField(source='get_state_display', read_only=True)
    players = PlayerSerializer(many=True, read_only=True)

    class Meta:
        model = Match
        fields = ('name', 'game', 'players', 'url','state', 'created_at', 'started_at', 'done_at',)
        read_only_fields = ('state','created_at', 'started_at', 'done_at',)

    def create(self, validated_data):
        res = super(MatchSerializer, self).create(validated_data)
        print 'hello'
        print res
        return res

# class LobbySerializer(serializers.ModelSerializer):
#     match = MatchSerializer()
#
#     class Meta:
#         model = Lobby
#         fields = ('match', 'url')
#
#     def create(self, validated_data):
#         match = Match.objects.create(game=validated_data['match']['game'])
#         validated_data['match_id'] = match.id
#         validated_data['game_id'] = match.game.id
#         del validated_data['match']
#         return super(LobbySerializer, self).create(validated_data)

class GameSerializer(serializers.ModelSerializer):
    lobby_size = serializers.IntegerField(source='get_lobby_size', read_only=True)
    lobby_set = MatchSerializer(many=True, source='get_lobbies', read_only=True)
    # lobbies = serializers.HyperlinkedRelatedField(source="match_set.filter(state='j')", view_name='match-detail', queryset=Match.objects.all())
    # match_set = serializers.HyperlinkedRelatedField(many=True, view_name='lobby-detail', lookup_field='game')
    # lobbies = serializers.PrimaryKeyRelatedField(source='get_lobbies', read_only=True)

    class Meta:
        model = Game
        fields = ('url', 'id', 'name', 'description', 'lobby_size', 'lobby_set')
        depth = 1
