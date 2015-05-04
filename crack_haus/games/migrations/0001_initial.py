# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

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
            name='Lobby',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('game', models.ForeignKey(to='games.Game')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Match',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('created_at', models.DateTimeField(auto_created=True)),
                ('state', models.CharField(default=b'j', max_length=3, choices=[(b'j', b'join'), (b'p', b'play'), (b'd', b'done')])),
                ('started_at', models.DateTimeField(null=True, blank=True)),
                ('done_at', models.DateTimeField(null=True, blank=True)),
                ('game', models.ForeignKey(to='games.Game')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Player',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('peer_id', models.CharField(unique=True, max_length=32)),
                ('last_ping', models.DateTimeField(auto_now_add=True)),
                ('score', models.IntegerField(default=0)),
                ('result', models.CharField(max_length=1, null=True, verbose_name=((b'w', b'won'), (b'l', b'lost'), (b'd', b'draw'), (b'x', b'dnf')), blank=True)),
                ('team', models.PositiveSmallIntegerField(null=True, blank=True)),
                ('match', models.ForeignKey(to='games.Match')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Profile',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('description', models.TextField()),
                ('colors', models.TextField()),
                ('user', models.OneToOneField(to=settings.AUTH_USER_MODEL)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.AddField(
            model_name='player',
            name='profile',
            field=models.ForeignKey(to='games.Profile'),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='match',
            name='host',
            field=models.ForeignKey(related_name='hosted_match', to='games.Player'),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='lobby',
            name='match',
            field=models.ForeignKey(to='games.Match'),
            preserve_default=True,
        ),
    ]
