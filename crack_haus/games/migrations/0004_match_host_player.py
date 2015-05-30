# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('games', '0003_auto_20150530_0604'),
    ]

    operations = [
        migrations.AddField(
            model_name='match',
            name='host_player',
            field=models.ForeignKey(related_name='hosted_matches', default=1, to='games.Player'),
            preserve_default=False,
        ),
    ]
