# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('games', '0002_auto_20150530_0525'),
    ]

    operations = [
        migrations.AlterField(
            model_name='player',
            name='tag',
            field=models.CharField(max_length=15),
            preserve_default=True,
        ),
    ]
