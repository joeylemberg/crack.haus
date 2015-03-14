from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Player(models.Model):
    tag = models.CharField(max_length=32)
    peer_id = models.CharField(max_length=32)

    game = models.ForeignKey('Game', related_name='players')
    invited = models.ManyToManyField('Player')


class Game(models.Model):
    name = models.CharField(max_length=128)
    description = models.TextField()
    # online_users = models.PositiveIntegerField(default=0)
    # lobby_users = models.PositiveIntegerField(default=0)



