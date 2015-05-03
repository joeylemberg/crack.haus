from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone


class Profile(models.Model):
    user = models.OneToOneField(User)
    # friends = models.ManyToManyField('Profile') # TODO integrate friends
    # picture = models.ImageField(upload_to="img/profile/%Y/%m/%d", null=True, blank=True) # TODO profile pic
    description = models.TextField()
    colors = models.TextField()
    # favorites = models.ManyToManyField('Game') # TODO integrate favorites

    def __unicode__(self):
        return unicode(self.user)

class Lobby(models.Model):
    match = models.ForeignKey('Match', unique=True)
    game = models.ForeignKey('Game')

class Match(models.Model):
    STATE_CHOICES = (
        ('j', 'join'),
        ('p', 'play'),
        ('d', 'done'),
    )

    state = models.CharField(choices=STATE_CHOICES, default='j', max_length=3)
    game = models.ForeignKey('Game')
    # host = models.ForeignKey('Player', related_name='hosted_match')

    created_at = models.DateTimeField(auto_created=True)
    started_at = models.DateTimeField(null=True, blank=True)
    done_at = models.DateTimeField(null=True, blank=True)

class Player(models.Model):
    RESULT_CHOICES = (
        ('w', 'won'),
        ('l', 'lost'),
        ('d', 'draw'),
        ('x', 'dnf'),
    )

    peer_id = models.CharField(max_length=32, unique=True)

    profile = models.ForeignKey('Profile')
    match = models.ForeignKey('Match', related_name='players')

    last_ping = models.DateTimeField(auto_now_add=True)

    score = models.IntegerField(default=0)
    result = models.CharField(RESULT_CHOICES, max_length=1, null=True, blank=True)
    team = models.PositiveSmallIntegerField(null=True, blank=True)

    # game = models.ForeignKey('Game', related_name='players')

    def __unicode__(self):
        return unicode(self.profile)

class Game(models.Model):
    name = models.CharField(max_length=128)
    description = models.TextField()
    # cover_pic = models.ImageField(upload_to="img/game/%Y/%m/%d", null=True, blank=True) # TODO game cover pic

    def __unicode__(self):
        return self.name

    def get_lobby_size(self):
        res = 0
        for match in self.match_set.filter(state='j'):
            res += len(match.players.all())
        return res

    # def get_lobbies(self):
    #     return serializers.GameSerializer(self.match_set.filter(state='j'))

