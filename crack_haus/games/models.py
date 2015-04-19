from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

# Create your models here.
class Player(models.Model):
    tag = models.CharField(max_length=32, unique=True)
    peer_id = models.CharField(max_length=32, unique=True)

    game = models.ForeignKey('Game', related_name='players')
    invited = models.ManyToManyField('Player')

    last_ping = models.DateTimeField(auto_now_add=True)

    def __unicode__(self):
        return self.tag

class Game(models.Model):
    name = models.CharField(max_length=128)
    description = models.TextField()

    def __unicode__(self):
        return self.name

    def get_lobby_size(self):
        return len(self.players.filter(last_ping__gte=timezone.now() - timezone.timedelta(seconds=5)))

