# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('games', '0005_auto_20150504_0229'),
    ]

    operations = [
        migrations.AlterField(
            model_name='player',
            name='match',
            field=models.ForeignKey(related_name='players', editable=False, to='games.Match', unique=True),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='player',
            name='profile',
            field=models.ForeignKey(blank=True, to='games.Profile', null=True),
            preserve_default=True,
        ),
    ]
