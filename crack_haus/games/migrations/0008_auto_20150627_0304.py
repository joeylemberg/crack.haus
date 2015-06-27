# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('games', '0007_auto_20150627_0302'),
    ]

    operations = [
        migrations.AddField(
            model_name='game',
            name='max_players',
            field=models.PositiveIntegerField(default=2),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='game',
            name='settings',
            field=models.TextField(null=True, blank=True),
            preserve_default=True,
        ),
    ]
