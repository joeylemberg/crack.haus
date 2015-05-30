from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save, pre_delete, pre_save
from django.dispatch import receiver
from django.utils import timezone


class Profile(models.Model):
    user = models.OneToOneField(User, null=True, blank=True)
    # friends = models.ManyToManyField('Profile') # TODO integrate friends
    # picture = models.ImageField(upload_to="img/profile/%Y/%m/%d", null=True, blank=True) # TODO profile pic
    tag = models.CharField(max_length=15, unique=True)
    description = models.TextField(null=True, blank=True)
    colors = models.TextField(null=True, blank=True)
    # favorites = models.ManyToManyField('Game') # TODO integrate favorites

    def __unicode__(self):
        return unicode(self.user)

    @receiver(post_save, sender=User)
    def create_profile_for_user(sender, instance=None, created=False, **kwargs):
        if created:
            Profile.objects.get_or_create(user=instance, tag=instance.username[:15])

    @receiver(pre_delete, sender=User)
    def delete_profile_for_user(sender, instance=None, **kwargs):
        if instance:
            user_profile = Profile.objects.get(user=instance)
            user_profile.delete()

# class Lobby(models.Model):
#     match = models.ForeignKey('Match', unique=True)
#     game = models.ForeignKey('Game')

class Match(models.Model):
    STATE_CHOICES = (
        ('j', 'join'),
        ('p', 'play'),
        ('d', 'done'),
    )
    name = models.CharField(max_length=32)
    state = models.CharField(choices=STATE_CHOICES, default='j', max_length=3)
    game = models.ForeignKey('Game')
    # host = models.ForeignKey('Player', related_name='hosted_match')

    created_at = models.DateTimeField(auto_now_add=True)
    started_at = models.DateTimeField(null=True, blank=True)
    done_at = models.DateTimeField(null=True, blank=True)

    def __unicode__(self):
        return "{0} ({1} {2})".format(self.name, unicode(self.game), 'lobby' if self.state == 'j' else 'match')

class Player(models.Model):
    RESULT_CHOICES = (
        ('w', 'won'),
        ('l', 'lost'),
        ('d', 'draw'),
        ('x', 'dnf'),
    )

    peer_id = models.CharField(max_length=32, unique=True)
    
    tag = models.CharField(max_length=15, unique=True)

    profile = models.ForeignKey('Profile')
    match = models.ForeignKey('Match', related_name='players', editable=False)

    last_ping = models.DateTimeField(auto_now_add=True)

    score = models.IntegerField(default=0)
    result = models.CharField(RESULT_CHOICES, max_length=1, null=True, blank=True)
    team = models.PositiveSmallIntegerField(null=True, blank=True)

    # game = models.ForeignKey('Game', related_name='players')

    def __unicode__(self):
        return unicode(self.profile)

    def purge(self):
        print 'purging'
        for player in self.match.players.all():
            if player.last_ping <= timezone.now() - timezone.timedelta(seconds=10):
                try:
                    player.delete()
                except Exception:
                    pass
                
    def ping(self):
        print 'ping'
        self.last_ping = timezone.now()
        self.save()
        self.purge()




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

    def get_lobbies(self):
        return self.match_set.filter(state='j')

