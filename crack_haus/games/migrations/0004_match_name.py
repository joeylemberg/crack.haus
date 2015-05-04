# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('games', '0003_auto_20150504_0125'),
    ]

    operations = [
        migrations.AddField(
            model_name='match',
            name='name',
            field=models.CharField(default='TMP', max_length=32),
            preserve_default=False,
        ),
    ]
