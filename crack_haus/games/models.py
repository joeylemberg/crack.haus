from django.db import models
from django.contrib.auth.models import User

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



