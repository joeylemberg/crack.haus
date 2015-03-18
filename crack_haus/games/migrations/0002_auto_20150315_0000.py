# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('games', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='player',
            name='peer_id',
            field=models.CharField(unique=True, max_length=32),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='player',
            name='tag',
            field=models.CharField(unique=True, max_length=32),
            preserve_default=True,
        ),
    ]
