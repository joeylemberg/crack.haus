# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('games', '0008_auto_20150627_0304'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='match',
            name='host_player',
        ),
    ]
