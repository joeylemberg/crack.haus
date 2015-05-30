# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('games', '0004_match_host_player'),
    ]

    operations = [
        migrations.AlterField(
            model_name='match',
            name='state',
            field=models.CharField(default=b'j', max_length=3, choices=[(b'j', b'join'), (b'p', b'play'), (b'd', b'done'), (b'x', b'cancelled')]),
            preserve_default=True,
        ),
    ]
