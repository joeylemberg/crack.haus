# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('games', '0002_remove_match_host'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='lobby',
            name='game',
        ),
        migrations.RemoveField(
            model_name='lobby',
            name='match',
        ),
        migrations.DeleteModel(
            name='Lobby',
        ),
        migrations.AlterField(
            model_name='match',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='player',
            name='match',
            field=models.ForeignKey(related_name='players', editable=False, to='games.Match'),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='player',
            name='profile',
            field=models.ForeignKey(editable=False, to='games.Profile'),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='profile',
            name='colors',
            field=models.TextField(null=True, blank=True),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='profile',
            name='description',
            field=models.TextField(null=True, blank=True),
            preserve_default=True,
        ),
    ]
