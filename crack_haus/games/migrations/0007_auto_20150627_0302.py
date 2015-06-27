# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('games', '0006_auto_20150530_0736'),
    ]

    operations = [
        migrations.AddField(
            model_name='match',
            name='log',
            field=models.TextField(null=True, blank=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='match',
            name='settings',
            field=models.TextField(null=True, blank=True),
            preserve_default=True,
        ),
    ]
