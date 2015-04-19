# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import datetime
from django.conf import settings
from django.utils.timezone import utc


class Migration(migrations.Migration):

    replaces = [(b'games', '0001_initial'), (b'games', '0002_auto_20150314_2203'), (b'games', '0003_auto_20150314_2207'), (b'games', '0004_player_game'), (b'games', '0005_player_invited'), (b'games', '0006_auto_20150314_2254'), (b'games', '0007_auto_20150314_2352'), (b'games', '0008_player_last_ping')]

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Game',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=128)),
                ('description', models.TextField()),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Player',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('tag', models.CharField(unique=True, max_length=32)),
                ('peer_id', models.CharField(unique=True, max_length=32)),
                ('game', models.ForeignKey(related_name='players', to='games.Game')),
                ('invited', models.ManyToManyField(to=b'games.Player')),
                ('last_ping', models.DateTimeField(default=datetime.datetime(2015, 4, 18, 21, 34, 29, 543478, tzinfo=utc), auto_now=True)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
    ]
