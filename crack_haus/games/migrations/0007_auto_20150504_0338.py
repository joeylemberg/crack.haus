# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('games', '0006_auto_20150504_0334'),
    ]

    operations = [
        migrations.AlterField(
            model_name='player',
            name='match',
            field=models.ForeignKey(related_name='players', editable=False, to='games.Match'),
            preserve_default=True,
        ),
    ]
