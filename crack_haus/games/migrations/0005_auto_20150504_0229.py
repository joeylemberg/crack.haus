# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.contrib.auth.models import User

def create_player(apps, _):
    Profile = apps.get_model('games', 'Profile')

    for user in User.objects.all():
        Profile.objects.get_or_create(user_id=user.id)

class Migration(migrations.Migration):

    dependencies = [
        ('games', '0004_match_name'),
    ]

    operations = [
        migrations.RunPython(create_player),
    ]
