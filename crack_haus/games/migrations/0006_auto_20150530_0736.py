# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('games', '0005_auto_20150530_0735'),
    ]

    operations = [
        migrations.AlterField(
            model_name='match',
            name='host_player',
            field=models.ForeignKey(related_name='hosted_matches', blank=True, to='games.Player', null=True),
            preserve_default=True,
        ),
    ]
